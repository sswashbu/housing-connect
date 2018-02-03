let token = sessionStorage.getItem('token');
if(token) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 401) {
            window.location = "/login";
        }
    };
    xhttp.open("GET", "/authenticate?token=" + token, true);
    xhttp.send();
} else {
    window.location = "/login";
}