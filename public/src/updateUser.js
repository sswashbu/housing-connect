
function updateUser() {
    var user = firebase.auth.Auth;

    let type = document.getElementById("type").value;
    let first = document.getElementById("first").value;
    let last = document.getElementById("last").value;
    let bio = document.getElementById("bio").value;
    let phone = document.getElementById("phone").value;

    user.updateProfile({
  type: type,
  first: first,
  last: last,
  bio: bio,
  phone: phone
}).then(function() {});
user.updateEmail("newmaile@maile.com").then(function() {});
}