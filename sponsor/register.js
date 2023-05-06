function submitOrganizerForm(event) {
  event.preventDefault();
  const form = document.getElementById('register-form');
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const password = document.getElementById('password');
  const cpassword = document.getElementById('cpassword');
  const userNameVal = username.value.trim();
  const emailVal = email.value.trim();
  const phoneVal = phone.value.trim();
  const passwordVal = password.value.trim();
  const cpasswordVal = cpassword.value.trim();

  if (
    nameValidate(userNameVal, username) &&
    emailValidate(emailVal, email) &&
    phoneValidate(phoneVal, phone) &&
    passwordValidate(passwordVal, password) &&
    cpasswordValidate(cpasswordVal, cpassword, passwordVal)
  ) {
    console.log('sucess');
    // form.submit(); //submit form funcionality
  } else {
    console.log('failure');
  }
}

function nameValidate(userNameVal, html) {
  if (userNameVal === '') {
    setErrorMsg(html, 'username cannot be blank');
    return false;
  } else if (userNameVal.length <= 2) {
    setErrorMsg(html, 'username min 3 character');
    return false;
  } else {
    setSuccessMsg(html);
    return true;
  }
}

function emailValidate(emailVal, html) {
  if (emailVal === '') {
    setErrorMsg(html, 'email cannot be blank');
    return false;
  } else if (!isEmail(emailVal)) {
    setErrorMsg(html, 'Not a valid email');
    return false;
  } else {
    setSuccessMsg(html);
    return true;
  }
}

function isEmail(emailVal) {
  var atSymbol = emailVal.indexOf('@');
  if (atSymbol < 1) return false;
  var dot = emailVal.lastIndexOf('.');
  if (dot <= atSymbol + 2) return false;
  if (dot === emailVal.length - 1) return false;
  return true;
}

function phoneValidate(phoneVal, html) {
  if (phoneVal === '') {
    setErrorMsg(html, 'phone number cannot be blank');
    return false;
  } else if (phoneVal.length != 10) {
    setErrorMsg(html, 'Not a valid phone num');
    return false;
  } else {
    setSuccessMsg(html);
    return true;
  }
}

function passwordValidate(passwordVal, html) {
  if (passwordVal === '') {
    setErrorMsg(html, 'password cannot be empty');
    return false;
  } else if (passwordVal.length <= 5) {
    setErrorMsg(html, 'Minimum 6 characters');
    return false;
  } else {
    setSuccessMsg(html);
    return true;
  }
}

function cpasswordValidate(cpasswordVal, html, passwordVal) {
  if (cpasswordVal === '') {
    setErrorMsg(html, 'required field');
    return false;
  } else if (passwordVal != cpasswordVal) {
    setErrorMsg(html, 'Password not matching');
    return false;
  } else {
    setSuccessMsg(html);
    return true;
  }
}

function submitSponsorForm(event) {
  event.preventDefault();
  const form = document.getElementById('register-form');
  const sponName = document.getElementById('sponName');
  const sponEmail = document.getElementById('sponEmail');
  const sponPhone = document.getElementById('sponPhone');
  const sponPassword = document.getElementById('sponPassword');
  const sponCpassword = document.getElementById('sponCpassword');
  const sponNameVal = sponName.value.trim();
  const sponEmailVal = sponEmail.value.trim();
  const sponPhoneVal = sponPhone.value.trim();
  const sponPasswordVal = sponPassword.value.trim();
  const sponCpasswordVal = sponCpassword.value.trim();

  if (
    nameValidate(sponNameVal, sponName) &&
    emailValidate(sponEmailVal, sponEmail) &&
    phoneValidate(sponPhoneVal, sponPhone) &&
    passwordValidate(sponPasswordVal, sponPassword) &&
    cpasswordValidate(sponCpasswordVal, sponCpassword, sponPasswordVal)
  ) {
    console.log('sucess');
    // form.submit(); //submit form funcionality
  } else {
    console.log('failure');
  }
}

function setErrorMsg(input, errormsgs) {
  console.log(input);
  const formControl = input.parentElement;
  console.log(formControl);
  const small = formControl.querySelector('small');
  console.log(small);
  formControl.className = 'form-control error';
  small.innerText = errormsgs;
}

function setSuccessMsg(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}
