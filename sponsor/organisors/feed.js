const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const openModalBtn = document.querySelector('.btn-open');
const closeModalBtn = document.querySelector('.btn-close');

var Name;
var email;
window.onload = async (event) => {
  await fetch('/api/getuser', {
    method: 'POST',
    headers: {
      //to send data as JSON
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      //atoken from saved LocalStorage data
      atoken: localStorage.getItem('token'),
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      Name = res.username;
      email = res.email;
      document.getElementById('name').innerHTML = res.username;
      document.getElementById('email').innerHTML = res.email;

      fetch('/api/getAllEvents', {
        method: 'GET',
        headers: {
          // To send data as JSON
          'Content-Type': 'application/json',
          // Include any other required headers
        },
      })
        .then((response) => response.json())
        .then((response) => {
          displayData(response);
        });
    });
};

function fetchUserById(userId) {
  let url = `http://localhost:9999/api/getUserById/${userId}`;

  fetch(url, {
    method: 'GET',
    headers: {
      // To send data as JSON
      'Content-Type': 'application/json',
      // Include any other required headers
    },
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    });
}

// close modal function
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// close the modal when the close button and overlay is clicked
closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// close modal when the Esc key is pressed
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// open modal function
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
// open modal event
openModalBtn.addEventListener('click', openModal);

// Calendar functionality
function showCalendar(button) {
  const inputField = button.parentNode.querySelector('input[type="date"]');

  // Open date picker
  inputField.click();
}
// Calculate number of days
function calculateDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

  // Calculate the difference in days
  const diffDays = Math.round(Math.abs((start - end) / oneDay));

  return diffDays;
}

// Event form submission
const eventForm = document.getElementById('eventForm');
eventForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const eventName = document.getElementById('eventName').value;
  const eventStartDate = document.getElementById('eventStartDate').value;
  const eventEndDate = document.getElementById('eventEndDate').value;
  const eventBrief = document.getElementById('eventBrief').value;
  const days = calculateDays(eventStartDate, eventEndDate);
  const eventAddress = document.getElementById('eventAddress').value;
  const budget = document.getElementById('budget').value;
  var container = document.getElementById('post-container');

  // Perform further processing or submit the data to the server

  // Example: Display the entered values
  console.log('Event Name:', eventName);
  console.log('Event Start Date:', eventStartDate);
  console.log('Event End Date:', eventEndDate);
  console.log('Number of days:', days);
  console.log('Event Brief:', eventBrief);
  console.log('Number of Event Days:', days);
  console.log('Event Address:', eventAddress);
  console.log('Approx Budget:', budget);
  postfeed();
  fetchFeed();
}

function fetchFeed() {
  // API endpoint URL
  var apiUrl = 'http://localhost:9999/api/getAllEvents';

  // Make an API request
  fetch(apiUrl)
    .then(function (response) {
      // Check if the response is successful
      return response.json();
    })
    .then(function (data) {
      // Process the received data
      displayData(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Display the data on the HTML page
function displayData(data) {
  const eventName = document.getElementById('eventName').value;
  const eventStartDate = document.getElementById('eventStartDate').value;
  const eventEndDate = document.getElementById('eventEndDate').value;
  const eventBrief = document.getElementById('eventBrief').value;
  const days = calculateDays(eventStartDate, eventEndDate);
  const eventAddress = document.getElementById('eventAddress').value;
  const budget = document.getElementById('budget').value;

  var container = document.getElementById('post-container');
  while (container.firstChild) container.removeChild(container.firstChild);

  // Iterate over the data and create HTML elements to display it
  data.reverse().forEach(async function (item) {
    // Create a new paragraph element
    let userData = await fetchUserById(item.user);
    console.log(userData);
    console.log(item.user);
    var itemElement = document.createElement('p');
    itemElement.classList.add('form__event');

    var postAuthor = document.createElement('div');
    postAuthor.classList.add('form__author');

    var authorInfo = document.createElement('div');
    var authorName = document.createElement('h1');

    authorName.textContent = userData?.username ?? null;
    var postTime = document.createElement('small');
    postTime.textContent = '2 hours ago';
    authorInfo.appendChild(authorName);
    authorInfo.appendChild(postTime);

    postAuthor.appendChild(authorInfo);
    itemElement.appendChild(postAuthor);
    // itemElement.textContent =

    // Concatenate the event details
    // Create a new paragraph element
    // var itemElement = document.createElement('div');
    // itemElement.classList.add('form__event');

    // Concatenate the event details
    const content = `<p>Event Name: ${item.eventName} </p>
                   <p>Event Start Date: ${item.eventStartDate}</p>
                   <p>Event End Date: ${item.eventEndDate}</p>
                   <p>Number of days: ${item.days}</p>
                   <p>Event Details: ${item.eventBrief}</p>
                   <p>Proposed Budget: ${item.budget}</p>
                   <p>Event Address: ${item.eventAddress} </p>`;

    itemElement.innerHTML += content;

    // Create edit and delete buttons
    var buttons = document.createElement('div');

    // Edit Button
    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('btn-edit');
    // editButton.id = 'editButton';

    // Delete Button
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('btn-delete');

    // Append buttons and content to the item container
    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);
    itemElement.appendChild(buttons);

    console.log(itemElement);

    // Append the new element to the container
    container.appendChild(itemElement);
    // editButton.addEventListener('click', handleEdit);
    // function handleEdit() {
    //   // Retrieve the event details from the form
    //   const eventElement = document.querySelector('.form__event');
    //   eventElement.remove();
    //   openModal();
    // }
  });

  closeModal();
}

// function displayData(data) {
//   console.log(data);
//   var container = document.getElementById('post-container');

//   // Iterate over the data and create HTML elements to display it
//   data.forEach(function (item) {
//     var itemElement = document.createElement('p');
//     itemElement.textContent = item.full_address;
//     container.appendChild(itemElement);
//   });

//   closeModal();
// }

async function postfeed(e) {
  const eventName = document.getElementById('eventName').value;
  const eventStartDate = document.getElementById('eventStartDate').value;
  const eventEndDate = document.getElementById('eventEndDate').value;
  const days = calculateDays(eventStartDate, eventEndDate);
  const eventBrief = document.getElementById('eventBrief').value;
  const eventAddress = document.getElementById('eventAddress').value;
  const budget = document.getElementById('budget').value;

  const result = await fetch('/api/creatEvents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      atoken: localStorage.getItem('token'),
      eventName,
      eventStartDate,
      eventEndDate,
      days,
      eventBrief,
      eventAddress,
      budget,
    }),
  }).then((res) => res.json());
  console.log('res', result);
  console.log(result.status);
}
