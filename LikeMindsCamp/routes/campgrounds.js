const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
// INDEX - Show all Campgrounds
// GET ALL CAMPGROUNDS FROM DB
// 'req.user' is added by passport pkgs
router.get("/campgrounds", (req, res) => {
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
router.post("/campgrounds", (req, res) => {
	// get data from form and add to the campgrounds array
	let campName = req.body.campname;
	let imageUrl = req.body.imageUrl;
	let desc = req.body.description;
	// the 'name' & 'image' key comes frm the campgrounds array
	let newCampground = {
		name: campName,
		image: imageUrl,
		description: desc
	};
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
router.get("/campgrounds/new", (req, res) => {
	res.render("campgrounds/newCampground", {
		title: "newcamp"
	});
});

// SHOW - shows more info about one campground
// This route must come after 'NEW' otherwise 'new' in "/campground/new" will be treated as an ID
router.get("/campgrounds/:id", (req, res) => {
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
module.exports = router;
