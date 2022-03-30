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
        if (err) res.status(400).json({ err });
        // Insertion du commentaires et de ses valeurs dans la table comment
        let sql = `INSERT INTO comment (comment, authorId, postId) VALUES (?,?,?);`;
        db.query(sql, [post.comment, post.authorId, post.postId], function (err, result) {
            if (err) throw err;
            console.log(result)
            res.status(201).json({ message: `le Commentaire est ajouté` });
        })
    });
};

