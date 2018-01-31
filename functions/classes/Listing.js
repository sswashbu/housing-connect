class Listing {
	constructor(title){
		this.title = title;
	}
	setAddress(address){
		this.address = address;
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
	print(){
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
			+ "\n Price: " + this.price + " per Month"
			+ "\n Utilities " + this.utilities
			+ "\n Pets: " + petOut
			+ "\n Smoking: " + smokingOut
			+ "\n Size: " + this.size + " square feet"
		)
	}
}

module.exports = {
	Listing: Listing
};