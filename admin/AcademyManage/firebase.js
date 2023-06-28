import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  where,
  query,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";

const firebaseConfig = {
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
const db = getFirestore();
const storage = getStorage(app);

// Get the tournament form element
var form = document.getElementById("academy-data");

auth.onAuthStateChanged(async function (user) {
  if (user) {
    const form = document.getElementById("academy-data");
    form.addEventListener("submit", submitForm);

    function submitForm(event) {
      event.preventDefault();

      // Get the form values
      const academyName = document.getElementById("academy-name").value;
      const sport = document.getElementById("sport").value;
      const place = document.getElementById("place").value;
      const location = document.getElementById("location").value;
      const mobile = document.getElementById("mobile-number").value;
      const academyFee = document.getElementById("academy-fee").value;

      // Create a new document in the "academies" collection
      addDoc(collection(db, 'academies'),{
          academyName: academyName,
          sport: sport,
          place: place,
          location: location,
          mobileNumber: mobile,
          academyFee: academyFee,
        })
        .then(() => {
          // Clear the form after successful submission
          form.reset();
          console.log("Academy data added to Firestore");
        })
        .catch((error) => {
          console.error("Error adding academy data to Firestore: ", error);
        });
    }
  }
});
