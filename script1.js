import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, set, ref, update} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
//import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";


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

document.addEventListener('DOMContentLoaded', function() {
    const btnSignOut = document.getElementById('btnSignOut');

    if (!window.wrapper) {
        window.wrapper = document.querySelector('.wrapper');
    }
    console.log('DOM content loaded');

    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    const iconClose = document.querySelector('.icon-close');

    /*
    console.log('Login link:', loginLink);
    console.log('Register link:', registerLink);
    console.log('Icon close:', iconClose);


    registerLink.addEventListener('click', ()=> {
        wrapper.classList.add('active');
    });

    loginLink.addEventListener('click', ()=> {
        wrapper.classList.remove('active');
    });

    iconClose.addEventListener('click', ()=> {
        wrapper.classList.remove('active-popup');
    });

    const users = [];

    function registerUser(username, email, password) {

        users.push({ username, email, password });
        console.log(`Registered user: ${username} with email: ${email}`);
        window.location.href = 'home.html';
    }
    */

    /*
    document.addEventListener('DOMContentLoaded', function() {

        const btnSignOut = document.getElementById('btnSignOut');
        console.log('Sign-out button:', btnSignOut);

        if (btnSignOut) {
            btnSignOut.addEventListener('click', async function(event) {
                try {
                    await signOut(auth);
                    alert('Logout successful!');
                    window.location.href = 'index.html';
                } catch (error) {
                    alert(error.message);
                    console.error(error);
                }
            });
        } else {
            console.error('btnSignOut element not found');
        }
    
    });
    */
    // Add event listener for logout button
    //const btnSignOut = document.getElementById('btnSignOut');
    if (btnSignOut) {
        btnSignOut.addEventListener('click', async function(event) {
            try {
                await signOut(auth);
                alert('Logout successful!');
                window.location.href = 'index.html'; // Redirect to the login page or any other appropriate page
            } catch (error) {
                const errorMessage = error.message;
                alert(errorMessage); // Display authentication error message
                console.error(error);
            }
        });
    } else {
        console.error('btnSignOut element not found');
    }

    
});
