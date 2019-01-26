const express = require("express");
const router = express.Router();
const Blog = require("../models/blogSchema.js");
// RESTFUL ROUTES
// Always remember to use 'res.render' when using template engines

// The home page is usually the 'index' page so we redirect
router.get("/", (req, res) => {
	res.redirect("/blogs");
});

// INDEX ROUTE- List all blogs
router.get("/blogs", (req, res) => {
	Blog.find({}, (err, blogs) => {
		if (err) {
			console.log(err);
		} else {
			res.render("index", { blogs: blogs });
		}
	});
});

// NEW ROUTE -  Show new dog form
router.get("/blogs/new", (req, res) => {
	res.render("new");
});

// CREATE ROUTE - Create a particular post and redirect
router.post("/blogs", (req, res) => {
	// sanitize when u create to bar users frm typing scripts into the app
	console.log(req.body);
	req.body.blog.body = req.sanitize(req.body.blog.body);
	console.log("====================");
	console.log(req.body);
	Blog.create(req.body.blog, (err, newBlog) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/blogs");
		}
	});
});

// SHOW ROUTE - Show more details about a particular post
router.get("/blogs/:id", (req, res) => {
	// findBy the provided id params and return the post wt that id
	let providedId = req.params.id;
	Blog.findById(providedId, (err, foundBlogPost) => {
		if (err) {
			res.redirect("/blogs");
		} else {
			res.render("show", { blog: foundBlogPost });
		}
	});
});

// EDIT ROUTE - Show edit form for one post
router.get("/blogs/:id/edit", (req, res) => {
	// 1st Use the id to find the blog u want to edit
	Blog.findById(req.params.id, (err, foundBlogPost) => {
		if (err) {
			console.log(err);
		} else {
			// Once the foundBlogPost is rendered u can now edit
			res.render("edit", { blog: foundBlogPost });
		}
	});
});

// UPDATE ROUTE
// We use PUT mtd bc we are putting to/changing what is already there using a particular id
router.put("/blogs/:id", (req, res) => {
	// Sanitize when u update, so that users will not enter script and break the code
	req.body.blog.body = req.sanitize(req.body.blog.body);
	//It takes the form "Blog.findByIdAndUpdate(idTofindBy, newDataFromForm, callback)""
	// The 'blog' houses the title,image,body,id as specified in the schema,when we type into d edit form
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
		if (err) {
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

// DESTROY ROUTE
router.delete("/blogs/:id", (req, res) => {
	// Find a particular blog
	Blog.findByIdAndDelete(req.params.id, err => {
		if (err) {
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	});
});

module.exports = router;
