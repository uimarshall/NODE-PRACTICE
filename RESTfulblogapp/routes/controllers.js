const express = require("express");
const router = express.Router();
const Blog = require("../models/blogSchema.js");
// RESTFUL ROUTES
// Always remember to use 'res.render' when using template engines

// The home page is usually the 'index' page so we redirect
router.get("/", (req, res) => {
	res.redirect("/blogs");
});

// INDEX- List all blogs
router.get("/blogs", (req, res) => {
	Blog.find({}, (err, blogs) => {
		if (err) {
			console.log(err);
		} else {
			res.render("index", { blogs: blogs });
		}
	});
});

module.exports = router;
