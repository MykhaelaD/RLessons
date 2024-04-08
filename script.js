import { registerUser } from "./firebase-config.js";
//import { loginUser } from "./firebase-config.js";


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, set, ref, update} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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
    const wrapper = document.querySelector('.wrapper');
    console.log('Wrapper:', wrapper);
    const loginLink = document.querySelector('.login-link');
    console.log('Login link:', loginLink);
    const registerLink = document.querySelector('.register-link');
    console.log('Register link:', registerLink);
    const btnPopup = document.querySelector('.btnLogin-popup');
    console.log('Button Login popup:', btnPopup);
    const iconClose = document.querySelector('.icon-close');
    console.log('Icon close:', iconClose);
    
    // Event listeners
    registerLink.addEventListener('click', () => {
        wrapper.classList.add('active');
        // Additional functionality for registration click event
    });
    
    loginLink.addEventListener('click', () => {
        wrapper.classList.remove('active');
    });
    
    btnPopup.addEventListener('click', () => {
        wrapper.classList.add('active-popup');
    });
    
    iconClose.addEventListener('click', () => {
        wrapper.classList.remove('active-popup');
    });

    // Function to handle user registration
    async function registerUser(username, email, password) {
        try {
            // Create user with Firebase authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Store additional user data in the database
            await set(ref(database, 'users/' + user.uid), {
                username: username,
                email: email
            });

            alert('User registered successfully! Please login.');
            window.location.reload(); // Reload the page
        } catch (error) {
            alert(error.message); // Display Firebase authentication error message
            console.error(error);
        }
    }

    // Event listener for registration form submission
    document.getElementById('signUp').addEventListener('click', async function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email1').value;
        const password = document.getElementById('password1').value;

        // Check password length
        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }
        // Register user
        await registerUser(username, email, password);
    });

    // Event listener for login form submission
    document.getElementById('loginButton').addEventListener('click', async function(event) {
        event.preventDefault(); // Prevent default form submission
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            // Sign in user with Firebase authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // Get the current timestamp
            const lastLoginTime = new Date().toISOString();
            //alert('Login successful!');
            //window.location.href = 'home.html'; // Redirect to home page
            await update(ref(database, 'users/' + user.uid), {
                last_login: lastLoginTime,
            });
    
            alert('Login successful!');
            window.location.href = 'home.html'; // Redirect to home page
        } catch (error) {
            alert(error.message); // Display authentication error message
            console.error(error);
        }
    });

    const user = auth.currentUser;
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, send username to Shiny
            const uid = user.uid;
            const email = user.email;
            const username = user.username; // Assuming username is part of user object
            console.log("User Info:", { uid: uid, email: email, username: username });
            Shiny.setInputValue('loggedInUserInfo', { uid: uid, email: email, username: username });
        } else {
            // User is signed out
            // Clear username in Shiny (if needed)
            console.log("User is signed out");
            Shiny.setInputValue('loggedInUserInfo', null);
        }

        // Send user information to Shiny app
        function sendUserInfoToShiny(uid, email, username) {
            Shiny.setInputValue('loggedInUserInfo', { uid: uid, email: email, username: username });
}
});

      /*
    logout.addEventListener('click', (e)=>{
        signOut(auth).then(() => {
            // Sign-out successful.
            alert('User logged out');
          }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                alert(errorMessage);

          });
    });
    */
    /*
    document.addEventListener('DOMContentLoaded', function() {
        const loginButton = document.getElementById('loginButton');
        if (loginButton) {
            loginButton.addEventListener('click', async function(event) {
                event.preventDefault(); // Prevent default form submission behavior
                
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                try {
                    // Attempt to sign in user with Firebase authentication
                    const userCredential = await signInWithEmailAndPassword(auth, email, password);
                    const user = userCredential.user;
    
                    // Update last login time in the database
                    const dt = new Date();
                    await update(ref(database, 'users/' + user.id), {
                        last_login: dt,
                    });
    
                    alert('User logged in!');
                    // Redirect the user or perform other actions after successful login
                } catch (error) {
                    const errorMessage = error.message;
                    alert(errorMessage); // Display authentication error message
                    console.error(error);
                }
            });
        } else {
            console.error('loginButton element not found');
        }
    });
    */
    

    /*
    loginLink.addEventListener('click', (e)=>{
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const dt = new Date();
            update(ref(database, 'users/' + user.id),{
                last_login: dt,
            })

                alert('User logged in!');
            // ...
            })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            });

    });
     */
    
});