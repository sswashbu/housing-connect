class listing {
	constructor(title){
		this.title = title;
	}
	setAddress(address){
		this.address = address;
	}
	setRenterName(name){
		this.host = name;
	}
	setPrice(price, duration){
		this.price = price;
		this.duration = duration;
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
		var petOut;
		var smokingOut;
		if(this.pets == true){
			petOut = "pets okay";
		} else {petOut = "no pets";}
		if(this.smoking == true){
			smokingOut = "smoking okay";
		} else {smokingOut = "no smoking";}
		console.log(
			"Title: " + this.title 
			+ "\n Address: " + this.address
			+ "\n Price: " + this.price + " per " + this.duration
			+ "\n Utilities " + this.utilities
			+ "\n Pets: " + petOut
			+ "\n Smoking: " + smokingOut
			+ "\n Size: " + this.size + " square feet"
			)
	}
}

var x = new listing("Nice seabright appartment $1200/m");
x.setAddress("123 Nice Home Rd");
x.setPrice(1200, "month");
x.setUtilities("Internet, water and electric included");
x.setPets(false);
x.setSmoking(true);
x.setSize(11);
x.print();

