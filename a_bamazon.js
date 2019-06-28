var inquirer = require('inquirer');
var  mysql = require('mysql');
// var env = require("dotenv").config();


var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Shamwow1!",
    database: "happy_db"
  });