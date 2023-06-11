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

    const tableBody = document.querySelector("tbody");

    // Access the "clubApplications" collection in Firestore
    const clubApplicationsRef = collection(db, "clubApplications");

    // Retrieve the club application documents
    getDocs(clubApplicationsRef)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const clubApplication = doc.data();

          // Access the "hosttournamentclubs" subcollection using the appropriate method
          const hostTournamentClubsRef = collection(
            db,
            "clubApplications",
            doc.id,
            "hosttournamentclubs"
          );

          // Retrieve the "hosttournamentclubs" document
          getDocs(hostTournamentClubsRef)
            .then((hostTournamentClubsSnapshot) => {
              if (!hostTournamentClubsSnapshot.empty) {
                const hostTournamentClubsDoc =
                  hostTournamentClubsSnapshot.docs[0];
                const hostTournamentClubs = hostTournamentClubsDoc.data();

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

                console.log(hostTournamentClubs.tournamentName);
                console.log(hostTournamentClubs.date);
                console.log(hostTournamentClubs.place);
                console.log(hostTournamentClubs.prizePool);

                // Set the applied clubs
                const appliedClubs = document.createElement("div");
                appliedClubs.className = "applied-clubs";
                appliedClubs.innerHTML = `
                    <h4>Clubs Applied:</h4>
                    <table>
                      <thead>
                        <tr>
                          <th>Club Name</th>
                          <th>Captain Name</th>
                          <th>Place</th>
                          <th>Phone Number</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${clubApplication.clubs
                          .map(
                            (club) => `
                              <tr>
                                <td>${club.clubName}</td>
                                <td>${club.captainName}</td>
                                <td>${club.place}</td>
                                <td>${club.contactDetails}</td>
                              </tr>
                            `
                          )
                          .join("")}
                      </tbody>
                    </table>
                  `;
                tournamentCard.appendChild(appliedClubs);
                console.log(club.clubName);
                console.log(club.captainName);
                console.log(club.place);
                console.log(club.contactDetails);

                // Append the tournament card to the tournaments section
                const tournamentsSection = document.querySelector(
                  ".tournaments-section"
                );
                tournamentsSection.appendChild(tournamentCard);
              } else {
                console.log(
                  "No hosttournamentclubs document found for club application"
                );
              }
            })
            .catch((error) => {
              console.log("Error getting hosttournamentclubs document:", error);
            });
        });
      })
      .catch((error) => {
        console.log("Error getting clubApplications documents:", error);
      });
  }
});
