//This file will contain some code related to the Order Online section.

//contains code to work with the menu

let cookiesOn = true;


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
	}
	else{
		alert("Cookies are disabled.";
	}
		
}

//removes all menu elements
function removeAllMenuElements()
{
	changeDisplay("none", "none","none","none","none","none");
}

//adds all menu elements back
function restoreDisplay()
{
	dchangeDisplay("block", "block" , "block" , "block", "block", "block");
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

