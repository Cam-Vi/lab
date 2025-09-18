const Product = require("../models/Product");
const Supplier = require("../models/Supplier");

exports.getAll = async(req, res) => {
    const products = await Product.find().populate("supplierId");
    res.render("products/index", { products });
};

exports.newForm = async(req, res) => {
    const suppliers = await Supplier.find();
    res.render("products/new", { suppliers });
};

exports.create = async(req, res) => {
    try {
        const { name, price, quantity, supplierId } = req.body;
        await Product.create({ name, price, quantity, supplierId });
        res.redirect("/products");
    } catch (err) {
        console.error("Error creating product:", err.message);
        res.status(400).send("Error creating product: " + err.message);
    }
};

exports.editForm = async(req, res) => {
    const product = await Product.findById(req.params.id).populate("supplierId");
    const suppliers = await Supplier.find();
    res.render("products/edit", { product, suppliers });
};

exports.update = async(req, res) => {
    const { name, price, quantity, supplierId } = req.body;
    await Product.findByIdAndUpdate(req.params.id, {
        name,
        price,
        quantity,
        supplierId,
    });
    res.redirect("/products");
};

exports.delete = async(req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/products");
};