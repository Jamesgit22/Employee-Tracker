const inquirer = require("inquirer");
const view = require("./cli_prompts/view_all.js");
const addNew = require("./cli_prompts/add_all.js");

// Array of possible questions to ask the use?
// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

const init = async () => {
  try {
    const answers = await inquirer.prompt([
      {
        type: "list",
        message: "Please select an option.",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
          "Quit",
        ],
        name: "startChoice",
      },
    ]);
    switch (answers.startChoice) {
      case "View All Departments":
        console.log("1");
        const depResults = await view.department("name", "department");
        console.table(depResults);
        break;
      case "View All Roles":
        console.log("2");
        const roleResults = await view.role("title", "salary", "role");
        console.table(roleResults);
        break;
      case "View All Employees":
        console.log("3");
        const empResults = await view.employee(
          "first_name",
          "last_name",
          "employee"
        );
        console.table(empResults);
        break;
      case "Add a Department":
        console.log("4");
        await addNew.department();
        break;
      case "Add a Role":
        console.log("5");
        await addNew.role();
        break;
      case "Add an Employee":
        console.log("6");
        // await
        break;
      case "Update an Employee Role":
        console.log("7");
        // await
        break;
      case "Quit":
        console.log("8");
        // await
        break;
    }
  } catch (err) {
    if (err) {
      throw err;
    }
  } finally {
    init();
  }
};

init();
module.exports = init;
