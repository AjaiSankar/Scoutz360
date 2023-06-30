import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "AIzaSyDIh1tbO5WYQOsC5J0eCT3gMLqf9TA5M8Q",
  authDomain: "scoutz360demo.firebaseapp.com",
  projectId: "scoutz360demo",
  storageBucket: "scoutz360demo.appspot.com",
  messagingSenderId: "537849473274",
  appId: "1:537849473274:web:6cc282b1f3dc66f1894143",
  measurementId: "G-NQ601C7WBT",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);

auth.onAuthStateChanged(async function (user) {
  if (user) {
    const ScoutRef = collection(db, "ReqScoutApplications");
    getDocs(ScoutRef)
      .then((querySnapshot) => {
        console.log(ScoutRef);
        var cardsContainer = document.querySelector(".row-cols-1");
        cardsContainer.innerHTML = "";
        querySnapshot.forEach(async (doc) => {
          var scout = doc.data();
          var card = document.createElement("div");
          card.className = "col";
          const reqId = scout.reqscoutId;
          console.log(reqId);

          // Assuming you are in the other firebase.js file

          // Get the value of 'docId' from the URL parameters
          const urlParams = new URLSearchParams(window.location.search);
          const docId = urlParams.get("docId");

          // Now you can use the 'docId' variable in your code
          console.log(docId); // Output the value of 'docId' for testing purposes

          // Get the image URL from 'PlayerProfileData' collection
          const playerRef = collection(db, "PlayerProfileData");
          const playerQuerySnapshot = await getDocs(playerRef);
          playerQuerySnapshot.forEach((playerDoc) => {
            const playerData = playerDoc.data();
            const imageURL = playerData.ProfilePictureURL;
            console.log(imageURL);
            // ...

            if (reqId === docId && scout.userid === playerData.userid) {
              card.innerHTML = `
    <div class="card">
      <img src="${imageURL}" class="card-img-top" alt="${scout.name} Poster">
      <div class="card-body">
        <h5 class="card-title">${scout.name}</h5>
        <p class="card-text">Age: ${scout.age}</p>
        <p class="card-text">${scout.extradetails}</p>
        <button class="glow-on-hover view-profile-button" data-userid="${playerData.userid}">
          View Profile
        </button>
      </div>
    </div>
  `;
              cardsContainer.appendChild(card);

              // Attach event listener to the button within the card
              const viewProfileButton = card.querySelector(
                ".view-profile-button"
              );
              const userId = viewProfileButton.getAttribute("data-userid");
              viewProfileButton.addEventListener("click", () => {
                window.location.href = `../../login/Feed/otherprofile/index.html?userId=${userId}`;
              });
            }

            // ...
          });
        });

        // Attach event listener to dynamically created buttons
        // const viewProfileButtons = document.querySelectorAll(".view-profile-button");
        // viewProfileButtons.forEach((button) => {
        //   const userId = button.getAttribute("data-userid");
        //   button.addEventListener("click", () => {
        //     const userLink = document.createElement("a");
        //     userLink.href = `../../login/Feed/otherprofile/index.html?userId=${userId}`; // Include the userId in the URL
        //     userLink.click();
        //   });
        // });
      })
      .catch((error) => {
        console.log("Error getting tournaments: ", error);
      });
  }
});
