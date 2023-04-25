//This file will contain some code related to the Order Online section.

//global values

//determines if user wants to enable cookies
let cookiesOn = null;

//2D global array for menu items, do not expect to change
//for the final iteration when we need to consider backend this will also help in getting orders together.
const appItems = ["Egg Rolls", "Crab Rangoon", "Spicy Wontons","Lettuce Wraps","Pork and Shrimp Potstickers"];
const dimsumItems = [ "Char Siu Bao", "Har Gao", "Siu Mai", "Lo Bak Gai", "Lo Mai Gai"];
const noodleItems = ["Beef Chow Fun", "Dan Dan Noodles", "Beef Soup with Hand Pulled Noodles","Spicy Beef Soup with Hand Pulled Noodles","Singapore Style Curry Noodles", "Cantonese Style Wonton Soup With Hand Pulled Noodles"];
const beefItems = [ "Beef With Broccoli" , "Mongolian Beef", "Beef and Vegetable Stir Fry" , "Kung Pao Beef"];
const dessertItems = [ "Egg Custard" , "Red Bean Soup" , "Jian Dui", "Sweet Taro Soup" , "Mango Sticky Rice"];
const drinkItems =  ["Date Ginger Tea", "Bubble Tea" , "Coke", "Diet Coke" , "Sprite" , "Plum Juice", "Soy Milk", "Tsing Tao Beer"];
const menuGroups = [appItems, dimsumItems, noodleItems, beefItems, dessertItems, drinkItems];


//this function will make an alert stating that cookies will be recorded for marketing purposes
function orderOnlineCookieNotification()
{
	if(confirm("Cookies are collected to track customer data and for marketing purposes. Would you like to keep them on?")){
		cookiesOn = true;
	}
	else {
		cookiesOn = false;
	}
	
	//tells user that cookies are on or off
	if(cookiesOn){
		alert("Cookies are enabled.");
		checkCookie();
	}
	else{
		alert("Cookies are disabled.");
	}
	
}

//necessary functions for cookie collection
//takes a name value ( expiration set for 6 months prob by default)
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

//checks if user has been here before
function checkCookie()
{
	let user = getCookie("username");
	if (user != "") { //if a visitor has come and has given their name and a recommendation
		alert("Welcome back " + user + "! Lets get some " + randomMenuItem() + " today!");
	}
	else{
		user = prompt("What is your name?", "");
		if(user != "" && user != null) {
			setCookie("username", user);
		}
	}
}

//takes a random item within the 2D menu array and returns it
function randomMenuItem()
{
	var save;
	//checks 2d array menuItem and selects a random item to return
	save = menuGroups[Math.floor(Math.random()*5)][Math.floor(Math.random()*4)]
	return save;
}

