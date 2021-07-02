const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', function(req, res, next) {
  const {username, password} = req.body;
  const query = `SELECT * FROM Users WHERE Username = "${username}";`;
  db.query(query, (err, data) => {
    if (err) console.log(err);
    if (data[0]) {
      if (data[0].Password === password) {
        res.status(200).json(data[0]);
      } else {
        res.status(401).send('Invalid credentials.');
      }
    } else {
      res.status(404).send('Account not found');
    }
  })
  res.status(404);
});

module.exports = router;
