/** LoadFB
*
*  Loads Listings from Firebase and displays them on the
*  main application webpage. Provides functionality to
*  add and remove specific listings as well as filter all
*  of the listings.
*/

let listings = [];
var images = [];

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

  images = ["house1.jpg", "house2.jpg", "house3.jpg", "house4.jpg", "house5.jpg", "house6.jpg", "house7.jpg", "house8.jpg", "house9.jpg", "house10.jpg"]

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
  var smoking;
  var pets;
  if(listing.val.pets === true){
      pets = "pets okay";
  } else {
      pets = "no pets";
  }
  if(listing.val.smoking === true){
      smoking = "smoking okay";
  } else {
      smoking = "no smoking";
  }
  var shadowDiv = document.createElement("div");
  var mainDiv = document.createElement("div");
  var titleDiv = document.createElement("div");
  var priceDiv = document.createElement("div");
  var locDiv = document.createElement("div");
  var remainingDiv = document.createElement("div");
  var hostDiv = document.createElement("div");
  var bedBathDiv = document.createElement("div");
  var sizeDiv = document.createElement("div");
  var smokeDiv = document.createElement("div");
  var petsDiv = document.createElement("div");
  var longLocDiv = document.createElement("div");
  var typeDiv = document.createElement("div");
  var deleteButton = document.createElement("button");

  remainingDiv.className = "remainingDiv";
  remainingDiv.style.display = "none";
  remainingDiv.appendChild(longLocDiv);
  remainingDiv.appendChild(hostDiv);
  remainingDiv.appendChild(typeDiv);
  remainingDiv.appendChild(bedBathDiv);
  remainingDiv.appendChild(sizeDiv);
  remainingDiv.appendChild(smokeDiv);
  remainingDiv.appendChild(petsDiv);

  mainDiv.className = "mainDiv";
  mainDiv.style.margin = "10px";
  mainDiv.style.paddingTop = "100px";
  getpicture(mainDiv);
  titleDiv.style.margin = 0;
  titleDiv.className = "titleDiv";
  priceDiv.style.margin = 0;
  priceDiv.className = "priceDiv";
  locDiv.style.margin = 0;
  locDiv.className = "locDiv";
  longLocDiv.style.margin = 0;
  longLocDiv.className = "longLocDiv";
  hostDiv.style.margin = 0;
  hostDiv.className = "hostDiv";
  typeDiv.style.margin = 0;
  typeDiv.className = "typeDiv";
  sizeDiv.style.margin = 0;
  sizeDiv.className = "sizeDiv";
  bedBathDiv.style.margin = 0;
  bedBathDiv.className = "bedBathDiv";
  smokeDiv.style.margin = 0;
  smokeDiv.className = "smokeDiv";
  petsDiv.style.margin = 0;
  petsDiv.className = "petsDiv";

  deleteButton.onclick = function(){removeListing(listing.val.idx)};
  deleteButton.innerHTML = "X";

  mainDiv.appendChild(titleDiv);
  mainDiv.appendChild(priceDiv);
  mainDiv.appendChild(locDiv);
  mainDiv.appendChild(remainingDiv);
  mainDiv.appendChild(deleteButton);

  var titleH4 = document.createElement("h4");
  var priceP = document.createElement("P");
  var locP = document.createElement("P");
  var longLocP = document.createElement("P");
  var hostP = document.createElement("P");
  var typeP = document.createElement("P");
  var sizeP = document.createElement("P");
  var bedBathP = document.createElement("P");
  var smokeP = document.createElement("P");
  var petsP = document.createElement("P");

  titleH4.style.margin = 0;
  titleH4.className = "TitleH4";
  priceP.style.margin = 0;
  priceP.className = "PricePara";
  locP.style.margin = 0;
  locP.className = "LocPara";
  longLocP.style.margin = 0;
  longLocP.className = "longLocPara";
  hostP.style.margin = 0;
  hostP.className = "hostPara";
  typeP.style.margin = 0;
  typeP.className = "typePara";
  sizeP.style.margin = 0;
  sizeP.className = "sizePara";
  bedBathP.style.margin = 0;
  bedBathP.className = "bedBathPara";
  smokeP.style.margin = 0;
  smokeP.className = "smokePara";
  petsP.style.margin = 0;
  petsP.className = "petsPara";

  titleDiv.appendChild(titleH4);
  priceDiv.appendChild(priceP);
  locDiv.appendChild(locP);
  longLocDiv.appendChild(longLocP);
  hostDiv.appendChild(hostP);
  typeDiv.appendChild(typeP);
  bedBathDiv.appendChild(sizeP);
  sizeDiv.appendChild(bedBathP);
  smokeDiv.appendChild(smokeP);
  petsDiv.appendChild(petsP);

  titleH4.innerHTML = listing.val.title;
  priceP.innerHTML = "$" + listing.val.price.toLocaleString() + "/Mo";
  locP.innerHTML = "Address: " + listing.val.address;
  longLocP.innerHTML = listing.val.city + ", " + listing.val.state + " " + listing.val.zip;
  typeP.innerHTML = listing.val.type
  hostP.innerHTML = "Host: " + listing.val.host;
  sizeP.innerHTML = listing.val.size + " sqft";
  bedBathP.innerHTML = "<i class=\"fas fa-bed\"></i> " + listing.val.bedNum + "  <i class=\"fas fa-bath\"></i> " + listing.val.bathNum;
  smokeP.innerHTML = smoking;
  petsP.innerHTML = pets;

  mainDiv.onclick = function(){hide(remainingDiv, listing.val.idx)};

  shadowDiv.className = "shadowDiv"
  shadowDiv.appendChild(mainDiv)

  document.getElementById('inject').appendChild(mainDiv);
  // document.body.appendChild(mainDiv);
  console.log(mainDiv);
}

function getpicture(div){
    var dir = 'pictures/';
    var randomCount = Math.round(Math.random() * (images.length - 1));
    // console.log(randomCount);
    // console.log(images[randomCount]);
    div.style.backgroundImage = "url(" + dir + images[randomCount] + ")";
    // console.log(images);
    images.splice(randomCount, 1)
    // console.log(images);
}

function hide(div, idx){
  console.log(div);
  // console.log(div.getElementsByClassName("LocDiv")[0]);
  // var div = div.getElementsByClassName("LocDiv")[0];
  div.style.display = div.style.display == "none" ? "block" : "none";
  addListingToRecentHistory(idx)
  // console.log("index: " + idx);
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
