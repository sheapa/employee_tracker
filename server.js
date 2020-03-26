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
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Add Department', 'Add Role', 'Update Employee']
        }
    ])
};

userChoice = async (answers) => { 
    switch (answers.choice) {
        case 'Add Employee':
            addEmployee();
            return;
        case 'Add Department':
            addDepartment();
            return;
        case 'Add Role':
            addRole();
            return;
        case 'View All Employees':
            viewAll();
            return;
        case 'Update Employee':
            employeeUpdate();
            return;
        default:
            return;
    }

};

addEmployee = () => {
    function promptUser() {
        return inquirer.prompt([
            {
              type: "input",
              name: "firstName",
              message: "New employee's first name?"
            }
        ])
    };

    let answers = await promptUser();
    // Send user data input to employee_db.mysql.
    connection.query('INSERT INTO employee_data (first_name) VALUES (?)', [answers.firstName], (err, results) => {
        if (err)
            throw err;
        console.log(results);
});        
};

addDepartment = () => {
    console.log('New Department Success...')
}
addRole = () => {
    console.log('New Role Success...')
}

viewAll = () => {
    console.log('All Employee Data Success...')
}

updateEmployee = () => {
    console.log('Employee MOD Success...')
}

async function init() {
    try {
        let answers = await promptUser();
        console.log(answers.choice);
        await userChoice(answers);
    } catch(err) {
        console.log(err);
    }
}

init();

// Terminate connection to employee_db.mysql.
connection.end();
