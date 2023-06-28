import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
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
    console.log(user.uid);
    console.log(user.uid);
    const playerDetailsContainer = document.querySelector(".player-details");
    const Iquery = query(
      collection(db, "PlayerProfileData"),
      where("userid", "==", user.uid)
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

    const profile = collection(db, "images");
    const profileSnapshot = await getDocs(query(profile, where("userid", "==", user.uid)));
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

    const bquery = query(
      collection(db, "PlayerProfileData"),
      where("userid", "==", user.uid)
    );

    onSnapshot(bquery, (querySnapshot) => {
      const popupContent = document.querySelector(".popup .popup-content");
      // Clear existing cards
      popupContent.innerHTML = "";

      querySnapshot.forEach((doc) => {
        const { Email, PMobile, PDistrict } = doc.data();
        console.log(Email);
        console.log(PMobile);
        console.log(PDistrict);

        // Create HTML elements to display the data
        const emailElement = document.createElement("div");
        emailElement.classList.add("contact-info-item");
        emailElement.innerHTML = `
          <svg class="contact-info-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path fill="#F44336" d="M21.3 3H2.7C1.04 3 0 4.04 0 5.7v12.6C0 19.96 1.04 21 2.7 21h18.6c1.66 0 2.7-1.04 2.7-2.7V5.7C24 4.04 22.96 3 21.3 3zm0 14.3H2.7V7.04l9.3 5.8 9.3-5.8V17.3zm0-12.58L12 10.3 2.7 4.72V5.7L12 11l9.3-5.3v-.98zM2.7 5.7v.98L12 10.3l9.3-3.62v-.98H2.7z"/>
          </svg>
          <span class="contact-label">Email:</span>
          <span class="contact-value">${Email}</span>
        `;
        popupContent.appendChild(emailElement);

        const phoneElement = document.createElement("div");
        phoneElement.classList.add("contact-info-item");
        phoneElement.innerHTML = `
          <img class="contact-info-icon" src="/Images/phone.png" alt="Phone Icon" width="24" height="24">
          <span class="contact-label">Phone:</span>
          <span class="contact-value">${PMobile}</span>
        `;
        popupContent.appendChild(phoneElement);

        const placeElement = document.createElement("div");
        placeElement.classList.add("contact-info-item");
        placeElement.innerHTML = `
          <img class="contact-info-icon" src="/Images/place.jpg" alt="Place Icon" width="24" height="24">
          <span class="contact-label">Place:</span>
          <span class="contact-value">${PDistrict}</span>
        `;
        popupContent.appendChild(placeElement);
      });
    });

    // Call the listenForPlayerData function when the contact info popup is opened
    const contactInfoButton = document.querySelector(".contact-info-button");
    const contactInfoPopup = document.querySelector(".popup.contact-info-popup");
    const closePopupButton = contactInfoPopup.querySelector(".close-popup");

    const openContactInfoPopup = () => {
      contactInfoPopup.classList.add("open");
      // You can add any additional logic here when the popup is opened
    };

    contactInfoButton.addEventListener("click", openContactInfoPopup);
    closePopupButton.addEventListener("click", () => {
      contactInfoPopup.classList.remove("open");
    });
  } else {
    console.log("User is signed out");
  }
});