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
    clone.querySelector(".date").innerHTML = data[element].date;
    clone.querySelector(".content-preview").innerHTML = data[element].preview;
    const postPath = data[element].path;
    const tags = data[element].tags.split(";"); // Assuming this is an array of tag strings

    // Convert tags array to a URL-friendly query parameter
    const tagsQuery = tags.map(tag => encodeURIComponent(tag)).join(',');

    // Construct the final URL
    clone.querySelector(".link").href = `view.html?post=${encodeURIComponent(postPath)}&tags=${tagsQuery}`;


    // Process and add badges (tags)
    let tagsContainer = clone.querySelector(".tags-container"); // Ensure there's a container in the template
    if (tagsContainer && data[element].tags) {
      let tags = data[element].tags.split(";"); // Split tags by ';'
      tags.forEach(tag => {
        let badge = document.createElement("span");
        badge.className = "badge rounded-pill text-bg-secondary me-1"; // Bootstrap badge styling with margin
        badge.textContent = tag.trim();
        tagsContainer.appendChild(badge);
      });
    }

    // then append it to the mainView
    mainView.appendChild(clone);
  }
}