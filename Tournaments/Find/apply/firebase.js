import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
        
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
const db = getFirestore(app);
const form = document.getElementById('club-application-form');
const successMessage = document.getElementById('success-message');
const auth = getAuth();
    
auth.onAuthStateChanged(async function (user) {
    if (user) 
    {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const clubName = form['club-name'].value;
            const place = form['place'].value;
            const captainName = form['captain-name'].value;
            const contactDetails = form['contact-details'].value;
            
            try {
                const docRef = await addDoc(collection(db, 'clubApplications'), {
                    clubName,
                    place,
                    captainName,
                    contactDetails
                });
                console.log('Document written with ID: ', docRef.id);
                
                // Display success message
                successMessage.style.display = 'block';
                successMessage.innerText = 'Application submitted. Good luck with the tournament!';
                
                // Reset form
                form.reset();
            } catch (error) {
                console.error('Error adding document: ', error);
            }
        });
    }
});