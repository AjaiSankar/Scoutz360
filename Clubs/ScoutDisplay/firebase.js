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
  if (user) 
  {
    // Read data from the 'hosttournaments' collection
    const scoutRef = collection(db, 'reqscoutdetails');
    getDocs(scoutRef)
    .then((querySnapshot) => {
      // Generate HTML cards dynamically based on the retrieved data
      var cardsContainer = document.querySelector(".row-cols-1");
      cardsContainer.innerHTML = "";
      querySnapshot.forEach((doc) => {
        var scout = doc.data();
        var card = document.createElement("div");
        card.className = "col";
        console.log(doc.id);
        const docid=doc.id;
        //sessionStorage.setItem("tournamentid", docid);
        card.innerHTML = `
        <section class="card">
          <div class="product-image">
              <img src="/Images/crciad .png" alt="Cricket" draggable="false" />
          </div>
            <div class="product-info">
              <h2 class="card-title">Club Name: ${scout.clubName}</h2>
              <p class="card-text">Place: ${scout.place}</p>
              <p class="card-text">Role: ${scout.playerposition}</p>
              <p class="card-text">Age group: ${scout.age}</p>
              <p class="card-text">Play Style: ${scout.playstyle}</p>
              <p class="card-text">Date Required: ${scout.daterequired}</p>
              <div class="price">Rs.${scout.salary}/Match</div>
              <div class="btn">
                <button class="buy-btn" type="button" onclick="window.location.href='';">Apply Now</button>
              </div>
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
  }
});