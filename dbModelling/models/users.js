const mongoose = require("mongoose");

// Embedding Data by Obj References
// The USERS has a one-to-many relationship wt POSTS
const Schema = mongoose.Schema;
const UserSchema = new Schema({
	name: String,
	email: String,
	// Instaed of embedding an array of posts, we hv an array of IDs as refs to posts
	posts: [
		{
			// We reference the 'Post' by an obj id,each post is ref by an 'id'
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post"
		}
	]
});
// Create the Model
const Users = mongoose.model("Users", UserSchema);
module.exports = Users;
