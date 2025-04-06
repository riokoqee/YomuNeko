import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Именованный импорт
import useUserStore from "../store/useUserStore";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

const Uploads = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useUserStore((state) => state.token);

  useEffect(() => {
    const fetchComics = async () => {
      if (!token) {
        console.error("Token not found.");
        return;
      }

      console.log("Токен для запроса:", token);

      // Декодируем токен, чтобы получить ID пользователя
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      try {
        const response = await axios.get(`http://localhost:3001/api/comics/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Комикс загружен успешно', response.data);

        if (response.data && Array.isArray(response.data)) {
          setComics(response.data);
        } else {
          console.warn("Сервер вернул данные в неожиданном формате:", response.data);
        }
      } catch (error) {
        console.error("Ошибка при получении комиксов:", error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComics();
  }, [token]);

  if (loading) return <div className="text-center mt-10">Загрузка...</div>;

  return (
    <>
      <Header />
      <Sidebar />
      <div className="uploads-page">
        <div className="uploads-container">
          <div className="uploads-header">Мои Загрузки</div>
          {comics.length === 0 ? (
            <div className="text-center mt-10">Нет доступных комиксов для отображения.</div>
          ) : (
            comics.map((comic) => {
              // Подготовка путей для постера и комикса
              const posterPath = comic.posterPath
                ? `http://localhost:3001${comic.posterPath.replace('/api', '')}`
                : null;

              const comicPath = comic.comicPath
                ? `/uploads/${comic.comicPath}`
                : null;

              return (
                <div key={comic.comicPath} className="upload-card">
                  {posterPath ? (
                    <img src={posterPath} alt={comic.title} />
                  ) : (
                    <div className="no-poster">Нет изображения</div>
                  )}
                  <div className="upload-card-info">
                    <h2 className="text-xl font-bold">{comic.title}</h2>
                    <p className="label">Тип:</p>
                    <p className="type">{comic.type}</p>
                    <p className="label">Описание:</p>
                    <p className="description">{comic.description}</p>
                    <Link
                      to={`/comic/${encodeURIComponent(comic.comicPath)}`}
                      className="inline-block mt-2 bg-[#F4B333] text-black px-4 py-2 rounded-xl hover:bg-[#e3a621] transition"
                    >
                      Читать
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Uploads;
