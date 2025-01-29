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

  // get current url
  let urlString = window.location.href;

  // split the parameters to get the post's filepath
  let queryString = urlString.split('=');
  let fileName = queryString[1];
  let path = "../" + fileName;

  // Decode the URL-encoded string and format it
  let decodedFileName = decodeURIComponent(fileName);
  let formattedTitle = decodedFileName.replace(/%20/g, ' ').replace('.md', '');

  mainView.setAttribute("src", path);
  title.innerHTML = formattedTitle;
  console.log(fileName);
}