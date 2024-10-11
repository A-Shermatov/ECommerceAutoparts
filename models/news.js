var mongoose = require("mongoose"),
    ObjectId = mongoose.Schema.Types.ObjectId;
// const path = require("path");
	// mongoose.Schema.Types.Buffer
// Это модель mongoose для пользователей
var NewsSchema = mongoose.Schema({
    owner_id : { type: ObjectId, ref: "User" },
	title: {type: String, required: true},
    description: {type: String, required: true},
    text: {type: Text, required: true},
	added_date: {type: Date, required: true},
    updated_date: {type: Date, required: true},
    added_news_date: {type: Date, required: true},
    img_path: String, // path,
    status: {type: Boolean, default: true}
});

var News = mongoose.model("News", NewsSchema); 
module.exports = News;