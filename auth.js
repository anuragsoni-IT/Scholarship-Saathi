import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


// =========================================================
// REGISTER
// =========================================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const message = document.getElementById("message");

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const college = document.getElementById("college").value.trim();
        const course = document.getElementById("course").value.trim();
        const year = document.getElementById("year").value;
        const password = document.getElementById("password").value;

        // Clear previous message
        message.textContent = "";

        // =====================================================
        // BASIC VALIDATION
        // =====================================================

        if (!name || !email || !mobile || !college || !course || !year || !password) {
            message.textContent = "Please fill in all fields.";
            return;
        }

        if (!/^[0-9]{10}$/.test(mobile)) {
            message.textContent = "Please enter a valid 10-digit mobile number.";
            return;
        }

        if (password.length < 6) {
            message.textContent = "Password must contain at least 6 characters.";
            return;
        }

        try {

            // =================================================
            // CREATE FIREBASE AUTH ACCOUNT
            // =================================================

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            const user = userCredential.user;


            // =================================================
            // SAVE STUDENT DATA IN FIRESTORE
            // =================================================

            await setDoc(
                doc(db, "students", user.uid),
                {
                    uid: user.uid,
                    name: name,
                    email: email,
                    mobile: mobile,
                    college: college,
                    course: course,
                    year: year,
                    createdAt: serverTimestamp()
                }
            );


            // =================================================
            // SEND VERIFICATION EMAIL
            // =================================================

            await sendEmailVerification(user);
            // Send registration confirmation email

    // Send registration confirmation email
try {
    const emailResponse = await fetch("http://localhost:3000/send-registration-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            college: college,
            course: course,
            year: year
        })
    });

    const emailResult = await emailResponse.json();

    if (emailResult.success) {
        console.log("Registration confirmation email sent successfully.");
    } else {
        console.error("Email failed:", emailResult.message);
    }

} catch (emailError) {
    console.error("Backend email error:", emailError);
}

message.textContent =
    "Registration successful! A verification email has been sent to your email address.";

registerForm.reset();

} catch (error) {

    console.error("Registration error:", error);

    switch (error.code) {

        case "auth/email-already-in-use":
            message.textContent =
                "This email is already registered.";
            break;

        case "auth/invalid-email":
            message.textContent =
                "Please enter a valid email address.";
            break;

        case "auth/weak-password":
            message.textContent =
                "Password is too weak.";
            break;

        case "auth/network-request-failed":
            message.textContent =
                "Network error. Please check your internet connection.";
            break;

        default:
            message.textContent =
                "Registration failed. Please try again.";
    }
}
    });
}



// =========================================================
// LOGIN
// =========================================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const loginMessage =
            document.getElementById("loginMessage");

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        loginMessage.textContent = "";


        // =====================================================
        // VALIDATION
        // =====================================================

        if (!email || !password) {
            loginMessage.textContent =
                "Please enter email and password.";
            return;
        }


        try {

            // =================================================
            // LOGIN
            // =================================================

            const userCredential =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            const user = userCredential.user;

            console.log("Logged in user:", user.uid);


            // =================================================
            // CHECK EMAIL VERIFICATION
            // =================================================

           


            // =================================================
            // SUCCESS
            // =================================================

            loginMessage.textContent =
                "Login successful!";


            setTimeout(() => {

                window.location.href = "dashboard.html";

            }, 1000);


        } catch (error) {

            console.error("Login error:", error);

            switch (error.code) {

                case "auth/invalid-credential":
                    loginMessage.textContent =
                        "Invalid email or password.";
                    break;

                case "auth/user-not-found":
                    loginMessage.textContent =
                        "No account found with this email.";
                    break;

                case "auth/wrong-password":
                    loginMessage.textContent =
                        "Incorrect password.";
                    break;

                case "auth/invalid-email":
                    loginMessage.textContent =
                        "Please enter a valid email address.";
                    break;

                case "auth/too-many-requests":
                    loginMessage.textContent =
                        "Too many failed attempts. Please try again later.";
                    break;

                case "auth/network-request-failed":
                    loginMessage.textContent =
                        "Network error. Please check your internet connection.";
                    break;

                default:
                    loginMessage.textContent =
                        "Login failed. Please check your email and password.";
            }
        }
    });
}
    