const mysql = require('mysql2');
require ('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
db.connect(function(err,result)  {
    if(err) throw(err);
    console.log('-- DB CONNECTED --');
})
module.exports = db;