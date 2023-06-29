import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js'
import { getFirestore, collection, getDocs, addDoc} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
import { getStorage, ref, getDownloadURL, uploadBytes} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js';
const firebaseConfig = {
    apiKey: "AIzaSyDIh1tbO5WYQOsC5J0eCT3gMLqf9TA5M8Q",
    authDomain: "scoutz360demo.firebaseapp.com",
    projectId: "scoutz360demo",
    storageBucket: "scoutz360demo.appspot.com",
    messagingSenderId: "537849473274",
    appId: "1:537849473274:web:6cc282b1f3dc66f1894143",
    measurementId: "G-NQ601C7WBT"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage(app);

auth.onAuthStateChanged(async function (user) {
    if (user) 
    {
        console.log(user.uid)
        document.getElementById("getimage").addEventListener('click', function(event) {
            event.preventDefault();
            var fileInput = document.getElementById("fileInput");
            var file = fileInput.files[0];
            var storageRef = ref(storage, "Files/" + file.name);
            var captionInput = document.getElementById("caption");
            var caption = captionInput.value;
          
            // Upload file to Firebase Storage
            var uploadTask = uploadBytes(storageRef, file);
          
            uploadTask
                .then(function(snapshot) {
                    // Upload successful
                    console.log("Upload successful!");
            
                    // Get the uploaded image URL
                    return getDownloadURL(snapshot.ref);
                })
                .then(function(downloadURL) {
                    // Save the image URL in the Firebase Realtime Database
                    return addDoc(collection(db, "images"), {
                        imageUrl: downloadURL,
                        caption: caption,
                        userid: user.uid
                    });
                })
                .then(function() {
                    console.log("Image URL saved in database!");
                    alert("Image Added Successfully!");
                    window.location.href = "../photos.html";
                })
                .catch(function(error) {
                    // Handle any errors that occurred during upload or saving the URL
                    console.error("Error: ", error);
                });
        });
    }
});