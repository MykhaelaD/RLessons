import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Initialize Firebase
const auth = getAuth();
const database = getDatabase();

document.addEventListener("DOMContentLoaded", function() {
    const signUpButton = document.getElementById('signUp');

    signUpButton.addEventListener('click', (e) => {
        e.preventDefault();

        // Get user inputs
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Create user with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                // Save user data to the database
                saveUserData(user.uid, username, email);
                
                alert('User created successfully!');

                // Redirect or perform other actions after successful sign up
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    });
});

function saveUserData(userId, username, email) {
    // Define the path to the user data in the database
    const userRef = ref(database, 'users/' + userId);

    // Set user data
    set(userRef, {
        username: username,
        email: email
    });
}
