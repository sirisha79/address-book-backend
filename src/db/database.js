let mysql = require('mysql');
let pool;
module.exports = {
    getPool: function () {
        if (pool) return pool;
        pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'address_book_db',
            connectionLimit: 20,
            supportBigNumbers: true
        });
        return pool;
    }
};
