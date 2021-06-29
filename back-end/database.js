const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'password',
    database: 'silkroad'
});

module.exports = db;