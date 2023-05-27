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

// Read data from the 'hosttournaments' collection
const tournamentsRef = collection(db, 'hosttournamentclubs');
getDocs(tournamentsRef)
  .then((querySnapshot) => {
    // Generate HTML cards dynamically based on the retrieved data
    var cardsContainer = document.querySelector(".row-cols-1");
    cardsContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      var tournament = doc.data();
      var card = document.createElement("div");
      card.className = "col";
      card.innerHTML = `
        <div class="card">
          <img src="${tournament.posterURL}" class="card-img-top" alt="${tournament.name} Poster">
          <div class="card-body">
            <h5 class="card-title">${tournament.tournamentName}</h5>
            <p class="card-text">Venue: ${tournament.place}</p>
            <p class="card-text">Date: ${tournament.date}</p>
            <p class="card-text">Prize pool: ${tournament.prizePool}</p>
            <p class="card-text">${tournament.conditions}</p>
            <div class="entry-fee-box">
              <span class="entry-fee-tag">Entry Fee</span>
              <span class="entry-fee">${tournament.entryFee}</span>
            </div>
            <button class="glow-on-hover" type="button" onclick="window.location.href='/Tournaments/Find/apply/apply.html';">
              Apply Now</button>
          </div>
        </div>
      `;
      cardsContainer.appendChild(card);
    });
  })
  .catch((error) => {
    console.log("Error getting tournaments: ", error);
  });
