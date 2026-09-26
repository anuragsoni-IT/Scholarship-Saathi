
import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import { getAuth } from
"https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

import { getFirestore } from
"https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyCtnBHMMdLbZY2ST5eEVwU3ShrBaUPTEsk",
    authDomain: "scholarship-saathi.firebaseapp.com",
    projectId: "scholarship-saathi",
    storageBucket: "scholarship-saathi.firebasestorage.app",
    messagingSenderId: "1022014513830",
    appId: "1:1022014513830:web:5532cb9e51b90dda928a67"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Firebase Authentication
const auth = getAuth(app);


// Cloud Firestore
const db = getFirestore(app);


// Export
export { auth, db };