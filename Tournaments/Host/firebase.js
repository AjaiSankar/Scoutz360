import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js'
import { getFirestore, collection, getDocs, addDoc, where, query, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
//import { getFirestore, collection, getDocs, addDoc,where ,query,doc,update} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
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
var form = document.getElementById('tournament-form');

// Handle form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting

    // var tournamentId = collection(db,'hosttournamentclubs').doc().id;
    // Get form values
    var tournamentName = document.getElementById('tournament-name').value;
    var hostName = document.getElementById('host-name').value;
    var place = document.getElementById('place').value;
    var date = document.getElementById('date').value;
    var prizePool = document.getElementById('prize-pool').value;
    var entryFee = document.getElementById('entry-fee').value;
    var ageGroup = document.getElementById('age-group').value;
    var conditions = document.getElementById('conditions').value;
    var poster = document.getElementById('poster').files[0];

    // Create a new document in Firestore
    addDoc(collection(db, 'hosttournamentclubs'),{
    //collection(db,'hosttournamentclubs').add({
        tournamentName: tournamentName,
        hostName: hostName,
        place: place,
        date: date,
        prizePool: prizePool,
        entryFee: entryFee,
        ageGroup: ageGroup,
        conditions: conditions
    }).then(function(docRef) {
        // Document successfully added
        console.log('Document written with ID: ', docRef.id);

        // Upload the tournament poster to Firebase Storage
        var storageRef = ref(storage, "posters/" + docRef.id);
        var uploadTask = uploadBytes(storageRef,poster);
        
        uploadTask
        .then(function(snapshot) {
            // Poster uploaded successfully
            console.log('Poster uploaded successfully');

            // Get the download URL of the uploaded poster
            return getDownloadURL(snapshot.ref);
        })
        .then(function(downloadURL) {
            // Update the tournament document with the poster URL
            const tournamentRef = doc(db, 'hosttournamentclubs', docRef.id);
            return updateDoc(tournamentRef, { posterURL: downloadURL });
        })        
        .then(function() {
            // Tournament document updated successfully
            console.log('Tournament document updated successfully');
            alert('Tournament added successfully');
            form.reset();
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

