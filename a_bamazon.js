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

//   begin listing functions needed
//  first function is the main menu which will promp the customer after products are displayed.
connection.connect(function(error) {
  if(error) {
    console.error('error!!!', error);
    return;
  }
  console.log('We\'re connected!', connection.threadId);
  mainMenu();
});

  function mainMenu(){
      connection.query("SELECT * FROM products",function(err,res){
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
          console.log("Item #: ".green + res[i].id + "|" + 
                      "Product: " .underline.green+ res[i].product_name + "|" + 
                      "Department: ".underline.green + res[i].department_name + "|" + 
                      "Price: " + "$".underline.green + res[i].customer_price + "|" +
                      "In Stock: ".red.underline.green + res[i].stock_quantity);
          console.log("--------------------------------------------------------------------------------".rainbow);
        
        }  
        buyProduct();
    });
};

var buyProduct = function(){
  inquirer.prompt([
  {
      type: "input",
      message: "Enter the id number of the object you'd like to purchase",
      name: "idSelect"
  },
  {
      type:"number",
      message:"How many units would you like to buy?",
      name:"qty"
  },
  {
      type:"input",
      message:"Enter yes if you'd like to checkout. Enter no if you're broke",
      name:"go"
  }
  ]).then(function (inqRes) {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;

      if( inqRes.go === "yes"){

        var shoppingCart;
              for (var i = 0; i < res.length; i++) {
                if (res[i].id === parseInt(inqRes.idSelect)) {
                  shoppingCart = res[i];  
                } 
              }
            if(shoppingCart.stock_quantity > parseInt(inqRes.qty)){
              connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                {
                  stock_quantity: (shoppingCart.stock_quantity - parseInt(inqRes.qty))
                },
                {
                  id: inqRes.idSelect
                }
              ],
              function(error) {
                if (error) throw error;
                  console.log("Thank you for shopping bamazon! Your neighborhood arms dealer. Your total today is ".bgGreen.underline.black + "$".green + parseInt(inqRes.qty) * shoppingCart.customer_price);
                  connection.end();
                }
                
              );
              } else {
                console.log(" We have insufficient quantitties to fill your order. What do you need so many for? thats worrisome, were calling the feds....weirdo".bgRed);
                connection.end();
            }
      } 
      else{
        console.log("Well, I see you're not so compulsive these days, goodbye.".bgWhite.black)
        connection.end();
      }
            
      });
  });
};
  
    