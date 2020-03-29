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

// Main menu of user options. Inquierer choice. Select 1 option only.
function promptUser() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Add Department', 'Add Role', 'Update Employee', 'EXIT']
         } 
    ])
};

// Decision tree following user selection from main menu.
userChoice = async (answers) => { 
    switch (answers.choice) {
        case 'Add Employee':
            createEmployee();
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
        case 'EXIT':
            exitProgram();
            return;
        default:
            return;
    }

};

// Employee detail questions fired by "addEmployee()" & "updateEmployee."
function employeeQuest() {
    return inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "New employee first name... "
            },
        {
            type: "input",
            name: "lastName",
            message: "New employee last name... "
            },
        {
            type: "input",
            name: "role",
            message: "New employee role... "
            },
        {
            type: "input",
            name: "managerId",
            message: "New employee manager ID#... "
            }
    ])
};

// Send new employee data to mySQL db.
insertEmployee = async (employeeData) => {
    connection.query
        ('INSERT INTO employee_data (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', 
            [   
                employeeData.firstName, 
                employeeData.lastName,
                employeeData.role, 
                employeeData.managerId
            ], 
        (err, results) => {
                if (err) throw err;
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
exitProgram = () => {
    console.log("Thank you for choosing SHEAPA employee tracker system! Have a great day!")
    connection.end();
}

// Logic loop for managing add employee function and employee data insert.
async function createEmployee() {
    try {
        let employeeData = await employeeQuest();
        await insertEmployee(employeeData);
        // Returns user to main menu to select next action.
        await init();
    } catch(err) {
        console.log(err);
    }
}


// Async logic loop for entire application.
async function init() {
    try {
        let answers = await promptUser();
        await userChoice(answers);
    } catch(err) {
        console.log(err);
    }
}

// Initiation fucntion. Makes it go.
init();