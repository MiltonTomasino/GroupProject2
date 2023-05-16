var cardName = document.getElementById("cardName");
var cardNum = document.getElementById("cardNum");
var cvv = document.getElementById("cvv");
var expDate = document.getElementById("expDate");
var address = document.getElementById("address");
var city = document.getElementById("city");
var zip = document.getElementById("zip");
var tCard = document.getElementById("card_type");
var state = document.getElementById("state");

var boolCardName, boolCardNum, boolCVV, boolAddress, boolCity, boolIsEmpty, boolExpDate, boolZip, booltCard, boolState;

form.addEventListener('submit', (e) => {

    checkInputs();
    e.preventDefault(); // doesn't allow submission when fields are empty

    // since payment & billing is optional, everything in account info must be filled while
    // payment & billing must be either completely full and validated, or completely empty
    
    // if all account forms are validated submit form
    if (boolCardName && boolCardNum && boolCVV && boolAddress && boolCity && boolExpDate && boolZip)
    {
        document.getElementById('form').submit();

    }
    
});

// checks user inputs
function checkInputs(){

    //value from user inputs wuthout whitespace
    let cardNameValue = cardName.value;
    let cardNumValue = cardNum.value;
    let cvvValue = cvv.value;
    let dateValue = expDate.value;
    let addressValue = address.value;
    let cityValue = city.value;
    let zipValue = zip.value;
    let tCardValue = tCard.value;
    let stateValue = state.value;

    // if paying & billing is not empty, 
    // display erros to make sure all forms are filled
        if (cardNameValue === ''){

            boolCardName = false;
            setError(cardName, 'Card Name is empty');
    
        } else{
    
            boolCardName = true;
            revertClass(cardName);
        }

        if (cardNumValue === ''){

            boolCardNum = false;
            setError(cardNum, 'Card Number is empty');
    
        } else{
    
            boolCardNum = true;
            revertClass(cardNum);
        }
    
        if (cvvValue === ''){
    
            boolCVV = false;
            setError(cvv, 'CVV is empty');
    
        } else{
    
            boolCVV = true;
            revertClass(cvv);
        }
    
        if (addressValue === ''){
    
            boolAddress = false;
            setError(address, 'Address is empty');
    
        } else{
    
            boolAddress = true;
            revertClass(address);
        }
    
        if (cityValue === ''){
    
            boolCity = false;
            setError(city, 'City is empty');
    
        } else{
    
            boolCity = true;
            revertClass(city);
        }

        if (dateValue ===''){
            boolExpDate = false;
        } else {
            boolExpDate = true;
        }

        if (zipValue === ''){
            boolZip = false;
            setError(zip, 'ZIP is emty');
        } else {
            boolZip = true;
            revertClass(zip);
        }

        if (tCardValue === ''){
            booltCard = false;
            setError(tCard, 'Type is empty');

        } else {

            booltCard = true;
            revertClass(tCard);
        }

        if (stateValue === ''){
            boolState = false;
            setError(state, 'Type is empty');
            
        } else {

            boolState = true;
            revertClass(state);
        }
    
}

// shows error when validations aren't passed
function setError(input, message){

    var formControl = input.parentElement; // access class of parent 
    var small = formControl.querySelector('small'); // access small tag

    small.innerText = message; // insert message to tag

    formControl.className = 'formItem error'; // change parent's class to show error
}

// reverst errors
function revertClass(input){

    var formItem = input.parentElement; // access class of parent
    formItem.className = 'formItem'; // revert any possible errors to basic css
}
