var mysql = require('mysql');
var inquirer = require('inquirer');
var path = require('path');

// Define path to mysql. Local host port 3306.
const connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "root",
    database: "employee_db"
  });

// Create connection to my sql server.
connection.connect(function(err) {
if (err) throw err;
runSearch();
});

// Console prompt for user data input.
async function promptUser() {
    let answers;
    try {
        answers = await inquirer.prompt({
            type: "input",
            name: "firstName",
            message: "Please input new employee's primary name...",
        });
    } catch (error) {
        console.log(error);
    }
    
    // Send user data input to employee_db.mysql.
   connection.query('INSERT INTO employee_data (first_name) VALUES (?)', [answers.firstName], (err, results) => {
        if (err)
            throw err;
        console.log(results);
    });

    // Terminate connection to employee_db.mysql.
    connection.end();
}

// Initiates console user prompt.
promptUser();