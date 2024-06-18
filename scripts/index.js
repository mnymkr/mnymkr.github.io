


// import data from '../index.json'; // remove this line

let data;

fetch('../index.json')
  .then(response => response.json())
  .then(json => {
    data = json;
    processData(data); // call the function to process the data
  });

function processData(data) {
  const postTemplate = document.querySelector("#post-template");
  const mainView = document.querySelector(".main-view");
  const linkToViewAll = document.querySelector("#link-to-view-all");

  let array = Object.entries(data).reverse();

  let count = 0;
  let maxCount = 5;

  for (var i = 0; i <= array.length - 1; i++) {
    if (count >= maxCount) {
        break;
    }
    let element = array[i][0];
    count++;

    // for each entry in the json file, create a new postTemplate
    var clone = postTemplate.content.cloneNode(true);

    // edit it with the data from the json file
    clone.querySelector(".title").innerHTML = data[element].title;;
    clone.querySelector(".content-preview").innerHTML = data[element].preview;
    clone.querySelector(".link").href = "view.html?post=" + data[element].path;

    // then append it to the mainView
    mainView.appendChild(clone);
  }
}