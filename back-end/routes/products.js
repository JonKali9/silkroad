const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', function(req, res, next) {
  const query = 'SELECT * FROM Users;';
  db.query(query, (err, data) => {
    if (err) throw err;
    res.status(200).json(data);
  })
  res.status(404);
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  const query = `SELECT * FROM Users WHERE Id = ${id};`;
  db.query(query, (err, data) => {
    if (err) throw err;
    res.status(200).json(data);
  })
  res.status(404);
});

module.exports = router;
