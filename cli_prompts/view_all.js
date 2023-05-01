// View all employees in the db
const db = require("../connections/connection.js");

const department = (col1, table) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT id,?? FROM ??", [col1, table], function (err, results) {
      if (err) {
        throw err;
      } else {
        console.log("");
        console.log(results);
        resolve(results);
      }
    });
  });
};

const role = (col1, col2, table) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT id,??,?? FROM ??",
      [col1, col2, table],
      function (err, results) {
        console.log("");
        resolve(results);
      }
    );
  });
};

const employee = (col1, col2, table) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT id,??,?? FROM ??",
      [col1, col2, table],
      function (err, results) {
        // console.log("");
        resolve(results);
      }
    );
  });
};

module.exports = { department, role, employee };
