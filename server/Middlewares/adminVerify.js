//*****  Middleware d'authentification ADMIN *********/

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Réccupération du token dans le front
    const decodedToken = jwt.verify(token, process.env.RANDOM_SECRET_TOKEN);
    const admin = decodedToken.admin;
    
    req.auth = {admin};
      if (req.body.admin && req.body.admin != req.body.admin ) {
        return res.status(403).json("Vous n'etes pas admministrateur !!");
      } else {
        next();
      }
  } catch (error) {
    res.status(401).json({ error: "Requête invalide !!" });
  }
};