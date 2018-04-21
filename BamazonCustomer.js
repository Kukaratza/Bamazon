var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('easy-table');
var colors = require('colors');
// var data =  'SELECT * FROM Products';
var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root", 
    password: "",
    database: "bamazonProducts_db"
})
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});
// Function Start
function start() {
    // Display all the products
    var t = new Table;
   
    connection.query('SELECT * FROM products', function(err, result) {
        if (err) throw err;
        console.log('\n<----------Welcome To the Bamazon! What would you like to buy?---------->\n' .magenta.bold);

        result.forEach(function(products) {
            t.cell('Product Id'.white , products.item_id)
            t.cell('Product'.white , products.product_name)
            t.cell('Department'.white , products.department_name)
            t.cell('Price'.white, products.price)
            t.cell('Quantity'.white, products.stock_quantity)
            t.newRow()
        });
        console.log(t.toString());

        inquirer.prompt([{
            name: "getId",
            type: "input",
            message: "What is the ID of the product you would like to buy?".cyan,
            // validate the value if it is empty don't move to the next prompt
            validate: function(value) {
                if (isNaN(value) == false && parseInt(value) <= result.length && parseInt(value) > 0) {
                    return true;
                } else {
                    return false;
                }
            }
        }, {
            name: "qty",
            type: "input",
            message: "How many units of the product you would like to buy?".red,
            validate: function(value) {
                if (isNaN(value) == false && parseInt(value) > 0) {
                    return true;
                } else {
                  // console.log("Please type sufficiant amout of the item you would like to buy");
                    return false;

                }
            }
        }]).then(function(pick) {
            // store total value as a variable
            var grandTotal = ((result[(pick.getId) - 1].price) * parseInt(pick.qty)).toFixed(2);

            if (result[(pick.getId) - 1].stock_quantity >= parseInt(pick.qty)) {
                //after purchase, updates quantity in Products
                connection.query("UPDATE Products SET ? WHERE ?", [
                    { stock_quantity: (result[(pick.getId) - 1].stock_quantity - parseInt(pick.qty)) },
                    { item_id: pick.getId }
                ], function(err, result) {
                    if (err) throw err;
                    console.log("\nPurchase Successful! Your total is $" + grandTotal + ".");
                    askAgain();
                });
            } else {
                console.log("Sorry! Insufficient quantity!".red);
                askAgain();
            }
        });
    });
}


function askAgain() {
    inquirer.prompt([{
        name: "more",
        type: "confirm",
        message: "Would you like to buy another item?"
    }]).then(function(pick) {
        if (pick.more) {
            start();
        } else {
            console.log("\nThank you for Shopping with us. See you soon!".red);
        }
    });
}
start();