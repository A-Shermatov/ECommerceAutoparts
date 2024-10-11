const express = require('express');
const router = express.Router();


const { get_main_page, get_about_page } = require("../controllers/authController");
const { get_all_products, get_product_page, get_product_info, search_products } = require("../controllers/productController");


router.get("/products", get_all_products);
router.get("/products/:product_id", get_product_page);
router.post("/products/product_info", get_product_info);
router.get("/products/search/:search_text", search_products);

router.get("/", get_main_page);
router.get("/about", get_about_page);


module.exports = router;