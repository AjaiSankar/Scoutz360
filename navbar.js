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
  onSnapshot,
  where,
  query,
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
    // Navbar.js
    console.log(user.uid);
    // Function to redirect to the appropriate profile page
    function redirectToProfile(type) {
      switch (type) {
        case "club":
          console.log("Club");
          window.location.href = "../../Clubs/index.html";
          break;
        case "player":
          console.log("Player");
          window.location.href = "../../Profile/index.html";
          break;
        default:
            console.log("User type not found");
      }
    }

    // Event listener for the "My Profile" link
    // document.addEventListener("DOMContentLoaded", function () {
    //   var profileLink = document.querySelector(
    //     '.nav-link[href*="Profile/index.html"]'
    //   );
    const profileLink = document.getElementById("profile-type");
    profileLink.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default link behavior
      console.log("Button Working")
      // Assuming you have access to the current user's ID
      var userId = user.uid; // Replace with your actual user ID retrieval code

      // Create a query to get the specific user document
      const userQuery = query(
        collection(db, "user"), where("UserId", "==", userId)
      );

      // Real-time listener for changes to the user document
      onSnapshot(
        userQuery,
        function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            if (doc.data().UserId == userId) {
              var user = doc.data();
              console.log(user);
              console.log(user.Type)
              var profileType = user.Type;
              redirectToProfile(profileType);
            }
            else{
              console.log("User does not exist")
            }
          });
        },
        function (error) {
          console.log("Error listening to users collection:", error);
        }
      );
    });
    // });
  }
});
