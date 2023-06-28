import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  doc,
  getDoc,
  deleteDoc,
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
      // Retrieve the number of documents in PlayerProfileData, ClubProfileData, and academies collections
      async function getDocumentCounts() {
        try {
          const playerProfileSnapshot = await getDocs(
            collection(db, "PlayerProfileData")
          );
          const clubProfileSnapshot = await getDocs(
            collection(db, "ClubProfileData")
          );
          const academiesSnapshot = await getDocs(collection(db, "academies"));
  
          const playerProfileCount = playerProfileSnapshot.size;
          const clubProfileCount = clubProfileSnapshot.size;
          const academiesCount = academiesSnapshot.size;
  
          // Update the chart data
          profilesChart.data.datasets[0].data = [
            playerProfileCount,
            clubProfileCount,
            academiesCount,
          ];
          profilesChart.update();
        } catch (error) {
          console.error("Error retrieving document counts:", error);
        }
      }
  
      // Call the function to retrieve document counts and update the chart
      getDocumentCounts();
  
      // Retrieve the number of documents in clubApplications and hosttournamentclubs collections
      async function getTournamentCounts() {
        try {
          const clubApplicationsSnapshot = await getDocs(
            collection(db, "clubApplications")
          );
          const hostTournamentClubsSnapshot = await getDocs(
            collection(db, "hosttournamentclubs")
          );
  
          const clubApplicationsCount = clubApplicationsSnapshot.size;
          const hostTournamentClubsCount = hostTournamentClubsSnapshot.size;
  
          // Update the chart data
          tournamentsChart.data.datasets[0].data = [
            hostTournamentClubsCount,
            clubApplicationsCount,
          ];
          tournamentsChart.update();
        } catch (error) {
          console.error("Error retrieving tournament counts:", error);
        }
      }
  
      // Call the function to retrieve tournament counts and update the chart
      getTournamentCounts();
    }
  });