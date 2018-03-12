/** LoadFB
 *
 *  Loads Listings from Firebase and displays them on the
 *  main application webpage. Provides functionality to
 *  add and remove specific listings as well as filter all
 *  of the listings.
 */

let listings = [];

const ref = firebaseApp.database().ref('listing');
ref.on('value', gotData, errData);

/**
 * Whenever home listings are modified on Firebase:
 *  - update our local collection of listings from Firebase
 *  - re-render the updated listings
 */
function gotData(data) {
    let idx = 0;
    listings = [];
    data.forEach((element) => {
        let list = new Listing();
        list.loadFB(element.val(), idx);
        listings.push({'val': list, 'ref': element.ref, 'visible': true, 'simpleView': true,});
        idx++;
    });
    applyFilters();
}

function errData(err) {
    console.log(err.val());
}

/** Remove the ith listing in the list from Firebase */
function removeListing(i) {
    listings[i].ref.remove();
}

/**
 * Applies one or more filters on the displayed listings
 *
 * When a user requests to apply a new filter:
 *  - make all listings visible
 *  - poll all of the input elements for filtering
 *  - apply requested filters based on polled values
 *  - re-render the updated listings
 */
function applyFilters() {
    resetVisibility();

    let priceOn = document.getElementById("pricefilter").checked;
    let sizeOn = document.getElementById("sizefilter").checked;
    let petsOn = document.getElementById("petsfilter").checked;
    let smokingOn = document.getElementById("smokingfilter").checked;
    let cityOn = document.getElementById("cityfilter").checked;
    let stateOn = document.getElementById("statefilter").checked;
    let zipOn = document.getElementById("zipfilter").checked;

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

    let type = document.getElementById("typeIn").value;
    let bathNum = ~~document.getElementById("bathIn").value;
    let bedNum = ~~document.getElementById("bedIn").value;

    let user = firebase.auth().currentUser;
    let uid;
    if (user != null) {
        uid = user.uid;
    }

    let myListings = document.getElementById("myListings").checked;
    if (myListings) filterHost(uid);


    if (priceOn && (minPrice || maxPrice))
        filterPrice(minPrice, maxPrice);
    if (sizeOn && (minSize || maxSize))
        filterSize(minSize, maxSize);
    if (cityOn && city)
        filterCity(city);
    if (stateOn && state)
        filterState(state);
    if (zipOn && zip)
        filterZip(zip);

    if (typeOn && type)
        filterType(type);
    if (bathOn && bathNum)
        filterBaths(bathNum);
    if (bedOn && bedNum)
        filterBeds(bedNum);
    if (petsOn)
        filterPets();
    if (smokingOn)
        filterSmoking();


    renderHTML();
}

/** Display HTML for the listings through injection */
function renderHTML() {
    document.getElementById('inject').innerHTML = "";

    let ul = document.createElement("ul");
    for (let i = 0; i < listings.length; i++) {
        let li = document.createElement("li");
        li.style.display = "flex";
        if (listings[i].visible) {
            let div = document.createElement('div');
            div.innerHTML = listings[i].val.getHTML();
            li.appendChild(div);
            ul.appendChild(li);
            ul.appendChild(document.createElement("BR"));

            createListing(listings[i]);
        }
    }
}

function view(listing) {
    listing.simpleView = !listing.simpleView;
    renderHTML();
}

