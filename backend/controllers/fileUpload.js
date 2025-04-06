const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Настройка хранилища для multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads', 'comics');

        // Создаем папку для комиксов, если ее нет
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname); // Получаем расширение файла
        const fileName = `${Date.now()}-${file.originalname}`; // Уникальное имя файла

        cb(null, fileName);
    }
});

// Ограничения на типы файлов (например, только PDF для комикса и PNG/JPG для постера)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpg', 'image/jpeg'];

    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Допустимые файлы: PDF для комикса, PNG/JPG для постера'), false);
    }

    cb(null, true);
};

// Инициализация multer с хранилищем и фильтром
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // Ограничение на размер файла (например, 10MB)
});

// Маршрут для загрузки комикса и постера
const uploadComic = express.Router();
uploadComic.post('/upload', upload.fields([
    { name: 'comic', maxCount: 1 },  // Загружаем только 1 PDF
    { name: 'poster', maxCount: 1 }  // Загружаем только 1 постер
]), (req, res) => {
    console.log('Загруженные файлы:', req.files); 
    if (!req.files || !req.files.comic || !req.files.poster) {
        return res.status(400).json({ message: 'Файл комикса или постера не был загружен' });
    }

    // Файлы успешно загружены
    res.status(200).json({
        message: 'Комикс и постер успешно загружены',
        comic: req.files.comic[0],  // Массив, так как используем fields
        poster: req.files.poster[0]
    });
});

module.exports = uploadComic;
