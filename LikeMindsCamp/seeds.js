const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comments");

let data = [
	{
		name: "Galatians",
		image: "https://farm4.staticflickr.com/3290/3753652230_8139b7c717.jpg",
		description:
			"The Epistle to the Galatians, often shortened to Galatians, is the ninth book of the New Testament. It is a letter from Paul the Apostle to a number of Early Christian communities in Galatia. Scholars have suggested that this is either the Roman province of Galatia in southern Anatolia, or a large region defined by an ethnic group of Celtic people in central Anatolia.Paul is principally concerned with the controversy surrounding Gentile Christians and the Mosaic Law during the Apostolic Age..."
	},
	{
		name: "Ephesians",
		image: "https://farm8.staticflickr.com/7268/7121859753_e7f787dc42.jpg",
		description:
			"The Epistle to the Galatians, often shortened to Galatians, is the ninth book of the New Testament. It is a letter from Paul the Apostle to a number of Early Christian communities in Galatia. Scholars have suggested that this is either the Roman province of Galatia in southern Anatolia, or a large region defined by an ethnic group of Celtic people in central Anatolia.Paul is principally concerned with the controversy surrounding Gentile Christians and the Mosaic Law during the Apostolic Age..."
	},
	{
		name: "Romans",
		image: "https://farm4.staticflickr.com/3487/3753652204_a752eb417d.jpg",
		description:
			"The Epistle to the Galatians, often shortened to Galatians, is the ninth book of the New Testament. It is a letter from Paul the Apostle to a number of Early Christian communities in Galatia. Scholars have suggested that this is either the Roman province of Galatia in southern Anatolia, or a large region defined by an ethnic group of Celtic people in central Anatolia.Paul is principally concerned with the controversy surrounding Gentile Christians and the Mosaic Law during the Apostolic Age..."
	}
];
// This func wil Remove Campground
// This func wil create Campground
// Add few Comments

function seedDB() {
	// Remove Campground
	Campground.remove({}, err => {
		if (err) {
			console.log(err);
		}
		console.log("remove campgrounds!");
		// Add few Campgrounds
		data.forEach(seed => {
			Campground.create(seed, (err, campground) => {
				if (err) {
					console.log(err);
				} else {
					console.log("New Camp has been created");
				}
				// Create Comment
				Comment.create(
					{
						text: "This place is great, but i wish there was Paul",
						author: "Lambert"
					},
					(err, commentCreated) => {
						if (err) {
							console.log(err);
						} else {
							campground.comments.push(commentCreated);
							campground.save();
							console.log("New Comment has been created");
						}
					}
				);
			});
		});
	});
}
module.exports = seedDB;
