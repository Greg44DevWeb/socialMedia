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
  let sql = `UPDATE post SET post.comment = post.comment + 1 WHERE postId=?;`;
  db.query(sql, [req.body.postId], function (err, result) {
    if (err) 
    res.status(400).json({ err });
    // Insertion du commentaires et de ses valeurs dans la table comment
    let sql = `INSERT INTO comments (comment, authorId, postId) VALUES (?,?,?);`;
    db.query(
      sql,
      [post.comment, post.authorId, post.postId],
      function (err, result) {
        if (err) throw err;
        console.log(result);
        res.status(201).json({ message: `le Commentaire est ajouté` });
      }
    );
  });
};

// OBTENIR TOUS LES COMMENTAIRES
exports.getComments = (req, res, next) => {
  let sql = `SELECT * from comments c JOIN user u WHERE c.authorId = u.id ORDER BY idComment;`;
  db.query(sql, function (err, result) {
    if (err) 
    res.status(400).json({ err });
    res.status(200).json(result);
  });
};
// DELETE COMMENTS
exports.deleteComments = (req, res, next) => {
  let sql3 = `SELECT * from comments WHERE idComment=?`;
  db.query(sql3, [req.params.commentId], function (err, result) {
    if (result[0].authorId == req.body.userId || req.body.admin == true) {
      if (err) 
      res.status(400).json({ err });
      let sql2 = `DELETE from comments WHERE idComment=?;`;
      db.query(sql2, [req.params.commentId], function (err, result) {
        if (err) 
        res.status(400).json({ err });
        let sql = `UPDATE post SET post.comment = post.comment - 1 WHERE postId=?;`;
        db.query(sql, [req.params.postId], function (err, result) {
          if (err) 
          res.status(400).json({ err });
          res.status(200).json(result);
        });
      });
    } else {
      res.status(400).json({ message: "Vous ne pouvez pas supprimer ce commentaire" });
    }
  });
};

