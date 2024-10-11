var mongoose = require("mongoose"),
	ObjectId = mongoose.Schema.Types.ObjectId;
	// mongoose.Schema.Types.Buffer
// Это модель mongoose для списка блюд меню
var PurchaseSchema = mongoose.Schema({
	buyer_id : { type: ObjectId, ref: "User" },
    product_id : { type: ObjectId, ref: "Product" },
    total: {type: Number, required: true},
    purchase_date: {type: Date, required: true, default: Date()}
});

var Purchase = mongoose.model("Purchase", PurchaseSchema); 
module.exports = Purchase;