const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const expressSession = require('express-session');
const User = require("./models/users");

// Connect db
mongoose.connect("mongodb://localhost/Auth_demo");
const app = express();

// Tell express to use session
app.use(expressSession({
    // The secret will beused to encode & decode the sessions
    // so the data inside the sessions wil not be readable but encoded
    secret: 'I am the best developer in the world',
    resave: false,
    saveUninitialized: false
}))
// These 2 MIDDLEWARE must be used to tell express to use passport
app.use(passport.initialize())
app.use(passport.session())

// Use localStrategy
passport.use(new localStrategy(User.authenticate()))
// The serializeUser encodes the data & pass it back to the session
passport.serializeUser(User.serializeUser())
// The deserializeUser takes the encoded data and unencodes it
passport.deserializeUser(User.deserializeUser())
app.use(bodyParser.urlencoded({
    extended: true
}));
// __dirname is the currently directory where the script/app is running
app.use(express.static(__dirname + '/public'));
// console.log(__dirname);
app.set("view engine", "ejs");

// ROUTES
app.get('/', (req, res) => {
    res.render('home');
});

// 'isLoggedIn' is a mIDDLEWARE that runs if we goto '/secret', if the user isLoggedIn
// it runs the calback and render the secret page else it runs 'next' defined in the isLoggedIn func
app.get('/secret', isLoggedIn, (req, res) => {
    res.render('secret');
});

// Auth Routes
// Show signup form
app.get('/register', (req, res) => {
    res.render('register')
})

// Handle user sign up 
app.post('/register', (req, res) => {
    req.body.username
    req.body.password
    // 'User.register' is provided by the "passport-local-mongoose" pkg
    User.register(new User({
        username: req.body.username
    }), req.body.password, (err, user) => {
        if (err) {
            console.log(err)
            // short-cct back to register page if error
            return res.render('register')
        }
        // This wil log in the user, perform the session,run the serializeUser mtd if no error
        // We use the 'local' Strategy, we can also use 'twitter', 'fb' later
        passport.authenticate('local')(req, res, () => {
            console.log(req.body.password)
            res.redirect('/secret')

        })
    })

})

// Login Routes
// Render Login form
app.get('/login', (req, res) => {
    res.render('login')
})
app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
}), (req, res) => {

})

// Logout Route
app.get('/logout', (req, res) => {
    // passport will destroy all the user data from the session
    req.logout()
    res.redirect('/')
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    // if user not authenticated, redirect to '/login'
    res.redirect('/login')
}


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});