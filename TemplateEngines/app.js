var express = require('express');
var app = express();

app.get('/', (req, res)=>{
	res.render('home.ejs')
});

app.get('/players/:name', (req, res)=>{
	let routeVar = req.params.name;
	res.render('embedjs.ejs', {dataTobeEmbed: routeVar})
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
	console.log(`Server is listening on port ${PORT}` );
})