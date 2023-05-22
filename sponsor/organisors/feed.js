const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const openModalBtn = document.querySelector('.btn-open');
const closeModalBtn = document.querySelector('.btn-close');

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
  console.log('Event Brief:', eventBrief);
  console.log('Number of Event Days:', days);
  console.log('Event Address:', eventAddress);
  console.log('Approx Budget:', budget);
  postfeed();
  fetchFeed();
}

function fetchFeed() {
  // API endpoint URL
  var apiUrl = 'https://random-data-api.com/api/address/random_address?size=1';

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

  // Iterate over the data and create HTML elements to display it
  data.forEach(function (item) {
    // Create a new paragraph element
    var itemElement = document.createElement('p');
    itemElement.classList.add('form__event');

    var postAuthor = document.createElement('div');
    postAuthor.classList.add('form__author');

    var authorInfo = document.createElement('div');
    var authorName = document.createElement('h1');

    authorName.textContent = 'Benjamin Leo';
    var postTime = document.createElement('small');
    postTime.textContent = '2 hours ago';
    authorInfo.appendChild(authorName);
    authorInfo.appendChild(postTime);

    postAuthor.appendChild(authorInfo);
    itemElement.appendChild(postAuthor);
    // itemElement.textContent =

    // Concatenate the event details
    const eventName = document.getElementById('eventName').value;
    const eventStartDate = document.getElementById('eventStartDate').value;
    const eventEndDate = document.getElementById('eventEndDate').value;
    const eventBrief = document.getElementById('eventBrief').value;
    const days = calculateDays(eventStartDate, eventEndDate);
    const eventAddress = document.getElementById('eventAddress').value;
    const budget = document.getElementById('budget').value;
    var container = document.getElementById('post-container');

    // Iterate over the data and create HTML elements to display it
    data.forEach(function (item) {
      // Create a new paragraph element
      var itemElement = document.createElement('div');
      itemElement.classList.add('form__event');

      // Concatenate the event details
      const content = `<p>Event Name: ${eventName}</p>
                   <p>Event Start Date: ${eventStartDate}</p>
                   <p>Event End Date: ${eventEndDate}</p>
                   <p>Number of days: ${days}</p>
                   <p>Event Details: ${eventBrief}</p>
                   <p>Proposed Budget: ${budget}</p>
                   <p>Event Address: ${eventAddress}</p>`;

      // Create accept and delete buttons
      var acceptButton = document.createElement('button');
      acceptButton.textContent = 'Accept';
      acceptButton.classList.add('btn-accept');
      acceptButton.style.backgroundColor = 'green';
      acceptButton.style.color = 'white';
      acceptButton.style.marginRight = '50px';
      acceptButton.style.padding = '15px 30px';
      acceptButton.style.borderRadius = '4px';
      acceptButton.style.border = 'none';
      acceptButton.style.cursor = 'pointer';

      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('btn-delete');
      deleteButton.style.backgroundColor = 'red';
      deleteButton.style.color = 'white';
      deleteButton.style.padding = '15px 30px';
      deleteButton.style.borderRadius = '4px';
      deleteButton.style.border = 'none';
      deleteButton.style.cursor = 'pointer';

      // Append buttons and content to the item container
      itemElement.appendChild(acceptButton);
      itemElement.appendChild(deleteButton);
      itemElement.innerHTML += content;

      // Append the new element to the container
      container.appendChild(itemElement);
    });

    closeModal();
  });
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
}

async function postfeed(e) {
  const eventName = document.getElementById('eventName').value;
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
      eventBrief,
      eventAddress,
      budget,
    }),
  }).then((res) => res.json());
  console.log('res', result);
  console.log(result.status);
}
