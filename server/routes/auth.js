const express = require("express");
const authLogController = require("../controllers/loginController");
const router = express.Router();
const expressValidator = require('express-validator');

//authenticate user
router.post(authLogController, function(req, res, next) {
       
    var email = req.body.email;
    var password = req.body.password;
 
        connection.query('SELECT * FROM user_login WHERE email = ? AND password = ?', [email, password], function(err, rows, fields) {
            if(err) throw err;
             
            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'Please correct enter email and Password!');
                res.render('/login');
            }
            else { // if user found
                req.session.loggedin = true;
                //req.session.name = name;
                res.render('/profile');
 
            }            
        });
  
});

module.exports = router;