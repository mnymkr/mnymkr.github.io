// import data from '../data.json'; // remove this line

let data;

fetch('../data.json')
  .then(response => response.json())
  .then(json => {
    data = json;
    processUrl(data); // call the function to process the data
  });


function processUrl(data) {
  const mainView = document.querySelector(".main-view");
  const title = document.querySelector(".title");
  const datedElement = document.querySelector("#date");
  // const dateElement = document.querySelector(".date");

  // Get the URL parameters
  const urlParams = new URLSearchParams(window.location.search);

  // Get the 'tags' parameter from the URL
  const tagsParam = urlParams.get('tags');

  // Split the tags string into an array
  const tagsArray = tagsParam ? tagsParam.split(',') : [];

  // get current url
  // let urlString = window.location.href;
  const urlString = urlParams.get('post')

  // split the parameters to get the post's filepath
  // let queryString = urlString.split('=');
  // let fileName = queryString[1];
  let fileName = urlString;
  let path = "../" + fileName;

  // Decode the URL-encoded string and format it
  let decodedFileName = decodeURIComponent(fileName);
  let formattedTitle = decodedFileName.replace(/%20/g, ' ').replace('.md', '');

  // dateElement.innerHTML = data[element].date;
  mainView.setAttribute("src", path);
  title.innerHTML = formattedTitle;
  console.log(fileName);

  // Process and add badges (tags)
  let tagsContainer = document.querySelector(".tags-container"); // Ensure there's a container in the template
  if (tagsContainer && tagsArray) {
    let tags = tagsArray; // Split tags by ';'
    tags.forEach(tag => {
      let badge = document.createElement("span");
      badge.className = "badge rounded-pill text-bg-secondary me-1"; // Bootstrap badge styling with margin
      badge.textContent = tag.trim();
      tagsContainer.appendChild(badge);
    });
  }
  
}