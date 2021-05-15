// Inicijalizacija Firebase-a
const firebaseConfig = {
  apiKey: "AIzaSyAOzIcJp_J_jEuTHtWr-Vl0ex6zqLljXrI",
  authDomain: "rentacar-34f41.firebaseapp.com",
  databaseURL: "https://rentacar-34f41-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rentacar-34f41",
  storageBucket: "rentacar-34f41.appspot.com",
  messagingSenderId: "254732209577",
  appId: "1:254732209577:web:645698cfcad478104d08b8",
  measurementId: "G-04ED7YCXT1"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Login
var aLogin = [];

function Login() {
    var email = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            window.location.href = "admin/dashboard.html";
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("Unijeli ste pogrešnu email adresu ili lozinku!");
        });
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var user = firebase.auth().currentUser;
        var uid;
        if (user != null) {
            uid = user.uid;
        }
        aLogin.push({
            Uid: user.uid
        });
    } else {
        // No user is signed in.

    }
});

function Logout() {
    firebase.auth().signOut().then(() => {
        window.alert("Odjavljeni ste!");
        window.location.href = "../index.html";
    }).catch((error) => {
        // An error happened.
    });
}

// Default pozivi

var oDb = firebase.database();
var oDbAutomobil = oDb.ref('Automobil');
var oDbKorisnik = oDb.ref('Korisnik');
var oDbRezervacije = oDb.ref('Rezervacije');