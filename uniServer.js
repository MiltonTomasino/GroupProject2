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
    user: 'root', // insert your user
    password: 'ks05AD033631!', // insert your password
    database: 'RestaurantDB' // insert your database
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected to database.')

    // Thomas customer's database test functions
    /*Test functions*/
	//modifyData('100000001','firstname', 'Liana');
	//insertData('100000008, 'Brandon', 'Quismorio');
	populateDatabase();
	
	connection.query("SELECT * FROM customers", function (err, result, fields) {
		if(err) throw err;
		console.log(result);
	});
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

app.get('/register', (req, res) => {
    res.render('registration');
});

app.post('/register', (req, res) => {

        const {firstName, lastName, email, password, tCard, cardName, address, city, state, expDate} = req.body;

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
                expDate: expDate || null
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
            console.log(email);
            userEmail = email;
            LogErr = true;
            req.session.userId = 'logged in';
            console.log(req.session.userId);
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
    res.redirect('/');
});

// Alpha Additions
// Dynamic Loading of Sub-Menu Pages

// route to serve Appetizers HTML
app.get('/apps', (req, res) => {
    // res.sendFile(path.join(__dirname, 'public/menu_items/Appetizers.html'));
    res.render('./public/menu_items/Appetizers', {userID: req.session.userID});
});

// route to handle GET requests to the Appetizers page. 
app.get('/api/apps', (req, res) => {
    let sql = "SELECT * FROM MenuItems WHERE category = 'appetizers'";      // retrieve relevant items from DB
    let query = connection.query(sql, (err, results) => {
            if (err) throw err;

            // Send the data as a JSON
            res.json(results);
    });
});

// route to serve Beef HTML
app.get('/beef', (req, res) => {
    res.render('./public/menu_items/Beef', {userID: req.session.userID});
});

// route to handle GET requests to the Beef page. 
app.get('/api/beef', (req, res) => {
    let sql = "SELECT * FROM MenuItems WHERE category = 'beef'";            // retrieve relevant items from DB
    let query = connection.query(sql, (err, results) => {
            if (err) throw err;

            // Send the data as a JSON
            res.json(results);
    });
});

// route to serve Dim Sum HTML
app.get('/dim_sum', (req, res) => {
    // res.sendFile(path.join(__dirname, 'public/menu_items/Dim_Sum.html'));
    res.render('./public/menu_items/Dim_Sum', {userID: req.session.userID});
});

// route to handle GET requests to the Beef page. 
app.get('/api/dim_sum', (req, res) => {
    let sql = "SELECT * FROM MenuItems WHERE category = 'dim sum'";            // retrieve relevant items from DB
    let query = connection.query(sql, (err, results) => {
            if (err) throw err;

            // Send the data as a JSON
            res.json(results);
    });
});

// route to serve Noodles HTML
app.get('/noodles', (req, res) => {
    // res.sendFile(path.join(__dirname, 'public/menu_items/Noodles.html'));
    res.render('./public/menu_items/Noodles', {userID: req.session.userID});
});

// route to handle GET requests to the Beef page. 
app.get('/api/noodles', (req, res) => {
    let sql = "SELECT * FROM MenuItems WHERE category = 'noodles'";            // retrieve relevant items from DB
    let query = connection.query(sql, (err, results) => {
            if (err) throw err;

            // Send the data as a JSON
            res.json(results);
    });
});

// route to serve Desserts HTML
app.get('/desserts', (req, res) => {
    // res.sendFile(path.join(__dirname, 'public/menu_items/Desserts.html'));
    res.render('./public/menu_items/Desserts', {userID: req.session.userID});
});

// route to handle GET requests to the Beef page. 
app.get('/api/desserts', (req, res) => {
    let sql = "SELECT * FROM MenuItems WHERE category = 'desserts'";            // retrieve relevant items from DB
    let query = connection.query(sql, (err, results) => {
            if (err) throw err;

            // Send the data as a JSON
            res.json(results);
    });
});

// route to serve Drinks HTML
app.get('/drinks', (req, res) => {
    // res.sendFile(path.join(__dirname, 'public/menu_items/Drinks.html'));
    res.render('./public/menu_items/Drinks', {userID: req.session.userID});
});

// route to handle GET requests to the Beef page. 
app.get('/api/drinks', (req, res) => {
    let sql = "SELECT * FROM MenuItems WHERE category = 'drinks'";            // retrieve relevant items from DB
    let query = connection.query(sql, (err, results) => {
            if (err) throw err;

            // Send the data as a JSON
            res.json(results);
    });
});

// Thomas Additions

//populates database with some customer names.
let populateDatabase = () => {
	let query = 'INSERT INTO customers (customerID, firstname, lastname) VALUES ?;' ;
	let values = [ 
		[ '100000002', 'Alpha', 'Diallo'],
		[ '100000003', 'Tong', 'Lin'],
		[ '100000004', 'Milton' , 'Tomasino'],
		[ '100000005', 'William', 'Bercasio'],
		[ '100000006', 'Montemayor', 'Lanuzo']
	];
	
	connection.query(query, [values], (err, rows) => {
		if(err) throw err;
		console.log("Data inserted successfully");
	});
};

//default adds just the customerID for the order and leaves the rest blank 
let insertData = (customerID, firstname, lastname, address, email, phone, cookiedata) => {
	let query = 'INSERT INTO customers (customerID, firstname, lastname, address, email, phone, cookiedata) VALUES ?;' ;
	let values = [[ customerID, firstname, lastname, address, email, phone, cookiedata]];
	connection.query(query, [values], (err, rows) => {
		if(err) throw err;
		console.log("Data inserted successfully");
	});
};

//modifies data by taking the primary customerID key and passing the column and columndata as args to modify.
let modifyData = (customerID, columnToModify, columnData) => {
	let query = 'UPDATE customers SET ' + columnToModify  + '=' + '\'' + columnData + '\'' + 'WHERE customerID='+ '\'' + customerID + '\'';
	console.log(query);
	
	
	connection.query(query, function(err, result){
		if(err) throw err;
		console.log(result.affectedRows + " records updated.");
	});
	
};



// Port Setup
const port = process.env.PORT || '8080'
app.listen(port, () => console.log('server started on port: ' + port));