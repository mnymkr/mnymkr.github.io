import index from '../index.json' assert { type: 'json' };
import data from '../data.json' assert { type: 'json' };


let encrypteFileName = document.getElementById('encrypted-file-name');

document.getElementById("submit-button").addEventListener("click", submitButtonDoesStuff);

function submitButtonDoesStuff() {
    let mdFile = document.getElementById('mdfile');
    // Get the values from the elements
    let fileName = mdFile.files[0].name;
    // encrypt the mdfile name using the key from the data.json file, then print it out to the console
    console.log(fileName);
    
    let e = encrypt(fileName, data.key);
    
    encrypteFileName.innerHTML = e;
}

function encrypt(text, key) {
    // encrypt the text using the key
    let encryptedText = CryptoJS.AES.encrypt(text, key).toString();
    return encryptedText;
}

function decrypt(value, password) {
    let decrypted = CryptoJS.AES.decrypt(value, password).toString(CryptoJS.enc.Utf8);
    return decrypted;
 }