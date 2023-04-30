// View all employees in the db
const db = require('../connections/connection.js');

const viewSelection = (table) => {
db.query('SELECT * FROM ??', table, function (err, results) {
    console.log(results);
    return results;
});
};

module.exports = viewSelection;