function createListing(listing) {

    let mainDiv = document.createElement("div");
    mainDiv.className = "col-md-4";
    let card = document.createElement("div");
    card.className = "card mb-4 box-shadow bg-light";
    card.setAttribute("id", "listing");
    card.setAttribute("style", "height: 350px;")

    let textDiv = document.createElement("div");
    textDiv.className = "card-body";
    let txt = document.createElement("p");
    txt.className = "card-text";
    txt.setAttribute("style", "margin-bottom: 0; text-align: center;");
    let imageDiv = document.createElement("div");
    // imageDiv.className = ;
    let img = document.createElement("img");
    img.className = "card-img-top gallery-img img-fit";
    if(listing.val.image) {
        img.setAttribute("src", listing.val.image);
    } else {
        img.setAttribute("src", "http://silviahartmann.com/background-tile-art/images/black_background_tile.jpg");
    }
    txt.setAttribute("id", "text");

    card.onclick = function () {
        view(listing);
    };
    if (listing.simpleView) {
        img.setAttribute("id", "imageSmall");
        let titleDiv = document.createElement("div");
        let priceDiv = document.createElement("div");
        let locDiv = document.createElement("div");

        txt.className = "TextDiv";
        titleDiv.style.margin = 0;
        titleDiv.className = "TitleDiv";
        priceDiv.style.margin = 0;
        priceDiv.className = "PriceDiv";
        locDiv.style.margin = 0;
        locDiv.className = "LocDiv";

        txt.appendChild(titleDiv);
        txt.appendChild(priceDiv);
        txt.appendChild(locDiv);


        let titleH4 = document.createElement("h4");
        let priceP = document.createElement("P");
        let locP = document.createElement("P");

        titleH4.style.margin = 0;
        titleH4.className = "mb-2"
        titleH4.style.display = "block"

        priceP.style.margin = 0;
        priceP.className = "PricePara"
        priceP.style.display = "block"

        locP.style.margin = 0;
        locP.className = "LocPara"
        locP.style.display = "block"

        titleDiv.appendChild(titleH4);
        priceDiv.appendChild(priceP);
        locDiv.appendChild(locP);


        titleH4.innerHTML = listing.val.title;
        priceP.innerHTML = "Price: $" + listing.val.price + " per month";
        locP.innerHTML = "Address: " + listing.val.address;

        let user = firebase.auth().currentUser;
        let uid;
        if (user != null) {
            uid = user.uid;
        }
        if (listing.val.host == uid) {
            let deleteButton = document.createElement("button");
            deleteButton.onclick = function () {
                removeListing(listing.val.idx)
            };
            deleteButton.innerHTML = "X";
            deleteButton.setAttribute("id", "delete");
            deleteButton.className = "x-button btn btn-sm btn-outline-danger";

            imageDiv.appendChild(deleteButton);

        }
        textDiv.appendChild(txt);
        imageDiv.appendChild(img);
        card.appendChild(imageDiv);
        card.appendChild(textDiv);
        mainDiv.appendChild(card);
        document.getElementById('inject').appendChild(mainDiv);
    } else {
        img.setAttribute("id", "imageBig");
        let titleDiv = document.createElement("div");
        let priceDiv = document.createElement("div");
        let locDiv = document.createElement("div");
        let typeDiv = document.createElement("div");
        let cityDiv = document.createElement("div");
        let stateDiv = document.createElement("div");
        let zipDiv = document.createElement("div");
        let bedNumDiv = document.createElement("div");
        let bathNumDiv = document.createElement("div");
        let hostDiv = document.createElement("div");
        let utilitiesDiv = document.createElement("div");
        let petsDiv = document.createElement("div");
        let smokingDiv = document.createElement("div");
        let sizeDiv = document.createElement("div");

        txt.className = "TestDiv"
        titleDiv.style.margin = 0;
        titleDiv.className = "TitleDiv"
        priceDiv.style.margin = 0;
        priceDiv.className = "PriceDiv"
        locDiv.style.margin = 0;
        locDiv.className = "LocDiv"

        typeDiv.style.margin = 0;
        typeDiv.className = "typeDiv"
        cityDiv.style.margin = 0;
        cityDiv.className = "cityDiv"
        stateDiv.style.margin = 0;
        stateDiv.className = "stateDiv"

        zipDiv.style.margin = 0;
        zipDiv.className = "zipDiv"
        bedNumDiv.style.margin = 0;
        bedNumDiv.className = "bedNumDiv"
        bathNumDiv.style.margin = 0;
        bathNumDiv.className = "bathNumDiv"

        hostDiv.style.margin = 0;
        hostDiv.className = "hostDiv"
        utilitiesDiv.style.margin = 0;
        utilitiesDiv.className = "utilitiesDiv"
        petsDiv.style.margin = 0;
        petsDiv.className = "petsDiv"

        smokingDiv.style.margin = 0;
        smokingDiv.className = "smokingDiv"
        sizeDiv.style.margin = 0;
        sizeDiv.className = "sizeDiv"

        txt.appendChild(titleDiv);
        txt.appendChild(priceDiv);
        txt.appendChild(locDiv);
        txt.appendChild(typeDiv);
        txt.appendChild(cityDiv);
        txt.appendChild(stateDiv);
        txt.appendChild(zipDiv);
        txt.appendChild(bedNumDiv);
        txt.appendChild(bathNumDiv);
        txt.appendChild(hostDiv);
        txt.appendChild(utilitiesDiv);
        txt.appendChild(petsDiv);
        txt.appendChild(smokingDiv);
        txt.appendChild(sizeDiv);

        let titleH4 = document.createElement("h4");
        let priceP = document.createElement("P");
        let locP = document.createElement("P");
        let typeP = document.createElement("P");
        let cityP = document.createElement("P");
        let stateP = document.createElement("P");
        let zipP = document.createElement("P");
        let bedNumP = document.createElement("P");
        let bathNumP = document.createElement("P");
        let hostP = document.createElement("P");
        let utilitiesP = document.createElement("P");
        let petsP = document.createElement("P");
        let smokingP = document.createElement("P");
        let sizeP = document.createElement("P");


        titleH4.style.margin = 0;
        titleH4.className = "TitleH4"
        titleH4.style.display = "block"

        priceP.style.margin = 0;
        priceP.className = "PricePara"
        priceP.style.display = "block"

        locP.style.margin = 0;
        locP.className = "LocPara"
        locP.style.display = "block"

        typeP.style.margin = 0;
        typeP.className = "LocPara"
        typeP.style.display = "block"

        cityP.style.margin = 0;
        cityP.className = "LocPara"
        cityP.style.display = "block"

        stateP.style.margin = 0;
        stateP.className = "LocPara"
        stateP.style.display = "block"

        zipP.style.margin = 0;
        zipP.className = "LocPara"
        zipP.style.display = "block"

        bedNumP.style.margin = 0;
        bedNumP.className = "LocPara"
        bedNumP.style.display = "block"

        bathNumP.style.margin = 0;
        bathNumP.className = "LocPara"
        bathNumP.style.display = "block"

        hostP.style.margin = 0;
        hostP.className = "LocPara"
        hostP.style.display = "block"

        utilitiesP.style.margin = 0;
        utilitiesP.className = "LocPara"
        utilitiesP.style.display = "block"

        petsP.style.margin = 0;
        petsP.className = "LocPara"
        petsP.style.display = "block"

        smokingP.style.margin = 0;
        smokingP.className = "LocPara"
        smokingP.style.display = "block"

        sizeP.style.margin = 0;
        sizeP.className = "LocPara"
        sizeP.style.display = "block"

        priceDiv.appendChild(priceP);

        locDiv.appendChild(locP);
        typeDiv.appendChild(typeP);
        cityDiv.appendChild(cityP);
        stateDiv.appendChild(stateP);
        zipDiv.appendChild(zipP);
        bedNumDiv.appendChild(bedNumP);
        bathNumDiv.appendChild(bathNumP);
        hostDiv.appendChild(hostP);
        utilitiesDiv.appendChild(utilitiesP);
        petsDiv.appendChild(petsP);
        smokingDiv.appendChild(smokingP);
        sizeDiv.appendChild(sizeP);


        titleH4.innerHTML = listing.val.title;
        priceP.innerHTML = "$" + listing.val.price + " per month" ;
        locP.innerHTML = "Address: " + listing.val.address;
        cityP.innerHTML = "City: " + listing.val.city;
        stateP.innerHTML = "State: " + listing.val.state;
        zipP.innerHTML = "Zip: " + listing.val.zip;
        typeP.innerHTML = "Type: " + listing.val.type;
        bedNumP.innerHTML = "Bedrooms: " + listing.val.bedNum;
        bathNumP.innerHTML = "bathrooms: " + listing.val.bathNum;
        hostP.innerHTML = "Posted by: " + listing.val.email;
        utilitiesP.innerHTML = "Utilities: " + listing.val.utilities;
        let pets, smoking;
        if (listing.val.pets) {
            pets = "pets okay";
        } else {
            pets = "no pets";
        }
        if (listing.val.smoking) {
            smoking = "yes";
        } else {
            smoking = "no smoking";
        }
        petsP.innerHTML = "Pets: " + pets;
        smokingP.innerHTML = "Smoking: " + smoking;
        sizeP.innerHTML = "Size: " + listing.val.size + " square feet";

        let user = firebase.auth().currentUser;
        let uid;
        if (user != null) {
            uid = user.uid;
        }
        if (listing.val.host === uid) {
            let deleteButton = document.createElement("button");
            deleteButton.onclick = function () {
                removeListing(listing.val.idx)
            };
            deleteButton.innerHTML = "X";
            deleteButton.setAttribute("id", "delete");
            deleteButton.className = "x-button btn btn-sm btn-outline-danger";

            imageDiv.appendChild(deleteButton);

        }
        textDiv.appendChild(txt);
        // imageDiv.appendChild(img);
        // card.appendChild(imageDiv);
        card.appendChild(textDiv);
        mainDiv.appendChild(card);
        document.getElementById('inject').appendChild(mainDiv);
    }

}

