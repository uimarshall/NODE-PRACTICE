const mongoose = require("mongoose");

const conn = mongoose.connect("mongodb://localhost/blog_demo");
module.exports = conn;
