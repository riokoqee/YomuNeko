const { pool } = require("../db");  // Импортируем pool

const addComic = async (title, type, description, comicFileName, posterFileName, userId) => {
    try {
        const result = await pool.query( // Здесь используем pool для запроса
            `INSERT INTO comics (title, type, description, comic_file, poster_file, user_id) 
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [title, type, description, comicFileName, posterFileName, userId]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Ошибка при добавлении комикса в базу данных:", error);
        throw error;
    }
};

const getComicsByUserId = async (userId) => {
    const result = await pool.query(
      `SELECT * FROM comics WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    console.log("Полученные комиксы:", result.rows);
    return result.rows;
  };
  
module.exports = {
    addComic,
    getComicsByUserId,
};