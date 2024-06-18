// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";
// import 'firebase/storage';


// Initialize Firebase (replace with your config)
const firebaseConfig = {
    apiKey: "AIzaSyAPFhdrnRxpgnbbpoWY8VMIYVFGTlfBQR4",
    authDomain: "fir-rtc-f0f01.firebaseapp.com",
    databaseURL: "https://fir-rtc-f0f01-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fir-rtc-f0f01",
    storageBucket: "fir-rtc-f0f01.appspot.com",
    messagingSenderId: "1049542212752",
    appId: "1:1049542212752:web:70f661a7c6981bc858ac15",
    measurementId: "G-C001EGKJ7C"
    };
const firebase = initializeApp(firebaseConfig);

// Get the files
let mdFile = document.getElementById('mdfile').files[0];
let imageFiles = document.getElementById('images').files;

// Create a storage reference
// let storageRef = firebase.storage().ref();
let storageRef = getStorage(firebase);

// Function to upload a file and return its download URL
async function uploadAndGetURL(file, path) {
  let fileRef = storageRef.child(path);
  await fileRef.put(file);
  return await fileRef.getDownloadURL();
}

// Function to replace image references in markdown
function replaceImageRefs(mdContent, imageMap) {
  for (let [imageName, imageUrl] of Object.entries(imageMap)) {
    let regex = new RegExp(`!\\[.*\\]\\(${imageName}\\)`, 'g');
    mdContent = mdContent.replace(regex, `![${imageName}](${imageUrl})`);
  }
  return mdContent;
}

// add event listener to submit button
document.getElementById("submit-button").addEventListener("click", submitButtonDoesStuff);

async function submitButtonDoesStuff() {

  // Upload images and replace references in markdown
  let reader = new FileReader();
  reader.onload = async function() {
    let mdContent = reader.result;
    let imageMap = {};

    for (let i = 0; i < imageFiles.length; i++) {
      let imageUrl = await uploadAndGetURL(imageFiles[i], `images/${imageFiles[i].name}`);
      imageMap[imageFiles[i].name] = imageUrl;
    }

    mdContent = replaceImageRefs(mdContent, imageMap);

    // Upload the modified markdown file
    let mdBlob = new Blob([mdContent], {type: 'text/markdown'});
    let mdUrl = await uploadAndGetURL(mdBlob, `mdfiles/${mdFile.name}`);
    console.log(`Markdown file URL: ${mdUrl}`);
    console.log(`Markdown file content: ${mdContent}`);
  };

// reader.readAsText(mdFile);
}