const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');

const { get_all_products, add_product, get_product_by_id, get_products_by_name, get_products_by_vin, update_product_by_id } = require("../services/productService");
const { get_user_by_email, get_user_by_id } = require("../services/userService")
const html_path = path.join(__dirname, "../views/html/");
const { check_token } = require("../middleware/authMiddleware")

module.exports.get_all_products = async (req, res) =>{
    try{
      const data = await get_all_products({status: true});
      res.status(200).json(data);
    }catch(error)
    {
      res.status(500).json({ error: error });
    }
}

module.exports.get_my_products_page = async (req, res) =>{
  try{
    res.sendFile(path.join(html_path, "my_products.html"));
  }catch(error)
  {
    res.status(500).json({ error: error });
  }
}


module.exports.get_my_products = async (req, res) =>{
  try{
    const email = await check_token(req.cookies.authToken);
    if (email === "HAS_NO_TOKEN") return res.json({ message: 'Access is denied' });;
    const user = await get_user_by_email(email);
    const data = await get_all_products({seller_id: user._id, status: true});
    res.status(200).json(data);
  }catch(error)
  {
    res.status(500).json({ error: error });
  }
}


module.exports.get_add_product_page = async (req, res) =>{
  try{
    res.sendFile(path.join(html_path, "add_product.html"));
  }catch(error)
  {
    res.status(500).json({ error: error });
  }
}


module.exports.get_product_page = async (req, res) =>{
  try{
    
    res.sendFile(path.join(html_path, "product.html"));
    // res.json({product_id: req.params.product_id});
  }catch(error)
  {
    res.status(500).json({ error: error });
  }
}


module.exports.get_product_info = async (req, res) =>{
  try{
    const product = await get_product_by_id(req.body.product_id);
    const user = await get_user_by_id(product.seller_id)
    res.json({product: product, user: user});
  }catch(error)
  {
    res.status(500).json({ error: error });
  }
}


module.exports.get_edit_product_page = async (req, res) =>{
  try{
    
    res.sendFile(path.join(html_path, "edit_product.html"));
    // res.json({product_id: req.params.product_id});
  }catch(error)
  {
    res.status(500).json({ error: error });
  }
}



module.exports.add_product = async (req, res) =>{
    try{
      var form = new formidable.IncomingForm();
      
      form.multiples = true;
      form.maxFiles = 1;
      form.maxFileSize = 100000000;
      form.parse(req, async (err, fields, files) => {
        
        const img = fs.readFileSync(path.join(form.uploadDir, files.img_path[0].newFilename));
        data = {}
        Object.keys(fields).forEach(function(key, _) {
          data[key] = fields[key][0];
        });
        data["img"] = `data:${files.img_path[0].mimetype};base64,` + Buffer.from(img).toString('base64');

        const email = await check_token(req.cookies.authToken);
        const user = await get_user_by_email(email);
        data["seller_id"] = user._id;

        const product = await add_product(data);

        if (err) {
          console.log("Error parsing the files");
          return res.status(400).json({
            error: err,
          });
        }
        
        fs.unlink(path.join(form.uploadDir, files.img_path[0].newFilename), (err) => {
          if (err) throw err;
          console.log(`${path.join(form.uploadDir, files.img_path[0].newFilename)} - file was deleted`);
        }); 
        
      });
      
    }catch(error)
    {
      res.status(500).json({ error: error });
    }
}

module.exports.search_products = async (req, res) =>{
  try{
    let products = []
    if (req.params.search_text === "") {
      products = await get_all_products();
    } else {
      const products_by_name = await get_products_by_name(req.params.search_text);
      const products_by_vin = await get_products_by_vin(req.params.search_text);
      const ids = [];
      products_by_name.products.map((product) => {
        if (!ids.includes(product._id.toString())) {
          products.push(product);
          ids.push(product._id.toString());
        }
      });
      products_by_vin.products.map((product) => {
        if (!ids.includes(product._id.toString())) {
          products.push(product);
          ids.push(product._id.toString());
        }
      });
    }
    
    res.json({products: products});
  }catch(error)
  {
    res.status(500).json({ error: error });
  }
}

module.exports.edit_product = async (req, res) =>{
    const updates = {}
    for (var key in req.body) {
      if (req.body[key] !== "" && key !== "product_id") {
        updates[key] = req.body[key];
      }
    }
    updates["updated_date"] = Date();
    const product = await update_product_by_id(req.body.product_id, updates)
    res.status(200).json({product: product});
  try{
    
  }catch(error)
  {
    res.status(500).json({ error: error });
  }
}
