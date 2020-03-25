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
});

function promptUser() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menuOptions',
            message: 'What would you like to do?',
            choices: ['View All Data', 'View By Manager', 'Update Employee']
        },
        {
            type: 'list',
            name: '',
            message: '',
            when: function(answers) {
                const selectedAnswer = answers.menuOptions;
                console.log(selectedAnswer);
                switch (selectedAnswer) {
                    case 'View All Data':
                        viewAllData();
                        return;
                    case 'View My Manager':
                        viewByManager();
                        return;
                    case 'Update Employee':
                        updateEmployee();
                        return;
                    default:
                        return;
                }
            }
        }
    ])
}

promptUser();

function viewAllData() {
    console.log('Viewing Data...');
}

function viewByManager() {
    console.log('Viewing manager data...');
}

function updateEmployee() {
    console.log('Updating employee data...');
}

// // Send user data input to employee_db.mysql.
// connection.query('INSERT INTO employee_data (first_name) VALUES (?)', [answers.firstName], (err, results) => {
//     if (err)
//         throw err;
//     console.log(results);
// });

// // Terminate connection to employee_db.mysql.
// connection.end();