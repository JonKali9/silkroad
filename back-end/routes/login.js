const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', function(req, res, next) {
  const {username, password} = req.body;
  const query = `SELECT * FROM Users WHERE Username = "${username}";`;
  db.query(query, (err, data) => {
    if (err) console.log(err);
    if (data[0].Password === password) {
      res.status(200).json(data);
    } else {
      res.status(401).send('Invalid credentials.');
    }
  })
  res.status(404);
});

module.exports = router;
