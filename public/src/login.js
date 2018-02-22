/** Login
 *
 *  Provides functionality for a user to login to and
 *  sign up for our application.
 */

let divLogin = document.getElementById("login");
let divSignUp = document.getElementById("signUp");
divLogin.style.display = "block";

/**
 * When user presses 'sign up' button from login page:
 *  - take the user to the sign up screen
 */
function goToSignUp() {
    divLogin.style.display = "none";
    divSignUp.style.display = "block";
}

/**
 * When user presses 'cancel' button:
 *  - take the user to the login screen
 */
function cancel() {
    divSignUp.style.display = "none";
    divLogin.style.display = "block";
}

/**
 * When the user presses the 'login' button:
 *  - poll email and password
 *  - attempt a sign in with polled fields
 *  - upon sign in, give user an authentication token for session
 *  - redirect to site page
 */
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

/**
 * When the user presses the 'sign up' button from signup page:
 *  - poll email and password
 *  - attempt a sign in with polled fields
 *  - upon sign in, give user an authentication token for session
 *  - redirect to site page
 */
function signUp() {
    const email = document.getElementById('sEmail').value;
    const pass = document.getElementById('sPassword').value;
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    firebase.auth().createUserWithEmailAndPassword(email, pass).then(user => {
        user.getIdToken(true).then(idToken => {
            addUser().then(() => {
                sessionStorage.setItem('token', idToken);
                window.location = "/";
            });
        });
    }).catch(error => {

    });
}

/** Enter key presses login button */
document.onkeydown = loginE;
function loginE(e) {
    if(e.keyCode === 13) {
        login();
        return false;
    }
}

function addUser() {
    return new Promise ((resolve, reject) => {
        let isTenant = document.getElementById("tenant").checked;
        if (isTenant) {
            addTenant(resolve);
        } else {
            addHomeowner(resolve);
        }
    });
}

function addTenant(resolve) {
    // Get Reference to User type
    const user = firebaseApp.auth().currentUser;
    const uid = getUID(user);
    const typeRef = getUserTypeRef(uid);

    typeRef.push('tenant').then(() => {
        resolve();
    });
}

function addHomeowner(resolve) {
    // Get Reference to User type
    const user = firebaseApp.auth().currentUser;
    const uid = getUID(user);
    const typeRef = getUserTypeRef(uid);

    typeRef.push('homeowner').then(() => {
        resolve('done');
    });
}

// Testing Storing when Not Logged in
const getUID = (user) => {
    if (user) {
        return user.uid;
    } else {
        return false;
    }
};

const getUserTypeRef = (uid) => {
    if (uid)
        return firebaseApp.database().ref('users/' + uid + "/type");
};
