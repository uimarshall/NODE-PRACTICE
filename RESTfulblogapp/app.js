// RESTful ROUtes
// REST -is an Architecture, pattern of mapping btw HTTP routes & CRUD

// A table of all 7 RESTful Routes
/*  Name        Path             HTTP Verb               Purpose 										Mongoose Mtd
=====================================================================================================================
INDEX           /dogs             GET                   List all dogs 									Dogs.find()
NEW             /dogs/new         GET                   Show new dog form 								N/A
CREATE          /dogs             POST                  Create a new dog then redirect somewhere        Dogs.create()
SHOW            /dogs/:id         GET                   Show info about one specific dog                Dogs.findById
EDIT            /dogs/:id/edit    GET                   Show edit form for one dog                      Dogs.findById
UPDATE          /dogs/:id         PUT                   Update a particular dog then redirect somewhere Dogs.findByIdAndUpdate
DESTROY          /dogs/:id         DELETE               Delete a particular dog then redirect somewhere Dogs.findByIdAndRemove
*/
/*App = blogApp
Our blog will have the ffg:
- title: title of post
- image: profile image
- body: content
- created: date post was created
*/
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
const express = require("express");
const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");
const routes = require("./routes/controllers.js");
const app = express();
// Connect Db
const dbConn = require("./models/conn.js");
// mongoose.connect("mongodb://localhost/restful_blog_app");
//  Require Schema
const Blog = require("./models/blogSchema.js");

// APP CONFIG
// Set template engine
app.set("view engine", "ejs");
// Serve Custom stylesheet
app.use(express.static("public"));

// Parse entries to the form used
app.use(bodyParser.urlencoded({ extended: true }));
// Sanitizer comes after bodyParser,after being parsed and attached to the 'req' obj
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// MIDDLEWARE ROUTE HANDLER: RESTFUL ROUTES
// This will enable the app know which request handler to handover the req to
app.use("/", routes);

// Blog.create({
// 	title: "test title",
// 	image:
// 		"https://pixabay.com/get/e830b90b2ef71c22d2524518b7444795ea76e5d004b014459df2c771a5e4b5_340.png",
// 	body: "just testing"
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
