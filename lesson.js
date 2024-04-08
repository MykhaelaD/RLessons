import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js";
// Initialize Firebase
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

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const storageRef = ref(storage, 'gs://seniorproject-7e271.appspot.com/lesson.yaml');


getDownloadURL(storageRef)
    .then((url) => {
        fetchLessonData(url);
    })
    .catch((error) => {
        console.error('Error getting download URL:', error);
    });

    async function fetchLessonData(url) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const text = await response.text();
                console.log('File Content:', text);
                // Process the file content here
            } else {
                console.error('Failed to fetch file:', response.status);
            }
        } catch (error) {
            console.error('Error fetching file:', error);
        }
    }