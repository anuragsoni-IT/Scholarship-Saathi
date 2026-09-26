
import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


onAuthStateChanged(auth, async (user) => {
    
    if (!user) {
        window.location.href = "login.html";
        return;
    }
    
    try {
        
        const studentRef = doc(
            db,
            "students",
            user.uid
        );
        
        const studentSnapshot = await getDoc(studentRef);
        
        if (studentSnapshot.exists()) {
            
            const data = studentSnapshot.data();
            
            document.getElementById("studentName").textContent =
                data.name || "-";
            
            document.getElementById("profileName").textContent =
                data.name || "-";
            
            document.getElementById("profileEmail").textContent =
                data.email || "-";
            
            document.getElementById("profileMobile").textContent =
                data.mobile || "-";
            
            document.getElementById("profileCollege").textContent =
                data.college || "-";
            
            document.getElementById("profileCourse").textContent =
                data.course || "-";
            
            document.getElementById("profileYear").textContent =
                data.year || "-";
            
        } else {
            
            console.log("Student profile not found in Firestore.");
            
        }
        
    } catch (error) {
        
        console.error("Error loading profile:", error);
        
    }
    
});


// Logout

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    
    logoutBtn.addEventListener("click", async () => {
        
        try {
            
            await signOut(auth);
            
            window.location.href = "login.html";
            
        } catch (error) {
            
            console.error("Logout error:", error);
            
        }
        
    });
    
}