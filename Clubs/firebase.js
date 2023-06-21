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
  getDocs,
  query,
  where,
  onSnapshot,
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
const handlequery=async function(docid){
  console.log(docid);
  const dataCollectionRef=collection(db,"clubApplications",where ("tournamentId","==",docid));
  const querySnapshot=await getDocs(dataCollectionRef);
  for(const doc of querySnapshot.docs){
    console.log(doc.data().clubName);
  }
}
auth.onAuthStateChanged(async function (user) {
  if (user) {
    console.log(user.uid);
    const ClubDetailsContainer = document.querySelector(".club-details");
    const Iquery = query(
      collection(db, "ClubProfileData"),
      where("userid", "==", user.uid)
    );
    // Listen for real-time updates on the "PlayerProfiledata" collection
    onSnapshot(Iquery, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const profilePictureURL = doc.data().ProfilePictureURL;
        const clubName = doc.data().ClubName;
        const sportPlayed = doc.data().ClubSport;
        const coachName = doc.data().CoachName;
        const captainName = doc.data().CaptainName;
        const phoneNumber = doc.data().CMobile;
        const District = doc.data().CDistrict;
        const State = doc.data().CState;
        // Update the profile image source
        const profileImage =
          ClubDetailsContainer.querySelector(".profile-image img");
        console.log(profilePictureURL);
        profileImage.src = profilePictureURL;

        // Update the player name and sport played
        const profileName = ClubDetailsContainer.querySelector(".club-info");
        profileName.innerHTML = `<strong><span style="font-size: 24px;">${clubName}</span></strong><br>${sportPlayed}<br>Place: ${District}, ${State}<br>Coach: ${coachName}<br>Captain: ${captainName}<br>Contact us: ${phoneNumber}`;
      });
    });

    // Access the "hosttournamentclubs" collection in Firestore
    const hostTournamentClubsRef = collection(db, "hosttournamentclubs");

    // Retrieve the hosttournamentclubs documents
    getDocs(hostTournamentClubsRef)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const hostTournamentClubs = doc.data();

          // Create a new tournament card
          const tournamentCard = document.createElement("div");
          tournamentCard.className = "tournament-card";

          // Set the tournament name
          const tournamentName = document.createElement("h3");
          tournamentName.className = "tournament-name";
          tournamentName.textContent = hostTournamentClubs.tournamentName;
          tournamentCard.appendChild(tournamentName);

          // Set the tournament details
          const tournamentDetails = document.createElement("div");
          tournamentDetails.className = "tournament-details";
          tournamentDetails.innerHTML = `
        <p>Date: ${hostTournamentClubs.date}</p>
        <p>Location: ${hostTournamentClubs.place}</p>
        <p>Prize: ${hostTournamentClubs.prizePool}</p>
      `;
          tournamentCard.appendChild(tournamentDetails);

          // Append the tournament card to the tournaments section
          const tournamentsSection = document.querySelector(
            ".tournaments-section"
          );
          tournamentsSection.appendChild(tournamentCard);

          
          handlequery(doc.id);


        });
      })
      .catch((error) => {
        console.log("Error getting hosttournamentclubs documents:", error);
      });
     
  }
});

