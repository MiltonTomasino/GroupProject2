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
	save = Math.floor(Math.random()*100000000000+1);
	return save;
}
function submitCookies(cookieBool)
{
	if(cookieBool == 1){
		cookiesOn = true;
		console.log("Cookies are enabled");
		saveInterestedItems();
		setCookie("saveCookies", 1);
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
//checks if user has been here before by checking unique customer id cookie thats generated regardless of whether a user has entered their name
function checkUserCookie()
{
	let user = getCookie("customerID");
	if (user != "") { //if a visitor has come before turns off the overlay div.
		console.log("there is a customerID");
		document.getElementById("orderName").style.display = "none";
		return true;
	}
	else{
		console.log("there is no customerID");
		return false;
	}
}

//checks if user wants to save cookies based on if they clicked yes or no
function checkSaveCookie()
{
	let save = getCookie("saveCookies");
	if (save != "") { //if a visitor has come before and wanted to save cookies it'll turn off that popup
		let msg = randomWelcomeMsg() + getCookie("FirstName") + " " + getCookie("LastName") + ". Lets get some " + randomMenuItem() + " today!";
		console.log("cookies are being saved");
		saveInterestedItems();
		console.log("items are being saved");
		document.getElementById("recordCookies").style.display = "none";
		document.getElementById("cookieMsg").innerHTML = msg;
		document.getElementById("okayCookies").style.display = "block";
		return true;
	}
	else{
		console.log("cookies aren't being saved.");
		return false;
	}
}
//if cookies are enabled this will add event listeners to every menu item to track user interaction
function saveInterestedItems()
{
	//event listeners for appetizers
	document.getElementById("ER_Number").addEventListener("click" , function() { setCookie( menuGroups[0][0] , true) } );
	document.getElementById("CR_Number").addEventListener("click" , function() { setCookie( menuGroups[0][1] , true) } );
	document.getElementById("SW_Number").addEventListener("click" , function() { setCookie( menuGroups[0][2] , true) } );
	document.getElementById("LW_Number").addEventListener("click" , function() { setCookie( menuGroups[0][3] , true) } );
	document.getElementById("PSP_Number").addEventListener("click" , function() { setCookie( menuGroups[0][4]  , true) } );
	
	//event listeners for dimsum
	document.getElementById("CSB_Number").addEventListener("click" , function() { setCookie( menuGroups[1][0]  , true) } );
	document.getElementById("HGNumber").addEventListener("click" , function() { setCookie( menuGroups[1][1], true) } );
	document.getElementById("SM_Number").addEventListener("click" , function() { setCookie( menuGroups[1][2] , true) } );
	document.getElementById("LBG_Number").addEventListener("click" , function() { setCookie( menuGroups[1][3] , true) } );
	document.getElementById("LMG_Number").addEventListener("click" , function() { setCookie( menuGroups[1][4] , true) } );
	
	//event listeners for noodles
	document.getElementById("BeefChowFun_Number").addEventListener("click" , function() { setCookie( menuGroups[2][0]  , true) } );
	document.getElementById("DanDan_Number").addEventListener("click" , function() { setCookie( menuGroups[2][1], true) } );
	document.getElementById("BeefSoupNoodles_Number").addEventListener("click" , function() { setCookie( menuGroups[2][2] , true) } );
	document.getElementById("SpicyBeefSoupNoodles_Number").addEventListener("click" , function() { setCookie( menuGroups[2][3] , true) } );
	document.getElementById("SingaporeNoodles_Number").addEventListener("click" , function() { setCookie( menuGroups[2][4] , true) } );
	document.getElementById("WontonNoodles_Number").addEventListener("click" , function() { setCookie( menuGroups[2][5] , true) } );
	
	//event listeners for beef
	document.getElementById("BroccoliBeef_Number").addEventListener("click" , function() { setCookie( menuGroups[3][0]  , true) } );
	document.getElementById("MongolianBeef_Number").addEventListener("click" , function() { setCookie( menuGroups[3][1], true) } );
	document.getElementById("VegetableStirfryBeef_Number").addEventListener("click" , function() { setCookie( menuGroups[3][2] , true) } );
	document.getElementById("KungpaoBeef_Number").addEventListener("click" , function() { setCookie( menuGroups[3][3] , true) } );
	
	//event listeners for desserts
	document.getElementById("CustardTartDessert_Number").addEventListener("click" , function() { setCookie( menuGroups[4][0]  , true) } );
	document.getElementById("RedBeanSoupDessert_Number").addEventListener("click" , function() { setCookie( menuGroups[4][1], true) } );
	document.getElementById("SesameBallsDessert_Number").addEventListener("click" , function() { setCookie( menuGroups[4][2] , true) } );
	document.getElementById("SweetTaroSoupDessert_Number").addEventListener("click" , function() { setCookie( menuGroups[4][3] , true) } );
	document.getElementById("MangoStickyDessert_Number").addEventListener("click" , function() { setCookie( menuGroups[4][4] , true) } );
	
	//event listeners for drinks
	document.getElementById("OolongTeaDrink_Number").addEventListener("click" , function() { setCookie( menuGroups[5][0] , true) } );
	document.getElementById("BubbleTeaDrink_Number").addEventListener("click" , function() { setCookie( menuGroups[5][1] , true) } );
	document.getElementById("CokeDrink_Number").addEventListener("click" , function() { setCookie( menuGroups[5][2] , true) } );
	document.getElementById("DietCokeDrink_Number").addEventListener("click" , function() { setCookie( menuGroups[5][3] , true) } );
	document.getElementById("SpriteDrink_Number").addEventListener("click" , function() { setCookie( menuGroups[5][4]  , true) } );
	document.getElementById("PlumDrink_Number").addEventListener("click" , function() { setCookie( menuGroups[5][5] , true) } );
	document.getElementById("SoyMilkDrink_Number").addEventListener("click" , function() { setCookie( menuGroups[5][6] , true) } );
	document.getElementById("TTBeerDrink_Number").addEventListener("click" , function() { setCookie( menuGroups[5][7] , true) } );
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
	//checks welcome msg array and selects a random message
	save = welcomeMsg[Math.floor(Math.random()*4)];
	return save;
}

