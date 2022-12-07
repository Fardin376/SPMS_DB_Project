const mysql = require('mysql');

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

        //user connection
        connection.query('SELECT * FROM user_login', (err, rows) => {

            //after connection is done, release it
            connection.release();

            if (!err) {
                res.render('profile');
            }
            else {
                console.log(err);
            }

            console.log(rows);
        });
    });
};