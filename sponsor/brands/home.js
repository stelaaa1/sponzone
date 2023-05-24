// Search function
function search() {
  var input, filter, container, post, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  container = document.getElementById('post-container');
  post = container.getElementsByClassName('post');

  for (i = 0; i < post.length; i++) {
    txtValue = post[i].textContent || post[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      post[i].style.display = '';
    } else {
      post[i].style.display = 'none';
    }
  }
}
//Sponsor name and email
// window.onload = async (event) => {
//   const Buser = await fetch('/api/getuser', {
//     method: 'POST',
//     headers: {
//       //to send data as JSON
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       //atoken from saved LocalStorage data
//       atoken: localStorage.getItem('token'),
//     }),
//   }).then((res) => res.json());
//   console.log(Buser);

//   document.getElementById('name').innerHTML = Buser.username;
//   document.getElementById('email').innerHTML = Buser.email;
// };

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
          console.log(response);
          displayData(response);
        });
    });
};

// Attach event listener to search input
document.addEventListener('DOMContentLoaded', function () {
  var searchInput = document.getElementById('myInput');
  searchInput.addEventListener('keyup', search);
});

// JavaScript code to update the content dynamically

//----------------------------------------------------------------------//

// Display the data on the HTML page
function displayData(data) {
  var container = document.getElementById('post-container');
  while (container.firstChild) container.removeChild(container.firstChild);

  // Iterate over the data and create HTML elements to display it
  data.reverse().forEach(function (item) {
    // Create a new paragraph element
    var itemElement = document.createElement('p');
    itemElement.classList.add('form__event');

    var postAuthor = document.createElement('div');
    postAuthor.classList.add('form__author');

    var postContent = document.createElement('div');
    postContent.classList.add('postContent');

    var authorInfo = document.createElement('div');
    var authorName = document.createElement('h1');

    authorName.textContent = Name;
    var postTime = document.createElement('small');
    postTime.textContent = '2 hours ago';
    authorInfo.appendChild(authorName);
    authorInfo.appendChild(postTime);
    postAuthor.appendChild(authorInfo);

    postAuthor.appendChild(postContent);
    itemElement.appendChild(postAuthor);

    const content = `<p>Event Name: ${item.eventName} </p>
                   <p>Event Start Date: ${item.eventStartDate}</p>
                   <p>Event End Date: ${item.eventEndDate}</p>
                   <p>Number of days: ${item.days}</p>
                   <p>Event Details: ${item.eventBrief}</p>
                   <p>Proposed Budget: ${item.budget}</p>
                   <p>Event Address: ${item.eventAddress}</p>`;

    itemElement.innerHTML += content;

    var buttons = document.createElement('div');
    var interestedButton = document.createElement('button');
    interestedButton.classList.add('interested-button');
    interestedButton.textContent = 'Interested';
    buttons.appendChild(interestedButton);
    itemElement.appendChild(buttons);
    console.log(itemElement);

    // Append the new element to the container
    container.appendChild(itemElement);
  });
}
