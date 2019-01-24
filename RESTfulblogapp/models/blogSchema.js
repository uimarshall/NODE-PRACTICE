const mongoose = require("mongoose");

/*
Our blog will have the ffg:
- title: title of post
- image: profile image
- body: content
- created: date post was created
*/
const Schema = mongoose.Schema;
const BlogSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

// Compile Schema to Model
const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
