let listings = [];

const ref = firebaseApp.database().ref('listing');
// console.log(ref);
ref.on('value', gotData, errData);

function gotData(data) {
    let idx = 0;
    listings = [];
    data.forEach((element) => {
        let list = new Listing();
        list.loadFB(element.val(), idx);
        listings.push({'val': list, 'ref': element.ref, 'visible': true});
        idx++;
    });
    applyFilters();
}

function errData(err) {
    console.log(err.val());
}

function addListing() {
    let ref = firebaseApp.database().ref('listing');

    let title = document.getElementById("title").value;
    let type = document.getElementById("type").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    let zip = document.getElementById("zip").value;
    let host = document.getElementById("host").value;
    let utilities = document.getElementById("utilities").value;
    let bedNum = ~~document.getElementById("bedNum").value;
    let bathNum = ~~document.getElementById("bathNum").value;
    let price = ~~document.getElementById("price").value;
    let size = ~~document.getElementById("size").value;
    let pets = document.getElementById("pets").checked;
    let smoking = document.getElementById("smoking").checked;

    let listing = new Listing();
    listing.setTitle(title);
    listing.setType(type);
    listing.setAddress(address, city, state, zip);
    listing.setRenterName(host);
    listing.setPrice(price);
    listing.setUtilities(utilities);
    listing.setBedBath(bedNum, bathNum);
    listing.setPets(pets);
    listing.setSmoking(smoking);
    listing.setSize(size);

    ref.push(listing);
}

function removeListing(i) {
    listings[i].ref.remove();
}

function applyFilters() {
    resetVisibility();

    let priceOn = document.getElementById("pricefilter").checked;
    let sizeOn = document.getElementById("sizefilter").checked;
    let petsOn = document.getElementById("petsfilter").checked;
    let smokingOn = document.getElementById("smokingfilter").checked;
    let cityOn = document.getElementById("cityfilter").checked;
    let stateOn = document.getElementById("statefilter").checked;
    let zipOn = document.getElementById("zipfilter").checked;
    let hostOn = document.getElementById("hostfilter").checked;
    let typeOn = document.getElementById("typefilter").checked;
    let bathOn = document.getElementById("bathfilter").checked;
    let bedOn = document.getElementById("bedfilter").checked;

    let minPrice = ~~document.getElementById("minPrice").value;
    let maxPrice = ~~document.getElementById("maxPrice").value;
    let minSize = ~~document.getElementById("minSize").value;
    let maxSize = ~~document.getElementById("maxSize").value;
    let city = document.getElementById("cityIn").value;
    let state = document.getElementById("stateIn").value;
    let zip = document.getElementById("zipIn").value;
    let host = document.getElementById("hostIn").value;
    let type = document.getElementById("typeIn").value;
    let bathNum = ~~document.getElementById("bathIn").value;
    let bedNum = ~~document.getElementById("bedIn").value;

    if(priceOn && (minPrice || maxPrice))
        filterPrice(minPrice, maxPrice);
    if(sizeOn && (minSize || maxSize))
        filterSize(minSize, maxSize);
    if(cityOn && city)
        filterCity(city);
    if(stateOn && state)
        filterState(state);
    if(zipOn && zip)
        filterZip(zip);
    if(hostOn && host)
        filterHost(host);
    if(typeOn && type)
        filterType(type);
    if(bathOn && bathNum)
        filterBaths(bathNum);
    if(bedOn && bedNum)
        filterBeds(bedNum);
    if(petsOn)
        filterPets();
    if(smokingOn)
        filterSmoking();

    renderHTML();
}

function renderHTML() {
    let html = "<ul>";
    for(let i = 0; i < listings.length; i++) {
        if(listings[i].visible) {
            html += "<li style='display: flex'>" + listings[i].val.getHTML() + "</li><br>";
        }
    }
    html += "</ul>";
    document.getElementById('inject').innerHTML = html;
}

function resetVisibility() {
    for(let i = 0; i < listings.length; i++) {
        listings[i].visible = true;
    }
}

function filterPrice(min, max){
    for(let i = 0; i < listings.length; i++){
        let l = listings[i].val;
        listings[i].visible = l.price >= min && l.price <= max && listings[i].visible;
    }
}

function filterSize(min, max){
    for(let i = 0; i < listings.length; i++){
        let l = listings[i].val;
        listings[i].visible = l.size >= min && l.size <= max && listings[i].visible;
    }
}

function filterPets(){
    for(let i = 0; i < listings.length; i++){
        let l = listings[i].val;
        listings[i].visible = l.pets && listings[i].visible;
    }
}

function filterSmoking(){
    for(let i = 0; i < listings.length; i++){
        let l = listings[i].val;
        listings[i].visible = l.smoking && listings[i].visible;
    }
}

function filterCity(city){
    for(let i = 0; i < listings.length; i++){
        let l = listings[i].val;
        listings[i].visible = l.city === city && listings[i].visible;
    }
}

function filterState(state){
    for(let i = 0; i < listings.length; i++){
        let l = listings[i].val;
        listings[i].visible = l.state === state && listings[i].visible;
    }
}

function filterZip(zip){
    for(let i = 0; i < listings.length; i++){
        let l = listings[i].val;
        listings[i].visible = l.zip === zip && listings[i].visible;
    }
}

function filterHost(host){
    for(let i = 0; i < listings.length; i++){
        let l = listings[i].val;
        listings[i].visible = l.host === host && listings[i].visible;
    }
}

function filterType(type){
    for(let i = 0; i < listings.length; i++){
        let l = listings[i].val;
        listings[i].visible = l.type === type && listings[i].visible;
    }
}

function filterBaths(bathNum){
    for(let i = 0; i < listings.length; i++){
        let l = listings[i].val;
        if(bathNum === 3) {
            listings[i].visible = l.bathNum >= bathNum && listings[i].visible;
        } else {
            listings[i].visible = l.bathNum === bathNum && listings[i].visible;
        }
    }
}

function filterBeds(bedNum){
    for(let i = 0; i < listings.length; i++){
        let l = listings[i].val;
        if(bedNum === 4) {
            listings[i].visible = l.bedNum >= bedNum && listings[i].visible;
        } else {
            listings[i].visible = l.bedNum === bedNum && listings[i].visible;
        }
    }
}

function signOut() {
    sessionStorage.removeItem('token');
    firebase.auth().signOut();
    document.location.reload();
}

function hitEnter(e) {
    if(e.keyCode === 13) {
        applyFilters();
        return false;
    }
}


// Listing Class
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
        html += "<table style='width:500px' onclick='addListingtoRecentHistory(" + this.idx + ")'>";
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
                    html += "<button onclick= 'saveListing(" + this.idx + ")'>Save Listing</button>";
                    html += "<input id='available' type='checkbox'>Available";
                html += "</td>";
        html += "</tr>";
        html += "</table>";

        return html;
    }
}
