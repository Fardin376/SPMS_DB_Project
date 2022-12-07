const mysql = require('mysql');
const router = require('../routes/login');
const body = require('body-parser');

//Connection Pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


//view Users
exports.view = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID ' + connection.threadId);
        res.render('login');

        //user connection
        /*connection.query('SELECT * FROM user_login ', (err, rows) => {

            //after connection is done, release it
            connection.release();

            if (!err) {
                res.render('login', { rows });
            }
            else {
                console.log(err);
            }

            console.log(rows);
        });
    });*/
})};