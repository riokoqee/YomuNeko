import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Poster from "../assets/images/LoginRegisterPoster.png";
import LockIcon from "../assets/images/lock.png";
import ProfileIcon from "../assets/images/profile.png";
import EmailIcon from "../assets/images/@.png";
import useUserStore from "../store/useUserStore";

function Register() {
    const navigate = useNavigate();
    const register = useUserStore(state => state.register);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    // Регулярное выражение для проверки email
    const emailPattern = /^[a-zA-Z0-9._-]+@(gmail\.com|yahoo\.com|outlook\.com|mail\.ru)$/;

    const handleRegister = async () => {
        // Проверка на совпадение паролей
        if (password !== confirmPassword) {
            return setError("Пароли не совпадают");
        }

        // Проверка email
        if (!emailPattern.test(email)) {
            return setError("Пожалуйста, введите корректный email");
        }

        console.log("Регистрация с данными:", { name, email, password });

        const success = await register(name, email, password);
        if (success) {
            navigate("/login");
        } else {
            setError("Пользователь с такой почтой уже существует");
        }
    };

    return (
        <section className="register" id="register">
            <div className="register__main">
                <article className="register__title">
                    <h1 className="register__yomuneko">Yomuneko</h1>
                    <h1 className="register__hieroglyph">読む猫</h1>
                </article>
                <h2 className="register__welcome">Добро&nbsp;<span className="back__word">пожаловать</span>!</h2>
                <p className="register__description">
                    Открывайте мир манги, маньхуа и манхвы с YomuNeko — управляйте своей библиотекой, <br /> отслеживайте прогресс чтения и наслаждайтесь любимыми историями! 📖😺
                </p>
                <ul className="register__list">
                    <li className="register__list__item">
                        <input type="text" placeholder="Имя" value={name} onChange={e => setName(e.target.value)} className="register__list__item__title" />
                        <img src={ProfileIcon} alt="profile icon" className="register__list__item__icon" />
                    </li>
                    <li className="register__list__item">
                        <input type="text" placeholder="Почта" value={email} onChange={e => setEmail(e.target.value)} className="register__list__item__title" />
                        <img src={EmailIcon} alt="email icon" className="register__list__item__icon" />
                    </li>
                    <li className="register__list__item">
                        <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} className="register__list__item__title" />
                        <img src={LockIcon} alt="lock icon" className="register__list__item__icon" />
                    </li>
                    <li className="register__list__item">
                        <input type="password" placeholder="Подтвердите пароль" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="register__list__item__title" />
                        <img src={LockIcon} alt="lock icon" className="register__list__item__icon" />
                    </li>
                    <button className="register__button" onClick={handleRegister}>
                        Зарегистрироваться
                    </button>
                    {error && <p className="register__error">{error}</p>}
                </ul>
                <article className="register__already">
                    <p className="register__already__text">Уже есть аккаунт?</p>
                    <Link to="/login" className="register__login">Войти</Link>
                </article>
            </div>
            <div className="poster">
                <img src={Poster} alt="poster icon" className="LoginRegister__poster" />
            </div>
        </section>
    );
}

export default Register;