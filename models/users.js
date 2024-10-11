var mongoose = require("mongoose");
	// mongoose.Schema.Types.Buffer
// Это модель mongoose для пользователей
var UserSchema = mongoose.Schema({
	fname: {type: String, required: true},
    sname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    role: {type: String, default: "buyer"},
	status : {type: Boolean, default: true}
});

var User = mongoose.model("User", UserSchema); 
module.exports = User;