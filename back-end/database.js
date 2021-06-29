const mysql = require('mysql2');
const password = process.env.SQL_PASSWORD;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password,
    database: 'silkroad'
});

module.exports = db;