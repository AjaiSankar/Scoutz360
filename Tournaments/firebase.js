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
      console.log(fieldValue);
      if (fieldValue == "player") {
        document.getElementById("hosttour").style.display = "none";
      }
    } catch (error) {
      console.log("Error getting documents:", error);
    }
  }
});
