const express = require("express");
const router = express.Router();
const path = require("path");
const authMiddleware = require("../middleware/authMiddleware"); // Подключаем authMiddleware
const { addComic, getComicsByUserId } = require("../models/comicModel");
const slugify = require("slugify");
const { uploadComic } = require("../controllers/comicController");
const { pool } = require("../db");  // Импортируем pool

// Роут для получения комикса по ID
router.get("/:id", authMiddleware, async (req, res) => {
    const userId = req.user.id;  // ID пользователя из токена
    
    try {
      // Запрос к базе данных с фильтрацией по user_id
      const result = await pool.query("SELECT * FROM comics WHERE user_id = $1", [userId]);
  
      if (result.rows.length > 0) {
        const comics = result.rows.map((comic) => {
          // Формируем пути к файлам
          const comicPath = `/uploads/${comic.comic_file}`;
          const posterPath = `/uploads/${comic.poster_file}`;
  
          return {
            title: comic.title,
            type: comic.type,
            description: comic.description,
            comicPath,  // Путь к PDF
            posterPath, // Путь к постеру
          };
        });
  
        res.json(comics);
      } else {
        res.status(404).json({ message: "Нет комиксов для этого пользователя." });
      }
    } catch (error) {
      console.error("Ошибка при получении комиксов:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  });

router.post("/upload", authMiddleware, async (req, res) => {
    // Проверяем, что файлы существуют
    if (!req.files || !req.files.comic || !req.files.poster) {
        return res.status(400).send("Необходимые файлы не были загружены.");
    }

    // Получаем файлы
    const comicFile = req.files.comic;
    const posterFile = req.files.poster;

    // Проверяем типы файлов
    if (comicFile.mimetype !== "application/pdf") {
        return res.status(400).send("Файл комикса должен быть PDF.");
    }

    if (posterFile.mimetype !== "image/png" && posterFile.mimetype !== "image/jpeg") {
        return res.status(400).send("Постер должен быть изображением PNG или JPG.");
    }

    const getCleanFileName = (file) => {
        const ext = path.extname(file.name); // Получаем расширение (с точкой)
        const baseName = path.basename(file.name, ext); // Имя файла без расширения
        return `${Date.now()}-${slugify(baseName, { lower: true, strict: true })}${ext}`;
    };

    const comicFileName = getCleanFileName(comicFile);
    const posterFileName = getCleanFileName(posterFile);

    const comicFilePath = path.join(__dirname, "..", "uploads", comicFileName); // Путь для сохранения файла (он нам не нужен в базе)
    const posterFilePath = path.join(__dirname, "..", "uploads", posterFileName); // Путь для сохранения файла (он нам не нужен в базе)

    // Сохраняем файлы на сервере
    comicFile.mv(comicFilePath, async (err) => {
        if (err) {
            return res.status(500).send("Ошибка при сохранении файла комикса.");
        }

        posterFile.mv(posterFilePath, async (err) => {
            if (err) {
                return res.status(500).send("Ошибка при сохранении постера.");
            }

            // Получаем информацию о текущем пользователе из token
            const userId = req.user.id; // Извлекаем userId из объекта req.user, который приходит через authMiddleware

            // Добавляем комикс в базу данных
            try {
                const comic = await addComic(
                    req.body.title,
                    req.body.type,
                    req.body.description,
                    comicFileName,  // Сохраняем только имя файла комикса
                    posterFileName,  // Сохраняем только имя файла постера
                    userId
                );
                // Всё прошло успешно, возвращаем ответ
                res.status(200).send({
                    message: "Комикс успешно загружен!",
                    comic,
                });
            } catch (error) {
                console.error("Ошибка при добавлении комикса в базу данных:", error);
                res.status(500).send("Ошибка при добавлении комикса.");
            }
        });
    });
});

router.get("/my", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("Полученный userId:", userId); // Логирование userId

        const comics = await getComicsByUserId(userId);

        if (comics.length === 0) {
            return res.status(404).json({ message: "У вас нет комиксов." });
        }

        const comicsWithPaths = comics.map((comic) => ({
            ...comic,
            poster_path: comic.poster_file ? `/api/uploads/${comic.poster_file}` : null,
        }));

        res.json(comicsWithPaths);
    } catch (error) {
        console.error("Ошибка при получении комиксов:", error);
        res.status(500).json({ message: "Ошибка сервера", error: error.message });
    }
});

module.exports = router;
