import { useEffect, useState } from "react";
import axios from "axios";

const MangaReader = () => {
  const [pages, setPages] = useState([]);
  const [error, setError] = useState(null);
  const mangaTitle = "Black Clover"; 

  useEffect(() => {
    const fetchMangaPages = async () => {
      try {
        setError(null);

        console.log(`🔍 Поиск манги: ${mangaTitle}`);
        const mangaRes = await axios.get("https://api.mangadex.org/manga", {
          params: { title: mangaTitle, limit: 1 },
        });

        console.log("📜 Ответ API (манга):", mangaRes.data);
        const mangaId = mangaRes.data.data[0]?.id;
        if (!mangaId) throw new Error("Манга не найдена");

        console.log(`📖 Поиск глав для манги ${mangaId}`);
        const chapterRes = await axios.get(
            `https://api.mangadex.org/chapter?manga=${mangaId}&translatedLanguage[]=ru&limit=10`
          );
        console.log("📄 Ответ API (главы):", chapterRes.data);

        if (!chapterRes.data.data.length) {
          throw new Error("Главы не найдены");
        }

        const validChapter = chapterRes.data.data.find((ch) => ch.attributes.pages > 0);
        if (!validChapter) throw new Error("Подходящая глава не найдена");

        const chapterId = validChapter.id;

        console.log(`📥 Загрузка страниц для главы ${chapterId}`);
        const pagesRes = await axios.get(
          `https://api.mangadex.org/at-home/server/${chapterId}`
        );

        console.log("🖼️ Ответ API (страницы):", pagesRes.data);

        const baseUrl = pagesRes.data.baseUrl;
        const hash = pagesRes.data.chapter.hash;
        const images = pagesRes.data.chapter.data.map(
          (file) => `${baseUrl}/data/${hash}/${file}`
        );

        if (images.length === 0) throw new Error("Страницы не найдены");

        setPages(images);
      } catch (error) {
        console.error("❌ Ошибка загрузки:", error);
        setError(error.message);
      }
    };

    fetchMangaPages();
  }, []);

  return (
    <div>
      {error ? (
        <p style={{ color: "red" }}>Ошибка: {error}</p>
      ) : pages.length === 0 ? (
        <p>Загрузка...</p>
      ) : (
        pages.map((page, index) => (
          <img key={index} src={page} alt={`Page ${index + 1}`} style={{ width: "100%" }} />
        ))
      )}
    </div>
  );
};

export default MangaReader;
