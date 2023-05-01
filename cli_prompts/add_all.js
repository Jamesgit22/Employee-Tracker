const db = require("../connections/connection");
const inquirer = require("inquirer");

// Store current department names in a variable:
let departmentList;
db.query("SELECT name FROM department", (err, results) => {
  err ? console.error(err) : (departmentList = results);
  // console.log(departmentList);
});

const department = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What would you like to name the department?",
        name: "departmentName",
      },
    ])
    .then((answers) => {
      console.log(answers);
      const value = answers.departmentName;
      console.log(value);
      db.query(
        "INSERT INTO department (name) VALUES (?)",
        [value],
        (err, results) => {
          err
            ? console.log(`unable to add ${value}`)
            : console.log(`successfully added ${value}`);
        }
      );
    });
};

const role = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What would you like to name the role?",
        name: "roleName",
      },
      {
        type: "input",
        message: "What is the salary the role?",
        name: "roleSalary",
      },
      {
        type: "list",
        message: "Which department does the role belong to?",
        choices: departmentList,
        name: "roleDepartment",
      },
    ])
    .then((answers) => {
      const val1 = answers.roleName;
      const val2 = answers.roleSalary;
      const valRole = answers.roleDepartment;
      let val3;
      db.query(
        "SELECT id FROM department WHERE name = ?",
        valRole,
        (err, results) => {
          if (err) {
            throw err;
          } else {
            val3 = results[0].id;
            db.query(
              "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
              [val1, val2, val3],
              (err, results) => {
                err ? console.error(err) : console.log("success");
              }
            );
          }
        }
      );
    });
};

module.exports = { department, role };
