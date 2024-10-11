const express = require('express');
const router = express.Router();

const { verify_admin_token, verify_seller_token } = require("../middleware/authMiddleware");

const { add_product } = require("../controllers/productController");
const { get_all_users } = require("../controllers/userController");


router.get("/users", verify_admin_token,  get_all_users);

router.post('/products', verify_seller_token, add_product);

module.exports = router;