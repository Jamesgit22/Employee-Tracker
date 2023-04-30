const inquirer = require("inquirer");
const mysql = require("mysql2");
const viewSelection = require('./cli_prompts/view_all')

// Array of possible questions to ask the use?
// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role


inquirer
  .prompt([
    {
        type: 'list',
        message: 'Please select an option.',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Quit'],
        name: 'startChoice'
    },
  ])
  .then((answers) => {
    // switch statement to determine the next prompt.
    console.log(answers.startChoice);
    switch (answers.startChoice) {
        case 'View All Departments':
            console.log('1')
            viewSelection('department');
            break;
        case 'View All Roles':
            console.log('2')
            viewSelection('role');
            break;
        case 'View All Employees':
            console.log('3')
            viewSelection('employee');
            break;
        case 'Add a Department':
            console.log('4')
            break;
        case 'Add a Role':
            console.log('5')
            break;
        case 'Add an Employee':
            console.log('6')
            break;
        case 'Update an Employee Role':
            console.log('7')
            break;
        case 'Quit':
            console.log('8')
            break;
            
        
    }

    })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
