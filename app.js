import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// ✅ 1. إعدادات Firebase الخاصة بك
const firebaseConfig = {
    apiKey: "AIzaSyDE3oQm5e0zgyiArkSCjZGF00kS42P-HmU",
    authDomain: "gem-hacathon.firebaseapp.com",
    projectId: "gem-hacathon",
    storageBucket: "gem-hacathon.firebasestorage.app",
    messagingSenderId: "696631558152",
    appId: "1:696631558152:web:8d94f8e104a804426691bd",
    measurementId: "G-W7ZS7ZFXQ5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ 2. كود تسجيل الدخول (Login)
const loginBtn = document.getElementById('loginBtn');
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        const email = document.getElementById('emailInput').value;
        const pass = document.getElementById('passInput').value;
        
        if (!email || !pass) {
            alert("Please enter email and password");
            return;
        }

        loginBtn.innerText = "Checking...";
        signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                document.getElementById('login-screen').style.display = 'none';
                document.getElementById('userEmailDisplay').innerText = email.split('@')[0];
            })
            .catch((error) => {
                const errBox = document.getElementById('loginError');
                errBox.style.display = 'block';
                errBox.innerText = "Login Failed: " + error.code;
                loginBtn.innerText = "Login 🔐";
            });
    });
}

// مراقبة حالة المستخدم
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('userEmailDisplay').innerText = user.email.split('@')[0];
    } else {
        document.getElementById('login-screen').style.display = 'flex';
    }
});

// ✅ 3. وظائف التنقل (Navigation)
window.logout = function() {
    signOut(auth).then(() => location.reload());
}

window.nav = function(screenId) {
    // إخفاء كل الشاشات
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    // إظهار الشاشة المطلوبة
    document.getElementById(screenId).classList.add('active');
    
    // إغلاق القائمة الجانبية
    toggleMenu();
    
    // لو فتح الخريطة، نهيئها
    if (screenId === 'map') initMap();
}

window.toggleMenu = function() {
    const sb = document.getElementById('sidebar');
    const ov = document.querySelector('.sidebar-overlay');
    if (sb.classList.contains('active')) {
        sb.classList.remove('active');
        ov.style.display = 'none';
    } else {
        sb.classList.add('active');
        ov.style.display = 'block';
    }
}

// ✅ 4. منطق الخريطة (Map Logic)
// إحداثيات مضبوطة على صورة "المبنى" (map-building.jpg)
const hallRoute = [
    { name: "Entrance", x: 10, y: 85 },        // المدخل تحت شمال
    { name: "Grand Hall", x: 25, y: 70 },      // القاعة الرئيسية
    { name: "Ramses II", x: 30, y: 60 },       // تمثال رمسيس
    { name: "Grand Stairs", x: 60, y: 50 },    // الدرج العظيم (وسط يمين)
    { name: "Tutankhamun", x: 85, y: 15 }      // قاعات توت (فوق يمين)
];

const cavesRoute = [
    { name: "Entrance", x: 40, y: 85 },
    { name: "Cave 1", x: 55, y: 65 },
    { name: "Cave 2", x: 70, y: 50 }
];

let currentRoute = hallRoute;
let stepIndex = 0;

window.initMap = function() {
    updateMarkerPosition(stepIndex);
}

window.switchFloor = function(floor) {
    const img = document.getElementById('mapImage');
    const btnHall = document.getElementById('btn-hall');
    const btnCaves = document.getElementById('btn-caves');
    
    stepIndex = 0;

    if (floor === 'hall') {
        currentRoute = hallRoute;
        img.src = 'map-building.jpg'; // تأكد أن الصورة دي موجودة
        btnHall.classList.add('active');
        btnCaves.classList.remove('active');
    } else {
        currentRoute = cavesRoute;
        img.src = 'map-caves.jpg'; // تأكد أن الصورة دي موجودة
        btnCaves.classList.add('active');
        btnHall.classList.remove('active');
    }

    updateMarkerPosition(0);
}

window.moveUser = function() {
    if (stepIndex < currentRoute.length - 1) {
        stepIndex++;
        updateMarkerPosition(stepIndex);
    } else {
        alert("🎉 Tour Completed! Restarting...");
        stepIndex = 0;
        updateMarkerPosition(0);
    }
}

function updateMarkerPosition(index) {
    const point = currentRoute[index];
    const nextPoint = currentRoute[index + 1] || { name: "Finish Line" };
    
    const marker = document.getElementById('userLocation');
    // تحريك النقطة الزرقاء
    marker.style.left = point.x + '%';
    marker.style.top = point.y + '%';

    // تحديث النصوص
    document.getElementById('currentStepName').innerText = point.name;
    document.getElementById('nextStepName').innerText = nextPoint.name;
    
    // تحديث الزر
    const btn = document.getElementById('walkBtn');
    if (index === currentRoute.length - 1) {
        btn.innerHTML = '<i class="fas fa-undo"></i> Restart Tour';
        btn.style.background = "#333";
    } else {
        btn.innerHTML = '<i class="fas fa-walking"></i> Walk to Next Stop';
        btn.style.background = "#d4af37"; // Gold color
    }
}