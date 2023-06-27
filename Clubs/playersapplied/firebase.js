import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js'
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

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
    const ScoutRef = collection(db, 'ReqScoutApplications');
    getDocs(ScoutRef).then((querySnapshot) => {
      console.log(ScoutRef);
      var cardsContainer = document.querySelector(".row-cols-1");
      cardsContainer.innerHTML = "";
      querySnapshot.forEach(async (doc) => {
        var scout = doc.data();
        var card = document.createElement("div");
        card.className = "col";
        console.log(doc.id);
        // Get the image URL from 'PlayerProfileData' collection
        const playerRef = collection(db, 'PlayerProfileData');
        const playerQuerySnapshot = await getDocs(playerRef);
        playerQuerySnapshot.forEach((playerDoc) => {
          //if (playerDoc.id == doc.id) {
            const playerData = playerDoc.data();
            scout.imageURL = playerData.ProfilePictureURL;
            console.log(scout.imageURL);
            card.innerHTML = `
              <div class="card">
                <img src="${scout.imageURL}" class="card-img-top" alt="${scout.pname} Poster">
                <div class="card-body">
                  <h5 class="card-title">${scout.pname}</h5>
                  <p class="card-text">Age: ${scout.age}</p>
                  <p class="card-text">${scout.extradetails}</p>
                  <button class="glow-on-hover" type="button" onclick="window.location.href='';">
                    View Profile</button>
                </div>
              </div>
            `;
            cardsContainer.appendChild(card);
          //}
        });
      });
    })
    .catch((error) => {
      console.log("Error getting tournaments: ", error);
    });
  }
});
