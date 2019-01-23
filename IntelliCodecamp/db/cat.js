// MONGOOSE is a Js layer on top of MongoDb,its an ODM(obj data mapper)
// it enable us to write js on top of mongodb
const mongoose = require("mongoose");
// When you run 'mogod' you'll see 'waiting for connections on port 27017'
// Connect 'mongoose' to port 27017
mongoose.connect("mongodb://localhost/cat_app");
const Schema = mongoose.Schema;
// 'Schema' is a func that atkes an obj as a parameter
console.log(typeof Schema);

// This is how any cat we create will look like
const CatSchema = new Schema({
	name: String,
	age: Number,
	temperament: String
});

// Take the 'CatSchema' or pattern and compile it to a model for all cats and
// save it to a variable called 'Cat', which will now hv all the mtds for CRUD etc
// e.g Cat.create(), Cat.remove()
const Cat = mongoose.model("Cat", CatSchema);

// Adding a new cat to the db
// let charlet = new Cat({
// 	name: "Charlet",
// 	age: 3,
// 	temperament: "cocky"
// });
// let nancy = new Cat({
// 	name: "Mrs Nancy",
// 	age: 6,
// 	temperament: "Evil"
// });

// Save lucy to DB
// For some reasons 'lucy' may not save bc it needs to check if 'mongod' is running, internet not connecting etc
// Hence we need to pass a callback func
// nancy.save(function(err, dataSavedToDb) {
// 	if (err) {
// 		console.log("SOMETHING WENT WRONG");
// 	} else {
// 		console.log("WE JUST SAVED A CAT TO THE DB");
// 		console.log(dataSavedToDb);
// 	}
// });
// NB: 'lucy'(var) is what goes to the db, its the var in Js that contains the cat we want to save
// 'dataSavedToDb' in the calback is what comes frm the db after save

// BETTER WAY OF CREATING NEW CATS
Cat.create(
	{
		name: "Palcer",
		age: 10,
		temperament: "Blande"
	},
	(err, cat) => {
		if (err) {
			console.log("OH NO ERROR");
		} else {
			console.log("HERE IS PUSSY!!!");
			console.log(cat);
		}
	}
);

// RETRIEVE ALL CATS FROM DB
Cat.find({}, (err, cats) => {
	if (err) {
		console.log("OH NO ERROR");
	} else {
		console.log("YOU HAVE ALL CATS FROM DB!!!");
		console.log(cats);
	}
});
