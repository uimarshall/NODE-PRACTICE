const mongoose = require("mongoose");
const Comment = require("./comments");
// SCHEMA SETUP

const Schema = mongoose.Schema;
const CampgroundSchema = new Schema({
	name: String,
	image: String,
	description: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: Comment
		}
	]
});

const Campground = mongoose.model("Campground", CampgroundSchema);
module.exports = Campground;
