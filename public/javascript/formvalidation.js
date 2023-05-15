var form = document.getElementById("form");
var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var email = document.getElementById("email");
var password = document.getElementById("password");
var password2 = document.getElementById("password2");

// bool var to see if requirements are met in order to submit
var boolFirstName, boolPassword, boolPassword2, boolLastName, boolEmail;
var boolCardName, boolCardNum, boolCVV, boolAddress, boolCity, boolIsEmpty, boolExpDate;

// format that user inputed email and password should follow to pass validations
var emailValidate = new RegExp("^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$"); // standard email format
var passwordValidate = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{4,25})"); // atleast 1 lowercase, 1 uppercase, 1 num, 1 special char. length between 12 and 25

// var form2 = document.getElementById("form2");
var cardName = document.getElementById("cardName");
var cardNum = document.getElementById("cardNum");
var cvv = document.getElementById("cvv");
var expDate = document.getElementById("expDate");
var address = document.getElementById("address");
var city = document.getElementById("city");

// since payment and billing is optionall, all elements should be empty if not using them
// if even 1 is filled, the rest have to be filled
function isEmpty(){
    if (cardName.value !== '' || cardNum.value !== '' || cvv.value !== '' || expDate.value !== ''
        || address.value !== '' || city.value !== '')
        {
            return false;

        } else{

            return true;
        }
}


form.addEventListener('submit', (e) => {

    checkInputs();
    e.preventDefault(); // doesn't allow submission when fields are empty

    // since payment & billing is optional, everything in account info must be filled while
    // payment & billing must be either completely full and validated, or completely empty
    
    // if all account forms are validated, and payment & billing is enitrely empty, submit form
    if (boolFirstName && boolPassword && boolPassword2 & boolLastName && boolEmail && isEmpty() === true){

        document.getElementById('form').submit();

       // if payment & billing and account info passes all validations, submit form
    } else if (boolFirstName && boolPassword && boolPassword2 & boolLastName && boolEmail &&
               boolCardName && boolCardNum && boolCVV && boolAddress && boolCity && boolExpDate)
    {
        document.getElementById('form').submit();

    }
    
});

// checks user inputs
function checkInputs(){
    //value from user inputs wuthout whitespace
    let firstNameValue = firstName.value.trim();
    let lastNameValue = lastName.value.trim();
    let EmailValue = email.value.trim();
    let passwordValue = password.value.trim();
    let password2Value = password2.value.trim();

    let cardNameValue = cardName.value;
    let cardNumValue = cardNum.value;
    let cvvValue = cvv.value;
    let dateValue = expDate.value;
    let addressValue = address.value;
    let cityValue = city.value;


    // sets bool val to false if certain validations aren't met
    // shows error when validation fails
    // if validation is successful/fixed, set bool val to true and remove errors

    if (firstNameValue === ''){ // if empty
    
        boolFirstName = false;
        setError(firstName, 'First Name is empty');

    } else{

        boolFirstName = true;
        revertClass(firstName);
        
    }

    if (lastNameValue === ''){ 

        boolLastName = false;
        setError(lastName, 'Last Name is empty');

    } else{

        boolLastName = true;
        revertClass(lastName);
    }

    if (EmailValue === ''){

        boolEmail = false;
        setError(email, 'Email is empty');

    } else if (!(emailValidate.test(EmailValue))){ // if email doesn't match email standards

        boolEmail = false;
        setError(email, 'Not a valid email');

    } else{

        boolEmail = true;
        revertClass(email);
    }

    if (passwordValue === ''){

        boolPassword = false;
        setError(password, 'Password is empty');

    } else if (!(passwordValidate.test(passwordValue))){ // if password doesn't meet standards

        boolPassword = false;
        setError(password, 'Password is not strong enough');
    } else{

        boolPassword = true;
        revertClass(password);
    }

    if (password2Value === ''){

        boolPassword2 = false;
        setError(password2, 'Password is empty');

    } else if (password2Value != passwordValue){ // if passwords don't match

        boolPassword2 = false;
        setError(password2, 'Passwords do not match');

    } else if (!(passwordValidate.test(password2Value))){

        boolPassword2 = false;
        setError(password2, 'Password is not strong enough');

    } else{

        boolPassword2 = true;
        revertClass(password2);
    }

    // if paying & billing is not empty, 
    // display erros to make sure all forms are filled
    if (!(isEmpty())){

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
