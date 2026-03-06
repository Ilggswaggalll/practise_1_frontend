const express = require("express");
const router = express.Router();

let products = require("../data/products.js");

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - category
 *         - description
 *         - price
 *         - stock
 *         - image
 *       properties:
 *         id:
 *           type: integer
 *           description: Уникальный ID товара
 *         title:
 *           type: string
 *           description: Название товара
 *         category:
 *           type: string
 *           enum: [Смартфоны, Ноутбуки, Планшеты, Часы, Наушники, Аксессуары]
 *           description: Категория товара
 *         description:
 *           type: string
 *           description: Описание товара
 *         price:
 *           type: number
 *           description: Цена в рублях
 *         stock:
 *           type: integer
 *           description: Количество товара
 *         image:
 *           type: string
 *           description: Путь к изображению
 *       example:
 *         id: 1
 *         title: "iPhone 17"
 *         category: "Смартфоны"
 *         description: "Смартфон Apple iPhone 17 eSIM"
 *         price: 119990
 *         stock: 15
 *         image: "/images/iphone_17.jpg"
 */

// GET api/products - список всех товаров
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Получить все товары
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Список всех товаров
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", (req, res) => {
    res.json(products);
    });

// GET api/products/:id - товар с определенным id
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Получить товар по ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID товара
 *     responses:
 *       200:
 *         description: Товар найден
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Товар не найден
 */
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);
    if (!product) return res.status(404).send("Product not found!");
    res.json(product);
});

// POST api/products - добавить товар
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Создать новый товар
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Товар создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Ошибка валидации
 */
router.post("/", (req, res) => {
    const {title, category, description, price, stock, image} = req.body;

    if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json("Title is required! (string)");
    }

    if (typeof category !== "string" || category.trim() === ""){
        return res.status(400).send("Category is required! (string)");
    }

    if (typeof description !== "string" || description.trim() === ""){
        return res.status(400).send("Description is required! (string)");
    }

    const numPrice = Number(price);
    if (numPrice < 0 || Number.isNaN(numPrice)) {
        return res.status(400).json("Price is required! (number >= 0)");
    }

    const numStock = Number(stock);
    if (numStock < 0 || Number.isNaN(numStock)) {
        return res.status(400).json("Stock is required! (number >= 0)");
    }

    if (typeof image !== "string" || image.trim() === ""){
        return res.status(400).send("Description is required! (string)");
    }

    const nextId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1

    const newProduct = {
        id: nextId,
        title: title.trim(),
        category: category.trim(),
        description: description.trim(),
        price: price,
        stock: stock,
        image: image.trim()
    }
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PATCH api/products/:id - частичное обновление данных о товаре
/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Обновить товар
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID товара
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Товар обновлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Товар не найден
 *       400:
 *         description: Ошибка валидации
 */
router.patch("/:id", (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);
    if (!product) return res.status(404).send("Product not found!");

    const {title, category, description, price, stock, image} = req.body;

    if (title !== undefined) {
        if (typeof title !== "string" || title.trim() === "") {
            return res.status(400).json("Title is required! (string)");
        }
    }

    if (title !== undefined) {
        if (typeof category !== "string" || category.trim() === ""){
            return res.status(400).send("Category is required! (string)");
        }
    }

    if (title !== undefined) {
        if (typeof description !== "string" || description.trim() === ""){
            return res.status(400).send("Description is required! (string)");
        }
    }

    if (title !== undefined) {
    const numPrice = Number(price);
        if (numPrice < 0 || Number.isNaN(numPrice)) {
            return res.status(400).json("Price is required! (number >= 0)");
        }
    }

    if (title !== undefined) {
        const numStock = Number(stock);
        if (numStock < 0 || Number.isNaN(numStock)) {
            return res.status(400).json("Stock is required! (number >= 0)");
        }
    }

    if (title !== undefined) {
        if (typeof image !== "string" || image.trim() === ""){
            return res.status(400).send("Description is required! (string)");
        }
    }

    res.json(product);
});

// DELETE api/product/:id - удаление товара
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Удалить товар
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID товара
 *     responses:
 *       200:
 *         description: Товар удален
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 id:
 *                   type: integer
 *       404:
 *         description: Товар не найден
 */
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);
    if (!product) return res.status(404).send("Product not found!");

    products = products.filter((p) => p.id !== id);
    res.status(200).json({
        message: "Product deleted successfully",
        id: id
    });
});

module.exports = router;
