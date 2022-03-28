//***** IMPORTS *****/
const db = require("../config/db");
const fs = require("fs");


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
  let sql =
    "SELECT * FROM post JOIN user WHERE user.id = authorId AND authorID = ? ORDER BY date DESC;";
  db.query(sql, [req.body.id], function (err, result) {
    if (err)
      res.status(400).json({ message: "affichage des posts de cet utilisateur impossible" });
    res.status(200).json(result);
  });
};


exports.createPost = (req, res, next) => {
  //PARAMETRE DES DONNES COMPLETEES
  const image = req.file
    ? `${req.protocol}://{req.get('host)}/images/post${req.file.filename}`
    : "";
  const textToSend = req.body.text ? req.body.text : "";
  const post = {
    // objet du post
    text: textToSend,
    imageUrl: image,
    like: 0,
    date: new Date().toLocaleDateString("af-ZA", { timeZone: "Europe/Paris" }),
    authorId: req.body.userId,
  };
  // REQUETE AVEC PRISE EN COMPTE MULTER ET VALEURS PARAMETREES
  let sql =
    "INSERT INTO post (text, imageURL, date, authorId) VALUES (?,?,?,?);";
  db.query(
    sql,
    [post.text, post.imageUrl, post.date, poste.authorId],
    function (err, result) {
      if (err) throw err;
      res.status(200).json({ message: "ressource créée" });
    }
  );
};