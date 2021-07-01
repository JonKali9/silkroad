const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', function(req, res, next) {
  const query = 'SELECT * FROM Orders;';
  db.query(query, (err, data) => {
    if (err) console.log(err);
    res.status(200).json(data);
  })
  res.status(404);
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  const query = `SELECT * FROM Orders WHERE User_Id = ${id};`;
  db.query(query, (err, data) => {
    if (err) console.log(err);
    res.status(200).json(data);
  })
  res.status(404);
});

router.post('/', function(req, res, next) {
  const {user_id, product_id, date, address, status} = req.body;
  const query = `INSERT INTO Orders (User_Id, Product_Id, Date, Address, Status)
                  VALUES (${user_id}, ${product_id}, "${date}", "${address}", "${status}");`;
  db.query(query, (err, data) => {
    if (err) console.log(err);
    res.sendStatus(201);
  })
  res.status(404);
});

router.put('/:id', function(req, res, next) {
  const {user_id, product_id, date, address, status} = req.body;
  const id = req.params.id;
  const query = `UPDATE Orders
                SET
                  User_Id = ${user_id},
                  Product_Id = ${product_id},
                  Date = "${date}",
                  Address = "${address}",
                  Status = "${status}"
                WHERE Id = ${id};`;
  db.query(query, (err, data) => {
    if (err) console.log(err);
    res.sendStatus(200);
  })
  res.status(404);
});

router.delete('/:id', function(req, res, next) {
  const id = req.params.id;
  const query = `DELETE FROM Orders WHERE Id = ${id};`;
  db.query(query, (err, data) => {
    if (err) console.log(err);
    res.sendStatus(204);
  })
  res.status(404);
});

module.exports = router;