/*
Posting only works when you type localhost:8080/register manually in the search bar. I dont know how to make it
so the .html verson works as well yet.

Posting the registration forms to database works now. Only problem is that payment information cant be included
because something is wrong with the card number datatype in the database. It says the 16 digits is out of range.
If you want to test, either don't include payment info, or exclude the cardNum.

Also, this file works under the usumption that the images, stylesheets, and javascript folders are inside
another folder called public

I recommend installing nodemon using npm. It helps with picking up errors. I learned about it from the prof's
videos on express in the canvas modules

*/




const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');

var LogErr = true;
var userEmail;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'student', // insert your user
    password: 'student', // insert your password
    database: 'restaurant' // insert your database
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected to database.')
});

app.use(session({
    secret: 'user',
    resave: false,
    saveUninitialized: true
}));

app.set('views', __dirname);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.locals.userId = req.session.userId || null;
    next();
});

app.get('/', (req, res) => {
    res.render('HomePage', {userId: req.session.userId});
});

app.get('/menu', (req, res) => {
    res.render('menu', {userId: req.session.userId});
});

app.get('/aboutus', (req, res) => {
    res.render('about_us', {userId: req.session.userId});
});

app.get('/orderonline', (req, res) => {
    res.render('orderonline', {userId: req.session.userId});
});

app.get('/faq', (req, res) => {
    res.render('faq', {userId: req.session.userId});
});

app.get('/payment', (req, res) => {
    // res.render('payment');
    res.render('payment', {
                        userId: req.session.userId, 
                        isLogin: req.session.isLogin,
                        userFirstName: req.session.userFirstName,
                        userLastName: req.session.userLastName,
                        userEmail: req.session.userEmail,
                        userAddr: req.session.userAddr,
                        userCity: req.session.userCity,
                        userState: req.session.userState,
                        userZip: req.session.userZip
                    });
});

app.post('/payment', (req, res) => {
    console.log(req.body);

    const data = {
        firstName: req.body.fname,
        lastName: req.body.lname,
        email:req.body.email,
        address: req.body.street1,
        phone: req.body.phone || null,
    };

    Object.keys(data).forEach((key) => (data[key] === null) && delete data[key]);
    const keys = Object.keys(data).join(', ');
    const placeholders = Object.values(data).map(() => '?').join(', ');
    const values = Object.values(data);
    const sql = `INSERT INTO customers (${keys}) VALUES (${placeholders})`;

    connection.query(sql, values, (err, results, fields) => {
        if (err){
            console.log(err);
            console.error(err);
            res.send('Error submiting order');
        }
    });

    res.render('orderplaced', {
                        userId: req.session.userId, 
                        isLogin: req.session.isLogin,
                        firstName: req.body.fname,
                        lastName: req.body.lname,
                        email: req.body.email,
                        add1: req.body.street1,
                        add2: req.body.street2,
                        city: req.body.city,
                        state: req.body.state,
                        zip: req.body.zip
    });

});


app.get('/register', (req, res) => {
    res.render('registration');
});

app.post('/register', (req, res) => {

        const {firstName, lastName, email, password, tCard, cardName, address, city, state, expDate, zip} = req.body;

        // salt the password by 10 char
        bcrypt.genSalt(10, function (err, salt) {
            if (err){
                console.log(err);
                return res.send('Error submitting form');
            }

            // hash the password with the salt
            bcrypt.hash(password, salt, function (err, hash) {
                if (err){
                    console.log(err);
                    return res.send('Error submitting form')
                }

            // checks to see if input is empty
            // if empty, value is null;
            const data = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hash,
                tCard: tCard || null,
                cardName: cardName || null,
                address: address || null,
                city: city || null,
                state: state || null,
                expDate: expDate || null,
                zip: zip || null
            };

            // iterate through data an delete any keys that equal null
            Object.keys(data).forEach((key) => (data[key] === null) && delete data[key]);

            // creates an array of the keys in data, and converts to string in the 'x', 'y', ... format
            const keys = Object.keys(data).join(', ');

            // creates a string of '?' separated by ',' for the # of elements in data. Used to prevent injections
            const placeholders = Object.values(data).map(() => '?').join(', ');

            // creates an array of the values from data for mysql query
            const values = Object.values(data);

            // use strings from keys and placeholders to insert data into userTests table
            const sql = `INSERT INTO newUser (${keys}) VALUES (${placeholders})`;
          
            // query to database with values as the input
            connection.query(sql, values, (err, results, fields) => {
                if (err){
                    console.log(err);
                    console.error(err);
                    res.send('Error submiting form');
                } else {
                    res.redirect('/signin');
                }
             });

            });
        });
        
});

app.get('/signin', (req, res) => {
    console.log(LogErr);
    res.render('signin', {LogCheck: LogErr});
});

app.post('/signin', (req, res) => {

    const { email, password}  = req.body;

    connection.query('SELECT * FROM newUser WHERE email = ?', [email], (err, results) => {
        if (err){
            console.log(err);
            return res.status(500).json({message: 'Internal server error'});
        }

        if (results.length === 0) {

            LogErr = false;
            res.redirect('/signin');
            
        } else {

        console.log(email);

        const hashedPassword = results[0].password;

        bcrypt.compare(password, hashedPassword, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({message: 'Internal server error'});
            } else if (!result) {

                LogErr = false;
                console.log(LogErr);
                res.redirect('/signin');
                
            } else {
            LogErr = true;
            req.session.userId = 'logged in';
            req.session.isLogin = true;
            req.session.userEmail = email;
            req.session.userFirstName = results[0].firstName;
            req.session.userLastName = results[0].lastName;
            req.session.userAddr = results[0].address;
            req.session.userCity = results[0].city;
            req.session.userState = results[0].state;
            req.session.userZip = results[0].zip;
            res.redirect('/');

            }
        });
        }
    });

});

app.get('/forgotpassword', (req, res) => {
    res.render('forgotpassword', {LogCheck: LogErr});
});

app.get('/account', (req, res) => {
    res.send('you are in account');
});

app.get('/signout', (req, res) => {
    req.session.userId = null;
    req.session.isLogin = false;
    res.redirect('/');
});

const port = process.env.PORT || '8080'
app.listen(port, () => console.log('server started on port: ' + port));
