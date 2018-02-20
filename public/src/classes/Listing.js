/** Listing Class
 *
 *  Contains necessary Listing information and a method
 *  to display a Listing as HTML. Listing objects are
 *  pushed to Firebase as JSON representations of this
 *  class.
 */

class Listing {
    constructor() {

    }

    setType(type){
        this.type = type;
    }
    setTitle(title) {
        this.title = title;
    }
    setBedBath(bedNum, bathNum){
        this.bedNum = bedNum;
        this.bathNum = bathNum;
    }
    setAddress(address, city, state, zip){
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }
    setRenterName(name) {
        this.host = name;
    }
    setPrice(price) {
        this.price = price;
    }
    setUtilities(utilities) {
        this.utilities = utilities;
    }
    setPets(pets) {
        this.pets = pets;
    }
    setSmoking(smoking) {
        this.smoking = smoking;
    }
    setSize(size) {
        this.size = size;
    }

    loadFB(object, idx) {
        this.idx = idx;
        this.title = object.title;
        this.type = object.type;
        this.address = object.address;
        this.city = object.city;
        this.state = object.state;
        this.zip = object.zip;
        this.bedNum = object.bedNum;
        this.bathNum = object.bathNum;
        this.host = object.host;
        this.price = object.price;
        this.utilities = object.utilities;
        this.pets = object.pets;
        this.smoking = object.smoking;
        this.size = object.size;
    }

    getHTML() {
        let petOut;
        let smokingOut;
        if(this.pets === true){
            petOut = "pets okay";
        } else {
            petOut = "no pets";
        }
        if(this.smoking === true){
            smokingOut = "smoking okay";
        } else {
            smokingOut = "no smoking";
        }

        let html = "";
        html += "<table style='width:500px'>";
        html += "<tr>";
        html += "<td>";
        html += "Title: " + this.title + "<br>";
        html += "Type: " + this.type + "<br>";
        html += "# Beds: " + this.bedNum + "<br>";
        html += "# Baths: " + this.bathNum + "<br>";
        html += "Host: " + this.host + "<br>";
        html += "Size: " + this.size + " square feet" + "<br>";
        html += "</td>";
        html += "<td>";
        html += "Price: $" + this.price + " per Month" + "<br>";
        html += "Address: " + this.address + "<br>";
        html += this.city + ", " + this.state + " " + this.zip + "<br>";
        html += "Utilities: " + this.utilities + "<br>"
        html += "Pets: " + petOut + "<br>";
        html += "Smoking: " + smokingOut + "<br>";
        html += "</td>";
        html += "<td>";
        html += "<button onclick='removeListing(" + this.idx + ")'>X</button>";
        html += "<input id='available' type='checkbox'>Available";
        html += "</td>";
        html += "</tr>";
        html += "</table>";

        return html;
    }
}