const express = require('express');
const router = express.Router();
const db = require('../database');


router.post('/:id', function(req, res, next) {
  const id = req.params.id;
  const {user_id, product_id, date, address, status} = req.body;
  const query = `SELECT * FROM Carts WHERE User_Id = ${id};`;
  db.query(query, (err, data) => {
    if (err) console.log(err);
    data.map(cart => {
      console.log(cart);
      db.query(`DELETE FROM Carts WHERE User_Id = "${cart.User_Id}";`, (err, data) => {
        if (err) console.log(err);
      });
      const query = `INSERT INTO Orders (User_Id, Product_Id, Date, Address, Status)
                  VALUES (${cart.User_Id}, ${cart.Product_Id}, "${date}", "${address}", "${status}");`;
      db.query(query, (err, data) => {
        if (err) console.log(err);
      })
    })
    res.status(200).json(data);
  })
  res.status(404);
});

module.exports = router;
