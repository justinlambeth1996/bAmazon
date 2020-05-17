/* Make sure you save and require the MySQL and Inquirer npm packages in your homework files--your app will need them for data input and storage.

Challenge #1: Customer View (Minimum Requirement)

Create a MySQL Database called bamazon.

Then create a Table inside of that database called products.

The products table should have each of the following columns:

item_id (unique id for each product)

product_name (Name of product)

department_name

price (cost to customer)

stock_quantity (how much of the product is available in stores)

Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names,
 and prices of products for sale.

The app should then prompt users with two messages.

The first should ask them the ID of the product they would like to buy.
The second message should ask how many units of the product they would like to buy.

Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

However, if your store does have enough of the product, you should fulfill the customer's order.

This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, show the customer the total cost of their purchase.*/

var mysql = require("mysql");
var inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    database: "bamazon"
  });
  
  connection.connect(function(err) {
    if(err) {
      console.error("Error Connection: ", err);
    }
    loadProducts();
  });
  
  function loadProducts() {
    const query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products";
    connection.query(query, (err, res) => {
      if(err) throw err;
      console.log("\n\n===============================================================================================\n");
      console.table(res);
      console.log("===============================================================================================\n\n");
      questionItem(res);
    })
  }
  
  function questionItem(products) {
    inquirer.prompt({
      type: "input",
      name: "item",
      message: "What is the ID of the item you would like to purchase?"
    }).then(answer => {
      const choice = parseInt(answer.item)
      const product = checkInventory(choice, products);
  
      if(product) {
        questionQuantity(product)
      } else {
        console.log("\nThat item does not exist in our inventory");
        loadProducts();
      }
    })
  }
  
  function questionQuantity(product) {
   inquirer.prompt({
     type: "input",
     name: "quantity",
     message: "How many would you like to purchase?"
   }).then(answer => {
     const quantity = parseInt(answer.quantity);
  
     if(quantity > product.stock_quantity) {
       console.log("\nNot enough in stock\n");
       loadProducts();
     } else {
       purchase(product, quantity);
     }
   })
  }
  
  function checkInventory(choice, products) {
    for(let i = 0; i < products.length; i++) {
      const product = products[i];
      if(product.item_id === choice) {
        return product;
      }
    }
    return null;
  }
  
  function purchase(product, quantity) {
    connection.query("UPDATE products SET stock_quantity = stock_quantity - ?, product_sold = product_sold + ? WHERE item_id = ?",
        [quantity, product.price * quantity, product.item_id],
        (err, res) => {
          if(err) throw err;
          console.log("\nYou purchased " + quantity + " " + product.product_name);
          loadProducts();
        });
  }