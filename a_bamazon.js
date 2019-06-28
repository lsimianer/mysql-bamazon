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
    database: "bamazon_DB"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // connection.end();
    connection.query("SELECT * FROM products",function(err,results){
      console.log(results);
      for (let i = 0; i < results.length; i++) {
        const element = results[i];
        console.log(element.id,'ID#')
        console.log(element.product_name,'Product')
        console.log(element.department_name,'Department')
        console.log(element.customer_price,'Price')
        console.log(element.stock_quantity,'QTY in Stock')
  
      }
  
        // connection.end();
  
    })
  });