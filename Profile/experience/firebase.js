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

var form = document.getElementById('ExperienceData');

auth.onAuthStateChanged(async function (user) {
    if (user) 
    {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form from submitting
        
            // Get form values
            var Experience = document.getElementById('experience').value;
        
            // Create a new document in Firestore
            addDoc(collection(db, 'ExperienceData'),{
                Experience: Experience,
                userid: user.uid
            }).then(function(docRef) {
                // Document successfully added
                console.log('Document written with ID: ', docRef.id);

            }).catch(function(error) {
                // Error adding document
                console.error('Error adding document: ', error);
            });
        });
    }
});