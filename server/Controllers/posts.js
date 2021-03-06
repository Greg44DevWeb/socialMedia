//***** IMPORTS *****/
const db = require("../config/db");
const fs = require("fs");


//***** POSTS CONTROLLERS *****//
// AFFICHER TOUS LES POSTS DU PLUS RECENT AU PLUS ANCIEN
exports.getPosts = (req, res, next) => {
  let query =
    "SELECT * FROM post p JOIN user WHERE user.id = authorId ORDER BY postId DESC LIMIT 50;";
  db.query(query, function (err, result) {
    if (err)
      res.status(400).json({ message: "impossible d'afficher les posts" });
    res.status(200).json(result);
    console.log(result);  //TODO ---------------------------------  SUPPRIMER CONSOLE.LOG 
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
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : "";
  const textToSend = req.body.text ? req.body.text : "";
  const Options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const post = {
    // Objet'Post'
    text: textToSend,
    imageUrl: image,
    date: new Date().toLocaleString("fr-Fr", Options),
    authorId: req.body.authorId,
  };
  // REQUETE AVEC PRISE EN COMPTE MULTER ET VALEURS PARAMETREES
  let query =
    "INSERT INTO post (text, imageUrl, date, authorId) VALUES (?,?,?,?);";
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
// exports.deletePost = (req, res, next) => {
 
//   let query = `SELECT * FROM post WHERE postId=?;`;
//   db.query(query, [req.body.postId], function (err, result) {
//       if (err) res.status(400).json({ message: "une erreur est survenue" });
      
//       if (!result[0]) 
//       res.status(400).json({ message: "Aucun id ne correspond dans la table" });
//       else {
//         console.log('VOICI LE RESULTAT' + result)
//           if (result[0].authorId == req.body.userId || req.body.admin == true) {
//               // SI LE POST A UNE IMAGE, LA SUPPRIMER DU DOSSIER IMAGES
//               if (result[0].imageUrl != "") {
//                   const name = result[0].imageUrl.split('/images/')[1];
//                   fs.unlink(`images/${name}`, () => {
//                       if (err) console.log(err);
//                       else console.log('post supprimé  !');
//                   })
//               }
//               // SUPPRIME LE POST DANS LA DB
//               let query = `DELETE FROM post WHERE postId=?;`;
//               db.query(query, [req.body.postId], function (err, result) {
//                   if (err) throw err;
//                   res.status(201).json({ message: 'Publication supprimée' });
//               });
//           } else {
//               res.status(401).json({message : "Vous ne pouvez pas supprimer ce post"});
//           }

//       }
//   });
// };

//***DELETE POST TEST ***//
exports.deleteOnePost = (req, res, next) => {
  let query = `SELECT * FROM post WHERE postId=?;`;
  db.query(query, [req.params.postId], (err, result) => {
    if (err) {
      res.status(404).json({ message: "une erreur est survenue" });
    } else {
      if (!result[0]) {
        res.status(400).json({message: "Cette publication ne peut -être supprimée"}) 
    }else {
      const name = result[0].imageUrl.split('/images/')[1];
      fs.unlink(`images/${name}`, () => {
          if (err) console.log(err);
          else console.log('authorized');//TODO ---------------------------------  SUPPRIMER CONSOLE.LOG                                 
      })
       // SUPPRIME LE POST DANS LA DB
       let query = `DELETE FROM post WHERE postId=?;`;
       db.query(query, [req.body.postId], function (err, result) {
           if (err) throw err; 
           res.status(201).json({ message: 'Publication supprimée' });
       });
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
      console.log(result[0]); //TODO ---------------------------------  SUPPRIMER CONSOLE.LOG 
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
          ? `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`
          : "";
        let textToSend = (req.body.text) ? req.body.text : " ";
        console.log(body.text); //TODO ---------------------------------  SUPPRIMER CONSOLE.LOG 
        const Options = {
          year: 'numeric',
          month: 'long',
          day: "numeric",
          hour: 'numeric',
          minute: 'numeric',
        }
        const post = {
          text: textToSend,
          imageUrl: image,
          date: new Date().toLocaleString("fr-Fr", Options),
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
    console.log('---> contenu du log :' + textToSend); //TODO ---------------------------------  SUPPRIMER CONSOLE.LOG 
    const Options = {
      year: 'numeric',
      month: 'long',
      day: "numeric",
      hour: 'numeric',
      minute: 'numeric',
    }
    const post = {
      text: textToSend,
      date: new Date().toLocaleString("fr-Fr", Options),
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
        console.log(result); //TODO ---------------------------------  SUPPRIMER CONSOLE.LOG 
      }
    );
  }
};


