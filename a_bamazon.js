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

//   begin listing functions needed
//  first function is the main menu which will promp the customer after products are displayed.

mainMenu();
  function mainMenu(){
    connection.connect(function(err) {
      // if (err) throw err;
      console.log("connected as id " + connection.threadId);
      // connection.end();
      connection.query("SELECT * FROM products",function(err,results){
        if (err) throw err;
        console.log(results);
        for (let i = 0; i < results.length; i++) {
          console.log("Item #: " + results[i].id + "|" + 
                      "Product: " + results[i].product_name + "|" + 
                      "Department: " + results[i].department_name + "|" + 
                      "Price: " + "$" + results[i].customer_price + "|" +
                      "In Stock: " + results[i].stock_quantity);
console.log("--------------------------------------------------------------------------------");
        }  
        buyProduct();

        // connection.end();
    })
});}

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
  ]).then(function (inquirerResponse) {
    connection.query("SELECT * FROM products", function(err, results) {
      if (err) throw err;

      var shoppingCart;
          for (var i = 0; i < results.length; i++) {
            if (results[i].id === parseInt(inquirerResponse.idSelect)) {
              shoppingCart = results[i];  
            } 
          }
        if(shoppingCart.stock_quantity > parseInt(inquirerResponse.qty)){
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
            {
              stock_quantity: (shoppingCart.stock_quantity - parseInt(inquirerResponse.qty))
            },
            {
              id: shoppingCart.idSelect
            }
          ],
          function(error) {
            if (error) throw error;
              console.log("Thank you for shopping bamazon! Your neighborhood arms dealer. Your total today is " + "$" + parseInt(inquirerResponse.qty) * shoppingCart.price);
            }
          );
          } else {
            console.log("What do you need so many for? thats worrisome, were calling the feds....weirdo");
         }
      });
  });
};