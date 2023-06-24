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
      console.log(user.uid);
      const videosRef = collection(db, 'videos');
      const videosSnapshot = await getDocs(query(videosRef, where("userid", "==", user.uid)));
      const videosContainer = document.querySelector(".videos-container");
      videosContainer.innerHTML = "";
  
      videosSnapshot.forEach((doc) => {
        const videoData = doc.data();
        const videoCard = document.createElement("div");
        videoCard.className = "video-card";
        videoCard.innerHTML = `
          <div class="video-container">
            <video src="${videoData.videoUrl}" controls></video>
            <div class="caption">
              <h3>${videoData.caption}</h3>
            </div>
          </div>
        `;
        videosContainer.appendChild(videoCard);
      });
    }
  });