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
        const playerDetailsContainer = document.querySelector(".player-details");
        const Iquery = query(collection(db, "PlayerProfileData"), where("userid", "==", user.uid));
        // Listen for real-time updates on the "PlayerProfiledata" collection
        onSnapshot(Iquery, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const profilePictureURL = doc.data().ProfilePictureURL;
                const playerName = doc.data().PlayerName;
                const sportPlayed = doc.data().PlayerSport;

                // Update the profile image source
                const profileImage = playerDetailsContainer.querySelector(".profile-image img");
                console.log(profilePictureURL)
                profileImage.src = profilePictureURL;

                // Update the player name and sport played
                const profileName = playerDetailsContainer.querySelector(".profile-name");
                profileName.innerHTML = `${playerName}<br>${sportPlayed}`;
            });
        });

        const ul = document.querySelector(".profile-card ul");

        // Create a query for real-time updates on the "ExperienceData" collection with the user's ID filter
        const Cquery = query(collection(db, "ExperienceData"), where("userid", "==", user.uid));

        // Listen for real-time updates based on the query
        onSnapshot(Cquery, (querySnapshot) => {
        // Clear existing list items
        ul.innerHTML = "";

            querySnapshot.forEach((doc) => {
                const experience = doc.data().Experience;

                // Create a new <li> element
                const li = document.createElement("li");
                li.textContent = experience;

                // Append the <li> element to the <ul> element
                ul.appendChild(li);
            });
        });

        const container = document.querySelector(".container");
        const aquery= query(collection(db, "PlayersAchievements"), where("userid", "==", user.uid));

        // Listen for real-time updates on the "PlayersAchievements" collection
        onSnapshot(aquery, (querySnapshot) => {
            // Clear existing cards
            container.innerHTML = "";

            querySnapshot.forEach((doc) => {
                const certificateURL = doc.data().CertificateURL;

                // Create a new card element
                const card = document.createElement("div");
                card.className = "card";

                // Create an image element and set the source attribute to the certificateURL
                const img = document.createElement("img");
                img.src = certificateURL;
                img.alt = "Certificate";

                // Create a container for the name
                const nameContainer = document.createElement("div");
                nameContainer.className = "container";
                
                // Get the name from the document data or replace "John Doe" with the appropriate field from Firestore
                const name = doc.data().Achievement || "John Doe";
                const nameText = document.createElement("h5");
                nameText.innerHTML = `<b>${name}</b>`;
                
                // Append the image and name elements to the card element
                nameContainer.appendChild(nameText);
                card.appendChild(img);
                card.appendChild(nameContainer);

                // Append the card element to the container
                container.appendChild(card);
            });
        });
    }
});
