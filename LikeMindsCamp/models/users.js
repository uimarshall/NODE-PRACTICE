const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: String,
    password: String
});

// This will add a bunch of mtds that comes with the "passport-local-mongoose" pkg to the UserSchema
// The mtds will beused by the 'User' model
UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', UserSchema);
module.exports = User;