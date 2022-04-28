//***** IMPORTS  ******//
const db = require('../config/db');

//***** COMMENTS CONTROLLERS *****//
// CCREER UN COMMENTAIRE
exports.create = (req, res, next) => {
  // OBJET QUI CONTIENT LES CHAMPS REMPLIS
  const post = {
    comment: req.body.comment,
    authorId: req.body.authorId,
    postId: req.body.postId,
  };
  // mise à jour de la table post en ajoutant un commentaire où l'Id du post est présent
  let query = `UPDATE post SET post.total = post.total + 1 WHERE postId=?;`;
  db.query(query, [req.body.postId], function (err, result) {
    if (err) 
    res.status(400).json({ err });
    // Insertion du commentaires et de ses valeurs dans la table comments
    let query = `INSERT INTO comments (comment, authorId, postId) VALUES (?,?,?);`;
    db.query(
      query,
      [post.comment, post.authorId, post.postId],
      function (err, result) {
        if (err) throw err;
      
        res.status(201).json({ message: `le Commentaire est ajouté` });
      }
    );
  });
};

// OBTENIR TOUS LES COMMENTAIRES
exports.getComments = (req, res, next) => {
  let query = `SELECT * from comments c JOIN user u WHERE c.authorId = u.id ORDER BY idComment;`;
  db.query(query, function (err, result) {
    if (err) 
    res.status(400).json({ err });
    res.status(200).json(result);
  });
};

//OBTENIR LES COMMENTAIRES PAR POSTS
exports.getCommentBypostId = (req, res, next) => {
  let query = `SELECT * FROM post p, comments c WHERE c.postId = p.postId;`;
  db.query(query, function(err, result) {

    if(err)
    res.status(400).json({err});
    res.status(200).json(result);
  });
};

// DELETE COMMENTS
exports.deleteComments = (req, res, next) => {
  let query = `SELECT * from comments WHERE idComment=?`;
  db.query(query, [req.params.idComment], function (err, result) {
    res.send(result);
    if (result[0].authorId == req.body.userId || req.body.admin == 1) {
      if (err) 
      res.status(400).json({ err });
      let query = `DELETE from comments WHERE idComment=?;`;
      db.query(query, [req.params.idComment], function (err, result) {
        if (err) 
        res.status(400).json({ err });
        let query = `UPDATE post SET post.comment = post.comment - 1 WHERE postId=?;`;
        db.query(query, [req.params.postId], function (err, result) {
          res.send(result);
          if (err)           
          res.status(400).json({ err });
          res.status(200).json({message: 'commentaire supprimé'});
        });
      });
    } else {
      res.status(400).json({ message: "Vous ne pouvez pas supprimer ce commentaire" });
    }
  });
};

