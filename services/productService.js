const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const path = require('path');

const Product = require("../models/products");


module.exports.get_all_products = async (query) =>{
    const products = await Product.find(query).select('name vin price img');
    
    var data = {
        products: products
    }
    return data;
}


module.exports.get_products_by_name = async (name) =>{
    const products = await Product.find({name: name}).select('name vin price img');
    
    var data = {
        products: products
    }
    return data;
}


module.exports.get_products_by_vin = async (vin) =>{
    const products = await Product.find({vin: Number(vin)}).select('name vin price img');
    
    var data = {
        products: products
    }
    return data;
}

module.exports.update_product_by_id = async (product_id, updates) =>{
    const updatedProduct = await Product.findOneAndUpdate(
        { _id: product_id },
        { $set: updates },
        { new: true }
      );
    return updatedProduct;
}

/*





module.exports.delete_user_by_id = async (user_id) =>{
    const deletedUser = await User.findByIdAndDelete(user_id);
    return deletedUser;
}
*/

module.exports.add_product = async (data) =>{
    try {
        const product = new Product(data);
        await product.save();
        return product
        
    } catch(error) {
        console.log(error)
    }   
}

module.exports.get_product_by_id = async (id) =>{
    const product = await Product.findOne({_id: id}).select("_id seller_id name vin description price img added_date ");
    return product;
}