/** Make all listings visible */
function resetVisibility() {
    for (let i = 0; i < listings.length; i++) {
        listings[i].visible = true;
    }
}

/** Filter out all listings with prices outside of price range */
function filterPrice(min, max) {
    for (let i = 0; i < listings.length; i++) {
        let l = listings[i].val;
        listings[i].visible = l.price >= min && l.price <= max && listings[i].visible;
    }
}

/** Filter out all listings with sizes outside of size range (in sq ft) */
function filterSize(min, max) {
    for (let i = 0; i < listings.length; i++) {
        let l = listings[i].val;
        listings[i].visible = l.size >= min && l.size <= max && listings[i].visible;
    }
}

/** Filter out all listings that do not permit pets */
function filterPets() {
    for (let i = 0; i < listings.length; i++) {
        let l = listings[i].val;
        listings[i].visible = l.pets && listings[i].visible;
    }
}

/** Filter out all listings that do not permit smoking */
function filterSmoking() {
    for (let i = 0; i < listings.length; i++) {
        let l = listings[i].val;
        listings[i].visible = l.smoking && listings[i].visible;
    }
}

/** Filter out all listings that are not in @city */
function filterCity(city) {
    for (let i = 0; i < listings.length; i++) {
        let l = listings[i].val;
        listings[i].visible = l.city === city && listings[i].visible;
    }
}

