const mongoose = require("mongoose");

// SCHEMA SETUP

const Schema = mongoose.Schema;
const CommentSchema = new Schema({
	text: String,
	author: {
		// This line means which user authored or make this comment?
		// Is like having a user_id in the 'Comments' table or model
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
