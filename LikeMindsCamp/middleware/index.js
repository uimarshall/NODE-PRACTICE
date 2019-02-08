// All middlewares goes here
const Campground = require("../models/campground");
const Comment = require("../models/comments");
let middlewareObj = {};
// populate the middlewareObj variable
// CHECK CAMPGROUND OWNERSHIP
middlewareObj.checkCampgroundOwnership = function checkCampgroundOwnership(
	req,
	res,
	next
) {
	// Is user logged in B4 Editting - AUTHENTICATION
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, (err, foundCampground) => {
			if (err) {
				req.flash("error", "Campground not found!");
				res.redirect("back");
			} else {
				// Does current user or the loggedIn user owns or authored the campground-AUTHORISATION
				// What this means is: Is the 'id' found in the db == currently log in user'id'
				if (foundCampground.author.id.equals(req.user._id)) {
					// Do next e.g: Find and Delete or Update
					// THIS IS: PERMISSIONS
					next();
				} else {
					req.flash("error", "You do not have the permissions to do that!");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to log in to do that!");
		// This will take the user back to the previous page it came from if not Authenticated thru logIn after SignUp
		res.redirect("back");
	}
};
// CHECK COMMENT OWNERSHIP
middlewareObj.checkCommentOwnership = function checkCommentOwnership(
	req,
	res,
	next
) {
	// Is user logged/signup in B4 Editting/Deleting - AUTHENTICATION
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, (err, foundComment) => {
			if (err) {
				res.redirect("back");
			} else {
				// Does current user or the loggedIn user owns or authored the campground-AUTHORISATION
				// What this means is: Is the 'id' found in the db == currently log in user'id'
				if (foundComment.author.id.equals(req.user._id)) {
					// Do next e.g: Find and Delete or Update or run the route handler
					// THIS IS: PERMISSIONS
					next();
				} else {
					req.flash("error", "You don't have permissions to do that!");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to log in to do that!");
		// This will take the user back to the previous page it came from if not Authenticated thru logIn after SignUp
		res.redirect("back");
	}
};

// If a user isLoggedIn it should access the 'Add comments form'
middlewareObj.isLoggedIn = function isLoggedIn(req, res, next) {
	// next() reps the code that runs if the user isAuthenticated/isLoggedIn
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "You need to log in to do that!");
	res.redirect("/login");
};
module.exports = middlewareObj;
