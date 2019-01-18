var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
