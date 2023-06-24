// Firebase initialization code (same as your provided code)
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

auth.onAuthStateChanged(async function (user) {
  if (user) {
    console.log(user.uid);
    const urlParams = new URLSearchParams(window.location.search);
    const docId = urlParams.get("docId");
    console.log(docId); // Display the document ID in the console

    // Get a reference to the "clubApplications" collection in Firestore
    const clubApplicationsRef = collection(db, "clubApplications");

    // Fetch the data and check if the docId matches the tournamentId
    const querySnapshot = await getDocs(
      query(clubApplicationsRef, where("tournamentId", "==", docId))
    );

    if (querySnapshot.empty) {
      // If no matching document found, handle the error or show a message
      console.log("No matching document found");
      return;
    }

    querySnapshot.forEach((doc) => {
      const clubName = doc.data().clubName;
      const place = doc.data().place;
      const captain = doc.data().captainName;
      const phone = doc.data().contactDetails;

      // Create a new card element
      const card = document.createElement("div");
      card.className = "card";

      // Set the content of the card
      card.innerHTML = `
        <p>Club Name</p>
        <h3>${clubName}</h3>
        <p>Place</p>
        <h3>${place}</h3>
        <p>Captain</p>
        <h3>${captain}</h3>
        <p>Phone</p>
        <h3>${phone}</h3>
      `;

      // Append the card to the container
      const container = document.querySelector(".container");
      container.appendChild(card);
    });
  }
});
