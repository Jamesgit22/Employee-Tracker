const db = require("../connections/connection");
const inquirer = require("inquirer");

// Get current list of employees
const getEmpList = () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT first_name FROM employee", (err, results) => {
        err ? reject(err) : resolve(results.map((result) => result.first_name));
      });
    });
  };

  // Get current list of roles
const getRoleList = () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT title FROM role", (err, results) => {
        err ? reject(err) : resolve(results.map((result) => result.title));
      });
    });
  };

 
// Update an employee's role
const updateRole = () => {
    return new Promise(async (resolve, reject) => {
    const empList = await getEmpList();
    const roleList = await getRoleList();
      inquirer
        .prompt([
          {
            type: "list",
            message: "Which employee would you like to update?",
            choices: empList,
            name: "emp",
          },
          {
            type: "list",
            message: "Which role would you like to assign?",
            choices: roleList,
            name: "role",
          },
        ])
        .then((answers) => {
          const val1 = answers.emp;
          let val2;
          console.log(val1)
          const roleTitle = answers.role;
          console.log(roleTitle);
          
          db.query('SELECT id FROM role WHERE title = ?', roleTitle, (err, results)=>{
            if (err){
                console.log('RoleTitleErr');
            } else{
                val2 = results[0].id
                console.log(typeof(val2))
            }
            db.query('UPDATE employee SET role_id = ? Where first_name = ?', [val2, val1], (err, results)=>{
                if (err){
                    console.log('second error');
                } else {
                    resolve('Success')
                }
              })
          })          
        });
    });
  };

  module.exports = updateRole;