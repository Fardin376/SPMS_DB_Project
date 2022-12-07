const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { response } = require('express');
const path = require('path');
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('express-flash');

require('dotenv').config({ path: './.env' });


const app = express();
const port = process.env.port || 4040;

//Parsing middleware
//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Parse application/json
app.use(bodyParser.json());

//Static Files
app.use(express.static(__dirname + '../public'));

//Templating Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

app.use(session({ 
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.use(flash());
app.use(expressValidator());


//Connection Pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

//Connect to DB
pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('Connected as ID ' + connection.threadId);
});

module.exports = pool;

const routesHomepage= require('./server/routes/home');
app.use('', routesHomepage);

const routesLoginpage= require('./server/routes/login');
app.use('', routesLoginpage);

const routesRegisterpage= require('./server/routes/register');
app.use('', routesRegisterpage);

app.use("/auth", require("./server/routes/auth"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
   
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
   
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });


app.listen(port, () => console.log(`Listening on port ${port}`));