var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'bamazon_db'
})

connection.connect(function(err) {
	if (err) throw err;
});

connection.query('SELECT * FROM products', function (err, res){
	// if (err) throw err;
	for(var i=0;i<res.length;i++)
		
		{console.log("ID: " + res[i].Item_ID + " | " + "Product: " + res[i].Product_Name + " | " + "Department: " + res[i].Department_Name + " | " + "Price: $" + res[i].Price + " | " + "Stock: " + res[i].Stock_Quantity) + "\n"}
	// console.log(res);
	start();
}); // End connection.query

function start(){
inquirer.prompt([

	{name: "answer1",
    type: "list",
    message: "Please select the ID# of the product you would like to buy.",
    choices: ["ID: 1", "ID: 2", "ID: 3", "ID: 4", "ID: 5", "ID: 6", "ID: 7", "ID: 8", "ID: 9", "ID: 10"]},

    {name: "answer2",
    type: "input",
    message: "How many units would you like to buy?"}

    ]).then(function(answer) {

    connection.query('SELECT * FROM products', function (err, res){
		if (err) throw err;

		// If # of desired units are more than the amount of stock
for(var i=0; i<res.length; i++){

	if(answer.answer1 == "ID: " + res[i].Item_ID && answer.answer2 > res[i].Stock_Quantity)
		{
	console.log("\n" + "Your Product Choice..." + "\n" + answer.answer2 + " units of " + res[i].Product_Name + "\n" + "   ID: " + res[i].Item_ID + " | " + "Product: " + res[i].Product_Name + " | " + "Department: " + res[i].Department_Name + " | " + "Price: $" + res[i].Price + " | " + "Stock: " + res[i].Stock_Quantity)

	console.log("\n" + "Insufficient Supply." + "\n" + "\n" + "Not enough Stock: " + res[i].Stock_Quantity + " to fulfill order of " + answer.answer2 + " units");
		}

		//If # of desired units are less than the amount of stock
	else if(answer.answer1 == "ID: " + res[i].Item_ID && answer.answer2 < res[i].Stock_Quantity)
		{console.log("\n" + "Your Product Choice..." + "\n" + answer.answer2 + " units of " + res[i].Product_Name + "\n" + "   ID: " + res[i].Item_ID + " | " + "Product: " + res[i].Product_Name + " | " + "Department: " + res[i].Department_Name + " | " + "Price: $" + res[i].Price + " | " + "Stock: " + res[i].Stock_Quantity)

		res[i].Stock_Quantity = res[i].Stock_Quantity - answer.answer2;
		
		//Update # of stock units in DB 
	connection.query('UPDATE products SET Stock_Quantity='+res[i].Stock_Quantity+' WHERE Item_ID='+res[i].Item_ID+'', function (err, res){
		if (err) throw err;
		});

		
		console.log("\n" + "Database has been updated..." + "\n" + answer.answer2 + " units deleted from database stock" + "\n" + "   ID: " + res[i].Item_ID + " | " + "Product: " + res[i].Product_Name + " | " + "Department: " + res[i].Department_Name + " | " + "Price: $" + res[i].Price + " | " + "Stock: " + res[i].Stock_Quantity)

		var total = answer.answer2 * res[i].Price;

		console.log("\n" + "Total cost of purchase..." + "\n" + "   " + answer.answer2 + " units x $" + res[i].Price + " = $" + total+'');

		break;}} //End Else statement

});//End connection.query

    }) // End .then function

} // End start(); function











