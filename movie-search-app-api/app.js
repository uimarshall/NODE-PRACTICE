const express = require("express");
const request = require("request");
const app = express();
app.set("view engine", "ejs");
app.get("/results", (req, res) => {
	request("http://www.omdbapi.com/?apikey=5f985ba9&s=Batman", function(
		error,
		response,
		body
	) {
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
