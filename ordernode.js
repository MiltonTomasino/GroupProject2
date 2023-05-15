//This will contain code to test database functionality. 
var http = require('http');
var mysql = require('mysql');
var fs = require('fs');

const hostname = '127.0.0.1';
const port = 8000;

const server = http.createServer( (req,res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.end('Hello World');
});

var sqlCon = mysql.createConnection({
	//change data to whatever you need to login
	host: "localhost",
	user: "root",
	password: "sfsustudent",
	database: "testdatabase"
});
	

server.listen(port, hostname, () => {
	console.log('Server running at http://' + hostname + ':' +port);
});

sqlCon.connect(function(err) {
	if(err) throw err;
	console.log("Connected to mysql server.");
	
	/*Test functions*/
	//modifyData('100000001','firstname', 'Liana');
	//insertData('100000008, 'Brandon', 'Quismorio');
	//populateDatabase();
	
	sqlCon.query("SELECT * FROM customers", function (err, result, fields){
		if(err) throw err;
		console.log(result);
	});
});

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
	
	sqlCon.query(query, [values], (err, rows) => {
		if(err) throw err;
		console.log("Data inserted successfully");
	});
};

//default adds just the customerID for the order and leaves the rest blank 
let insertData = (customerID, firstname, lastname, address, email, phone, cookiedata) => {
	let query = 'INSERT INTO customers (customerID, firstname, lastname, address, email, phone, cookiedata) VALUES ?;' ;
	let values = [[ customerID, firstname, lastname, address, email, phone, cookiedata]];
	sqlCon.query(query, [values], (err, rows) => {
		if(err) throw err;
		console.log("Data inserted successfully");
	});
};

//modifies data by taking the primary customerID key and passing the column and columndata as args to modify.
let modifyData = (customerID, columnToModify, columnData) => {
	let query = 'UPDATE customers SET ' + columnToModify  + '=' + '\'' + columnData + '\'' + 'WHERE customerID='+ '\'' + customerID + '\'';
	console.log(query);
	
	
	sqlCon.query(query, function(err, result){
		if(err) throw err;
		console.log(result.affectedRows + " records updated.");
	});
	
};
