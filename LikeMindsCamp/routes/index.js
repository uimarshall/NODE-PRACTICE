const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/users");
// ROOT ROUTE
router.get("/", (req, res) => {
	res.render("landing", {
		title: "home"
	});
});

// ===============================================================
// AUTH ROUTES
// ===============================================================
// Show signup form
router.get("/register", (req, res) => {
	res.render("register", {
		title: "register"
	});
});

// Handle user signUp to authenticate the user
router.post("/register", (req, res) => {
	// 'User.register' is provided by the "passport-local-mongoose" pkg
	let newUser = new User({
		username: req.body.username
	});
	// The 'register mtd' will handle all the of hashing the password
	User.register(newUser, req.body.password, (err, user) => {
		if (err) {
			console.log(err);
			req.flash("error", err.message);
			// short-cct back to register page if error
			return res.render("register", { title: "register" });
		}
		// This wil log in the user, perform the session,run the serializeUser mtd if no error
		// We use the 'local' Strategy, we can also use 'twitter', 'fb' later
		// we use IIFE to immediately invoke the calback once the user is authenticated and redirect to '/campgrounds'
		passport.authenticate("local")(req, res, () => {
			req.flash("success", "Welcome to LikeMinds " + user.username + "!");
			res.redirect("/campgrounds");
		});
	});
});

// Show login form
router.get("/login", (req, res) => {
	res.render("login", {
		title: "login"
	});
});

// Authenticate Login
router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}),
	(req, res) => {}
);

// Logout Route
router.get("/logout", (req, res) => {
	// passport will destroy all the user data from the session using 'req.logout' frm the pkg
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/campgrounds");
});

module.exports = router;
