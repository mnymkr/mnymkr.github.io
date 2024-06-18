import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, ref, set, child, get } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js';
import { getStorage, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";
import { ref as sRef } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

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

// Initialize Firebase objects
const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());
const storage = getStorage(app);

// Create element references
const imagesElement = document.getElementById("images");
const mdFile = document.getElementById("mdfile");

// Create variables
let postCount;
let postId;
let origialPhotoPath = [];
let newPhotoPath = [];
let mdFileContent = mdFile.files[0];
let mdFileContentText;

// add event listener to submit button
document.getElementById("submit-button").addEventListener("click", submitButtonDoesStuff);

async function getPostCount() {
    get(child(dbRef, 'count')).then((snapshot) => {
        if (snapshot.exists()) {
            // GET POST COUNT
            postCount = snapshot.val()["count"];
            
        } else {
          console.log("No count data available");
        }
      }).catch((error) => {
            console.error(error);
    });
}

async function readMDFile(mdFileContent) {
    mdFileContent.text().then((text) => {
        let mdFileContentText = text.slice();
        console.log(mdFileContentText.slice());
        return mdFileContentText;
    });
}

async function submitButtonDoesStuff() {
    // PREPARE MD FILE
    
    let mdFileContentTextPromise = mdFileContent.text().then(async (text) => {
        mdFileContentText = text.slice();
        console.log(mdFileContentText.slice());

        await uploadPhotos(mdFileContentText);
        console.log("Done uploading photos");
    });  
    // GET POST COUNT
    await getPostCount();
    console.log("Done getting post count");


    // NOW UPLOAD THE PHOTOS

    // MAYBE AWAIT THE PHOTOS FIRST??
    // await uploadPhotos(mdFileContentText);

    // NOW UPLOAD THE MD FILE
    console.log("mdFileContentText: " + mdFileContentText);
        // UPLOAD THE MD FILE
        const blob = new Blob([mdFileContentText], { type : 'plain/text' });

        // then upload it to storage as a md file
        let fileName = mdFileContent.name;
        // create a md file reference
        const fileRef = sRef(storage, 'md/' + fileName);
        // upload file to firebase storage
        const uploadTask = uploadBytesResumable(fileRef, blob);
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
            getDownloadURL(uploadTask.snapshot.ref).then((mdDownloadURL) => {
            console.log('MD File available at', mdDownloadURL);
            // url = downloadURL.slice();
            // console.log("url: " + url);
            // NOW ADD THE NEWLY UPLOADED MD FILE TO THE DATABASE
            
            });
        }
        );

    // NOW WE HAVE THE NEW PHOTO PATHS READY AND ALREADY PUT INTO THE MD FILE
    sleep(5000).then(() => {
        console.log("Done sleeping");
    });

    // sleep to wait for data to be fetched
    // sleep(500).then(() => {
    //     console.log("post count: " + postCount["count"]);
    //     // set post id = count + 1
    //     postId = postCount["count"] + 1;
    //     console.log("postId: " +  postId);

    //     // gather all the necessary data
    //     let title = document.getElementById("title").value;
    //     let date = document.getElementById("date").value;
    //     let path = document.getElementById("path").value;
    //     let tags = document.getElementById("tags").value;
    //     let contentPreview = "This is a content preview";
    //     let _comment = document.getElementById("_comment").value;

    //     console.log("title: " + title);
    //     console.log("date: " + date);
    //     console.log("path: " + path);
    //     console.log("tags: " + tags);
    //     console.log("content preview: " + contentPreview);
    //     console.log("_comment: " + _comment);
        

    //     document.getElementById("title").value = "";
    //     document.getElementById("date").value = "";
    //     document.getElementById("path").value = "";
    //     document.getElementById("tags").value = "";
    //     document.getElementById("_comment").value = "";
    //     // document.getElementById("file").value = "";


    //     // call writePostData()
    //     // writePostData(postId, title, date, path, tags, contentPreview, _comment);

    //     // upload related files to storage
    //         // upload each image file to storage
    //             // when done a file, change the src of the image in the md to the link
    //         // upload the modified md file to storage

    //     // update post count
    //     // updatePostCount(postId);
    // });
    }

    async function uploadPhotos(mdFileContentText) {
        for (let i = 0; i < imagesElement.files.length; i++) {
            // get the photo file
            let image = imagesElement.files[i];
            let imageName = image.name;
            // save the original image name
            origialPhotoPath.push(imageName.slice());

            // create a storage reference and upload task
            const storageRef = sRef(storage, 'images/' + imageName);
            const uploadTask = uploadBytesResumable(storageRef, image);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
            (snapshot) => {
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
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
                case 'storage/canceled':
                // User canceled the upload
                break;
                case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
            }, 
            () => {
            // UPLOAD IS COMPLETE, CAN NOW GET THE DOWNLOAD URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                // console.log('File available at', downloadURL);
                // newPhotoPath.push(downloadURL.slice());

                // PUT THE NEW PHOTO PATHS INTO THE MD FILE IMMEDIATELY
                mdFileContentText = mdFileContentText.replace(origialPhotoPath[i], downloadURL);
                console.log("Replaced" + origialPhotoPath[i] + " with " + downloadURL);
            });
            }
        );
        }
    }

async function fetchPostCount() {
    const dbRef = ref(getDatabase());
    try {
        const snapshot = await get(child(dbRef, 'count'));
        if (snapshot.exists()) {
            const data = snapshot.val(); // Store the data in the 'data' variable
            // console.log("Data available");
            // You can now work with 'data' here
            // console.log(data);
            postCount = data;
        } else {
            // console.log("No data available");
        }
    } catch (error) {
        console.error(error);
    }
}

// get data from database, types are: 'posts', 'count', 'key', 'link'
async function fetchPostData() {
    const dbRef = ref(getDatabase());
    try {
        const snapshot = await get(child(dbRef, 'posts'));
        if (snapshot.exists()) {
            const data = snapshot.val(); // Store the data in the 'data' variable
            // console.log("Data available");
            // You can now work with 'data' here
            // console.log(data);
        } else {
            // console.log("No data available");
        }
    } catch (error) {
        console.error(error);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updatePostCount(count) {
    const db = getDatabase();
    set(ref(db, 'count'), {
        count: count
    });
}

// write post metadata to database
function writePostData(postId, title, date, path, tags, contentPreview, _comment) {
    const db = getDatabase();
    set(ref(db, 'posts/' + postId), {
        postId: postId,
        title: title,
        date: date,
        path: path,
        tags: tags,
        contentPreview: contentPreview,
        _comment: _comment
    });
}
