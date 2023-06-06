import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js'
import { getFirestore, collection, getDocs, addDoc, where, query, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
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

var form = document.getElementById('profiledata');

auth.onAuthStateChanged(async function (user) {
    if (user) 
    {   console.log(user.uid)
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form from submitting
        
            // Get form values
            var PName = document.getElementById('name').value;
            var PSport = document.getElementById('sport').value;
            var PDOB = document.getElementById('dob').value;
            var PAge = document.getElementById('age').value;
            var PState = document.getElementById('state').value;
            var PDistrict = document.getElementById('district').value;
            var PMobile = document.getElementById('mobile-number').value;
            var PDP = document.getElementById('profile-picture').files[0];
        
            // Create a new document in Firestore
            addDoc(collection(db, 'PlayerProfileData'),{
                PlayerName: PName,
                PlayerSport: PSport,
                PDOB: PDOB,
                PAge: PAge,
                PState: PState,
                PDistrict: PDistrict,
                PMobile: PMobile,
                userid: user.uid
            }).then(function(docRef) {
                // Document successfully added
                console.log('Document written with ID: ', docRef.id);
        
                // Upload the tournament poster to Firebase Storage
                var storageRef = ref(storage, "ProfilePics/PlayerDP" + docRef.id);
                var uploadTask = uploadBytes(storageRef,PDP);
                
                uploadTask
                .then(function(snapshot) {
                    // Poster uploaded successfully
                    console.log('Image uploaded successfully');
        
                    // Get the download URL of the uploaded poster
                    return getDownloadURL(snapshot.ref);
                })
                .then(function(downloadURL) {
                    // Update the tournament document with the poster URL
                    const PDPRef = doc(db, 'PlayerProfileData', docRef.id);
                    return updateDoc(PDPRef, { ProfilePictureURL: downloadURL });
                })        
                .then(function() {
                    // Tournament document updated successfully
                    console.log('Player document updated successfully');
                    alert('Player Profile added successfully');
                    window.location.href = "../../login/Feed/index.html";
                })
                .catch(function(error) {
                    // Handle any errors that occurred during the upload or update process
                    console.error('Error: ', error);
                });  
            }).catch(function(error) {
                // Error adding document
                console.error('Error adding document: ', error);
            });
        });
    }
});