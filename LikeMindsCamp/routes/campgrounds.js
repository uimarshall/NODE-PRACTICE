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
router.post("/campgrounds", isLoggedIn, (req, res) => {
	// get data from form and add to the campgrounds array
	let campName = req.body.campname;
	let imageUrl = req.body.imageUrl;
	let desc = req.body.description;
	let author = {
		id: req.user._id,
		username: req.user.username
	};
	// the 'name' & 'image' key comes frm the campgrounds array

	let newCampground = {
		name: campName,
		image: imageUrl,
		description: desc,
		author
	};
	console.log(req.body);
	Campground.create(newCampground, (err, newlyCreatedCamp) => {
		if (err) {
			console.log(err);
		} else {
			// redirect back to the campground(home) page
			console.log(newlyCreatedCamp);
			res.redirect("/campgrounds");
		}
	});
	// campgrounds.push(newCampground);
});

// NEW- Show form to create new campgrounds
router.get("/campgrounds/new", isLoggedIn, (req, res) => {
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

// EDIT CAMPGROUND ROUTE
// 'Edit route' will show a form that will submit to 'Update Route'
// router.get("/campgrounds/:id/edit", (req, res) => {
// 	// Is user logged in B4 Editting - AUTHENTICATION
// 	if (req.isAuthenticated()) {
// 		Campground.findById(req.params.id, (err, foundCampground) => {
// 			if (err) {
// 				console.log(err);
// 			} else {
// 				// Does current user or the loggedIn user owns or authored the campground-AUTHORISATION
// 				// What this means is: Is the 'id' found in the db == currently log in user'id'
// 				if (foundCampground.author.id.equals(req.user._id)) {
// 					res.render("campgrounds/edit", {
// 						campground: foundCampground,
// 						title: "Edit"
// 					});
// 				} else {
// 					res.send("YOU DO NOT HAVE PERMISSIONS");
// 				}
// 			}
// 		});
// 	} else {
// 		console.log("YOU NEED TO LOG IN");
// 		res.send("YOU NEED TO LOG IN TO DO THAT!!!");
// 	}
// });

// USING A MIDDLEWARE FOR THE EDIT ROUTE
router.get("/campgrounds/:id/edit", checkCampgroundOwnership, (req, res) => {
	Campground.findById(req.params.id, (err, foundCampground) => {
		res.render("campgrounds/edit", {
			campground: foundCampground,
			title: "Edit"
		});
	});
});

// UPDATE CAMPGROUND ROUTE
// findById this campground and update with this data = 'req.body.campgound'
// 'campground' is an obj that raps 'req.body.campname, req.body.imageUrl, req.body.description in the 'edit form'

router.put("/campgrounds/:id", (req, res) => {
	Campground.findByIdAndUpdate(
		req.params.id,
		req.body.campground,
		(err, updatedCampground) => {
			if (err) {
				console.log(err);
			} else {
				// redirect to the campground updated, you can use 'req.params.id' or 'updatedCampground._id'
				// if you don't put ' / ' infront of "/campgrounds" it will give u this error: 'Cannot GET / campgrounds5c5ae01a62255d24e8f7b2a2'
				// indicating that '/' is missing at the front
				// redirect to 'show page'
				res.redirect("/campgrounds/" + req.params.id);
			}
		}
	);
});

// DELETE CAMPGROUND ROUTE
router.delete("/campgrounds/:id", (req, res) => {
	Campground.findByIdAndRemove(req.params.id, err => {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
});
// If a user isLoggedIn it should access the 'Add new campgrounds form'
function isLoggedIn(req, res, next) {
	// next() reps the code that runs if the user isAuthenticated/isLoggedIn
	if (req.isAuthenticated()) {
		return next();
	}
	// redirect to 'login' page if user is not loggedIn
	res.redirect("/login");
}

// CHECK CAMPGROUND OWNERSHIP
function checkCampgroundOwnership(req, res, next) {
	// Is user logged in B4 Editting - AUTHENTICATION
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, (err, foundCampground) => {
			if (err) {
				res.redirect("back");
			} else {
				// Does current user or the loggedIn user owns or authored the campground-AUTHORISATION
				// What this means is: Is the 'id' found in the db == currently log in user'id'
				if (foundCampground.author.id.equals(req.user._id)) {
					// Do next e.g: Find and Delete or Update
					next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		// This will take the user back to the previous page it came from
		res.redirect("back");
	}
}
module.exports = router;
