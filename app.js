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

app.use(express.static('public'));
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.get('/HomePage', (req, res) => {
    res.sendFile(path.join(__dirname, 'HomePage.html'));
});

app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'menu.html'));
});

app.get('/aboutus', (req, res) => {
    res.sendFile(path.join(__dirname, 'about_us.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'registration.html'));

    app.post('/register', (req, res) => {

        const {userName, email, password, tCard, cardName, cardNum, Address, city, state} = req.body;

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
                userName: userName,
                email: email,
                password: hash,
                tCard: tCard || null,
                cardName: cardName || null,
                cardNum: cardNum ? parseInt(cardNum) : null,
                Address: Address || null,
                city: city || null,
                state: state || null,
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
            const sql = `INSERT INTO userTest (${keys}) VALUES (${placeholders})`;
          
            // query to database with values as the input
            connection.query(sql, values, (err, results, fields) => {
                if (err){
                    console.log(err);
                    console.error(err);
                    res.send('Error submiting form');
                } else {
                    res.send('Form submitted sucessfully.');
                }
             });

            });
        });
        
    });

});

const port = process.env.PORT || '8080'
app.listen(port, () => console.log('server started on port: ' + port));