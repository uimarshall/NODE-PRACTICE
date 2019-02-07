const express = require("express");
// mergeParams: true is to enable us find the 'id' in the db when we add comments
const router = express.Router({ mergeParams: true });
const Campground = require("../models/campground");
const Comment = require("../models/comments");
const User = require("../models/users");
// =============================================
// COMMENTS ROUTE
// =============================================

// The added 'comments' will be associated with a particular campground
// Hence the url = "/campgrounds/:id/comments/new"
// And the comments will be submitted to that particular campground = "/campgrounds/:id/comments" thru POST
router.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
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
// Create Comments
router.post("/campgrounds/:id/comments", isLoggedIn, (req, res) => {
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
					// B4 we push the 'comments' to the campground,we want to:
					// 1. add username & id to the comment
					// The only way we get the current user is if the user is loggedIn so we use 'req.user'
					// console.log("New comment's username will be: " + req.user.username);
					commentCreated.author.id = req.user._id;
					commentCreated.author.username = req.user.username;
					// // 2. save the comment
					commentCreated.save();
					// Link the commentCreated to the campgroundFound
					campgroundFound.comments.push(commentCreated);
					campgroundFound.save();
					// Redirect to show page
					console.log(commentCreated);
					res.redirect("/campgrounds/" + campgroundFound._id);
				}
			});
		}
	});
});

// If a user isLoggedIn it should access the 'Add comments form'
function isLoggedIn(req, res, next) {
	// next() reps the code that runs if the user isAuthenticated/isLoggedIn
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}
module.exports = router;
