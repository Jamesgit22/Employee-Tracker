const db = require("../connections/connection");
const inquirer = require('inquirer');

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

module.exports = { department };
