//***** IMPORTS *****/
const db = require('../config/db');
const fs = require('fs');

//***** POSTS CONTROLLERS *****//
// AFFICHER TOUS LES POSTS DU PLUS RECENT AU PLUS ANCIEN
exports.getPosts = (req, res, next) => {
  let sql =
    "SELECT * FROM post p JOIN WHERE user.id= authorId ORDER BY date DESC LIMIT 50;";
  db.query(sql, function (err, result) {
    if (err)
      res.status(400).json({ message: "impossible d'afficher les posts" });
    res.status(200).json(result);
  });
};
