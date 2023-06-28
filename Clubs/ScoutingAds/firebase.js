import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDIh1tbO5WYQOsC5J0eCT3gMLqf9TA5M8Q",
  authDomain: "scoutz360demo.firebaseapp.com",
  projectId: "scoutz360demo",
  storageBucket: "scoutz360demo.appspot.com",
  messagingSenderId: "537849473274",
  appId: "1:537849473274:web:6cc282b1f3dc66f1894143",
  measurementId: "G-NQ601C7WBT",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

// JavaScript code

auth.onAuthStateChanged(async function (user) {
  if (user) {
    console.log(user.uid);
    
    const scoutRef = collection(db, "reqscoutdetails");
    const querySnapshot = await getDocs(
      query(scoutRef, where("userid", "==", user.uid))
    );
    // Retrieve the hosttournamentclubs documents
    querySnapshot.forEach((doc) => {
      const scoutads = doc.data();

      // Create a new tournament card
      const scoutCard = document.createElement("div");
      scoutCard.className = "scout-card";

      // Set the tournament name
      const scoutadName = document.createElement("h3");
      scoutadName.className = "scoutad-name";
      scoutadName.textContent = scoutads.playerposition;
      scoutCard.appendChild(scoutadName);
        console.log(scoutads.playerposition);
      // Set the tournament details
      const scoutDetails = document.createElement("div");
      scoutDetails.className = "scout-details";
      scoutDetails.innerHTML = `
        <p>Date: ${scoutads.daterequired}</p>
        <p>Location: ${scoutads.place}</p>
      `;
      scoutCard.appendChild(scoutDetails);

      const registerButton = document.createElement("button");
      registerButton.className = "application-button";
      registerButton.textContent = "View Applications";
      registerButton.addEventListener("click", function() {
        const docId = doc.id; // Get the document ID
        window.location.href = "/Clubs/playersapplied/player.html?docId=" + docId;
      });
      scoutCard.appendChild(registerButton);
      // Append the tournament card to the tournaments section
      const scoutsSection = document.querySelector(".scouting-section");
      scoutsSection.appendChild(scoutCard);

      console.log(doc.id);
    });
  }
});
