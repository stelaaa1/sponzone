// Search function
function search() {
    var input, filter, container, post, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    container = document.getElementById("post-container");
    post = container.getElementsByClassName("post");
  
    for (i = 0; i < post.length; i++) {
      txtValue = post[i].textContent || post[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        post[i].style.display = "";
      } else {
        post[i].style.display = "none";
      }
    }
  }
  
  // Attach event listener to search input
  document.addEventListener("DOMContentLoaded", function() {
    var searchInput = document.getElementById("myInput");
    searchInput.addEventListener("keyup", search);
  });
  
  // JavaScript code to update the content dynamically
document.addEventListener("DOMContentLoaded", function() {
  // Example data
  var post = {
    title: "Bengal Institute Of Technology",
    time: "2 hours ago",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  };

  // Update the post title
  var postTitleElement = document.getElementById("postTitle");
  postTitleElement.textContent = post.title;

  // Update the post time
  var postTimeElement = document.getElementById("postTime");
  postTimeElement.textContent = post.time;

  // Update the post content
  var postContentElement = document.getElementById("postContent");
  postContentElement.textContent = post.content;
});

  