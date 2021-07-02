const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', function(req, res, next) {
  const {q, c} = req.query;
  let query = 'SELECT * FROM Products';
  if (q) query += ` WHERE Title LIKE '%${q}%'`;
  if (q && c) query += ` AND`;
  if (c && q) query += ` Category = '${c}'`;
  if (c && !q) query += ` WHERE Category = '${c}'`;
  db.query(query, (err, data) => {
    if (err) console.log(err);
    res.status(200).json(data);
  })
  res.status(404);
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  const query = `SELECT * FROM Products WHERE Id = ${id};`;
  db.query(query, (err, data) => {
    if (err) console.log(err);
    res.status(200).json(data[0]);
  })
  res.status(404);
});

router.post('/', function(req, res, next) {
  const {title, description, category, price, seller_id} = req.body;
  if (title && description && category && price && seller_id) {
    const query = `INSERT INTO Products (Title, Description, Category, Price, Seller_Id)
                    VALUES ("${title}", "${description}", "${category}", ${price}, ${seller_id});`;
    db.query(query, (err, data) => {
      if (err) console.log(err);
      res.status(201).send(''+data.insertId);
    })
  }
  res.status(404);
});

router.put('/:id', function(req, res, next) {
  const {title, description, category, price, seller_id} = req.body;
  const id = req.params.id;
  const query = `UPDATE Products
                SET
                  Title = "${title}",
                  Description = "${description}",
                  Category = "${category}",
                  Price = ${price},
                  Seller_Id = ${seller_id}
                WHERE Id = ${id};`;
  db.query(query, (err, data) => {
    if (err) console.log(err);
    res.sendStatus(200);
  })
  res.status(404);
});

router.delete('/:id', function(req, res, next) {
  const id = req.params.id;
  const query = `DELETE FROM Products WHERE Id = ${id};`;
  db.query(query, (err, data) => {
    if (err) console.log(err);
    res.sendStatus(204);
  })
  res.status(404);
});

module.exports = router;
