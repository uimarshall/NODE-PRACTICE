var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
friends = ["Fred", "Drago", "Loveth", "Eunice"];

app.get("/", (req, res) => {
	res.render("home", { title: "" });
});
app.get("/posts", (req, res) => {
	posts = [
		{
			title: "Ronaldo wins again",
			author: "Delaney"
		},
		{
			title: "Election violence",
			author: "Oittoju"
		},
		{
			title: "A new nobel laureate",
			author: "Fisher"
		}
	];
	res.render("post", { posts: posts, title: "posts" });
});

app.get("/players/:name", (req, res) => {
	let routeVar = req.params.name;
	res.render("embedjs", { dataTobeEmbed: routeVar, title: "players" });
});

app.get("/friends", (req, res) => {
	res.render("postRequest", { friends: friends, title: "" });
});

app.post("/addfriends", (req, res) => {
	// console.log(req.body);
	let friend = req.body.newfriend;
	friends.push(friend);
	res.redirect("/friends");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
