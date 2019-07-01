var  mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');
var colors = require('colors');



// var env = require("dotenv").config();


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Shamwow1!",
    database: "bamazon_DB"
  });

  connection.connect(function(error) {
    if(error) {
      console.error('error!!!', error);
      return;
    }
    console.log('We\'re connected!', connection.threadId);
    mainMenu();
  });

  function mainMenu(){
    inquirer.prompt(
    [
        {
            type: "input",
            message: "To view products enter 'products', to view low inventory enter 'alerts', to add to inventory enter 'fill', to add a new product enter 'new'.",
            name: "Menu"
        } 
        // products, alerts, fill, new
    ]).then(function (inqRes) {
        connection.query("SELECT * FROM products", function(err, res) {
          if (err) throw err;
    
          if( inqRes.Menu === "products"){ viewProd();}
 
          if( inqRes.Menu === "alerts"){ lowInv(); }

          if( inqRes.Menu === "fill"){ newInv(); }

          if( inqRes.Menu === "new"){ addProd(); }
            
          }
        )}
    )};



    function viewProd(inqRes){
        connection.query("SELECT * FROM products", function(err, res) {
            if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log("Bamazon products, firey good prices");
            console.log("Item #: ".green + res[i].id + "|" + 
                        "Product: " .underline.green+ res[i].product_name + "|" + 
                        "Department: ".underline.green + res[i].department_name + "|" + 
                        "Price: " + "$".underline.green + res[i].customer_price + "|" +
                        "In Stock: ".red.underline.green + res[i].stock_quantity);
            console.log("--------------------------------------------------------------------------------".rainbow);
              
            }
            mainMenu();
         }
    )};

    function lowInv(inqRes){
        connection.query("SELECT * FROM products WHERE stock_quantity<= 20", function(err, res) {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                console.log("Bamazon products, firey good prices");
                console.log("Item #: ".red + res[i].id + "|" + 
                            "Product: " .red+ res[i].product_name + "|" + 
                            "Department: ".red + res[i].department_name + "|" + 
                            "Price: " + "$".red + res[i].customer_price + "|" +
                            "In Stock: ".red + res[i].stock_quantity);
                console.log("--------------------------------------------------------------------------------".red);
                }
                mainMenu();
        }
    )};

    function newInv(inqRes){
        inquirer.prompt(
        [
            {
                type: "input",
                message: "Which product ID do you wish to update.",
                name: "ID"
            },
            {
                type: "number",
                message: "what is the new Stock Quantity",
                name: "newQty"   
            } 
        ]).then(function (inqRes) {
            var query = connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                    stock_quantity: inqRes.newQty
                  },
                  {
                      id: inqRes.ID
                  }    
                ],
                function(err, res) {
                  if (err) throw err;
                  console.log(res.affectedRows + " products updated!\n");
                  mainMenu();
                }
              );
          })
    }