/** Filter out all listings that are not in @state */
function filterState(state) {
    for (let i = 0; i < listings.length; i++) {
        let l = listings[i].val;
        listings[i].visible = l.state === state && listings[i].visible;
    }
}

/** Filter out all listings that are not in @zip */
function filterZip(zip) {
    for (let i = 0; i < listings.length; i++) {
        let l = listings[i].val;
        listings[i].visible = l.zip === zip && listings[i].visible;
    }
}

/** Filter out all listings that are not created by @host */
function filterHost(host) {
    for (let i = 0; i < listings.length; i++) {
        let l = listings[i].val;
        listings[i].visible = l.host === host && listings[i].visible;
    }
}

/** Filter out all listings that are not of type @type */
function filterType(type) {
    for (let i = 0; i < listings.length; i++) {
        let l = listings[i].val;
        listings[i].visible = l.type === type && listings[i].visible;
    }
}

/** Filter all listings by number of baths (1, 2, 3+) */
function filterBaths(bathNum) {
    for (let i = 0; i < listings.length; i++) {
        let l = listings[i].val;
        if (bathNum === 3) {
            listings[i].visible = l.bathNum >= bathNum && listings[i].visible;
        } else {
            listings[i].visible = l.bathNum === bathNum && listings[i].visible;
        }
    }
}

/** Filter all listings by number of bedrooms (1, 2, 3, 4+) */
function filterBeds(bedNum) {
    for (let i = 0; i < listings.length; i++) {
        let l = listings[i].val;
        if (bedNum === 4) {
            listings[i].visible = l.bedNum >= bedNum && listings[i].visible;
        } else {
            listings[i].visible = l.bedNum === bedNum && listings[i].visible;
        }
    }
}

/**
 * Sign out of current login session
 *
 * When a user requests to sign out:
 *  - remove the user's authentication token from sessionStorage
 *  - sign user out of Firebase
 *  - redirect to login screen
 */
function signOut() {
    sessionStorage.removeItem('token');
    firebase.auth().signOut();
    document.location.reload();
}

/**
 * When a user hits the enter key in an input element for filtering:
 *  - apply the new filters to the listings
 */
function hitEnter(e) {
    if (e.keyCode === 13) {
        applyFilters();
        return false;
    }
}
