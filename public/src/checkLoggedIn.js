/** CheckLoggedIn
 *
 *  Makes a request to the server with the user's session
 *  authentication token to resolve the login status of a
 *  particular user.
 *
 *  - IF server authorizes user, continue
 *  - ELSE, redirect user to login screen
 */

let token = sessionStorage.getItem('token');
if(token) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 401) {
            window.location = "/login";
        }
    };
    xhttp.open("POST", "/authenticate?token=" + token, true);
    xhttp.send();
} else {
    window.location = "/login";
}