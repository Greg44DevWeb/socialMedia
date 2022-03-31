const db = require("../config/db");

exports.like = (req, res, next) => {
  // TOUT LES POST DU DERNIER AU PREMIER
  let query = "SELECT * FROM groupomania.like;";  //TODO VOIR POUR LE SWITCH
  db.query(query, function (err, results) {
    if (err) res.status(400).json({ err });
    let userLiked = false;
    for (const result of results) {
      if (
        req.body.userId == result.userId &&
        req.body.postId == result.postId
      ) {
        userLiked = true;
      }
    }
    if (!userLiked) {
      let query = `UPDATE post SET post.like = post.like + 1 WHERE postId=?;`;
      db.query(query, [req.body.postId], function (err, result) {
        if (err) res.status(400).json({ err });
        let query = `INSERT INTO groupomania.like (postId, userId) VALUES (?,?);`;
        db.query(
          query,
          [req.body.postId, req.body.userId],
          function (err, result) {
            if (err) res.status(400).json({ err });
            res.status(200).json(result);
          }
        );
      });
    } else {
      let query = `UPDATE post SET post.like = post.like - 1 WHERE postId=?;`;
      db.query(query, [req.body.postId], function (err, result) {
        if (err) res.status(400).json({ err });
        let query = `DELETE FROM groupomania.like l WHERE l.postId = ? AND l.userId = ?`;
        db.query(
          query,
          [req.body.postId, req.body.userId],
          function (err, result) {
            if (err) res.status(400).json({ err });
            res.status(200).json(result);
          }
        );
      });
    }
  });
};

exports.liked = (req, res, next) => {
  let query = `SELECT postId FROM groupomania.like WHERE userId = ?`;
  db.query(query, [req.body.userId], function (err, result) {
    if (err) res.status(400).json({ err });
    res.status(200).json(result);
  });
};
