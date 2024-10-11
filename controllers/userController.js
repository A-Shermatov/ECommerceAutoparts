const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path')

const { get_all_users, get_user_by_id, update_user_by_id } = require("../services/userService");
// const html_path = path.join(__dirname, "../views/html/");
// const { generate_token, check_token } = require("../middleware/authMiddleware")

const html_path = path.join(__dirname, "../views/html/");

module.exports.get_all_users = async (req, res) =>{
    try{
      const data = await get_all_users();
      res.status(200).json(data);
    }catch(error)
    {
      res.status(500).json({ error: error });
    }
}


module.exports.edit_user = async (req, res) =>{ 
  try{
    const updates = {}
    for (var key in req.body) {
      if (req.body[key] !== "" && key !== "user_id") {
        updates[key] = req.body[key];
      }
    }
    const user = await update_user_by_id(req.body.user_id, updates)
    res.status(200).json({user: user});
  }catch(error)
  {
    res.status(500).json({ error: error });
  }
}


module.exports.get_edit_user_page = async (req, res) =>{
  try{
    res.sendFile(path.join(html_path, "edit_user.html"));
  }catch(error)
  {
    res.status(500).json({ error: error });
  }
}

module.exports.get_user_info = async (req, res) =>{
  try{
    const user = await get_user_by_id(req.params.user_id)
    res.status(200).json({user: user});
  }catch(error)
  {
    res.status(500).json({ error: error });
  }
}