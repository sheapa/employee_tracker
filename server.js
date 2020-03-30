var mysql = require('mysql');
var inquirer = require('inquirer');
var cTable = require('console.table');
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

// Select employee function.
function selectEmployee(employeeArray) {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Please select employee for ROLE reassignment',
            choices: employeeArray
        } 
    ])
};

// Decision tree following user selection from main menu.
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
            changeEmployee();
            return;
        case 'EXIT':
            exitProgram();
            return;
        default:
            return;
    }

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


//  Update employee Role
updateEmployee = async (employeeRole) => {
    connection.query
    ('UPDATE employee_data SET role_id = ?', 
    [   
        employeeRole.role, 
    ], 
    (err, results) => {
        if (err) throw err;
    });
}

// Request full list of employees from employee_db.
// employeeQuery = async () => {
//     connection.query ("SELECT id, CONCAT(first_name, ' ', last_name) as name FROM employee_data", [],
//     (err, res) => {
//         if (err) throw err;
//         return res;
//     });
// }
employeeQuery = (mello) => {
    connection.query ("SELECT id, CONCAT(first_name, ' ', last_name) as name FROM employee_data", [],
    (err, res) => {
        if (err) throw err;
        mello(res);
    });
}
employeeQuery = (roleQuery) => {
    connection.query ("SELECT id, CONCAT(title, ' ', id) as role FROM role_data", [],
    (err, res) => {
        if (err) throw err;
        roleQuery(res);
    });
}


addDepartment = () => {
    console.log('New Department Success...')
}
addRole = () => {
    console.log('New Role Success...')
}

viewAll = () => {
    console.table();
}

exitProgram = () => {
    console.log("Thank you for choosing SHEAPA employee tracker system! Have a great day!")
    connection.end();
}

// Logic for managing add employee function and employee data insert.
async function addEmployee() {
    try {
        let employeeData = await employeeQuest();
        await insertEmployee(employeeData);
        // Returns user to main menu to select next action.
        await init();
    } catch(err) {
        console.log(err);
    }
}


// Logic for managing update employee action.
async function changeEmployee() {
    try {
        const doStuffEmployee = (employeeList) => {
            const formattedEmployeeList = employeeList.map((employee) => {
                return employee.name;
            })
            selectEmployee(formattedEmployeeList);
        };
        let employeeArray =  employeeQuery(doStuffEmployee);
       
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