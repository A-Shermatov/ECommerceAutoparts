var mongoose = require("mongoose"),
    ObjectId = mongoose.Schema.Types.ObjectId;
// const path = require("path");
	// mongoose.Schema.Types.Buffer
// Это модель mongoose для пользователей
var ProductSchema = mongoose.Schema({
    seller_id : { type: ObjectId, ref: "User"},
	name: {type: String, required: true},
    vin: {type: Number, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
	added_date: {type: Date, default: Date()},
    updated_date: {type: Date, default: Date()},
    img: {type: String, maxlength: 1000000000},
    status: {type: Boolean, default: true}
});

var Product = mongoose.model("Product", ProductSchema); 
module.exports = Product;