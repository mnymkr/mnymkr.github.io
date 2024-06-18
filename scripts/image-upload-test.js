import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

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
    
const fileObject = document.getElementById("file");
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a root reference to the service
const storage = getStorage(app);

// add event listener to submit button
document.getElementById("submit-button").addEventListener("click", function() {
    console.log("fileObject.files.length: " + fileObject.files.length);
    
    for (let i = 0; i < fileObject.files.length; i++) {
        console.log("file: " + fileObject.files[i])
        // get file from form
        let file = fileObject.files[i];
        let fileName = file.name;

        // create a md file reference
        const fileRef = ref(storage, 'images/' + fileName);

        // upload file to firebase storage
        // 'file' comes from the Blob or File API
        uploadBytes(fileRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
    }
    
    
});


    
