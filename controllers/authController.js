const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path')

const {get_user_by_email, add_user} = require("../services/userService");
const html_path = path.join(__dirname, "../views/html/");
const { generate_token, check_token } = require("../middleware/authMiddleware")



module.exports.get_main_page = async (req, res) =>{
    try{
      res.sendFile(path.join(html_path, "home.html"));
    }catch(error)
    {
      res.status(500).json({ error: error });
    }
}


module.exports.get_about_page = async (req, res) =>{
  try{
    res.sendFile(path.join(html_path, "about.html"));
  }catch(error)
  {
    res.status(500).json({ error: error });
  }
}


module.exports.get_login_page = async (req, res) =>{
    try{
      res.sendFile(path.join(html_path, "login.html"));
    }catch(error)
    {
      res.status(500).json({ error: error });
    }
}

module.exports.get_signup_page = async (req, res) =>{
    try{
      res.sendFile(path.join(html_path, "signup.html"));
    }catch(error)
    {
      res.status(500).json({ error: error });
    }
}

module.exports.logout = async (req, res) => {
    res.clearCookie('authToken');
    res.redirect('/'); // Перенаправляем на страницу входа
}

module.exports.signup_user = async (req, res) =>{
  try{
    const _ = add_user(req.body);
    const redirect_url = "/login_page";
    res.status(200).json(redirect_url);
  }catch(error)
  {
    res.status(500).json({ error: error });
  }
}

module.exports.login_user = async (req, res) =>{
    res.clearCookie('authToken');
    const { email, password } = req.body;
    const user = await get_user_by_email(email);
    if (!user) {
      res.status(401).json({ error: "Ошибка входа" })
      return
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ error: "Ошибка входа" })
      return
    }

    const token = await generate_token(user.email)
    // console.log(token);
    /*
    const decoded = jwt.verify(token, "secret")
    let t1 = new Date(1970, 0, 1); 
    t1.setSeconds(decoded.iat);
    console.log(t1)
    let t2 = new Date(1970, 0, 1); 
    t2.setSeconds(decoded.exp);
    console.log(t2)
    */
    res.cookie('authToken', token, { maxAge: 3600000, httpOnly: true });
    
    const redirect_url = "/";

    res.status(200).json(redirect_url);
    
  try {
    
  } catch(error) {
    res.status(500).json({error: error});
  }
}

module.exports.check_user = async (req, res) =>{
  try{
    const email = await check_token(req.cookies.authToken);
    if (email === "HAS_NO_TOKEN") return;
    const user = await get_user_by_email(email);
    if (!user) return res.json({ message: 'Access is denied' });
    const token = await generate_token(email);
    res.cookie('authToken', token, { maxAge: 3600000, httpOnly: true });
    res.json({message: "Access is allowed", role: user.role, user_id: user._id});
  }catch(error){
    if (error.message === "jwt expired") {
      const route = req.get("Referrer").replace(/^(?:https?:\/\/)?[^\/]+/i, "")
      if (route === "/login_page") {
        res.json({ error: error });
      } else {
        res.status(401).json({ error: error, redirect_url: "/login_page"});
      }
    } else {
      res.status(500).json({ error: error });
    }
  }
}