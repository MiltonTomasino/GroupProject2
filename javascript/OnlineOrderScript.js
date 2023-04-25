//This file will contain some code related to the Order Online section.

//global values
//determines if user wants to enable cookies
let cookiesOn = null;
//online order cookie
let onlineOrders = document.cookie;

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
function setCookie(cookieName, cookieValue, expirationDays)
{
	const d = new Date();
	d.setTime(d.getTime() + (180 * 24 * 60 * 60 * 1000));
	let expires = "expires="+d.toUTCString();
	onlineOrders = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function getCookie(cookieName)
{
	let name = cookieName + "=";
	let ca = document.cookie.split(';');
	for(let i = 0; i < ca.length; i++){
		let c = ca[i];
		while (c.charAt(0) == ' '){
		c = c.substring(1);
		}
		if (c.indexOf(name) == 0){
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function checkCookie() {
	let user = getCookie("username");
	if (user != "") { //if a visitor has come and has given their name or any sort of information
		alert("Welcome back Chinese Food Lover!");
	}
	else{
		user = prompt("What is your name?", "");
		if(user != "" && user != null) {
			setCookie("username", user);
		}
	}
} 

//checks if user is interested in an item by recording if they clicked on an input field.
function userClickOnItem(itemNumber, cookiesOn){
	if(cookiesOn){
		
	}
	else{ //does nothing if user doesn't want cookies on
		return 0;
	}
}



//obsolete functions
//removes all menu elements
function removeAllMenuElements()
{
	changeDisplay("none", "none","none","none","none","none");
}

//adds all menu elements back
function restoreDisplay()
{
	changeDisplay("block", "block" , "block" , "block", "block", "block");
}

// will change styling depending on arguments paassed in the parameter.
function changeDisplay(appetizers, dimsum, noodles, beef, desserts, drinks)
{
	document.getElementById("appetizers").style.display = appetizers;
	document.getElementById("dimsum").style.display = dimsum;
	document.getElementById("noodles").style.display = noodles;
	document.getElementById("appetizers").style.display = beef;
	document.getElementById("appetizers").style.display = desserts;
	document.getElementById("appetizers").style.display = drinks;
}

