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
    res.status(200).json(data[0]);
  })
  res.status(404);
});

router.post('/', function(req, res, next) {
  const {username, email, password} = req.body;
  const query = `INSERT INTO Users (Username, Email, Password)
                  VALUES ("${username}", "${email}", "${password}")`;
  db.query(query, (err, data) => {
    if (err) throw err;
    res.sendStatus(201);
  })
  res.status(404);
});

router.put('/:id', function(req, res, next) {
  const {username, email, password} = req.body;
  const id = req.params.id;
  const query = `UPDATE Users
                SET Username = "${username}",
                    Email = "${email}",
                    Password = "${password}"
                WHERE Id = ${id};`;
  db.query(query, (err, data) => {
    if (err) throw err;
    res.sendStatus(200);
  })
  res.status(404);
});

router.delete('/:id', function(req, res, next) {
  const id = req.params.id;
  const query = `DELETE FROM Users WHERE Id = ${id};`;
  db.query(query, (err, data) => {
    if (err) throw err;
    res.sendStatus(204);
  })
  res.status(404);
});

module.exports = router;
