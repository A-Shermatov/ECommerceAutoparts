const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const path = require('path');

const Purchase = require("../models/purchases");
const { get_user_by_id } = require("./userService");
const { get_product_by_id } = require("./productService");

module.exports.add_purchase = async (data) =>{
    try {
        const purchase = new Purchase(data);
        await purchase.save();
        return purchase;
        
    } catch(error) {
        console.log(error);
    }   
}

module.exports.get_purchases_by_buyer_id = async (buyer_id) => {
    try {
        const purchases = await Purchase.find({buyer_id: buyer_id});
        
        const data = [];

        await Promise.all(purchases.map(async purchase => new Promise(async (res, rej) => {
            try {
                const product = await get_product_by_id(purchase.product_id);
                data.push({product: product, purchase: purchase})
                res();
            } catch (err) {
                console.error(err);
                rej();
            }
        })));
        
        return data;

    } catch(error) {
        console.log(error);
    }
}

module.exports.get_purchase_by_id = async (id) =>{
    const purchase = await Purchase.findOne({_id: id});
    return purchase;
}


module.exports.delete_purchase_by_id = async (id) =>{
    const deletedPurchase = await Purchase.findByIdAndDelete(id);
    return deletedPurchase;
}