import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js'
import { getFirestore, collection, getDocs,query,where } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

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
      // Read data from the 'reqscoutdetails' collection
      const scoutRef = collection(db, 'reqscoutdetails');
      getDocs(scoutRef)
        .then((querySnapshot) => {
          // Generate HTML cards dynamically based on the retrieved data
  
          // Change the selector to target the correct element
          const cardsContainer = document.querySelector(".row");
          cardsContainer.innerHTML = "";
  
          querySnapshot.forEach((doc) => {
            const scout = doc.data();
            const card = document.createElement("div");
            card.className = "col";
            const docid = doc.id;
            console.log(docid);
            card.innerHTML = `
              <section class="card">
                <div class="product-image">
                  <img src="/Images/scoutad.png" alt="Ad" draggable="false" />
                </div>
                <div class="product-info">
                <h2 class="card-title" data-filter="reqSport">Wanted ${scout.reqSport}er</h2>
                  <h2 class="card-title">for ${scout.clubName} Club</h2>
                  <br>
                  <p class="card-text" data-filter="place">Place: ${scout.place}</p>
                  <p class="card-text">Role: ${scout.playerposition}</p>
                  <p class="card-text">Age group: ${scout.age}</p>
                  <p class="card-text">Play Style: ${scout.playstyle}</p>
                  <p class="card-text">Date Required: ${scout.daterequired}</p>
                  <div class="price">Rs.${scout.salary}/Match</div>
                  <div class="btn">
                    <button class="buy-btn" type="button" onclick="window.location.href='../playerApplyform/index.html?reqscoutId=${docid}';">Apply Now</button>
                  </div>
                </div>
              </section>
            `;
  
            cardsContainer.appendChild(card);
          });
        })
        .catch((error) => {
          console.log("Error getting Scout Details: ", error);
        });
  
      // Add event listener to filter radio buttons
      const filterRadios = document.querySelectorAll(".filter");
      filterRadios.forEach((radio) => {
        radio.addEventListener("change", () => {
          const selectedFilter = radio.dataset.filter;
          filterCards(selectedFilter);
        });
      });
    }
  });
  
  function filterCards(filter) {
    const cards = document.querySelectorAll(".card");
  
    cards.forEach((card) => {
      const sport = card.querySelector(".card-text[data-filter='reqSport']").textContent;
      console.log(sport);
      if (filter === "all" || sport === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    // Code here will run after the DOM is fully loaded
  });