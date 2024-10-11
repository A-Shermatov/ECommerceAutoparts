const express = require('express');
const router = express.Router();

const { verify_seller_token } = require("../middleware/authMiddleware");


const { get_my_products_page, get_add_product_page, add_product, get_my_products, get_edit_product_page, edit_product } = require("../controllers/productController");


router.get("/products/my_products_page", verify_seller_token, get_my_products_page);
router.get("/products/my_products", verify_seller_token, get_my_products);
router.get("/products/add_product_page", verify_seller_token, get_add_product_page);
router.get("/products/edit_product_page/:product_id", verify_seller_token, get_edit_product_page)

router.post('/products', verify_seller_token, add_product);
router.patch("/products/edit_product", verify_seller_token, edit_product);

module.exports = router;