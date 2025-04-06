const jwt = require('jsonwebtoken'); // Добавьте это
const path = require("path");
const fs = require("fs");
const { pool } = require("../db"); // Импортируем объект подключения к базе данных
require("dotenv").config();

// Middleware для проверки токена
const authenticateJWT = (req, res, next) => {
    const token = req.headers["authorization"]?.startsWith("Bearer ")
      ? req.headers["authorization"].split(" ")[1]
      : null; // Получаем токен, если он есть

    console.log("Токен из заголовка:", req.headers["authorization"]);
  
    if (!token) {
      return res.status(401).json({ message: "Нет токена. Пожалуйста, войдите в аккаунт." });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("Ошибка верификации токена:", err); // Логируем ошибку
            return res.status(403).json({ message: "Неверный токен" });
        }
        req.user = user;
        next();
    });
  };
  
  // uploadComic function
const uploadComic = async (req, res) => {
  try {
    console.log("Начало загрузки комикса...");
    
    // Проверка обязательных полей
    if (!req.files || !req.files.comic || !req.files.poster || 
        !req.body.title || !req.body.type || !req.body.description) {
      return res.status(400).json({ message: "Все поля обязательны для заполнения" });
    }

    const { title, type, description } = req.body;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Пользователь не авторизован" });
    }

    const comicFile = req.files.comic;
    const posterFile = req.files.poster;

    // Проверка типов файлов
    if (comicFile.mimetype !== "application/pdf") {
      return res.status(400).json({ message: "Файл комикса должен быть PDF" });
    }
    if (!["image/png", "image/jpeg"].includes(posterFile.mimetype)) {
      return res.status(400).json({ message: "Постер должен быть изображением PNG или JPEG" });
    }

    const comicFileName = `${Date.now()}-${comicFile.name}`;
    const posterFileName = `${Date.now()}-${posterFile.name}`;

    const uploadsDir = path.join(__dirname, "../uploads", "comics");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const comicFilePath = path.join(uploadsDir, comicFileName);
    const posterFilePath = path.join(uploadsDir, posterFileName);

    // Перемещение файлов
    await Promise.all([
      moveFile(comicFile, comicFilePath),
      moveFile(posterFile, posterFilePath)
    ]);

    // Вставка данных в базу данных (только имена файлов)
    const result = await pool.query(
      `INSERT INTO comics (title, type, description, comic_file, poster_file, user_id)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, type, description, comicFileName, posterFileName, userId]
    );

    return res.status(201).json({
      message: "Комикс успешно загружен",
      comic: result.rows[0]
    });

  } catch (err) {
    console.error("Ошибка при загрузке комикса:", err);
    return res.status(500).json({ message: "Ошибка при загрузке данных" });
  }
};
  
  // Функция для перемещения файлов с использованием Promise
  const moveFile = (file, filePath) => {
    return new Promise((resolve, reject) => {
      file.mv(filePath, (err) => {
        if (err) {
          return reject(new Error("Ошибка при сохранении файла"));
        }
        resolve();
      });
    });
  };

  // Функция для получения комикса по ID
  const getComicById = async (req, res) => {
    const comicId = req.params.id;  // Получаем id из параметров

    if (isNaN(comicId)) {
        return res.status(400).json({ message: "Некорректный ID комикса" });
    }

    try {
        const result = await pool.query("SELECT * FROM comics WHERE id = $1", [comicId]);

        if (result.rows.length > 0) {
            const comic = result.rows[0];

            const comicPath = `/uploads/${comic.comic_file}`;
            const posterPath = `/uploads/${comic.poster_file}`;

            res.json({
                title: comic.title,
                type: comic.type,
                description: comic.description,
                comicPath,
                posterPath,
            });
        } else {
            res.status(404).json({ message: "Комикс не найден" });
        }
    } catch (error) {
        console.error("Ошибка при получении комикса:", error);
        res.status(500).json({ message: "Ошибка при получении комикса" });
    }
};
  
  module.exports = { authenticateJWT, uploadComic,  getComicById };
  