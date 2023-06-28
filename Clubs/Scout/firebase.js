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

// Get the tournament form element
var form = document.getElementById('scout-form');

auth.onAuthStateChanged(async function (user) {
    if (user) 
    {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form from submitting
        
            // Get form values
            var clubName = document.getElementById('club-name').value;
            var Sport = document.getElementById('sport-select').value;
            var place = document.getElementById('place').value;
            var playerposition = document.getElementById('player-position').value;
            var age = document.getElementById('age').value;
            var playstyle = document.getElementById('play-style').value;
            var salary = document.getElementById('salary').value;
            var datereq = document.getElementById('date-req').value;
            var conditions = document.getElementById('conditions').value;
            var noofdays = document.getElementById('no-days').value;
        
            // Create a new document in Firestore
            addDoc(collection(db, 'reqscoutdetails'),{
                clubName: clubName,
                reqSport: Sport,
                place: place,
                playerposition: playerposition,
                age: age,
                playstyle: playstyle,
                salary: salary,
                daterequired: datereq,
                conditions: conditions,
                noofdays: noofdays,
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