const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', function(req, res, next) {
  const query = 'SELECT * FROM Products;';
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
  const query = `INSERT INTO Products (Title, Description, Category, Price, Seller_Id)
                  VALUES ("${title}", "${description}", "${category}", ${price}, ${seller_id});`;
  db.query(query, (err, data) => {
    if (err) console.log(err);
    res.sendStatus(201);
  })
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
