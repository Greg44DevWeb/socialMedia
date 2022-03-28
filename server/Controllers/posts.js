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
// Afficher les posts selon l'auteur du post par date décroissante 
exports.getPostsByAuthor = (req, res, next) => {
let sql = 'SELECT * FROM post JOIN user WHERE user.id = authorId AND authorID = ? ORDER BY date DESC;';
db.query(sql, [req.body.id], function (err, result) {
    if(err) res.status(400).json({message : 'affichage des posts de cet utilisateur impossible'});
    res.status(200).json(result);
});
};