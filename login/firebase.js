import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js'
import { getFirestore, addDoc, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js'

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
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();
console.log(app)
document.getElementById("login").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission
  var email = document.getElementById("emaillogin").value;
  var password = document.getElementById("passwordlogin").value;
  
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in successfully
      const user = userCredential.user;
      console.log(user);
      //alert(user.email + " Login successful!");
      // Redirect to the desired page
      //window.location.href = "./student/index.html";
      if(user.uid=='5w3QtqWjjSOazqmwX7teQEEPB6k2'){
        window.location.href = "./test/index.html";
      }
      else{
        window.location.href = "./Feed/index.html";
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    });
});
// For new registration
document.getElementById("register").addEventListener("click", async function (event) {
  event.preventDefault(); // Prevent form submission
  var email = document.getElementById("email").value;
  var password1 = document.getElementById("password").value;
  var name = document.getElementById("name").value;
//   var department = document.getElementById("departmentRegister").value;
//   var phno = document.getElementById("phnoRegister").value;
  var password2 = document.getElementById("confirmPassword").value;
  
  if (!validatePassword(password1, password2)) {
    return; // Prevent form submission
  }
  createUserWithEmailAndPassword(auth, email, password1)
    .then(async (userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      alert("Registration successfully!!");
      try {
        const collectionRef = collection(db, "user");
        const docRef = await addDoc(collectionRef, {
          UserId: user.uid,
          Name: name,
        //   Phno: phno,
        //   Dept: department
        });
        console.log("Document written with ID: ", docRef.id);
        //alert("Form submitted");
        location.reload();
      } catch (error) {
        console.error(error);
        alert("Error adding document");
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorMessage);
      alert(error);

    });

  // Additional validation or form submission logic can be added here
});


function validatePassword(password1, password2) {
  if (password1 === password2) {
    return true; // Passwords match
  } else {
    alert("Password does not match the confirmation.");
    return false; // Passwords do not match
  }
}