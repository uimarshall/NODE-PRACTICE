const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/IntelliCodeCamp");
const app = express();

// SCHEMA SETUP

const Schema = mongoose.Schema;
const CampgroundSchema = new Schema({
	name: String,
	image: String,
	description: String
});

const Campground = mongoose.model("Campgrond", CampgroundSchema);
// Campground.create(
// 	{
// 		name: "Mike Emegwuale",
// 		image: "https://farm9.staticflickr.com/8041/7930201874_6c17ed670a.jpg",
// 		description:
// 			"This is Emegwuales corner one of the most decorated software engineer"
// 	},
// 	(err, campground) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log("NEWLY CREATED CAMPGROUND");
// 			console.log(campground);
// 		}
// 	}
// );
// Campground.create(
// 	{
// 		name: "Mark Essien",
// 		image:
// 			"https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104491f8c071a7e8b1b8_340.jpg"
// 	},
// 	(err, campground) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log("NEWLY CREATED CAMPGROUND");
// 			console.log(campground);
// 		}
// 	}
// );

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
	res.render("landing", { title: "" });
});
// let campgrounds = [
// 	{
// 		name: "Mark Zukkerberg",
// 		image:
// 			"https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
// 	},
// 	{
// 		name: "Steve Jobs",
// 		image:
// 			"https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
// 	},
// 	{
// 		name: "Caleb Marshall",
// 		image:
// 			"https://images.unsplash.com/photo-1440262206549-8fe2c3b8bf8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
// 	},
// 	{
// 		name: "Jeff Boss",
// 		image: "https://farm9.staticflickr.com/8041/7930201874_6c17ed670a.jpg"
// 	}
// ];

// INDEX - Show all Campgrounds
// GET ALL CAMPGROUNDS FROM DB
app.get("/campgrounds", (req, res) => {
	Campground.find({}, (err, allcampgrounds) => {
		if (err) {
			console.log(err);
		} else {
			res.render("index", {
				data: allcampgrounds,
				title: "campground"
			});
		}
	});
});

// ENABLING USERS TO CREATE NEW CAMPGROUDS
// Set up new campground POST route
// Setup route to show form for users to add campground

// CREATE- add new Campground to the Db
// create new campgrounds
app.post("/campgrounds", (req, res) => {
	// get data from form and add to the campgrounds array
	let campName = req.body.campname;
	let imageUrl = req.body.imageUrl;
	let desc = req.body.description;
	// the 'name' & 'image' key comes frm the campgrounds array
	let newCampground = { name: campName, image: imageUrl, description: desc };
	Campground.create(newCampground, (err, newlyCreatedCamp) => {
		if (err) {
			console.log(err);
		} else {
			// redirect back to the campground(home) page
			res.redirect("/campgrounds");
		}
	});
	// campgrounds.push(newCampground);
});

// NEW- Show form to create new campgrounds
app.get("/campgrounds/new", (req, res) => {
	res.render("newCampground", { title: "newcamp" });
});

// SHOW - shows more info about one campground
// This route must come after 'NEW' otherwise 'new' in "/campground/new" will be treated as an ID
app.get("/campgrounds/:id", (req, res) => {
	// find the campground with provided ID
	Campground.findById(req.params.id, (err, foundCampground) => {
		if (err) {
			console.log(err);
		} else {
			//render show template with that campground found
			res.render("show", { campground: foundCampground, title: "desc" });
		}
	});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});

// RESTFUL ROUTES

// name	      url		verb		desc.
// ===============================================
// INDEX      /dogs      GET        Display a list of all dogs
// NEW      /dogs/new    GET        Display form to make a new dog
// INDEX      /dogs      POST       Add new dog to DB
// SHOW      /dogs/:id   GET        Shows more info about one dog
