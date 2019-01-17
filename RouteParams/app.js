var express = require('express');
var app = express();

app.get("/says/:animal", (req, res)=>{
	console.log(req.params);
	let animal = req.params.animal.toLowerCase();
	let sounds = {
		dog: "whof whof",
		cat: "meow",
		pig: "Oink",
		cow: "mow"
	}
	// using 'sounds.animal' will not work but 'sounds[animal]'
	res.send(`The ${animal} says ${sounds[animal]}`)


});

app.get('/repeat/:word/:times', (req, res)=>{
	console.log(req.params);
	let words = req.params.word;
	// req.params outputs obj, wt a value of a key being a string
	let times = Number(req.params.times);
	let word = '';
	for (var i = 0; i < times; i++) {
		word += words + ' ';
	}
	res.send(word);

});

app.get('*', (req, res)=>{
	res.send(`Page not found... check the link and try again`);
});

// 'PORT' is the 'env variable' bc its diff in diff environment e.g heroku can use a
// diff port other than '3000'
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
	console.log(`Server is listening on port ${PORT}`);
});