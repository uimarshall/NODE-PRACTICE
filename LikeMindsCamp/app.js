const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comments");
const seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/LikeMindsCamp");

const app = express();
// Call the seedDB fn, everytime the server starts, the DB shud be seeded
seedDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
	res.render("landing", { title: "" });
});

// INDEX - Show all Campgrounds
// GET ALL CAMPGROUNDS FROM DB
app.get("/campgrounds", (req, res) => {
	Campground.find({}, (err, allcampgrounds) => {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {
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
	res.render("campgrounds/newCampground", { title: "newcamp" });
});

// SHOW - shows more info about one campground
// This route must come after 'NEW' otherwise 'new' in "/campground/new" will be treated as an ID
app.get("/campgrounds/:id", (req, res) => {
	// find the campground with provided ID
	Campground.findById(req.params.id)
		.populate("comments")
		.exec((err, foundCampground) => {
			if (err) {
				console.log(err);
			} else {
				//render show template with that campground found
				console.log(foundCampground);
				res.render("campgrounds/show", {
					campground: foundCampground,
					title: "desc"
				});
			}
		});
});

// =============================================
// COMMENTS ROUTE
// =============================================

// The added 'comments' will be associated with a particular campground
// Hence the url = "/campgrounds/:id/comments/new"
// And the comments will be submitted to that particular campground = "/campgrounds/:id/comments" thru POST
app.get("/campgrounds/:id/comments/new", (req, res) => {
	Campground.findById(req.params.id, (err, campgroundFound) => {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {
				campground: campgroundFound,
				title: "comments"
			});
		}
	});
});

app.post("/campgrounds/:id/comments", (req, res) => {
	// Lookup campground using ID
	Campground.findById(req.params.id, (err, campgroundFound) => {
		if (err) {
			console.log(err);
		} else {
			// Create new comment
			Comment.create(req.body.comment, (err, commentCreated) => {
				if (err) {
					console.log(err);
				} else {
					// Link the commentCreated to the campgroundFound
					campgroundFound.comments.push(commentCreated);
					campgroundFound.save();
					// Redirect to show page
					res.redirect("/campgrounds/" + campgroundFound._id);
				}
			});
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
