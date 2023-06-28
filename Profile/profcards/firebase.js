import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js'
import { getFirestore, addDoc, collection, onSnapshot, where, query} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js'

const firebaseConfig = {
    apiKey: "AIzaSyDIh1tbO5WYQOsC5J0eCT3gMLqf9TA5M8Q",
    authDomain: "scoutz360demo.firebaseapp.com",
    projectId: "scoutz360demo",
    storageBucket: "scoutz360demo.appspot.com",
    messagingSenderId: "537849473274",
    appId: "1:537849473274:web:6cc282b1f3dc66f1894143",
    measurementId: "G-NQ601C7WBT"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();
auth.onAuthStateChanged(async function (user) {
    if (user) 
    {
        console.log(user.uid)
        const playerDetailsContainer = document.querySelector(".profile-card");
        const Iquery = query(collection(db, "PlayerProfileData"), where("userid", "==", user.uid));
        // Listen for real-time updates on the "PlayerProfiledata" collection
        onSnapshot(Iquery, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const profilePictureURL = doc.data().ProfilePictureURL;
                const playerName = doc.data().PlayerName;
                const sportPlayed = doc.data().PlayerSport;

                // Update the profile image source
                const profileImage = playerDetailsContainer.querySelector(".profile-picture img");
                console.log(profilePictureURL)
                profileImage.src = profilePictureURL;

                // Update the player name and sport played
                const profileName = playerDetailsContainer.querySelector(".player-name");
                profileName.innerHTML = `${playerName}`;
                const playerSport = playerDetailsContainer.querySelector(".player-sport");
                playerSport.innerHTML = `${sportPlayed}`;
            });
        });
    }
});
