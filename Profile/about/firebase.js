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

auth.onAuthStateChanged(async function (user) {
    if (user) {
        var form = document.getElementById('AboutData');
        var aboutTextArea = document.getElementById('about');

        // Check if a document already exists for the user in the collection
        const querySnapshot = await getDocs(query(collection(db, 'AboutData'), where('userid', '==', user.uid)));
        if (!querySnapshot.empty) {
            // If a document exists, retrieve the data and populate the textarea
            const documentData = querySnapshot.docs[0].data();
            aboutTextArea.value = documentData.About;
        }

        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent form from submitting

            // Get form values
            var About = aboutTextArea.value;

            if (querySnapshot.empty) {
                // Create a new document in Firestore
                addDoc(collection(db, 'AboutData'), {
                    About: About,
                    userid: user.uid
                }).then(function (docRef) {
                    // Document successfully added
                    console.log('Document written with ID: ', docRef.id);
                    alert("About Data Inserted Successfully");
                    window.location.href = "../index.html";

                }).catch(function (error) {
                    // Error adding document
                    console.error('Error adding document: ', error);
                    alert("Error adding document: ", error);
                });
            } else {
                // Update the existing document in Firestore
                const docId = querySnapshot.docs[0].id;
                const docRef = doc(db, 'AboutData', docId);
                updateDoc(docRef, { About: About })
                    .then(function () {
                        // Document successfully updated
                        console.log('Document updated with ID: ', docId);
                        alert("About Data Updated Successfully");
                        window.location.href = "../index.html";
                    })
                    .catch(function (error) {
                        // Error updating document
                        console.error('Error updating document: ', error);
                        alert("Error updating document: ", error);
                    });
            }
        });
    }
});