class listing {
    constructor(title, hostName, address, city, state, zip, price){
        this.title = title;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.host = hostName;
        this.price = price;
    }
    setType(type){
    	this.type = type;
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
    setRenterName(name){
        this.host = name;
    }
    setPrice(price){
        this.price = price;
    }
    setUtilities(utilities){
        this.utilities = utilities;
    }
    setPets(pets){
        this.pets = pets;
    }
    setSmoking(smoking){
        this.smoking = smoking;
    }
    setSize(size){
        this.size = size;
    }
    setViewable(viewable){
        this.viewable = viewable;
    }
    print(){
        var petOut;
        var smokingOut;
        var typeOut;
        if(this.viewable){
            if(this.pets == true){
            petOut = "pets okay";
            } else {petOut = "no pets";}
            if(this.smoking == true){
            smokingOut = "smoking okay";
            } else {smokingOut = "no smoking";}
            if(this.type == "house"){
            	typeOut = this.bedNum + " bedrooms," + this.bathNum + " bathrooms";
            } else { typeOut = "room";}
            return(
                "Title: " + this.title 
                + "\n Type: " + typeOut
                + "\n Address: " + this.address + " " + this.city + " " + this.state + " " + this.zip
                + "\n Price: " + this.price + " per month"
                + "\n Utilities: " + this.utilities
                + "\n Pets: " + petOut
                + "\n Smoking: " + smokingOut
                + "\n Size: " + this.size + " square feet"
            );
        }
    }
}

function viewAll(listings){
    for(i=0; i<listings.length; i++){
        listings[i].setViewable(true);
    }
}

function filterPrice(listings, price){
    for(i=0; i<listings.length; i++){
        if(listings[i].price > price){
            listings[i].setViewable(false);
        }
    }
}

function searchZip(listings, zip){
    for(i=0; i<listings.length; i++){
        if(listings[i].zip != zip){
            listings[i].setViewable(false);
        }
    }
}

function searchCity(listings, city){
    for(i=0; i<listings.length; i++){
        if(listings[i].city != city){
            listings[i].setViewable(false);
        }
    }
}

function listingsPrint(listings){
    for(i=0; i<listings.length; i++){
        listings[i].print();
    }
}
