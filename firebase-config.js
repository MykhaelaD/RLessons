import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
//import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getStorage, ref as storageRef } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1Z5pF1K2rfmByfUsyIWQnLyyJSL31R6w",
    authDomain: "authentication-app-3fc56.firebaseapp.com",
    databaseURL: "https://authentication-app-3fc56-default-rtdb.firebaseio.com",
    projectId: "authentication-app-3fc56",
    storageBucket: "authentication-app-3fc56.appspot.com",
    messagingSenderId: "146383045860",
    appId: "1:146383045860:web:ad9780ac6c0c6e90b898f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const auth = getAuth();

const storage = getStorage();
const storageReference = storageRef(storage);

export function registerUser(email, password, username) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return user;
        })
        .catch((error) => {
            throw error;
        });
}