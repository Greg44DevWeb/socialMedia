const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./config/db");
const path =  require("path");
const helmet = require('helmet');

/*const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100, // limite chaque IP à 100 requêtes par window de 15min
    standardHeaders: true, // retourne l'info de limite dans les headers
    legacyHeaders: false // désactive le 'X-rateLimit-*' headers
  });*/

// Methode Express
const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
//app.use(limiter);
app.use(express.json()); //extrait le corps JSON du frontend
app.use(express.urlencoded({ extended: true }));

//***  gestion des parametres CORS - requète AJAX interdites ***//
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});


const usersRoutes = require("./Routes/users");
const postRoutes = require("./Routes/Posts");

app.use("/api/users", usersRoutes);
app.use("/api/post", postRoutes);


app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
