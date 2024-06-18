// import data from '../data.json'; // remove this line

let data;

fetch('../data.json')
  .then(response => response.json())
  .then(json => {
    data = json;
    processData(data); // call the function to process the data
  });

function processData(data) {
  const mainView = document.querySelector(".main-view");
  const title = document.querySelector(".title");

  // get current url
  let urlString = window.location.href;
  let paramString = urlString.split('?')[1];

  // split the parameters to get the post's filepath
  let queryString = urlString.split('=');
  // decrypt the path using the key from data.json
  let fileName = decrypt(queryString[1], data["key"])
  let path = "../" + fileName;

  mainView.setAttribute("src", path);
  title.innerHTML = fileName.slice(0, -3);

  // console.log(fileName);
}

function decrypt(value, password) {
  var decrypted = CryptoJS.AES.decrypt(value, password).toString(CryptoJS.enc.Utf8);
  return decrypted;
}