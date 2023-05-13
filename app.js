const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: '', // insert your user
    password: '', // insert your password
    database: '' // insert your database
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected to database.')
});

app.use(express.static('public'));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.get('/HomePage', (req, res) => {
    res.sendFile(path.join(__dirname, 'HomePage.html'));
})

app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'menu.html'));
})

app.get('/aboutus', (req, res) => {
    res.sendFile(path.join(__dirname, 'about_us.html'));
})

const port = process.env.PORT || '8080'
app.listen(port, () => console.log('server started on port: ' + port));