var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'bamazon_db'
})


start();
function start(){
inquirer.prompt([

	{name: "answer1",
    type: "list",
    message: "Pick an option.",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]},

    ]).then(function(answer) {

//**********************************************
    //the app should list every available item: the item IDs, names, prices, and quantities
if(answer.answer1 == "View Products for Sale"){
    connection.query('SELECT * FROM products', function (err, res){
    if (err) throw err;
    
    for(var i=0;i<res.length;i++){

        console.log("ID: " + res[i].Item_ID + " | " + "Product: " + res[i].Product_Name + " | " + "Department: " + res[i].Department_Name + " | " + "Price: $" + res[i].Price + " | " + "Stock: " + res[i].Stock_Quantity) + "\n"}
    }); // End connection.query
    } //End For Loop

//**********************************************

        //it should list all items with a inventory count lower than five.
    else if(answer.answer1 == "View Low Inventory"){
    
connection.query('SELECT * FROM products', function (err, res){
        if (err) throw err;
        
        var x=0;
    for(var i=0;i<res.length;i++){
        if(res[i].Stock_Quantity <= 5){
        
        var print = "ID: " + res[i].Item_ID + " | " + "Product: " + res[i].Product_Name + " | " + "Department: " + res[i].Department_Name + " | " + "Price: $" + res[i].Price + " | " + "Stock: " + res[i].Stock_Quantity;

        console.log(print); x=x+1;}

    } // End For Loop

        if(x==0){console.log("No inventory below 5 units.");}
    
});  // End connection.query 
} //End Else If statement

//**********************************************

    else if(answer.answer1 == "Add to Inventory"){
    //your app should display a prompt that will let the manager "add more" of any item currently in the store.

    connection.query('SELECT * FROM products', function (err, res){
        if (err) throw err;

    var array = [];
    
    for(var i=0;i<res.length;i++){
        array.push("ID: " + res[i].Item_ID + " | " + "Product: " + res[i].Product_Name + " | " + "Department: " + res[i].Department_Name + " | " + "Price: $" + res[i].Price + " | " + "Stock: " + res[i].Stock_Quantity);}

inquirer.prompt([

    {name: "answer2",
    type: "list",
    message: "Pick an option.",
    choices: array},

    {name: "input",
    type: "input",
    message: "How many units do you want to add to the inventory?"
    }

    ]).then(function(answer) {

    for(var i=0;i<res.length;i++){
        
        var printTwo = "ID: " + res[i].Item_ID + " | " + "Product: " + res[i].Product_Name + " | " + "Department: " + res[i].Department_Name + " | " + "Price: $" + res[i].Price + " | " + "Stock: " + res[i].Stock_Quantity;
        
        if(answer.answer2==printTwo){

           res[i].Stock_Quantity = res[i].Stock_Quantity + parseInt(answer.input);
           
           connection.query('UPDATE products SET Stock_Quantity='+res[i].Stock_Quantity+' WHERE Item_ID='+res[i].Item_ID+'', function (err, res){
            if (err) throw err;
            }); //End connection.query 

        console.log(answer.input + " units have been added to your inventory.")
        console.log("ID: " + res[i].Item_ID + " | " + "Product: " + res[i].Product_Name + " | " + "Department: " + res[i].Department_Name + " | " + "Price: $" + res[i].Price + " | " + "Stock: " + res[i].Stock_Quantity);

        } // End For Loop
    } //End If Statement

}); // End Connection Query


}) // End .then function
} // End Else If statement

//**********************************************

    else if(answer.answer1 == "Add New Product")
    	{//it should allow the manager to add a completely new product to the store.
inquirer.prompt([

    {name: "productName",
    type: "input",
    message: "Please type in a product name."},

    {name: "departmentName",
    type: "input",
    message: "Please type in the department name."
    },

    {name: "price",
    type: "input",
    message: "Please enter in a price."
    },

    {name: "stock",
    type: "input",
    message: "Please type in the number of units available."
    }

    ]).then(function(answer) {
        var p = answer.productName;
        var d = answer.departmentName;
        var pr = parseInt(answer.price)
        var s = parseInt(answer.stock)
        
    console.log("Item added to Database")
    console.log("Product: " + p + " | " + "Department: " + d + " | " + "Price: $" + pr + " | " + "Stock: " + s)

connection.query('INSERT INTO products(Product_Name, Department_Name, Price, Stock_Quantity) VALUES("'+p+'", "'+d+'", '+pr+', '+s+')', function (err, res){
        if (err) throw err;
    }); //End connection.query         

}); // End .then function
} // End else if statement
//**********************************************

    }) // End .then function
} // End start(); function











