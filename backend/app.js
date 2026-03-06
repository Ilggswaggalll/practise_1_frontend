const express = require("express");
const { nanoid } = require("nanoid");
const cors = require("cors");
const path = require("path");

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


const logger = require("./middleware/logger");
const productsRouter = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 3000;


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "APPLES API",
            version: "1.0.0",
            description: 'API для интернет-магазина Apple техники'
        },
        servers:[
            {
                url: `http://localhost:${PORT}`,
                description: 'Локальный сервер',
            }
        ]
    },
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);



// Middleware: разрешаем запросы с фронта (на практике можно обсудить CORS)
app.use(cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}
));

// Middleware: чтобы читать JSON из тела запроса (req.body)
app.use(express.json());

// Собственный logger для наглядности
app.use(logger);

// Healthcheck / главная
app.get("/", (req, res) => {
  res.send("Express API is running. Try /api/products");
});
// Сначала статические файлы
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Роуты API
app.use("/api/products", productsRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
