const express = require('express');
const router = express.Router();
const {  get_signup_page, get_login_page, logout, signup_user, login_user, check_user } = require("../controllers/authController");

router.get("/login_page", get_login_page);
router.get("/logout", logout);
router.get("/signup_page", get_signup_page);
router.post("/signup", signup_user);
router.post("/login", login_user);
router.get("/check_user", check_user)

module.exports = router;
