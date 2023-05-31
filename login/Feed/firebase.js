import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js'
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js'
import { getFirestore, addDoc, collection, getDocs,query ,where} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js'

const firebaseConfig = {
    apiKey: "AIzaSyDIh1tbO5WYQOsC5J0eCT3gMLqf9TA5M8Q",
    authDomain: "scoutz360demo.firebaseapp.com",
    projectId: "scoutz360demo",
    storageBucket: "scoutz360demo.appspot.com",
    messagingSenderId: "537849473274",
    appId: "1:537849473274:web:6cc282b1f3dc66f1894143",
    measurementId: "G-NQ601C7WBT"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

auth.onAuthStateChanged(async function (user) {
    if (user) {
      console.log(user.uid);
      
      // Reference to the Firestore collection
      const usersCollection = collection(db, 'PlayerProfileData');
  
      // Query to check if the user ID exists
      const q = query(usersCollection, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.log('User ID does not exist in the collection.');
        window.location.href = "../../Profile/create/index.html";
      } else {
        console.log('User ID exists in the collection.');
      }
    }
  });
