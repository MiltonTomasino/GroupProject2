//This file will contain some code related to the Order Online section.

//contains code to work with the menu

//removes menu elements
function removeAllMenuElements()
{
	document.getElementById("vsAI").style.display = "none";
	document.getElementById("vsHuman").style.display = "none";
	document.getElementById("adjustSettings").style.display= "none";
	document.getElementById("displayControls").style.display  = "none";
	document.getElementById("returnToMenu").style.display = "none";
}

//adds menu elements back
function addAllMenuElements()
{
	document.getElementById("returnToMenu").style.display = "contents";
}

//renders all game elements
function renderGameElements()
{		
	//TODO instead of changing text upload sprite images
	//renders game elements
	//displays whether player is attacking or defending
	document.getElementById("gameDisplay").style.display = "block";
	document.getElementById("playerOne").style.display = "inline-block";
	document.getElementById("playerTwo").style.display = "inline-block";
	document.getElementById("p1Status").style.display = "block";
	document.getElementById("p2Status").style.display = "block";
	//displays how much health each player has left
	document.getElementById("p1HealthBar").style.display = "block";
	document.getElementById("p2HealthBar").style.display = "block";
	//displays player models
	document.getElementById("p1Model").style.display = "block";
	document.getElementById("p2Model").style.display = "block";
	//displays player movesets
	//during AI play player2 moveset will be visible but not interactible
	document.getElementById("p1Move").style.display = "block";
	document.getElementById("p2Move").style.display = "block";
}
//removes game elements
function removeGameElements()
{		
	document.getElementById("gameDisplay").style.display = "none";
	document.getElementById("p1Status").style.display = "none";
	document.getElementById("p2Status").style.display = "none";
	document.getElementById("p1HealthBar").style.display = "none";
	document.getElementById("p2HealthBar").style.display = "none";
	document.getElementById("p1Model").style.display = "none";
	document.getElementById("p2Model").style.display = "none";
	document.getElementById("p1Move").style.display = "none";
	document.getElementById("p2Move").style.display = "none";
	document.getElementById("demoTimer").innerHTML = "&nbsp";
	document.getElementById("p1Decision").innerHTML = "&nbsp";
	document.getElementById("p2Decision").innerHTML = "&nbsp";
}
