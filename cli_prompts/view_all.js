// View all employees in the db
const db = require('../connections/connection.js');

const department = (col1, table) => {
db.query('SELECT id,?? FROM ??', [col1, table], function (err, results) {
    console.log('');
    console.table(results);
    return results;
});
};

const role = (col1, col2, table) => {
    db.query('SELECT id,??,?? FROM ??', [col1, col2, table], function (err, results) {
        console.log('');
        console.table(results);
        return results;
    });
    };

const employee = (col1, col2, table) => {
    db.query('SELECT id,??,?? FROM ??', [col1, col2, table], function (err, results) {
        console.log('');
        console.table(results);
        return results;
    });
    };

module.exports = { department, role, employee}