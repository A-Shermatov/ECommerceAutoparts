const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const path = require('path');

const User = require("../models/users");

const length_for_salt = 10;

module.exports.get_all_users = async (query) =>{
    const users = await User.find(query).select('fname sname email role');
    var data = {
        users: users
    }
    return data;
}


module.exports.get_user_by_email = async (email) =>{
    const user = await User.findOne({email: email});
    return user;
}

module.exports.get_user_by_id = async (id) =>{
    const user = await User.findOne({_id: id}).select("-_id fname sname phone");
    return user;
}

module.exports.update_user_by_id = async (user_id, updates) =>{
    updates["password"] = await bcrypt.hash(updates.password, length_for_salt)
    const updatedUser = await User.findOneAndUpdate(
        { _id: user_id },
        { $set: updates },
        { new: true }
      );
    return updatedUser;
}

module.exports.delete_user_by_id = async (user_id) =>{
    const deletedUser = await User.findByIdAndDelete(user_id);
    return deletedUser;
}


module.exports.add_user = async (data) =>{
    const hashedPassword = await bcrypt.hash(data.password, length_for_salt);
    data.password = hashedPassword;
    try {
        const user = new User(data);
        await user.save();
        return user
        
    } catch(error) {
        console.log(error)
    }   
}

