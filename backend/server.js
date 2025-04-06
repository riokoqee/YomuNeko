require("dotenv").config(); // Загрузить переменные среды из .env
const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const comicRoutes = require("./routes/comic");
const { authenticateJWT } = require("./controllers/comicController"); // Подключаем middleware для авторизации JWT

const app = express();
const PORT = process.env.PORT || 3001; // Определяем порт

// Мидлвары
app.use(cors());
app.use(express.json()); // Для обработки JSON в теле запроса
app.use(fileUpload({ createParentPath: true })); // Для обработки загрузки файлов
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Отдаем файлы из папки uploads

// Роуты
app.use("/api/auth", authRoutes); // Роуты для авторизации
app.use("/api/comics", comicRoutes); // Загрузка комиксов с авторизацией

// Запуск сервера
app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
}).on("error", (err) => {
    console.error("Ошибка при запуске сервера:", err);
});