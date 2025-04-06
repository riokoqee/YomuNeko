const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../db"); // Правильный импорт подключения к БД

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Received data on server:", req.body);

    if (!name || !email || !password)
      return res.status(400).json({ message: "Name, email и пароль обязательны" });

    // Проверяем, существует ли пользователь с таким email
    console.log("pool:", pool);
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0)
      return res.status(400).json({ message: "Пользователь уже существует" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Вставляем нового пользователя в базу данных
    const result = await pool.query(
      `INSERT INTO users (username, email, password)
       VALUES ($1, $2, $3) RETURNING user_id`,
      [name, email, hashedPassword]
    );

    const user = result.rows[0];

    // ✅ Генерация токена
    const token = jwt.sign({ id: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    console.log("New user saved to database:", user);

    res.status(201).json({ 
      message: "Регистрация успешна", 
      user: { id: user.user_id, name: user.username, email: user.email }, 
      token 
    });
  } catch (error) {
    console.error("Ошибка регистрации:", error.stack);
    res.status(500).json({ message: "Ошибка регистрации", error: error.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { loginOrEmail, password } = req.body;
    if (!loginOrEmail || !password)
      return res.status(400).json({ message: "Логин/почта и пароль обязательны" });

    const userQuery = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR username = $1",
      [loginOrEmail]
    );

    if (userQuery.rows.length === 0)
      return res.status(401).json({ message: "Неверный логин/почта или пароль" });

    const user = userQuery.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Неверный логин/почта или пароль" });

    // Генерация токена
    const token = jwt.sign(
      { id: user.user_id, email: user.email },
      process.env.JWT_SECRET, // Убедитесь, что этот секрет хранится в .env файле
      { expiresIn: "1d" } // Время действия токена
    );

    // Отправка ответа с токеном и данными пользователя
    res.json({
      token,
      user: { id: user.user_id, name: user.username, email: user.email }
    });
  } catch (error) {
    console.error("Ошибка логина:", error.stack);
    res.status(500).json({ message: "Ошибка логина", error: error.message });
  }
});

// PUT для обновления имени пользователя
router.put("/update-name", async (req, res) => {
  try {
    const { userId, newName } = req.body;
    if (!userId || !newName) {
      return res.status(400).json({ message: "User ID и новое имя обязательны" });
    }

    const result = await pool.query(
      `UPDATE users SET username = $1 WHERE user_id = $2 RETURNING *`,
      [newName, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.status(200).json({ message: "Имя обновлено успешно", user: result.rows[0] });
  } catch (error) {
    console.error("Ошибка обновления имени:", error.stack);
    res.status(500).json({ message: "Ошибка обновления имени", error: error.message });
  }
});

module.exports = router;
