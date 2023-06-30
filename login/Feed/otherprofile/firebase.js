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
  getDocs,
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
    console.log(user.uid);
    const urlParams = new URLSearchParams(window.location.search);
    
    // Retrieve the userId parameter
    const userId = urlParams.get("userId");
    //sessionStorage.setItem('userId', userId);
    // Use the userId as needed
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
        const profileImage =
          playerDetailsContainer.querySelector(".profile-image img");
        console.log(profilePictureURL);
        profileImage.src = profilePictureURL;

        // Update the player name and sport played
        const profileName =
          playerDetailsContainer.querySelector(".profile-name");
        profileName.innerHTML = `${playerName}<br>${sportPlayed}<br>${playerAge}<br>${pDistrict},${pState}`;
      });
    });

    var aboutTextArea = document.getElementById("about");
    var aboutParagraph = document.querySelector(".profile-card p");

    // Check if a document already exists for the user in the collection
    const querySnapshot = await getDocs(
      query(collection(db, "AboutData"), where("userid", "==", userId))
    );
    if (!querySnapshot.empty) {
      // If a document exists, retrieve the data and populate the textarea and paragraph
      const documentData = querySnapshot.docs[0].data();
      aboutTextArea.value = documentData.About;
      aboutParagraph.textContent = documentData.About;
    }

    const ul = document.querySelector(".profile-card ul");

    // Create a query for real-time updates on the "ExperienceData" collection with the user's ID filter
    const Cquery = query(
      collection(db, "ExperienceData"),
      where("userid", "==", userId)
    );

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
    const aquery = query(
      collection(db, "PlayersAchievements"),
      where("userid", "==", userId)
    );

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
    const bquery = query(
      collection(db, "PlayerProfileData"),
      where("userid", "==", userId)
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

    const collectionRef = collection(db, "PlayerProfileData");

    // Call the listenForPlayerData function when the contact info popup is opened
    const contactInfoButton = document.querySelector(".contact-info-button");
    const contactInfoPopup = document.querySelector(
      ".popup.contact-info-popup"
    );
    const closePopupButton = contactInfoPopup.querySelector(".close-popup");

    closePopupButton.addEventListener("click", () => {
      contactInfoPopup.classList.remove("open");
    });
   

  }
});
