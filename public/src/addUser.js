
function updateUser() {
    let user = firebase.auth().currentUser;

    let type = document.getElementById("type").value;
    let first = document.getElementById("first").value;
    let last = document.getElementById("last").value;
    let bio = document.getElementById("bio").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    user.updateProfile({
  type: type,
  first: first,
  last: last,
  bio: bio,
  phone: phone
})
user.updateEmail(email)
}