// Initialize Firebase
let config = {
    apiKey: "AIzaSyAsIVIv2lVn2uyvqNv8G5ZktX_4HPzWXMc",
    authDomain: "housingconnect-3abbc.firebaseapp.com",
    databaseURL: "https://housingconnect-3abbc.firebaseio.com",
    projectId: "housingconnect-3abbc",
    storageBucket: "housingconnect-3abbc.appspot.com",
    messagingSenderId: "288270102804"
};
let firebaseApp = firebase.initializeApp(config);

document.getElementById("add").addEventListener("click", () => {
    const ref = firebaseApp.database().ref('facts');
    ref.push({"text":"whats up?!"})
});

function gotData(data) {
    let html = "<ul>";
    data.forEach((element) => {
        html += "<li>";
        html += element.val().text;
        html += "</li>";
    });
    html += "</ul>";
    document.getElementById("inject").innerHTML = html;
}

function errData(err) {
    console.log(err.val());
}

const ref = firebaseApp.database().ref('facts');
ref.on("value", gotData, errData);