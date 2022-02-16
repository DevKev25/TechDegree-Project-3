let nameInput= document.getElementById('name');
nameInput.focus(); 


/* "Job Role" Section
in this section, an text bar appears when the user selects 'other' as a job role
*/

let otherJob = document.getElementById('other-job-role')
otherJob.style.display = 'none';

let title = document.getElementById("title");
title.addEventListener("change", titleTest);

function titleTest(){
  otherJob.style.display = 'none';
  let jobTitle = title.options[title.selectedIndex].text;

  if (jobTitle === 'Other'){
    otherJob.style.display = 'block';
  }
};

/* "T-Shirt Info" section:
In this section, shirt colors are designated the its specific design once the user selects a theme.
*/

const chooseDesign = document.getElementById('design');
const chooseColor = document.getElementById('color')
const selectColorOptions = document.getElementById("color").options;
chooseColor.hidden = false;

chooseDesign.addEventListener('change', chooseColors);

for (let i = 0; i < selectColorOptions.length; i++) {
    chooseColor[i].hidden = true
}
    

function chooseColors() {
        
        if (chooseDesign.value === 'js puns') {
            chooseColor[0].hidden = true;
            chooseColor[1].hidden = false;
            chooseColor[2].hidden = false;
            chooseColor[3].hidden = false;
            chooseColor[4].hidden = true;
            chooseColor[5].hidden = true;
            chooseColor[6].hidden = true;

        } else if (chooseDesign.value === 'heart js') {
            
            chooseColor[0].hidden = true;
            chooseColor[1].hidden = true;
            chooseColor[2].hidden = true;
            chooseColor[3].hidden = true;
            chooseColor[4].hidden = false;
            chooseColor[5].hidden = false;
            chooseColor[6].hidden = false;
        } else if (chooseDesign.value === 'Select Theme') {
            chooseColor[0].hidden = false;
            chooseColor[1].hidden = true;
            chooseColor[2].hidden = true;
            chooseColor[3].hidden = true;
            chooseColor[4].hidden = true;
            chooseColor[5].hidden = true;
            chooseColor[6].hidden = true;
          }
 }



 /* "Register for Activities" section
 In this section, a total price was added just under the activities selection.
 Also, time conflict between activities has been fixed.
 */

 let registerActivities = document.querySelector(".activities");
 let checkboxes = document.querySelectorAll('input[type=checkbox]');
 let value = 0;
 let changeWarning = document.createElement('h2');
 let totalCostLabel = document.createElement('h2');
 let total = document.createElement('h2');

 

for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', (e) => {
        let clicked = e.target;
        let dateTime = clicked.getAttribute('data-day-and-time');
        let price = clicked.getAttribute('data-cost');

        if (clicked.checked){
            value += parseInt(price);
            checkboxError()
        } else {
            value -= parseInt(price);
        }

        for (let i = 0; i < checkboxes.length; i++) {
            const selectedItems = checkboxes[i];
            const selectedTime = selectedItems.getAttribute('data-day-and-time')

            if (dateTime === selectedTime && clicked.name != selectedItems.name && clicked.checked){
                selectedItems.disabled = true
                selectedItems.parentNode.style.color = "grey"
            } else if (!clicked.checked){
                selectedItems.disabled = false
                selectedItems.parentNode.style.color = "black"
            }
        }

        totalCost(value);
    })
}

function totalCost() {
    changeWarning.innerHTML = '';
    totalCostLabel.innerHTML = ('Your Total Cost Will Be:');
    total.innerHTML = ('$' + value);
    registerActivities.appendChild(totalCostLabel);
    registerActivities.appendChild(total);
}

/* "Payment Info" section
When the user selects any payment, its designated method shows on the page.
*/

const paymentMethod = document.getElementById('payment');
const credidCardDiv = document.getElementById('credit-card');
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');



addEventListener('load', (e) => {
    credidCardDiv.hidden = false;
    paypalDiv.hidden = true;
    bitcoinDiv.hidden = true;
    paymentMethod[0].hidden = false;
    paymentMethod[1].selected = true;
});

paymentMethod.addEventListener('change', (e) => {
    const eTarget = e.target.value
    if (eTarget === paymentMethod[1].value) {
        credidCardDiv.hidden = false;
        paypalDiv.hidden = true;
        bitcoinDiv.hidden = true;
        mustBeCorrect = 5;
    } else if (eTarget === paymentMethod[2].value) {
        credidCardDiv.hidden = true;
        paypalDiv.hidden = false;
        bitcoinDiv.hidden = true;
        mustBeCorrect = 3;
    } else if (eTarget === paymentMethod[3].value) {
        credidCardDiv.hidden = true;
        paypalDiv.hidden = true;
        bitcoinDiv.hidden = false;
        mustBeCorrect = 3;
    } else if (eTarget === paymentMethod[0].value) {
        credidCardDiv.hidden = true;
        paypalDiv.hidden = true;
        bitcoinDiv.hidden = true;
        mustBeCorrect = 3;
    }
})

/* "Form Validation" section 
This next functions make sure that the user's input is correct. it notifies the user if fields need input.

*/

const form = document.querySelector("form")
const emailAddress = document.getElementById('email');
const cardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const registerBtn = document.querySelector('button[type=submit]');
let totalCorrect = 0
let mustBeCorrect = 6
let checkCounter = 0

form.addEventListener('submit', (e) => {
    e.preventDefault(nameInput);
    e.preventDefault(emailAddress);
    e.preventDefault(cardNumber);
    e.preventDefault(zipCode);
    e.preventDefault(cvv);
})

