const db = require("../connections/connection");
const inquirer = require("inquirer");

// Store current department names in a variable:
let departmentList;
db.query("SELECT name FROM department", (err, results) => {
  err ? console.error(err) : (departmentList = results);
  // console.log(departmentList);
});

// Add a new department to database
const department = () => {
  return new Promise((resolve, reject) => {
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
            if (err) {
              reject(`Unable to add ${value}: ${err.message}`);
            } else {
              resolve(`Successfully added ${value}`);
            }
          }
        );
      });
  });
};

const getDepartmentList = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT name FROM department", (err, results) => {
      if (err) {
        reject(`Error retrieving department list: ${err.message}`);
      } else {
        resolve(results.map((result) => result.name));
      }
    });
  });
};

// Add a new role to database
const role = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const departmentList = await getDepartmentList();
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
                reject(`Error retrieving department ID: ${err.message}`);
              } else {
                val3 = results[0].id;
                db.query(
                  "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
                  [val1, val2, val3],
                  (err, results) => {
                    if (err) {
                      reject(`Unable to add ${val1}: ${err.message}`);
                    } else {
                      resolve(`Successfully added ${val1}`);
                    }
                  }
                );
              }
            }
          );
        });
    } catch (err) {
      reject(`Error adding role: ${err.message}`);
    }
  });
};

module.exports = { department, role };
