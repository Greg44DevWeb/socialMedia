const db = require("../config/db");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const fs = require('fs');
const { useParams } = require("react-router-dom");


//****** SIGNUP USER ***************/
exports.signup = (req, res, next) => {
    let sql = `SELECT * FROM user WHERE email=?`;
    db.query(sql, [req.body.email], function (err, result) {
        let user = result[0];
        if (!user) {
            bcrypt.hash(req.body.password, 5)
                .then(hash => {
                    const image = `${req.protocol}://${req.get('host')}/images/profile/pp.png`;
                    const user = {
                        nom: req.body.nom,
                        prenom: req.body.prenom,
                        email: req.body.email,
                        password: hash,
                        imageUrl: image,
                    }
                    let sql = `INSERT INTO user (nom, prenom, email, password, pp) VALUES (?,?,?,?,?)`;
                    db.query(sql, [user.nom, user.prenom, user.email, user.password, user.imageUrl], function (err, result) {
                        if (err) throw err;
                        res.status(201).json({ message: ` ${user.prenom} ${user.nom} est inscrit(e)` });
                    })
                })
                .catch(error => res.status(500).json({ error }));
        } else {
            res.status(401).json({ message: "Cet email est déjà utilisé par un autre utilisateur" })
        }
    })

};
//****** LOGIN USER ***************/
exports.login = (req, res, next) => {
    let sql = `SELECT * FROM user WHERE email=?`;
    db.query(sql, [req.body.email], function (err, result) {
        let user = result[0];
        if (!user) return res.status(401).json({ error: "Email incorrect" });
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: " Mot de passe invalide !" })
                }
                console.log("utilisateur connecté");
                res.status(200).json({
                    userId: user.id,
                    token: jwt.sign(
                        { userId: user.id },
                        process.env.RANDOM_SECRET_TOKEN,
                        { expiresIn: "12h" },
                    ),
                })
            })
            .catch(error => res.status(500).json({ message: "Erreur authentification" }));
    })
};

//***** DELETE ACCOUNT ******// 
exports.delete = (req, res, next) => {
    if (req.body.password ) {                               
        let sql = `SELECT * FROM user WHERE id=?`;
        db.query(sql, [req.params.id], function (err, result) {
            let user = result[0];
            console.log(user);
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: " Mot de passe invalide !" });
                    } else {
                        bcrypt.hash(req.body.password, 10)
                            .then(hash => {
                                let sql = `DELETE FROM user WHERE id=?`;
                                db.query(sql, [req.params.id], function (err, result) {
                                    if (err) throw err;
                                    console.log(result);
                                    res.status(200).json({ message: `le Compte N° ${req.params.id} est supprimé` });
                                });
                            })
                            .catch(error => res.status(500).json({ error }));
                    }
                })
                .catch(error => res.status(500).json({ message: "Internal Server Error" }));
        })
    }
}

exports.getOne = (req, res, next) => {
    let sql = `SELECT * FROM user WHERE user.id=${req.body.userId};`;
    db.query(sql, function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
}

exports.getByName = (req, res, next) => {
    let sql = `SELECT * FROM user WHERE nom LIKE '%${req.body.nom}%' OR prenom LIKE '%${req.body.nom}%' LIMIT 10;`;
    db.query(sql, [req.body.nom], function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
}

exports.modifyPassword = (req, res, next) => {
    if (req.body.password) {
        let sql = `SELECT * FROM user WHERE id=?`;
        db.query(sql, [req.params.id], function (err, result) {
            let user = result[0];
            bcrypt.compare(req.body.oldPassword, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: " Mot de passe incorrect !" });
                    } else {
                        bcrypt.hash(req.body.password, 10)
                            .then(hash => {
                                let sql2 = `UPDATE user
                                SET password= ?
                                WHERE id = ?;`;
                                db.query(sql2, [hash, req.params.id], function (err, result) {
                                    if (err) throw err;
                                    res.status(200).json({ message: "Mot de passe modifié" })
                                });
                            })
                            .catch(error => res.status(500).json({ error }));
                    }
                })
                .catch(error => res.status(400).json({ message: "Erreur authentification" }));
        })
    }
}

exports.modifyUserAccount = (req, res, next) => {
    if (req.body.nom != "") {
        let sql2 = `UPDATE user
                SET nom= ?
                WHERE id = ?`;
        db.query(sql2, [req.body.nom, req.params.id], function (err, result) {
            if (err) throw err;
        });
    }
    if (req.body.desc != "") {

        let sql2 = `UPDATE user SET user.desc=? WHERE id =?`;
        db.query(sql2, [req.body.desc, req.params.id], function (err, result) {
            if (err) throw err;
        });
    }
    if (req.body.prenom != "") {
        let sql2 = `UPDATE user
                SET prenom= ?
                WHERE id = ?;`;
        db.query(sql2, [req.body.prenom, req.params.id], function (err, result) {
            if (err) throw err;
        });
    }
    res.status(200).json({ message: "Information user update" });
}

exports.modifyProfilePicture = (req, res, next) => {
    if (req.file) {
        let sql = `SELECT * FROM user WHERE id = ?`;
        db.query(sql, [req.params.id], function (err, result) {
            if (err) res.status(400).json({ err });
            if (!result[0]) res.status(400).json({ message: "Aucun id ne correspond dans la table" });
            else {
                // SI LE USER A UNE IMAGE, LA SUPPRIMER DU DOSSIER IMAGES/PROFILE
                if (result[0].pp != "http://localhost:3000/images/profile/pp.png") {
                    const name = result[0].pp.split('/images/profile/')[1];
                    fs.unlink(`images/profile/${name}`, () => {
                        if (err) console.log(err);
                        else console.log('Image modifiée !');
                    })
                }
                // RECUPERE LES INFOS ENVOYEES PAR LE FRONT 
                let image = (req.file) ? `${req.protocol}://${req.get('host')}/images/profile/${req.file.filename}` : "";
                // MISE A JOIUR DE LA BDD
                let sql2 = `UPDATE user
                SET pp = ?
                WHERE id = ?`;
                db.query(sql2, [image, req.params.id], function (err, result) {
                    if (err) throw err;
                    res.status(201).json({ message: `Photo user udpate` });
                });
            }
        });
    }
};