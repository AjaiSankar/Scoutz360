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

const cardsContainer = document.querySelector(".row-cols-1");
const allFilterButton = document.querySelector("[data-filter='all']");
const cricketFilterButton = document.querySelector("[data-filter='cricket']");
const footballFilterButton = document.querySelector("[data-filter='football']");

// Function to filter tournaments based on their "tournamentSport" field
function filterTournaments(sportFilter) {
  const tournamentsRef = collection(db, 'hosttournamentclubs');
  getDocs(tournamentsRef)
    .then((querySnapshot) => {
      cardsContainer.innerHTML = "";
      querySnapshot.forEach((doc) => {
        const tournament = doc.data();
        if (sportFilter === 'all' || tournament.tournamentSport === sportFilter) {
          var card = document.createElement("div");
          card.className = "col";
          console.log(doc.id);
          const docid = doc.id;
          //sessionStorage.setItem("tournamentid", docid);
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
                <button class="glow-on-hover" type="button" onclick="window.location.href='/Tournaments/Find/apply/apply.html?tournamentId=${docid}';">
                  Apply Now</button>
              </div>
            </div>
          `;
          cardsContainer.appendChild(card);
        }
      });
    })
    .catch((error) => {
      console.log("Error getting tournaments: ", error);
    });
}

// Event listener for the "All" filter button
allFilterButton.addEventListener("click", function () {
  filterTournaments("all");
});

// Event listener for the "Cricket" filter button
cricketFilterButton.addEventListener("click", function () {
  filterTournaments("Cricket");
});

// Event listener for the "Football" filter button
footballFilterButton.addEventListener("click", function () {
  filterTournaments("Football");
});

auth.onAuthStateChanged(async function (user) {
  if (user) {
    // Load all tournaments initially (when the page loads)
    filterTournaments("all");
  }
});