const jwt = require("jsonwebtoken");
require("dotenv").config();  // Подключаем dotenv, чтобы прочитать переменные из .env

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Извлекаем токен из заголовка

  console.log("Токен:", token); // Логирование токена

  if (!token) {
      return res.status(403).json({ message: 'Необходима авторизация.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {  // Используем JWT_SECRET из .env
      if (err) {
          return res.status(403).json({ message: 'Неверный токен.' });
      }

      req.user = decoded; // Сохраняем информацию о пользователе
      next(); // Переходим к следующему обработчику
  });
};

module.exports = authMiddleware;