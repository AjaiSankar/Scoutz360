import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js'
import { getFirestore, collection, getDocs, addDoc} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
import { getStorage, ref, getDownloadURL, uploadBytes,uploadBytesResumable} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js';
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
    if (user) {
        // Existing code
        console.log(user.uid)
        document.getElementById("uploadButton").addEventListener('click', function(event) {
            event.preventDefault();
            var fileInput = document.getElementById("fileInput");
            var file = fileInput.files[0];
            var storageRef = ref(storage, "Files/" + file.name);
            var captionInput = document.getElementById("caption");
            var caption = captionInput.value;
            var progressBar = document.querySelector('.progress');
            var progressBarValue = progressBar.querySelector('.progress-bar');
            
            // Show the progress bar
            progressBar.style.display = 'block';
            
            // Upload file to Firebase Storage with progress tracking
            var uploadTask = uploadBytesResumable(storageRef, file);
            
            uploadTask.on('state_changed',
                function(snapshot) {
                    // Update progress bar as the file uploads
                    
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    progressBarValue.style.width = progress + '%';
                    console.log(progress);
                },
                function(error) {
                    // Handle error during upload
                    console.error("Error: ", error);
                },
                function() {
                    // Upload successful
                    console.log("Upload successful!");
                    
                    // Get the uploaded video URL
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then(function(downloadURL) {
                            // Save the video URL in the Firebase Firestore
                            return addDoc(collection(db, "videos"), {
                                videoUrl: downloadURL,
                                caption: caption,
                                userid: user.uid
                            });
                        })
                        .then(function() {
                            console.log("Video URL saved in database!");
                            alert("Video Added Successfully!");
                            window.location.href = "./index.html";
                        })
                        .catch(function(error) {
                            // Handle any errors that occurred during saving the URL
                            console.error("Error: ", error);
                        });
                }
            );
        });
    }
});
// auth.onAuthStateChanged(async function (user) {
//     if (user) 
//     {
        
//         document.getElementById("uploadButton").addEventListener('click', function(event) {
//             event.preventDefault();
//             var fileInput = document.getElementById("fileInput");
//             var file = fileInput.files[0];
//             var storageRef = ref(storage, "Files/" + file.name);
//             var captionInput = document.getElementById("caption");
//             var caption = captionInput.value;
          
//             // Upload file to Firebase Storage
//             var uploadTask = uploadBytes(storageRef, file);
          
//             uploadTask
//                 .then(function(snapshot) {
//                     // Upload successful
//                     console.log("Upload successful!");
            
//                     // Get the uploaded image URL
//                     return getDownloadURL(snapshot.ref);
//                 })
//                 .then(function(downloadURL) {
//                     // Save the image URL in the Firebase Realtime Database
//                     return addDoc(collection(db, "videos"), {
//                         videoUrl: downloadURL,
//                         caption: caption,
//                         userid: user.uid
//                     });
//                 })
//                 .then(function() {
//                     console.log("Video URL saved in database!");
//                     alert("Video Added Successfully!");
//                     window.location.href = "../videos.html";
//                 })
//                 .catch(function(error) {
//                     // Handle any errors that occurred during upload or saving the URL
//                     console.error("Error: ", error);
//                 });
//         });
//     }
// });