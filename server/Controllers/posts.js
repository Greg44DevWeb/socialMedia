//***** IMPORTS *****/
const db = require("../config/db");
const fs = require("fs");


//***** POSTS CONTROLLERS *****//
// AFFICHER TOUS LES POSTS DU PLUS RECENT AU PLUS ANCIEN
exports.getPosts = (req, res, next) => {
  let query =
    "SELECT * FROM post p JOIN user WHERE user.id = authorId ORDER BY date DESC LIMIT 50;";
  db.query(query, function (err, result) {
    if (err)
      res.status(400).json({ message: "impossible d'afficher les posts" });
    res.status(200).json(result);
    console.log(result);
  });
};
// AFFCIHER LES POSTS PAR DATE DECROISSANTE SELON L'AUTEUR
exports.getPostsByAuthor = (req, res, next) => {
  let query =
    "SELECT * FROM post JOIN user WHERE user.id = authorId AND authorID = ? ORDER BY date DESC;";
  db.query(query, [req.body.id], function (err, result) {
    if (err)
      res 
        .status(400)
        .json({ message: "affichage des posts de cet utilisateur impossible" });
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
  const post = { // Objet'Post'
    text: textToSend,
    imageUrl: image,
    like: 0,
    date: new Date().toLocaleDateString("af-ZA", { timeZone: "Europe/Paris" }),
    authorId: req.body.id,
  };
  // REQUETE AVEC PRISE EN COMPTE MULTER ET VALEURS PARAMETREES
  let query =
    "INSERT INTO post (text, imageURL, date, authorId) VALUES (?,?,?,?);";
  db.query(
    query,
    [post.text, post.imageUrl, post.date, post.authorId],
    function (err, result) {
      if (err) throw err;
      res.status(200).json({ message: "message créé" });
    }
  );
};

// SUPPRIMER UN POST
exports.deletePost = (req, res, next) => {
  let query = "SELECT * FROM post WHERE postId = ?;";
  db.query(query, [req.params.id], function (err, result) {
    if (err) res.status(400).json({ message: "une erreur s'est produite" });
    if (!result[0])
      res.status(400).json({ message: "Pas de correspondance pour cet Id " });
    else {
      if (result[0].authorId == req.body.userId || req.body.admin == 1) {
        //gestion de l'image a supprimer
        if (result[0].imageUrl != "") {
          const imageName = result[0].imageUrl.split("/images/post/")[1];
          fs.unlink(`images/post/${imageName}`, () => {
            if (err) throw err;
            console.log("suppression effectuée");
          });
        }
        //MISE A JOUR DB PAR SUPPRESSION DU POST
        let query = "DELETE FROM post WHERE postId = ?;";
        db.query(query, [req.params.id], function (err, result) {
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
  if (req.file) {
    let query = `SELECT * FROM post WHERE postId = ?`;
    db.query(query, [req.params.id], function (err, result) {
      if (err) res.status(400).json({ e });
      console.log(result[0]);
      if (!result[0])
        res
          .status(400)
          .json({ message: "Aucun id ne correspond dans la table" });
      else {
        // SI LE POST A UNE IMAGE, LA SUPPRIMER DU DOSSIER IMAGES
        if (result[0].imageUrl != "") {
          const name = result[0].imageUrl.split("/images/post/")[1];
          fs.unlink(`images/${name}`, () => {
            if (err) console.log(err);
            else console.log("Image modifiée !");
          });
        }
        // RECUPERE LES INFOS ENVOYER PAR LE FRONT
        let image = req.file
          ? `${req.protocol}://${req.get("host")}/images/post/${
              req.file.filename
            }`
          : "";
        let textToSend = (req.body.text) ? req.body.text : " ";
        console.log(body.text);
        const post = {
          text: textToSend,
          imageUrl: image,
          date: new Date().toLocaleString("af-ZA", {
            timeZone: "Europe/Paris",
          }),
        };
        // UPDATE LA DB
        let query = `UPDATE post
              SET text = ?, imageUrl= ?, date = ?
              WHERE postId = ?`;
        db.query(
          query,
          [post.text, post.imageUrl, post.date, req.params.id],
          function (err, result) {
            if (err) throw err;
            res.status(201).json({ message: `votre post a été modifié` });
          }
        );
      }
    });
  } else {
    // RECUPERE LES INFOS ENVOYEES PAR LE FRONT
    const textToSend = (req.body.text) ? req.body.text: ""; // TODO voir erreur
    console.log('---> contenu du log :' + textToSend);
    const post = {
      text: textToSend,
      date: new Date().toLocaleString("af-ZA", { timeZone: "Europe/Paris" }),
    };
    // UPDATE LA DB
    let query = `UPDATE post
              SET  text = ?, date =?
              WHERE postId = ?`;
    db.query(
      query,
      [post.text, post.date, req.params.id],
      function (err, result) {
        if (err) throw err;
        res.status(201).json({ message: `votre post a été modifié` });
        console.log(result);
      }
    );
  }
};


