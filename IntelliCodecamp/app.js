const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
	res.render("landing", { title: "" });
});

app.get("/campgrounds", (req, res) => {
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
			image:
				"https://images.unsplash.com/photo-1480779735619-f73b30fdc062?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
		}
	];
	res.render("campgrounds", { data: campgrounds, title: "campground" });
});
app.post("/campgrounds", (req, res) => {
	// get data from form and add to the campground array
	// redirect back to the campground page
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
