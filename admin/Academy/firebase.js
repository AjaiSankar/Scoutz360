import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js'
import { getFirestore, collection, getDocs,onSnapshot, doc,getDoc, deleteDoc} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

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

function deleteAcademyDocument(docId) {
    var academyRef = doc(db, "academies", docId);
    deleteDoc(academyRef)
      .then(function () {
        console.log("Document successfully deleted!");
        // Show alert when document is successfully deleted
        alert("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error deleting document: ", error);
      });
  }

auth.onAuthStateChanged(async function (user) {
    if (user) {
      const academiesCollection = collection(db, "academies");
  
      // Listen for real-time updates on the academies collection
      onSnapshot(academiesCollection, function (querySnapshot) {
        querySnapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            var sport = change.doc.data().sport;
            var academyName = change.doc.data().academyName;
            var academyFee = change.doc.data().academyFee;
            var docId = change.doc.id;
  
            // Create a new courses container
            var coursesContainer = document.createElement("div");
            coursesContainer.className = "courses-container";
  
            // Create the course div
            var courseDiv = document.createElement("div");
            courseDiv.className = "course";
  
            // Create the course preview section
            var coursePreview = document.createElement("div");
            coursePreview.className = "course-preview";
  
            var sportHeading = document.createElement("h6");
            sportHeading.textContent = sport;
  
            var academyNameHeading = document.createElement("h2");
            academyNameHeading.textContent = academyName;
  
            var viewContactLink = document.createElement("a");
            viewContactLink.href = "#";
            viewContactLink.onclick = function () {
              showContactPopup(docId);
            };
            viewContactLink.innerHTML = "View Contact <i class='fas fa-chevron-right'></i>";
  
            coursePreview.appendChild(sportHeading);
            coursePreview.appendChild(academyNameHeading);
            coursePreview.appendChild(viewContactLink);
  
            // Create the course info section
            var courseInfo = document.createElement("div");
            courseInfo.className = "course-info";
  
            var experiencedTrainingHeading = document.createElement("h6");
            experiencedTrainingHeading.textContent = "Experienced Training";
  
            var improveSkillsHeading = document.createElement("h2");
            improveSkillsHeading.textContent = "Improve your skills and get scouted easily.";
  
            var trainingBatchesHeading = document.createElement("h4");
            trainingBatchesHeading.textContent = "Daily and Weekly training batches";
  
            var deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.addEventListener("click", function () {
            deleteAcademyDocument(docId);
          });
  
            var priceButton = document.createElement("button");
            priceButton.className = "btn";
            priceButton.textContent = "Rs " + academyFee + "/Month";
  
            courseInfo.appendChild(experiencedTrainingHeading);
            courseInfo.appendChild(improveSkillsHeading);
            courseInfo.appendChild(trainingBatchesHeading);

            courseInfo.appendChild(deleteButton);
            courseInfo.appendChild(priceButton);
  
            // Append course preview and info to the course div
            courseDiv.appendChild(coursePreview);
            courseDiv.appendChild(courseInfo);
  
            // Append the course div to the courses container
            coursesContainer.appendChild(courseDiv);
  
            // Append the courses container to the document body
            document.getElementById("coursesContainer").appendChild(coursesContainer);
          }
        });
      }, function (error) {
        console.log("Error getting real-time updates for academies: ", error);
      });
    }
  });
  
  function showContactPopup(docId) {
    var academyRef = doc(db, "academies", docId);
    getDoc(academyRef).then(function (doc) {
      if (doc.exists()) {
        var academyData = doc.data();
        var academyName = academyData.academyName;
        var academylocation = academyData.location;
        var academyplace = academyData.place;
        var academyPhone = academyData.mobileNumber;
  
        var contactPopup = document.getElementById("contactPopup");
        contactPopup.style.display = "block";
        var popupContent = contactPopup.querySelector(".popup-content");
        popupContent.innerHTML = `
          <h2>${academyName}</h2>
          <p>${academylocation}</p>
          <p>${academyplace}</p>
          <p>Phone: ${academyPhone}</p>
          <a href="#" onclick="hideContactPopup()">Close</a>
        `;
      }
    }).catch(function (error) {
      console.log("Error getting academy document:", error);
    });
  }
  
  function hideContactPopup() {
    var contactPopup = document.getElementById("contactPopup");
    contactPopup.style.display = "none";
  }