const express = require("express");
const request = require("request");
const app = express();
app.set("view engine", "ejs");
app.get("/", (req, res) => {
	res.render("search");
});
app.get("/results", (req, res) => {
	console.log(typeof req.query.search);
	let query = req.query.search;
	let url = "http://www.omdbapi.com/?apikey=5f985ba9&s=" + query;
	request(url, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			let apiCalldata = JSON.parse(body);
			res.render("apiCallResults", { data: apiCalldata });
		}
	});
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
