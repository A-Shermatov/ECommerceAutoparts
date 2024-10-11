const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');

const { add_purchase, get_purchases_by_buyer_id, get_purchase_by_id, delete_purchase_by_id } = require("../services/purchaseService");
const { get_product_by_id } = require("../services/productService");
const { get_user_by_email, get_user_by_id } = require("../services/userService")
const { check_token } = require("../middleware/authMiddleware");
// const { add_purchase } = require("../services/userService");

const html_path = path.join(__dirname, "../views/html/");

module.exports.buy_product = async (req, res) =>{
    try{
        const product = await get_product_by_id(req.body.product_id);
        if (product.seller_id.toString() === req.body.buyer_id) {
            return res.status(400).json({error: "Seller can not buy his product"});
        }
        const data = {
            buyer_id: req.body.buyer_id, 
            product_id: req.body.product_id,
            total: product.price,

        };
        const purchase = add_purchase(data);
        res.status(200).json({purchase: purchase});
    } catch(error) {
        res.status(500).json({ error: error });
    }
}


module.exports.get_purchase_info = async (req, res) =>{
    try{
        const purchase = await get_purchase_by_id(req.body.purchase_id);
        const product = await get_product_by_id(purchase.product_id);
        const user = await get_user_by_id(product.seller_id);
        const data = {
            purchase: purchase,
            product: product,
            user: user
        };
        res.status(200).json(data);
    } catch(error) {
        res.status(500).json({ error: error });
    }
}


module.exports.get_my_purchases_page = async (req, res) =>{
    try{
        res.sendFile(path.join(html_path, "my_purchases.html"));
    }catch(error)
    {
        res.status(500).json({ error: error });
    }
}


module.exports.get_my_purchases = async (req, res) =>{
    try{
        const email = await check_token(req.cookies.authToken);
        if (email === "HAS_NO_TOKEN") return res.json({ message: 'Access is denied' });
        const user = await get_user_by_email(email);
        const data = await get_purchases_by_buyer_id(user._id);
        res.status(200).json(data);
    } catch(error) {
        res.status(500).json({ error: error });
    }
}

module.exports.get_purchase_page = async (req, res) =>{
    try{
        res.sendFile(path.join(html_path, "purchase.html"));
    }catch(error)
    {
        res.status(500).json({ error: error });
    }
}


module.exports.delete_purchase = async (req, res) =>{
    try{
        const purchase = await get_purchase_by_id(req.params.purchase_id);
        const buy_date = new Date(purchase.purchase_date);
        const difference_hour = (Date.now() - buy_date) / 1000 / 3600;
        if (difference_hour >= 168) {
            return res.status(400).json({error: `Вы купили товар ${Math.round(difference_hour / 24)} день(дня, дней) назад`})
        } 
        const deletedPurchase = await delete_purchase_by_id(purchase._id);
        res.status(200).json(deletedPurchase);
    } catch(error) {
        res.status(500).json({ error: error });
    }
}