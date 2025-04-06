import React, { useState, useEffect } from "react";
import useUserStore from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UploadComic() {
    const [file, setFile] = useState(null);
    const [poster, setPoster] = useState(null);
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { user, token } = useUserStore(); // Получаем user и token
    const navigate = useNavigate();

    // Сброс сообщений об ошибке или успехе после определенного времени
    useEffect(() => {
        if (error || successMessage) {
            const timer = setTimeout(() => {
                setError("");
                setSuccessMessage("");
            }, 5000); // Сообщение исчезает через 5 секунд
            return () => clearTimeout(timer);
        }
    }, [error, successMessage]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Проверяем, что файл имеет правильный формат
            if (selectedFile.type === "application/pdf") {
                setFile(selectedFile);
            } else {
                setError("Файл должен быть PDF.");
            }
        }
    };

    const handlePosterChange = (e) => {
        const selectedPoster = e.target.files[0];
        if (selectedPoster) {
            // Проверяем, что файл изображения имеет правильный формат
            const validTypes = ["image/png", "image/jpeg"];
            if (validTypes.includes(selectedPoster.type)) {
                setPoster(selectedPoster);
            } else {
                setError("Постер должен быть изображением PNG или JPG.");
            }
        }
    };

    const handleUpload = async () => {
        if (!file || !poster || !title || !type || !description) {
            setError("Пожалуйста, заполните все поля.");
            return;
        }
    
        if (!token) {  // Проверка на наличие токена
            setError("Необходима авторизация. Пожалуйста, войдите в аккаунт.");
            return;
        }
    
        const formData = new FormData();
        formData.append("comic", file);
        formData.append("poster", poster);
        formData.append("title", title);
        formData.append("type", type);
        formData.append("description", description);
    
        console.log("Данные перед отправкой:");
        formData.forEach((value, key) => {
            console.log(key, value);
        });
    
        console.log("Токен: ", token); // Проверка токена
    
        try {
            const response = await axios.post("http://localhost:3001/api/comics/upload", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`, // Отправляем токен
                },
            });
    
            console.log(response.data);
    
            if (response.data.message?.includes("успешно")) {
                setSuccessMessage("Комикс успешно загружен!");
                setFile(null);
                setPoster(null);
                setTitle("");
                setType("");
                setDescription("");
            } else {
                setError("Ошибка при загрузке комикса: " + (response.data.message || "Неизвестная ошибка"));
            }
        } catch (error) {
            setError("Ошибка при загрузке комикса: " + (error.response?.data?.message || error.message));
        }
    };
    

    return (
        <div className="upload-comic">
            <h2>Загрузить комикс</h2>
            {error && <div className="error">{error}</div>}
            {successMessage && <div className="success">{successMessage}</div>}

            <input
                type="text"
                placeholder="Название комикса"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Тип комикса"
            >
                <option value="">Выберите тип комикса</option>
                <option value="манга">Манга</option>
                <option value="манхва">Манхва</option>
                <option value="комикс">Комикс</option>
                <option value="маньхуа">Маньхуа</option>
            </select>

            <textarea
                placeholder="Описание комикса"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <label>
                Прикрепить комикс (PDF):
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                />
            </label>

            <label>
                Прикрепить постер (PNG, JPG):
                <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={handlePosterChange}
                />
            </label>

            <button onClick={handleUpload}>
                Загрузить
            </button>
        </div>
    );
}

export default UploadComic;
