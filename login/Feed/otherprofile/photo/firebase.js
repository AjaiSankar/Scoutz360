import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js'
import { getFirestore, collection, getDocs,query,where,onSnapshot } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

const firebaseConfig = {
  // Your Firebase configuration
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
const db = getFirestore(app);

auth.onAuthStateChanged(async function (user) {
    if (user) {
      console.log(user.uid);
      const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');
      console.log(userId);
      const playerDetailsContainer = document.querySelector(".player-details");
      const Iquery = query(
        collection(db, "PlayerProfileData"),
        where("userid", "==", userId)
      );
  
      // Listen for real-time updates on the "PlayerProfiledata" collection
      onSnapshot(Iquery, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const profilePictureURL = doc.data().ProfilePictureURL;
          const playerName = doc.data().PlayerName;
          const sportPlayed = doc.data().PlayerSport;
          const playerAge = doc.data().PAge;
          const pDistrict = doc.data().PDistrict;
          const pState = doc.data().PState;
  
          // Update the profile image source
          const profileImage = playerDetailsContainer.querySelector(".profile-image img");
          console.log(profilePictureURL);
          profileImage.src = profilePictureURL;
  
          // Update the player name and sport played
          const profileName = playerDetailsContainer.querySelector(".profile-name");
          profileName.innerHTML = `${playerName}<br>${sportPlayed}<br>${playerAge}<br>${pDistrict},${pState}`;
        });
      });
      const profile = collection(db, 'images');
      const profileSnapshot = await getDocs(query(profile, where("userid", "==", userId)));
      const cardsContainer = document.querySelector(".photos-container");
      cardsContainer.innerHTML = "";
  
      profileSnapshot.forEach((doc) => {
        const profpics = doc.data();
        const card = document.createElement("div");
        card.className = "photo-card";
        card.innerHTML = `
          <div class="photo">
            <img src="${profpics.imageUrl}" alt="${profpics.userid} Poster">
          </div>
          <div class="caption">
            <h3>${profpics.caption}</h3>
            <p>Caption: ${profpics.caption}</p>
          </div>
        `;
        cardsContainer.appendChild(card);
      });
    }
  });