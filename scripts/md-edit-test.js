import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// initialise firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a root reference to the service
const storage = getStorage(app);
// get mdFile reference
const mdFile = document.getElementById("mdfile");

let url;

// add event listener to submit button
document.getElementById("submit-button").addEventListener("click", async function() {
    let mdFileContent = mdFile.files[0];
    console.log("mdFileContent: " + mdFileContent.name);

    // read file
    let mdFileContentText;

    mdFileContent.text().then((text) => {
        mdFileContentText = text;
        // replace a text inside the md stream
        mdFileContentText = mdFileContentText.replace("!", "hello");
        // convert the md stream into a blob
        const blob = new Blob([mdFileContentText], { type : 'plain/text' });
        // then upload it to storage as a md file
        let fileName = mdFileContent.name;

        // create a md file reference
        const fileRef = ref(storage, 'md/' + fileName);

        // upload file to firebase storage
        uploadFile(fileRef, blob);
        
    });
});

async function uploadFile(fileRef, blob) {
    const uploadTask = uploadBytesResumable(fileRef, blob);
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            // Handle unsuccessful uploads
            return ""
        }, 
        () => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log('File available at', downloadURL);
            // url = downloadURL.slice();
            // console.log("url: " + url);
            });
        }
        );
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}