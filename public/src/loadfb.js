function addListing() {
    let ref = firebaseApp.database().ref('listing');

    let title = document.getElementById("title").value;
    let address = document.getElementById("address").value;
    let host = document.getElementById("host").value;
    let utilities = document.getElementById("utilities").value;
    let price = document.getElementById("price").value;
    let size = document.getElementById("size").value;
    let pets = document.getElementById("pets").checked;
    let smoking = document.getElementById("smoking").checked;

    let listing = new Listing();
    listing.setTitle(title);
    listing.setAddress(address);
    listing.setRenterName(host);
    listing.setPrice(price);
    listing.setUtilities(utilities);
    listing.setPets(pets);
    listing.setSmoking(smoking);
    listing.setSize(size);

    ref.push(listing);
}

function removeLastListing() {
    let ref = firebaseApp.database().ref('listing');
    ref.limitToLast(1).ref.remove();
}

function gotData(data) {
    let html = "<ul>";
    data.forEach((element) => {
        let list = new Listing();
        list.loadFB(element.val());
        html += "<li>" + list.getHTML() + "</li><br>";
    });
    html += "</ul>";
    document.getElementById('inject').innerHTML = html;
}

function errData(err) {
    console.log(err.val());
}

const ref = firebaseApp.database().ref('listing');
ref.on('value', gotData, errData);

function signOut() {
    sessionStorage.removeItem('token');
    firebase.auth().signOut();
    document.location.reload();
}

document.onkeydown = handleKey;
function handleKey(e) {
    let key = e.keyCode || e.charCode;
    if(key === 13) {
        addListing();
        return false;
    } else if(key === 27) {
        removeLastListing();
        return false;
    }
}



class Listing {
    constructor() {

    }

    setTitle(title) {
        this.title = title;
    }
    setAddress(address) {
        this.address = address;
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

    loadFB(object) {
        this.title = object.title;
        this.address = object.address;
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
        } else {petOut = "no pets";}
        if(this.smoking === true){
            smokingOut = "smoking okay";
        } else {smokingOut = "no smoking";}

        let html = "";
        html += "Title: " + this.title + "<br>";
        html += "Host: " + this.host + "<br>";
        html += "Size: " + this.size + " square feet" + "<br>";
        html += "Price: $" + this.price + " per Month" + "<br>";
        html += "Address: " + this.address + "<br>";
        html += "Utilities: " + this.utilities + "<br>";
        html += "Pets: " + petOut + "<br>";
        html += "Smoking: " + smokingOut + "<br>";
        return html;
    }

    print() {
        let petOut;
        let smokingOut;
        if(this.pets === true){
            petOut = "pets okay";
        } else {petOut = "no pets";}
        if(this.smoking === true){
            smokingOut = "smoking okay";
        } else {smokingOut = "no smoking";}
        console.log(
            "Title: " + this.title
            + "\n Address: " + this.address
            + "\n Price: $" + this.price + " per Month"
            + "\n Utilities " + this.utilities
            + "\n Pets: " + petOut
            + "\n Smoking: " + smokingOut
            + "\n Size: " + this.size + " square feet"
        )
    }
}