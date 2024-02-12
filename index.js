// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABxSUHqekjFDhnyFGFKQd3weF-YaKw4ls",
  authDomain: "seniorproject-7e271.firebaseapp.com",
  databaseURL: "https://seniorproject-7e271-default-rtdb.firebaseio.com",
  projectId: "seniorproject-7e271",
  storageBucket: "seniorproject-7e271.appspot.com",
  messagingSenderId: "449257268811",
  appId: "1:449257268811:web:5c7b798acb6aff00758fce",
  measurementId: "G-TXKSFRLVBJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

document.addEventListener("DOMContentLoaded", function() {
    const signUp = document.getElementById('signUp');
    signUp.addEventListener('click', (e)=> { //check if this should be register link!!
        var username = document.getElementById('username').value;
        var email = document.getElementById('email1').value;
        var password = document.getElementById('password1').value;


        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log("Hello1")
                set(ref(database, 'users/' + user.uid),{ //uid is the unique ID
                    username: username, //saving the username to the database
                    email: email //saving the email to the database
                    //never save your password to the database
            })
                console.log("Hello2")
                alert('user created!');
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                alert(errorMessage);
                // ..
            });
    });

});
