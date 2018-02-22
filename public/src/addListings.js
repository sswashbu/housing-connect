/**
 * Push a new listing to Firebase
 *
 * Whenever a user requests to add a new listing:
 *  - poll all of the input elements for listing creation
 *  - make a new listing from polled fields
 *  - push that listing to Firebase
 */
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