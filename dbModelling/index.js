const Post = require("./models/post.js");
const Users = require("./models/users");
const dbConn = require("./models/conn");
// Create posts
// Post.create(
// 	{
// 		title: "Game On",
// 		content: "What a great time here in marshall Island with their local dishes"
// 	},
// 	(err, post) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			// Connect the post & d user using the post_id from the post we just created
// 			Users.findOne({ email: "thom@gmail.com" }, (err, foundUser) => {
// 				if (err) {
// 					console.log(err);
// 				} else {
// 					foundUser.posts.push(post);
// 					foundUser.save((err, savedData) => {
// 						if (err) {
// 							console.log(err);
// 						} else {
// 							console.log(savedData);
// 						}
// 					});
// 				}
// 			});
// 		}
// 	}
// );

// Create a User that we can posts to later
// Users.create({
// 	name: "Thompson Ba",
// 	email: "thom@gmail.com"
// });

// Find user
// Find all posts for that user
// We find a user and populate 'posts' field as def in the Userschema then run query using .exec()
Users.findOne({ email: "thom@gmail.com" })
	.populate("posts")
	.exec((err, user) => {
		if (err) {
			console.log(err);
		} else {
			console.log(user);
		}
	});
