/** Listing Class
 *
 *  Contains necessary Listing information and a method
 *  to display a Listing as HTML. Listing objects are
 *  pushed to Firebase as JSON representations of this
 *  class.
 */

class User {
    constructor() {

    }

    setType(type){
        this.type = type;
    }
    setUserName(userName) {
        this.userName = userName;
    }
    setName(first, last){
        this.first = first;
        this.last = last;
    }
    setBio(bio){
        this.bio = bio;
    }
    setEmail(email) {
        this.email = email;
    }
    setPhone(phone) {
        this.phone = phone;
    }
    

    loadFB(object, idx) {
        this.idx = idx;
        this.type = object.type;
        this.userName = object.userName;
        this.first = object.first;
        this.last = object.last;
        this.bio = object.bio;
        this.email = object.email;
        this.phone = object.phone;
    }

    getHTML() {
        let html = "";
        html += "<tr>";
        html += "<td>";
        html += "Type: " + this.type + "<br>";
        html += "UserName: " + this.userName + "<br>";
        html += "Name: " + this.first + this.last + "<br>";
        html += "Bio: " + this.bio + "<br>";
        html += "Email: " + this.email + "<br>";
        html += "Phone: " + this.phone + "<br>";
        html += "</td>";
        html += "</tr>";
        html += "</table>";
        return html;
    }
}