registerBtn.addEventListener('click', (e) => {
    if (credidCardDiv.hidden == false) {
        let numCheck = cardNumber.value;
        let zipCheck = zipCode.value;
        let cvvCheck = cvv.value;

        if (numCheck.length  < 13 || numCheck.length  > 16) {
            alert(" Please enter a card number that is between 13 and 16 digits long.");
        }
        
        if (zipCheck.length != 5) {
            alert('Sorry your zip is invalid. Please enter a valid zip code');
        }
        
        if (cvvCheck.length != 3) {
            alert('Please enter a valid CVV Number');
        }
    }
   
    changeWarning.innerHTML = '';

    if (totalCorrect === mustBeCorrect) {
        alert('Congratulations, we hope you enjoy your purchase!');
        location.reload();

        if (paymentMethod.value === paymentMethod[0].value) {
            alert('Please choose payment method');
        }
    } else {
        alert('Please make sure all fields are correctly filled.');
        if (checkCounter <= 0) {
            registerActivities.appendChild(changeWarning);
            changeWarning.innerHTML = 'You need to select at least 1 activity';
        }
    }
})

//This section makes sure that the the format in every field is correct.

nameInput.addEventListener('blur', nameError);
emailAddress.addEventListener('blur', emailError);
cardNumber.addEventListener('blur', ccnError);
zipCode.addEventListener('blur', zipError);
cvv.addEventListener('blur', cvvError);

let nameCheck = document.getElementById('name-check')
let emailCheck = document.getElementById('email-check')
let cardCheck = document.getElementById('card-check')
let zipCheck = document.getElementById('zip-check')
let cvvCheck = document.getElementById('cvv-check')
nameCheck.style.display = 'none'
emailCheck.style.display = 'none'
cardCheck.style.display = 'none'
zipCheck.style.display = 'none'
cvvCheck.style.display = 'none'

let invalidName = document.getElementById('name-hint');
let invalidEmail = document.getElementById('email-hint')
let invalidCard = document.getElementById('cc-hint')
let invalidZip = document.getElementById('zip-hint')
let invalidCvv = document.getElementById('cvv-hint')


function nameError() {
    
    let nameRegex = (/^[a-zA-Z]{2,30}/);
    let nameResult = false;
    if (nameRegex.test(nameInput.value)) {
     nameResult = true;
    } if (nameResult == true) {
     nameInput.style.borderColor = "green";
     invalidName.style.display = 'none'
     nameInput.style.borderWidth = '1.5px';
     totalCorrect += 1
     nameCheck.style.display = 'unset'
     
    } else if (nameResult == false) {
     nameCheck.style.display = 'none'
     invalidName.style.display = 'unset'
     nameInput.style.borderColor = "red";
     nameInput.style.borderWidth = '2px';
    
    }
    
}

function emailError() {
    let emailRegex = (/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)
    let emailResult = false;
    if (emailRegex.test(emailAddress.value)) {
        emailResult = true;
    } if (emailResult == true) {
            emailAddress.style.borderColor = "green";
            emailCheck.style.display = 'unset'
            invalidEmail.style.display = 'none'
            emailAddress.style.borderWidth = '1.5px';
            totalCorrect += 1
    } else if (emailResult == false) {
        emailAddress.style.borderColor = "red";
        invalidEmail.style.display = 'unset'
        emailCheck.style.display = 'none'
        emailAddress.style.borderWidth = '2px';
    }
}

function ccnError() {
    let ccnRegex = (/^[1-9][0-9]{12,15}$/)
    let ccnResult = false;
    if (ccnRegex.test(cardNumber.value)) {
        ccnResult = true
    } if (ccnResult == true) {
        cardNumber.style.borderColor = 'green';
        invalidCard.style.display = 'none'
        cardCheck.style.display = 'unset'
        cardNumber.style.borderWidth = '1.5px';
        
        totalCorrect += 1
    } else if (ccnResult == false) {
        cardNumber.style.borderColor = "red";
        invalidCard.style.display = 'unset'
        cardCheck.style.display = 'none'
        cardNumber.style.borderWidth = '2px';
    }
}

function zipError() {
    let zipRegex = (/(\d{5})/);
    let zipResult = false;
    if (zipRegex.test(zip.value)) {
        zipResult = true;
    } if (zipResult == true) {
        zipCode.style.borderColor = 'green'
        invalidZip.style.display = 'none'
        zipCheck.style.display = 'unset'
        zipCode.style.borderWidth = '1.5px';
        totalCorrect += 1
    } else if (zipResult == false) {
        zipCode.style.borderColor = 'red'
        invalidZip.style.display = 'unset'
        zipCheck.style.display = 'none'
        zipCode.style.borderWidth = '2px';
    }
}


function cvvError() {
    let cvvRegex = (/^[0-9]{3,4}$/)
    let cvvResult = false;
    if (cvvRegex.test(cvv.value)) {
        cvvResult = true;
    } if (cvvResult == true) {
        cvv.style.borderColor = "green"
        invalidCvv.style.display = 'none'
        cvvCheck.style.display = 'unset'
        cvv.style.borderWidth = '1.5px';
        totalCorrect += 1
    } else if (cvvResult == false) {
        cvv.style.borderColor = 'red'
        invalidCvv.style.display = 'unset'
        cvvCheck.style.display = 'none'
        cvv.style.borderWidth = '2.5px';
    }
}

//This function serves to make sure that at least one activity has been chosen

function checkboxError() {
    for (let i = 0; i < checkboxes.length; i++ ) {
        if (checkboxes[i].checked){
            checkCounter += 1;
        }
    }
    if (checkCounter == 1) {
        totalCorrect += 1
    }
}
