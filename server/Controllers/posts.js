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
// AFFCIHER LES POSTS PAR DATE DECROISSANTE SELON L'AUTEUR
exports.getPostsByAuthor = (req, res, next) => {
  let sql =
    "SELECT * FROM post JOIN user WHERE user.id = authorId AND authorID = ? ORDER BY date DESC;";
  db.query(sql, [req.body.id], function (err, result) {
    if (err)
      res.status(400).json({ message: "affichage des posts de cet utilisateur impossible" });
    res.status(200).json(result);
  });
};

// CREER UN POST CONTENANT TEXTE, IMAGE, DATE
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

// SUPPRIMER UN POST
exports.deletePost = (req, res, next) => {
  let sql = "SELECT * FROM post WHERE postId = ?;";
  db.query(sql, [req.params.id], function (err, result) {
    if (err) res.status(400).json({ message: "une erreur s'est produite" });
    if (!result[0])
      res.status(400).json({ message: "Pas de correspondance pour cet Id " });
    else {
      if (result[0].authorId == req.body.userId || req.body.admin == true) {
        //gestion de l'image a supprimer
        if (result[0].imageUrl != "") {
          const imageName = result[0].imageUrl.split("/images/post/")[1];
          fs.unlink(`images/post/${imageName}`, () => {
            if (err) throw err;
            console.log("suppression effectuée");
          });
        }
        //MISE A JOUR DB PAR SUPPRESSION DU POST
        let sql2 = "DELETE FROM post WHERE postId = ?;";
        db.query(sql2, [req.params.id], function (err, result) {
          if (err) throw err;
          res.status(200).json({ message: "suppression du post effectuée" });
        });
      } else {
        res
          .status(400)
          .json({ message: "Vous ne pouvez pas supprimer ce post" });
      }
    }
  });
};

//MODIFIER UN POST
exports.modifyPost = (req, res, next) => {

}