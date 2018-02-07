let divLogin = document.getElementById("login");
let divSignup = document.getElementById("signup");

divLogin.style.display = "block";

function gotoSignup() {
    divLogin.style.display = "none";
    divSignup.style.display = "block";
}

function cancel() {
    divSignup.style.display = "none";
    divLogin.style.display = "block";
}

function login() {
    const email = document.getElementById('txtEmail').value;
    const pass = document.getElementById('txtPassword').value;

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    firebase.auth().signInWithEmailAndPassword(email, pass).then(user => {
        user.getIdToken(true).then(idToken => {
            sessionStorage.setItem('token', idToken);
            window.location = "/";
        });
    }).catch(error => {

    });
}

document.onkeydown = loginE;
function loginE(e) {
    if(e.keyCode === 13) {
        login();
        return false;
    }
}

function signup() {
    const email = document.getElementById('sEmail').value;
    const pass = document.getElementById('sPassword').value;

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    firebase.auth().createUserWithEmailAndPassword(email, pass).then(user => {
        user.getIdToken(true).then(idToken => {
            sessionStorage.setItem('token', idToken);
            window.location = "/";
        });
    }).catch(error => {

    });
}

// firebase.auth().onAuthStateChanged(user => {
//     if(user) {
//         user.getIdToken(true).then(idToken => {
//             sessionStorage.setItem('token', idToken);
//             window.location = "/";
//         });
//     }
// });