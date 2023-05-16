//This file will contain some code related to the Order Online section.

//global values

//determines if user wants to enable cookies
let cookiesOn = null;

//customer ID that gets stored in database
let customerID = null;

//2D global array for menu items, do not expect to change
//for the final iteration when we need to consider backend this will also help in getting orders together.
const appItems = ["Egg Rolls", "Crab Rangoon", "Spicy Wontons","Lettuce Wraps","Pork and Shrimp Potstickers"];
const dimsumItems = [ "Char Siu Bao", "Har Gao", "Siu Mai", "Lo Bak Gai", "Lo Mai Gai"];
const noodleItems = ["Beef Chow Fun", "Dan Dan Noodles", "Beef Soup with Hand Pulled Noodles","Spicy Beef Soup with Hand Pulled Noodles","Singapore Style Curry Noodles", "Cantonese Style Wonton Soup With Hand Pulled Noodles"];
const beefItems = [ "Beef With Broccoli" , "Mongolian Beef", "Beef and Vegetable Stir Fry" , "Kung Pao Beef"];
const dessertItems = [ "Egg Custard" , "Red Bean Soup" , "Jian Dui", "Sweet Taro Soup" , "Mango Sticky Rice"];
const drinkItems =  ["Date Ginger Tea", "Bubble Tea" , "Coke", "Diet Coke" , "Sprite" , "Plum Juice", "Soy Milk", "Tsing Tao Beer"];
const menuGroups = [appItems, dimsumItems, noodleItems, beefItems, dessertItems, drinkItems];

//const welcome messages
const welcomeMsg = ["Welcome back ", "Hey ", "What's going on ", "What would you like ", "Hows it going"]


//generates customer name and ID and sets them to the cookie.
function submitCustomerName()
{	
	console.log("cookies are empty");
	fname = document.getElementById("fname").value;
	lname = document.getElementById("lname").value;
	console.log("First name cookie has been set. " + fname);
	setCookie("FirstName", fname);
	console.log("Last name cookie has been set. " + lname);
	setCookie("LastName",lname);
	customerID = generateCustomerID();
	console.log("Customer ID: " + customerID);
	setCookie("customerID", customerID);
	document.getElementById("orderName").style.display = "none";
	
}
function generateCustomerID()
{
	//for testing customer id will be generated randomly.
	//functionality customer id will be +1 of the highest numbered ID in the database
	save = Math.floor(Math.random()*1000+1);
	return save;
}
function submitCookies(cookieBool)
{
	if(cookieBool == 1){
		cookiesOn = true;
		console.log("Cookies are enabled");
		document.getElementById("cookieMsg").innerHTML = "Cookies are enabled";
	}
	else
	{
		cookiesOn = false;
		console.log("Cookies are disabled");
		deleteCookie("FirstName");
		console.log("First name was deleted");
		deleteCookie("LastName");
		console.log("Last name was deleted");
		document.getElementById("cookieMsg").innerHTML = "Cookies are disabled";
	}
	document.getElementById("recordCookies").style.display = "none";
	document.getElementById("okayCookies").style.display = "block";
}
function continueToPage()
{
	document.getElementById("okayCookies").style.display = "none";
}

//necessary functions for cookie collection
//takes a name and value( expiration set for 6 months prob by default)

//test to see if more cookies with different names can be appended to this cookie.
//if not then make more cookies to store different values.
function setCookie(cookieName, cookieValue)
{
	const d = new Date();
	d.setTime(d.getTime() + (180 * 24 * 60 * 60 * 1000));
	let expires = "expires="+d.toUTCString();
	document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function getCookie(cookieName)
{
	let name = cookieName + "=";
	let cookieArray = document.cookie.split(';');
	for(let i = 0; i < cookieArray.length; i++){
		let c = cookieArray[i];
		while (c.charAt(0) == ' '){
		c = c.substring(1);
		}
		if (c.indexOf(name) == 0){
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
function deleteCookie(cookieName)
{
	document.cookie = cookieName+ "=; expires=Thu, 18 Dec 2012 12:00:00 UTC; path=/";
}
//checks if user has been here before
//obsolete
function checkUserCookie()
{
	let user = getCookie("customerID");
	if (user != "") { //if a visitor has come and has given their name and a recommendation
		console.log("there is a customerID");
		document.getElementById("orderName").style.display = "none";
		return true;
	}
	else{
		console.log("there is no customerID");
		return false;
	}
}

//takes a random item within the 2D menu array and returns it
function randomMenuItem()
{
	var save;
	//checks 2d array menuItem and selects a random item to return
	save = menuGroups[Math.floor(Math.random()*5)][Math.floor(Math.random()*4)];
	return save;
}

function randomWelcomeMsg()
{
	var save;
	//checks 2d array menuItem and selects a random item to return
	save = welcomeMsg[Math.floor(Math.random()*4)];
	return save;
}

