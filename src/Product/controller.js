const Product = require("./model");

// Get all products
const getAll = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products || products.length === 0) {
      return res.status(404).json({ msg: "No Products Found" });
    }

    return res.status(200).json({
      msg: "All Products",
      data: products
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Get one product
const getOne = async (req, res) => {
  try {
    const id = req.params["id"];
    const product = await Product.findById(id);
    if (!product) return res.json({ msg: "Product not found" });
    return res.json({ Product: product, msg: "Product Found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Create product (with auto logout)
const create = async (req, res) => {
  try {
    let imagePath = "";
    if (req.file) {
      imagePath = "/Images/" + req.file.filename;
    }

    const { name, price, desc } = req.body;
    if (!name || !price || !desc) {
      return res.status(400).json({ msg: "Please Provide All Required Fields" });
    }

    const product = await Product.create({ name, price, desc, Image: imagePath });
    req.session.destroy((err) => {
      if (err) console.log("Error destroying session:", err);
    });

    res.status(201).json({ 
      msg: "Product Created.", 
      data: product 
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Update product
const updateOne = async (req, res) => {
  try {
    const id = req.params["id"];
    const { name, price, desc } = req.body;

    const updateProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, desc },
      { new: true }
    );

    if (!updateProduct) return res.json({ msg: "Product not found" });
    res.json({ msg: "Product updated successfully", data: updateProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Delete product
const deleteOne = async (req, res) => {
  try {
    const id = req.params["id"];
    const result = await Product.findByIdAndDelete(id);
    res.json({ msg: "Product Deleted successfully", data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { getAll, getOne, create, updateOne, deleteOne };
