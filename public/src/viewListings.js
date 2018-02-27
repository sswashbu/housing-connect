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
    listings.push({'val': list, 'ref': element.ref, 'visible': true});
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

/** Display HTML for the listings through injection */
function renderHTML() {
  document.getElementById('inject').innerHTML = "";

  var ul = document.createElement("UL");
  for(let i = 0; i < listings.length; i++) {
    var li = document.createElement("LI");
    li.style.display = "flex";
    if(listings[i].visible) {
      var div = document.createElement('div');
      div.innerHTML = listings[i].val.getHTML();
      li.appendChild(div);
      ul.appendChild(li);
      ul.appendChild(document.createElement("BR"));

      createListing(listings[i]);

    }
  }
  // document.getElementById('inject').innerHTML = "";
  // document.getElementById('inject').appendChild(ul);
}

function createListing(listing){

  var mainDiv = document.createElement("div");
  var titleDiv = document.createElement("div");
  var priceDiv = document.createElement("div");
  var locDiv = document.createElement("div");

  mainDiv.className = "MainDiv"
  titleDiv.style.margin = 0;
  titleDiv.className = "TitleDiv"
  priceDiv.style.margin = 0;
  priceDiv.className = "PriceDiv"
  locDiv.style.margin = 0;
  locDiv.className = "LocDiv"

  mainDiv.appendChild(titleDiv);
  mainDiv.appendChild(priceDiv);
  mainDiv.appendChild(locDiv);

  var titleH4 = document.createElement("h4");
  var priceP = document.createElement("P");
  var locP = document.createElement("P");

  titleH4.style.margin = 0;
  titleH4.className = "TitleH4"
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
  priceP.innerHTML =  + listing.val.price;
  locP.innerHTML = "Address: " + listing.val.address;

  mainDiv.onclick = function(){hide(locDiv)};

  document.getElementById('inject').appendChild(mainDiv);
  // document.body.appendChild(mainDiv);
  console.log(mainDiv);
}

function hide(div){
  // console.log(div);
  console.log(div.getElementsByClassName("LocDiv")[0]);
  var div = div.getElementsByClassName("LocDiv")[0];
  div.style.display = div.style.display == "none" ? "block" : "none";
};

// /** Display HTML for the listings through injection */
// function renderHTML() {
//     let html = "<ul>";
//     for(let i = 0; i < listings.length; i++) {
//         if(listings[i].visible) {
//           console.log(listings[i]);
//             html += "<li style='display: flex'>" + listings[i].val.getHTML() + "</li><br>";
//         }
//     }
//     html += "</ul>";
//     document.getElementById('inject').innerHTML = html;
// }

/** Make all listings visible */
function resetVisibility() {
  for(let i = 0; i < listings.length; i++) {
    listings[i].visible = true;
  }
}

/** Filter out all listings with prices outside of price range */
function filterPrice(min, max){
  for(let i = 0; i < listings.length; i++){
    let l = listings[i].val;
    listings[i].visible = l.price >= min && l.price <= max && listings[i].visible;
  }
}

/** Filter out all listings with sizes outside of size range (in sq ft) */
function filterSize(min, max){
  for(let i = 0; i < listings.length; i++){
    let l = listings[i].val;
    listings[i].visible = l.size >= min && l.size <= max && listings[i].visible;
  }
}

/** Filter out all listings that do not permit pets */
function filterPets(){
  for(let i = 0; i < listings.length; i++){
    let l = listings[i].val;
    listings[i].visible = l.pets && listings[i].visible;
  }
}

/** Filter out all listings that do not permit smoking */
function filterSmoking(){
  for(let i = 0; i < listings.length; i++){
    let l = listings[i].val;
    listings[i].visible = l.smoking && listings[i].visible;
  }
}

/** Filter out all listings that are not in @city */
function filterCity(city){
  for(let i = 0; i < listings.length; i++){
    let l = listings[i].val;
    listings[i].visible = l.city === city && listings[i].visible;
  }
}

/** Filter out all listings that are not in @state */
function filterState(state){
  for(let i = 0; i < listings.length; i++){
    let l = listings[i].val;
    listings[i].visible = l.state === state && listings[i].visible;
  }
}

/** Filter out all listings that are not in @zip */
function filterZip(zip){
  for(let i = 0; i < listings.length; i++){
    let l = listings[i].val;
    listings[i].visible = l.zip === zip && listings[i].visible;
  }
}

/** Filter out all listings that are not created by @host */
function filterHost(host){
  for(let i = 0; i < listings.length; i++){
    let l = listings[i].val;
    listings[i].visible = l.host === host && listings[i].visible;
  }
}

/** Filter out all listings that are not of type @type */
function filterType(type){
  for(let i = 0; i < listings.length; i++){
    let l = listings[i].val;
    listings[i].visible = l.type === type && listings[i].visible;
  }
}

/** Filter all listings by number of baths (1, 2, 3+) */
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

/** Filter all listings by number of bedrooms (1, 2, 3, 4+) */
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
  if(e.keyCode === 13) {
    applyFilters();
    return false;
  }
}
