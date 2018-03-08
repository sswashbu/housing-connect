const saveBtn = document.getElementById('saveBtn');

// window.addEventListener('load', userLoggedIn);
saveBtn.addEventListener('click', saveEdit);

setTimeout(userLoggedIn, 2000);

function userLoggedIn() {
    let user = firebaseApp.auth().currentUser;
    if (!user) window.location = "/login";
    initDisplayProfile();
}

// Check if Profile has Data
// If not, initialize it
// Else, display the found data
function initDisplayProfile() {
    let user = firebaseApp.auth().currentUser;
    // let uid = user.uid;
    let uid = "anon";
    firebase.database().ref('/users/' + uid).once('value').then(snapshot => {
        if (!snapshot.val()) initProfile();
        displayUserProfile();
    });
}

// Init Profile if No Ref found
function initProfile() {
    let user = firebaseApp.auth().currentUser;
    // let uid = user.uid;
    let uid = "anon";
    let userRef = firebaseApp.database().ref('/users/' + uid);
    let initData = {
        name: "n/a",
        phone: "n/a",
        email: "n/a",
        about: "n/a"
    };
    userRef.set(initData);
}

// Displays User Profile
function displayUserProfile() {
    let user = firebaseApp.auth().currentUser;
    // let uid = user.uid;
    let uid = "anon";
    firebaseApp.database().ref('/users/' + uid).once('value').then(snapshot => {
        let data = snapshot.val();
        let name = data.name || "n/a";
        let phone = data.phone || "n/a";
        let email = data.email || "n/a";
        let about = data.about || "n/a";

        document.getElementById('name').textContent = name;
        document.getElementById('nameTxt').value = name;
        document.getElementById('phone').value = phone;
        document.getElementById('email').value = email;
        document.getElementById('about').value = about;
    });
}

// Save Edited User Profile
function saveEdit() {
    let user = firebaseApp.auth().currentUser;
    // let uid = user.uid;
    let uid = "anon";
    let userRef = firebaseApp.database().ref('/users/' + uid);
    let editData = {
        name: document.getElementById('nameTxt').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        about: document.getElementById('about').value
    };
    userRef.set(editData);
    displayUserProfile();
}
