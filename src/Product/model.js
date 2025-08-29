const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  desc: { type: String, required: true },
  Image: { type: String }
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;




// post man ma api call karvani rit
// create product
// http://localhost:8000/products
// update mate
// http://localhost:8000/products/68a0beec8d8711de83947c28
// delete mate
// http://localhost:8000/products/68a0beec8d8711de83947c28
