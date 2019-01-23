const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
	res.render("landing", { title: "" });
});
let campgrounds = [
	{
		name: "Mark Zukkerberg",
		image:
			"https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
	},
	{
		name: "Steve Jobs",
		image:
			"https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
	},
	{
		name: "Caleb Marshall",
		image:
			"https://images.unsplash.com/photo-1440262206549-8fe2c3b8bf8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
	},
	{
		name: "Jeff Boss",
		image: "https://farm9.staticflickr.com/8041/7930201874_6c17ed670a.jpg"
	}
];

app.get("/campgrounds", (req, res) => {
	res.render("campgrounds", { data: campgrounds, title: "campground" });
});

// ENABLING USERS TO CREATE NEW CAMPGROUDS
// Set up new campground POST route
// Setup route to show form for users to add campground

// create new campgrounds
app.post("/campgrounds", (req, res) => {
	// get data from form and add to the campgrounds array
	let campName = req.body.campname;
	let imageUrl = req.body.imageUrl;
	// the 'name' & 'image' key comes frm the campgrounds array
	let newCampground = { name: campName, image: imageUrl };
	campgrounds.push(newCampground);
	// redirect back to the campground(home) page
	res.redirect("/campgrounds");
});
app.get("/campground/new", (req, res) => {
	res.render("newCampground", { title: "newcamp" });
	// get data from form and add to the campground array
	// redirect back to the campground page
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
