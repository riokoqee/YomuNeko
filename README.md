# YomuNeko

YomuNeko - веб-платформа для ведения личной библиотеки комиксов, манги, манхвы и маньхуа. Проект позволяет пользователю зарегистрироваться, войти в аккаунт, загружать комиксы в формате PDF, добавлять постеры, хранить материалы в личной библиотеке и открывать их через встроенный PDF-ридер.

## О проекте

Название YomuNeko связано с японской фразой `読む猫`, что можно перевести как "читающий кот". Основная идея проекта - создать удобное пространство для хранения и чтения цифровых комиксов, где пользователь может управлять своей коллекцией и быстро получать доступ к добавленным материалам.

Проект состоит из двух частей:

* frontend - клиентская часть на React и Vite;
* backend - серверная часть на Node.js, Express и PostgreSQL.

## Основные возможности

* регистрация пользователя;
* авторизация по логину или email;
* хранение JWT-токена после входа;
* личный профиль пользователя;
* изменение имени пользователя;
* выход из аккаунта;
* загрузка комикса в формате PDF;
* загрузка постера в формате PNG или JPG;
* сохранение данных о комиксе в PostgreSQL;
* отображение личной библиотеки пользователя;
* чтение PDF-комиксов через встроенный ридер;
* базовая навигация по страницам приложения.

## Стек технологий

### Frontend

* React
* Vite
* React Router DOM
* Zustand
* Axios
* React PDF Viewer
* CSS

### Backend

* Node.js
* Express
* PostgreSQL
* JSON Web Token
* Bcrypt
* Express File Upload
* CORS
* Dotenv
* Slugify

## Структура проекта

```text
YomuNeko/
├── backend/
│   ├── controllers/
│   │   └── comicController.js
│   ├── data/
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── fileUploadMiddleware.js
│   ├── models/
│   │   └── comicModel.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── comic.js
│   ├── uploads/
│   ├── db.js
│   ├── package.json
│   └── server.js
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── store/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Установка и запуск

### 1. Клонирование репозитория

```bash
git clone https://github.com/riokoqee/YomuNeko.git
cd YomuNeko
```

### 2. Установка зависимостей frontend

```bash
npm install
```

### 3. Установка зависимостей backend

```bash
cd backend
npm install
```

### 4. Настройка базы данных

Проект использует PostgreSQL. Необходимо создать базу данных:

```sql
CREATE DATABASE "YomuNeko";
```

Пример таблицы пользователей:

```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password TEXT NOT NULL
);
```

Пример таблицы комиксов:

```sql
CREATE TABLE comics (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    comic_file TEXT NOT NULL,
    poster_file TEXT NOT NULL,
    user_id INTEGER REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Настройка переменных окружения

В папке `backend` нужно создать файл `.env`:

```env
PORT=
JWT_SECRET=
```

Также проверьте подключение к базе данных в файле:

```text
backend/db.js
```

По умолчанию проект использует локальную базу PostgreSQL.

### 6. Запуск backend

Из папки `backend`:

```bash
npm start
```

После запуска сервер будет доступен по адресу:

```text
http://localhost:
```

### 7. Запуск frontend

В отдельном терминале из корневой папки проекта:

```bash
npm run dev
```

После запуска frontend будет доступен в браузере через адрес, который покажет Vite.

## Основные маршруты backend

### Авторизация

```text
POST /api/auth/register
```

Регистрация нового пользователя.

```text
POST /api/auth/login
```

Авторизация пользователя по email/логину и паролю.

```text
PUT /api/auth/update-name
```

Обновление имени пользователя.

### Комиксы

```text
POST /api/comics/upload
```

Загрузка комикса. Требует авторизации через JWT-токен.

```text
GET /api/comics/my
```

Получение списка комиксов текущего пользователя.

```text
GET /api/comics/:id
```

Получение данных комикса.

## Форматы загружаемых файлов

Для комикса:

```text
PDF
```

Для постера:

```text
PNG, JPG, JPEG
```

## Скрипты frontend

```bash
npm run dev
```

Запуск проекта в режиме разработки.

```bash
npm run build
```

Сборка проекта.

```bash
npm run preview
```

Предпросмотр собранной версии.

```bash
npm run lint
```

Проверка кода через ESLint.

```bash
npm run deploy
```

Деплой проекта через GitHub Pages.

## Скрипты backend

```bash
npm start
```

Запуск сервера через `node server.js`.

## Как работает проект

Пользователь регистрируется или входит в аккаунт. После успешной авторизации backend возвращает JWT-токен, который сохраняется на стороне frontend через Zustand. Этот токен используется при запросах, где нужна авторизация, например при загрузке комикса.

При загрузке комикса пользователь указывает название, тип, описание, PDF-файл и постер. Backend проверяет наличие файлов, их формат, сохраняет файлы в папку `uploads`, а информацию о комиксе записывает в PostgreSQL. После этого комикс можно открыть в личной библиотеке и читать через PDF-ридер.

## Рекомендации по доработке

* добавить `.gitignore`;
* убрать `node_modules` из репозитория;
* не хранить `.env` в публичном репозитории;
* вынести настройки базы данных в `.env`;
* добавить обработку избранного;
* добавить полноценное отслеживание прогресса чтения;
* добавить страницу просмотра всех загруженных комиксов;
* улучшить валидацию форм;
* добавить роли пользователей;
* добавить поиск и фильтрацию по типу комикса;
* добавить адаптивную верстку под мобильные устройства.

## Автор

Проект разработан как веб-приложение для управления личной библиотекой комиксов, манги, манхвы и маньхуа.
