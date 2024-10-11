
const jwt = require('jsonwebtoken');

const { get_user_by_email } = require("../services/userService.js");


module.exports.generate_token = async (email) =>{
    const token = jwt.sign({ email: email }, "secret", {
        expiresIn: '1h',
    });
    return token;
}


module.exports.check_token = async (token) =>{
    if (!token || Object.keys(token).length === 0) return "HAS_NO_TOKEN";
    const decoded = jwt.verify(token, "secret");
    return decoded.email;
}


module.exports.verify_buyer_token = async (req, res, next) => {
    try {
        
        const email = await this.check_token(req.cookies.authToken);
        if (email === "HAS_NO_TOKEN") return res.status(401).json({ error: 'Access denied' });
        const user = await get_user_by_email(email);
        if (!user){
            return res.status(401).json({ error: 'buyer does not exist or does not have permission' });
        }
        next();
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
 };
 module.exports.verify_admin_token = async (req, res, next) => {
    try {
        const email = await this.check_token(req.cookies.authToken);
        if (email === "HAS_NO_TOKEN") return res.status(401).json({ error: 'Access denied' });
        const user = await get_user_by_email(email);
        if (!user || user.role != "admin"){
            return res.status(401).json({ error: 'admin does not exist or does not have permission' });
        }

        const new_token = await this.generate_token(email)
        res.cookie('authToken', new_token, { maxAge: 3600000, httpOnly: true });
        

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: error.message, "hello": "world" });
    }
 };
 module.exports.verify_seller_token = async (req, res, next) => {
    try {
        const email = await this.check_token(req.cookies.authToken);
        if (email === "HAS_NO_TOKEN") return res.status(401).json({ error: 'Access denied' });
        const user = await get_user_by_email(email);
        if (!user || !["seller", "admin"].includes(user.role)){
            return res.status(401).json({ error: 'seller does not exist or does not have permission' });
        }

        const new_token = await this.generate_token(email)
        res.cookie('authToken', new_token, { maxAge: 3600000, httpOnly: true });

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: error.message });
    }
 };