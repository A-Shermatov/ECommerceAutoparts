const express = require('express');
const router = express.Router();

const { verify_buyer_token } = require("../middleware/authMiddleware");
const { edit_user, get_edit_user_page, get_user_info } = require("../controllers/userController");
const { buy_product, get_my_purchases_page, get_my_purchases, get_purchase_page, get_purchase_info, delete_purchase } = require("../controllers/purchaseController");


router.patch('/users/', verify_buyer_token, edit_user);
router.get('/users/edit_user_page/:user_id', verify_buyer_token, get_edit_user_page);
router.get('/users/user_info/:user_id', verify_buyer_token, get_user_info);


router.post("/purchases/add_purchases", verify_buyer_token, buy_product);
router.post("/purchases/purchase_info", verify_buyer_token, get_purchase_info);
router.get("/purchases/my_purchases_page", verify_buyer_token, get_my_purchases_page);
router.get("/purchases/my_purchases", verify_buyer_token, get_my_purchases);

router.get('/purchases/:purchase_id', verify_buyer_token, get_purchase_page);
router.get('/purchases/delete/:purchase_id', verify_buyer_token, delete_purchase);




// router.get("/purchases", verify_buyer_token, get_buyer_purchases);
// router.post('/purchases', verify_buyer_token, add_purchase);

module.exports = router;