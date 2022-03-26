const db = require ('../config/db');
const mysql = require ('mysql2');
const fs = require('fs');
const message = db.query('SELECT * FROM messages');
console.log(message);
//*** ADD MESSAGES : POST ***//
exports.createMessage = (req, res, next) => {
    const messageObject = JSON.parse(req.body.message);
    const message = new Message ({
        ...messageObject, 
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    message.save()
    .then (db.query('ADD content, mediaContent, editingDate, userlike, IN messages'), VALUES ('?,?,?,?,?'),
    [Content, mediaContent, editingDate, userlike],)
    .then(() => res.status(201).json({ message: 'message enregistré !'}))
    .catch(error => res.status(401).json({ message: `Requête non aboutie` }));
  };
