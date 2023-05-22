//submitOrganizerForm(event) is declared in index file submit onclick event

async function submitOrganizerForm(event) {
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

    //await to wait for response
    //fetch is used to send/receive data on a url
    //send to -'/api/register'
    const result = await fetch('/api/register', {
      method: 'POST',
      headers: {
        //to send data as JSON
        'Content-Type': 'application/json',
      }, //stringify-converts js to JSON String
      body: JSON.stringify({
        //taking all the values only
        port: 'Organisor',
        username: userNameVal,
        email: emailVal,
        password: passwordVal,
        phone: phoneVal,
      }),
      //fetch returns a promise from server as response
      //.then method-handles response
    }).then((res) => res.json()); //res.json() converts response to json

    // .then((data) => {
    //   console.log(data);//the data in previous then(res) is shown
    // })
    // .catch((error) => {
    //   console.log(error);
    // });

    if (result.status === 'ok') {
      alert('success');
    } else {
      alert(result.error); //result stores the json value returned in server
    }

    console.log(result);
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
//submitSponsorForm(event) is declared in index file submit onclick event
async function submitSponsorForm(event) {
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

    //fetch-utility provided by browswer for http calls
    //await to wait for response
    //send to -'/api/register'
    const result = await fetch('/api/register', {
      method: 'POST',
      headers: {
        //to send data as JSON
        'Content-Type': 'application/json',
      }, //stringify-converts js to JSON String
      body: JSON.stringify({
        //taking all the values only
        port: 'Sponsor',
        username: sponNameVal,
        email: sponEmailVal,
        password: sponPasswordVal,
        phone: sponPhoneVal,
      }), //fetch returns a promise to server response
      //then method to handle it
    }).then((res) => res.json()); //res.json() returns promise by JSON

    // .then((data) => {
    //   console.log(data);//the data in previous then(res) is shown
    // })
    // .catch((error) => {
    //   console.log(error);
    // });

    if (result.status === 'ok') {
      alert('success');
    } else {
      alert(result.error); //result stores the json value returned in server
    }

    console.log(result);
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

//for login request
const logform = document.getElementById('login'); //getting id from html
logform.addEventListener('submit', login); //onclick submit login func starts

async function login(event) {
  event.preventDefault();
  const username = document.getElementById('loginname').value;
  const password = document.getElementById('loginpassword').value;
  //taking values from id=loginname and password
  //fetch is used to send/receive data on a url
  const result = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());

  if (result.status === 'ok') {
    console.log('Got the Jtoken: ', result.data);
    console.log(result.port);
    //to sets JWTtoken value in the browser
    localStorage.setItem('token', result.data);

    //result.data provides res.json from /api/login
    alert('Success-Login');

    //fetch returns a promise from server as response
    //.then method-handles response
    //res.json() converts response to json

    if (result.port == 'Sponsor') {
      //to open the feed html after successful login
      //location.href is current window url
      window.location.href = window.location.href + 'brands/home.html';
    } else if (result.port == 'Organisor') {
      window.location.href = window.location.href + 'organisors/feed.html';
    }
  } else {
    alert(result.error); //result stores the json value returned in server
  }
}
