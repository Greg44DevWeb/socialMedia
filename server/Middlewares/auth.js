//*****  Middleware d'authentification *********/

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Réccupération du token dans le front
    const decodedToken = jwt.verify(token, process.env.RANDOM_SECRET_TOKEN);
    const userId = decodedToken.userId;
    //const admin = decodedToken.admin;
    req.auth = {userId};
      if (req.body.userId && req.body.userId != req.body.userId ) {
        return res.status(403).json("unauthorized request");
      } else {
        next();
      }
  } catch (error) {
    res.status(401).json({ error: "Invalid request!" });
  }
};
