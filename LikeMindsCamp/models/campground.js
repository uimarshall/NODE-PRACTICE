const mongoose = require("mongoose");
// const Comment = require("./comments");
// const User = require("./users");
// SCHEMA SETUP

const Schema = mongoose.Schema;
const CampgroundSchema = new Schema({
	name: String,
	price: String,
	image: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

const Campground = mongoose.model("Campground", CampgroundSchema);
module.exports = Campground;
