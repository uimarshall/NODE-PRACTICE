const mongoose = require("mongoose");
// POST - title, content
const Schema = mongoose.Schema;
const PostSchema = new Schema({
	title: String,
	content: String
});
// Create the Model
const Post = mongoose.model("Post", PostSchema);

// Module.exports is d return value for a file just we have return statement in a fn where you tell what you want to return in the fn
module.exports = Post;
