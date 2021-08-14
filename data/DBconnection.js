const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Hi123456",
  database: "fs1030project",
});

connection.connect(function (err){
 if (err){
     console.log(err);
 } else{
     console.log("MySQL database is connected");
 }
});

module.exports = connection;
