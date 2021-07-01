const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', function(req, res, next) {
  const query = 'SELECT * FROM Carts;';
  db.query(query, (err, data) => {
    if (err) console.log(err);
    res.status(200).json(data);
  })
  res.status(404);
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  const query = `SELECT * FROM Carts WHERE User_Id = ${id};`;
  db.query(query, (err, data) => {
    if (err) console.log(err);
    res.status(200).json(data);
  })
  res.status(404);
});

router.post('/', function(req, res, next) {
  const {user_id, product_id} = req.body;
  const query = `INSERT INTO Carts (User_Id, Product_Id)
                  VALUES (${user_id}, ${product_id});`;
  db.query(query, (err, data) => {
    if (err) console.log(err);
    res.sendStatus(201);
  })
  res.status(404);
});

router.put('/:id', function(req, res, next) {
  const {user_id, product_id} = req.body;
  const id = req.params.id;
  const query = `UPDATE Carts
                SET
                  User_Id = ${user_id},
                  Product_Id = ${product_id}
                WHERE Id = ${id};`;
  db.query(query, (err, data) => {
    if (err) console.log(err);
    res.sendStatus(200);
  })
  res.status(404);
});

router.delete('/:id', function(req, res, next) {
  const id = req.params.id;
  const query = `DELETE FROM Carts WHERE Id = ${id};`;
  db.query(query, (err, data) => {
    if (err) console.log(err);
    res.sendStatus(204);
  })
  res.status(404);
});

module.exports = router;
