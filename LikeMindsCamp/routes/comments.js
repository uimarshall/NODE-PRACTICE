const express = require("express");
// mergeParams: true is to enable us find the 'id' in the db when we add comments
const router = express.Router({ mergeParams: true });
const Campground = require("../models/campground");
const Comment = require("../models/comments");
const User = require("../models/users");
const middleware = require("../middleware");
// =============================================
// COMMENTS ROUTE
// =============================================

// The added 'comments' will be associated with a particular campground
// Hence the url = "/campgrounds/:id/comments/new"
// And the comments will be submitted to that particular campground = "/campgrounds/:id/comments" thru POST
router.get(
	"/campgrounds/:id/comments/new",
	middleware.isLoggedIn,
	(req, res) => {
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
	}
);
// Create Comments
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, (req, res) => {
	// Lookup campground using ID
	Campground.findById(req.params.id, (err, campgroundFound) => {
		if (err) {
			req.flash("error", "Something went wrong!");
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
					req.flash("success", "Successfully added comment!");
					res.redirect("/campgrounds/" + campgroundFound._id);
				}
			});
		}
	});
});

// EDIT COMMENTS ROUTE
router.get(
	"/campgrounds/:id/comments/:comment_id/edit",
	middleware.checkCommentOwnership,
	(req, res) => {
		Comment.findById(req.params.comment_id, (err, foundComment) => {
			if (err) {
				res.redirect("back");
			} else {
				res.render("comments/editComments", {
					campground_id: req.params.id,
					comment: foundComment,
					title: "Edit Comment"
				});
			}
		});
	}
);

// UPDATE COMMENTS ROUTE
router.put(
	"/campgrounds/:id/comments/:comment_id",
	middleware.checkCommentOwnership,
	(req, res) => {
		Comment.findByIdAndUpdate(
			req.params.comment_id,
			req.body.comment,
			(err, updatedComment) => {
				if (err) {
					res.redirect("back");
				} else {
					req.flash("success", "Comment updated!");
					// redirect to 'show' page
					res.redirect("/campgrounds/" + req.params.id);
				}
			}
		);
	}
);

// DELETE COMMENTS ROUTE
router.delete(
	"/campgrounds/:id/comments/:comment_id",
	middleware.checkCommentOwnership,
	(req, res) => {
		Comment.findByIdAndRemove(req.params.comment_id, err => {
			if (err) {
				res.redirect("back");
			} else {
				req.flash("error", "Comment deleted!");
				res.redirect("/campgrounds/" + req.params.id);
			}
		});
	}
);

module.exports = router;
