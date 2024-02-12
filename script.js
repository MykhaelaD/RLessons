//const wrapper = document.querySelector('.wrapper');
// script.js
document.addEventListener('DOMContentLoaded', function() {


    if (!window.wrapper) {
        window.wrapper = document.querySelector('.wrapper');
    }
 
 
 // Rest of your script...
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    console.log('Register link:', registerLink);
    const btnPopup = document.querySelector('.btnLogin-popup');
    const iconClose = document.querySelector('.icon-close');
 
 
 
 
    registerLink.addEventListener('click', ()=> {
        wrapper.classList.add('active');
    });
 
 
    loginLink.addEventListener('click', ()=> {
        wrapper.classList.remove('active');
    });
 
 
    btnPopup.addEventListener('click', ()=> {
        wrapper.classList.add('active-popup');
    });
 
 
    iconClose.addEventListener('click', ()=> {
        wrapper.classList.remove('active-popup');
    });
 
 
    // Simulated user data storage
    const users = [];
 
 
    // Function to handle registration
    function registerUser(username, email, password) {
        // Simulate adding user to storage (for demonstration purposes)
        users.push({ username, email, password });
        console.log(`Registered user: ${username} with email: ${email}`);
        // Redirect to 'home.html' upon successful registration
        window.location.href = 'home.html';
    }
 
 
    /*
    // Function to handle login
    function loginUser(email, password) {
        // Simulated login check (for demonstration purposes)
        const user = users.find((user) => user.email === email && user.password === password);
        if (user) {
            console.log(`Logged in user with email: ${email}`);
            // Redirect to 'home.html' upon successful login
            window.location.href = 'home.html';
        } else {
            console.log('Login failed. Invalid email or password.');
            alert('Login failed. Invalid email or password.');
        }
    }
    */
 
 
    // Event listeners for registration and login forms
    document.querySelector('.form-box.register form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission
 
 
        const username = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;
 
 
        registerUser(username, email, password);
    });
 
 
    /*
    //Comment this whole function out for the login error!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    document.querySelector('.form-box.login form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission
 
 
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;
 
 
        loginUser(email, password);
    });
    */
 
 
    /*
    // Function to handle navigation clicks
    document.querySelectorAll('.navigation a').forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
 
 
            const targetPage = event.target.textContent.toLowerCase(); // Get the clicked link text
            const pageMappings = {
                'home': 'home.html',
                'instructions': 'instructions.html',
                'lessons': 'lessons.html'
            };
 
 
            // Redirect to the respective page based on the link clicked
            if (pageMappings[targetPage]) {
                window.location.href = pageMappings[targetPage];
            }
        });
    });
    */
 });
 