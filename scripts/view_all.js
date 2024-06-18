// import data from '../index.json'; // remove this line

let data;

fetch('../index.json')
  .then(response => response.json())
  .then(json => {
    data = json;
    displayPosts(data); // call the function to display the posts
  });

function displayPosts(data) {
  const postTemplate = document.querySelector("#post-template");
  const mainView = document.querySelector(".main-view");

  // display all posts
  for (var element in data) {
    // for each entry in the json file, create a new postTemplate
    var clone = postTemplate.content.cloneNode(true);

    // edit it with the data from the json file
    clone.querySelector(".title").innerHTML = data[element].title;
    clone.querySelector(".content-preview").innerHTML = data[element].preview;
    clone.querySelector(".link").href = "view.html?post=" + data[element].path;

    // then append it to the mainView
    mainView.appendChild(clone);
  }
}