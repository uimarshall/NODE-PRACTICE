const mongoose = require("mongoose");

// Connect Db
const connection = mongoose.connect("mongodb://localhost/restful_blog_app");
module.exports = connection;
