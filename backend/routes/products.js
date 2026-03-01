const express = require("express");
const router = express.Router();

let products = require("../data/products.js");

// GET api/products - список всех товаров
router.get("/", (req, res) => {
    res.json(products);
    });

// GET api/products/:id - товар с определенным id
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);
    if (!product) return res.status(404).send("Product not found!");
    res.json(product);
});

// POST api/products - добавить товар
router.post("/", (req, res) => {
    const {title, price} = req.body;

    if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json("Title is required! (string)");
    }

    const numPrice = Number(price);
    if (numPrice < 0 || Number.isNaN(numPrice)) {
        return res.status(400).json("Price is required! (number >= 0)");
    }

    const nextId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1

    const newProduct = {
        id: nextId,
        title: title.trim(),
        price: price
    }
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PATCH api/products/:id - частичное обновление данных о товаре
router.patch("/:id", (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);
    if (!product) return res.status(404).send("Product not found!");

    const {title, price} = req.body;

    if (title !== undefined){
        if (typeof title !== "string" || title.trim() === ""){
            return res.status(400).json("Title is required! (string)");
        }
        product.title = title.trim();
    }

    if (price !== undefined){
        const numPrice = Number(price);
        if (numPrice < 0 || Number.isNaN(numPrice)) {
            return res.status(400).json("Price is required! (number >= 0)");
        }
        product.price = numPrice;
    }

    res.json(product);
});

// DELETE api/product/:id - удаление товара
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);
    if (!product) return res.status(404).send("Product not found!");

    products = products.filter((p) => p.id !== id);
});

module.exports = router;
