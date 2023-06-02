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

var form = document.getElementById('achievementsdata');

auth.onAuthStateChanged(async function (user) {
    if (user) 
    {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form from submitting
        
            // Get form values
            var achievement = document.getElementById('achievement').value;
            var ACertificate = document.getElementById('certificate').files[0];

            // Create a new document in Firestore
            addDoc(collection(db, 'PlayersAchievements'),{
                Achievement: achievement,
                userid: user.uid
            }).then(function(docRef) {
                // Document successfully added
                console.log('Document written with ID: ', docRef.id);
        
                // Upload the tournament poster to Firebase Storage
                var storageRef = ref(storage, "Certificate" + docRef.id);
                var uploadTask = uploadBytes(storageRef,ACertificate);
                
                uploadTask
                .then(function(snapshot) {
                    // Certificate uploaded successfully
                    console.log('Certificate uploaded successfully');
        
                    // Get the download URL of the uploaded poster
                    return getDownloadURL(snapshot.ref);
                })
                .then(function(downloadURL) {
                    // Update the Achievement document with the Certificate URL
                    const AchievementRef = doc(db, 'PlayersAchievements', docRef.id);
                    return updateDoc(AchievementRef, { CertificateURL: downloadURL });
                })        
                .then(function() {
                    // Certificate document updated successfully
                    console.log('Player document updated successfully');
                    alert('Player Acievement added successfully');
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
    }
});