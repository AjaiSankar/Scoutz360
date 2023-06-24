import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
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
//const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();
auth.onAuthStateChanged(async function (user) {
  let fieldValue;
  if (user) {

    console.log(user.uid);
    // Reference to the Firestore collection

    const collectionRef = collection(db, "user");
    // Create a query to fetch the documents
    const p = query(collectionRef, where("UserId", "==", user.uid));

    try {
      const querySnapshot = await getDocs(p);

      querySnapshot.forEach((doc) => {
        // Access the desired field from each document
        fieldValue = doc.data().Type;

      });

      if (fieldValue == "player") {
        const usersCollection = collection(db, "PlayerProfileData");
        const q = query(usersCollection, where("userid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        console.log("User ID does not exist in the player collection.");
        if (querySnapshot.empty) {
          console.log("User ID does not exist in the player collection.");
          window.location.href = "../../Profile/create/index.html";
        }
      } else {
        const usersCollection = collection(db, "ClubProfileData");
        const q = query(usersCollection, where("userid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log("User ID does not exist in the club collection.");
          window.location.href = "../../Clubs/createprof/index.html";
        }
      }
      // Query to check if the user ID exists

      console.log("User ID exists in the collection.");
      async function fetchImages() {
        const imagesRef = collection(db, "images");
        const querySnapshot = await getDocs(imagesRef);

        console.log("Total images found:", querySnapshot.size);

        querySnapshot.forEach(async (doc) => {
          const imageURL = doc.data().imageUrl;
          const caption = doc.data().caption;
          const userId = doc.data().userid;

          // Fetch user name from the 'users' collection based on the userId
          const usersCollection = collection(db, "user");
          const userQuery = query(
            usersCollection,
            where("UserId", "==", userId)
          );
          const userQuerySnapshot = await getDocs(userQuery);

          if (!userQuerySnapshot.empty) {
            const userName = userQuerySnapshot.docs[0].data().Name;

            console.log("Image URL:", imageURL);
            console.log("Caption:", caption);
            console.log("User ID:", userId);
            console.log("User Name:", userName);

            // Create an image element
            const imageElement = document.createElement("img");
            imageElement.src = imageURL;
            imageElement.alt = "Player Image";

            // Create a caption paragraph
            const captionParagraph = document.createElement("p");
            captionParagraph.textContent = caption;

            // Create a link element for the user name
            const userLink = document.createElement("a");
            // sessionStorage.setItem("otherUserId", userId);
            //userLink.href = "./otherprofile/index.html"; // Update the URL as needed
            //userLink.textContent = userName;

            userLink.href = `./otherprofile/index.html?userId=${userId}`; // Include the userId in the URL
            userLink.textContent = userName;

            // Create a container div for the image, caption, and user name
            const container = document.createElement("div");
            container.classList.add("image-container");
            container.appendChild(userLink);
            container.appendChild(imageElement);
            container.appendChild(captionParagraph);

            userLink.classList.add("profile-name");
            // Create the options div
const optionsDiv = document.createElement("div");
optionsDiv.classList.add("options");

// Create the like button
const likeButton = document.createElement("button");
likeButton.classList.add("like-button");
likeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 11h3l-4-4-4 4h3v9h2v-9zm-7-9h-2v9H5l4 4 4-4h-3z"/></svg>';

// Create the comment button
const commentButton = document.createElement("button");
commentButton.classList.add("comment-button");
commentButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6l3 4V18h6a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 14h-4V10h-2v8h-4v-8H7v8H3V6h18v12z"/></svg>';

// Create the report button
const reportButton = document.createElement("button");
reportButton.classList.add("report-button");
reportButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12c0 2.93 1.19 5.57 3.11 7.48l1.42-1.42C6.41 15.37 5 13.79 5 12c0-3.86 3.14-7 7-7s7 3.14 7 7c0 1.79-1.41 3.37-3.53 3.46l1.42 1.42C20.81 17.57 22 14.93 22 12c0-5.52-4.48-10-10-10zm-1 14h2v2h-2v-2zm0-8h2v6h-2V8z"/></svg>';



// Append the buttons to the options div
optionsDiv.appendChild(likeButton);
optionsDiv.appendChild(commentButton);
optionsDiv.appendChild(reportButton);

// Append the options div to the container
container.appendChild(optionsDiv);

            // Append the container to the main section
            const mainSection = document.querySelector("main");
            mainSection.appendChild(container);
          }
        });
      }

      fetchImages().catch((error) => {
        console.log("Error fetching images:", error);
      });
    } catch (error) {
      console.log("Error getting documents:", error);
    }
  }
});
