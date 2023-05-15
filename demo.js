const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');

// to preserve links
app.use(express.static(path.join(__dirname, 'public')));

// connect to MySQL
const db = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'ks05AD033631!',
        database:'RestaurantDB'
});

db.connect((err) => {
        if (err) throw err;
        console.log('Connected to MySQL');
});

// route test
app.get('/', (req,res) => {
        res.send('Hello World from nodemon');
});

// Dynamic Loading of Sub-Menu Pages

// route to serve Appetizers HTML
app.get('/apps', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/menu_items/Appetizers.html'));
});

// route to handle GET requests to the Appetizers page. 
app.get('/api/apps', (req, res) => {
        let sql = "SELECT * FROM MenuItems WHERE category = 'appetizers'";      // retrieve relevant items from DB
        let query = db.query(sql, (err, results) => {
                if (err) throw err;

                // Send the data as a JSON
                res.json(results);
        });
});

// route to serve Beef HTML
app.get('/beef', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/menu_items/Beef.html'));
});

// route to handle GET requests to the Beef page. 
app.get('/api/beef', (req, res) => {
        let sql = "SELECT * FROM MenuItems WHERE category = 'beef'";            // retrieve relevant items from DB
        let query = db.query(sql, (err, results) => {
                if (err) throw err;

                // Send the data as a JSON
                res.json(results);
        });
});

// route to serve Dim Sum HTML
app.get('/dim_sum', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/menu_items/Dim_Sum.html'));
});

// route to handle GET requests to the Beef page. 
app.get('/api/dim_sum', (req, res) => {
        let sql = "SELECT * FROM MenuItems WHERE category = 'dim sum'";            // retrieve relevant items from DB
        let query = db.query(sql, (err, results) => {
                if (err) throw err;

                // Send the data as a JSON
                res.json(results);
        });
});

// route to serve Noodles HTML
app.get('/noodles', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/menu_items/Noodles.html'));
});

// route to handle GET requests to the Beef page. 
app.get('/api/noodles', (req, res) => {
        let sql = "SELECT * FROM MenuItems WHERE category = 'noodles'";            // retrieve relevant items from DB
        let query = db.query(sql, (err, results) => {
                if (err) throw err;

                // Send the data as a JSON
                res.json(results);
        });
});

// route to serve Desserts HTML
app.get('/desserts', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/menu_items/Desserts.html'));
});

// route to handle GET requests to the Beef page. 
app.get('/api/desserts', (req, res) => {
        let sql = "SELECT * FROM MenuItems WHERE category = 'desserts'";            // retrieve relevant items from DB
        let query = db.query(sql, (err, results) => {
                if (err) throw err;

                // Send the data as a JSON
                res.json(results);
        });
});

// route to serve Drinks HTML
app.get('/drinks', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/menu_items/Drinks.html'));
});

// route to handle GET requests to the Beef page. 
app.get('/api/drinks', (req, res) => {
        let sql = "SELECT * FROM MenuItems WHERE category = 'drinks'";            // retrieve relevant items from DB
        let query = db.query(sql, (err, results) => {
                if (err) throw err;

                // Send the data as a JSON
                res.json(results);
        });
});




app.listen('9000');