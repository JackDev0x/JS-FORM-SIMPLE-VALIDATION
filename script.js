const firstName = document.getElementById('FirstName');
const lastName = document.getElementById('LastName');
const password = document.getElementById('Password');
const confirmPassword = document.getElementById('ConfirmPassword');
const email = document.getElementById('Email');
//const Opis = document.getElementById('Opis');
var errorMessage = document.getElementById('error-message');
var message = "";

const form = document.getElementById('form');

const green = '#4CAF50';
const red = '#F44336';


form.addEventListener('submit', (event) => {
    

  event.preventDefault();
    if (
        validateFirstName() &&
        validateLastName() &&
        validatePassword() &&
        validateConfirmPassword() &&
        validateEmail() //&&
        //checkTextarea()
    ) {
        message = 'Login successful!';
        errorMessage.innerText = message;
        errorMessage.style.color = green;
        errorMessage.style.border = "0px solid red";
    }
    else {
        errorMessage.innerText = message;
        errorMessage.style.color = red;
        errorMessage.style.display = "block";
    }
});


function validateFirstName() {

  if (checkIfEmpty(firstName)) return;

  if (!checkIfOnlyLetters(firstName)) return;
  return true;
}
function validateLastName() {

  if (checkIfEmpty(lastName)) return;

  if (!checkIfOnlyLetters(lastName)) return;
  return true;
}
function validatePassword() {
  if (checkIfEmpty(password)) return;
  if (!containsCharacters(password, 1)) return;
  if (!meetLength(password, 8)) return;

  return true;
}
function validateConfirmPassword() {
  if (password.className !== 'valid') {
      setInvalid(confirmPassword, '*');
      if (message.includes(`The password must match\n`) == false) {
          message += `The password must match\n`;
      }
    return;
  }

  if (password.value !== confirmPassword.value) {
      setInvalid(confirmPassword, '*');
      if (message.includes(`The password must match\n`) == false) {
          message += `The password must match\n`;
      }
    return;
  } else {
    setValid(confirmPassword);
  }
  return true;
}
function validateEmail() {
  if (checkIfEmpty(email)) return;
  if (!containsCharacters(email, 2)) return;
  return true;
}

function checkIfEmpty(field) {
  if (isEmpty(field.value.trim())) {

      setInvalid(field, `*`);
      if (message.includes(`The ${field.name} field cannot be empty\n`) == false) {
          message += `The ${field.name} field cannot be empty\n`;
      }

    return true;
  } else {

    setValid(field);
    return false;
  }
}
function isEmpty(value) {
  if (value === '') return true;
  return false;
}
//function checkTextarea() {
//    if (!meetLength(Opis, 20)) return;

//    return true;
//}
function setInvalid(field, message) {
    field.className = 'invalid';
    field.style.borderColor = red;
  field.nextElementSibling.innerHTML = message;
    field.nextElementSibling.style.color = red;
    field.color = red;
}
function setValid(field) {
  field.className = 'valid';
  field.nextElementSibling.innerHTML = '';

}
function checkIfOnlyLetters(field) {
  if (/^[a-zA-Z ]+$/.test(field.value)) {
    setValid(field);
    return true;
  } else {
      setInvalid(field, `*`);
      if (message.includes(`The ${field.name} field must contain only letters\n`) == false) {
          message += `The ${field.name} field must contain only letters\n`;
      }
    return false;
  }
}
function meetLength(field, minLength) {
  if (field.value.length >= minLength) {
    setValid(field);
    return true;
  } else if (field.value.length < minLength) {
    setInvalid(
      field,
        `*`)
      if (message.includes(`The ${field.name} field must be at least ${minLength} characters long\n`) == false) {
          message += `The ${field.name} field must be at least ${minLength} characters long\n`;
      }    
    return false;
  }
    return false;
}
function containsCharacters(field, code) {
  let regEx;
  switch (code) {

    case 1:

      regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
      return matchWithRegEx(
        regEx,
        field,
        'The password must contain at least one digit\n'
          );

    case 2:

      regEx =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          return matchWithRegEx(regEx, field, 'The email address has a specific format and is not valid\n');
          
    default:
      return false;
  }
}
function matchWithRegEx(regEx, field, message2) {
  if (field.value.match(regEx)) {
    setValid(field);
    return true;
  } else {
      setInvalid(field, '*');
      if (message.includes(message2) == false) {
          message += message2;
      }
    return false;
  }
}
