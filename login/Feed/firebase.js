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
