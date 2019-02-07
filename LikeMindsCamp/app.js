const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const expressSession = require("express-session");
const methodOverride = require("method-override");
const Campground = require("./models/campground");
const Comment = require("./models/comments");
const User = require("./models/users");
const seedDB = require("./seeds");
mongoose.connect("mongodb://localhost/LikeMindsCamp");

// ROUTES
const commentsRoute = require("./routes/comments");
const campgroundsRoute = require("./routes/campgrounds");
const indexRoute = require("./routes/index");

const app = express();
// Call the seedDB fn, everytime the server starts, the DB shud be seeded
// seedDB();

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.set("view engine", "ejs");
// __dirname is the currently directory where the script/app is running
app.use(express.static(__dirname + "/public"));
console.log(__dirname);
app.use(methodOverride("_method"));

// ==========================================
// CONFIGURE PASSPORT
// Tell express to use session
app.use(
	expressSession({
		// The secret will beused to encode & decode the sessions
		// so the data inside the sessions wil not be readable but encoded
		secret: "I am the best developer in the world",
		resave: false,
		saveUninitialized: false
	})
);
// These 2 MIDDLEWARE must be used to tell express to use passport
app.use(passport.initialize());
app.use(passport.session());

// Use localStrategy
passport.use(new localStrategy(User.authenticate()));
// The serializeUser encodes the data & pass it back to the session
passport.serializeUser(User.serializeUser());
// The deserializeUser takes the encoded data and unencodes it
passport.deserializeUser(User.deserializeUser());

// Middleware to show login & signup if user isNotLoggedIn
// 'req.user' will be empty/undefined if no user is signed in
// or will output the 'username' & 'id' if user is signed in
// This middleware will be called on every route
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

// MIDDLEWARE FOR ROUTES
app.use(commentsRoute);
app.use(campgroundsRoute);
app.use(indexRoute);

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
