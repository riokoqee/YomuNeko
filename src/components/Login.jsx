import React from "react";
import { Link } from "react-router-dom";
import Poster from "../assets/images/LoginRegisterPoster.png";
import LockIcon from "../assets/images/lock.png";

import EmailIcon from "../assets/images/@.png";

function Login() {

    return (
        <section className="login" id="login">
            <div className="login__main">
                <article className="login__title">
                    <h1 className="login__yomuneko">
                        Yomuneko
                    </h1>
                    <h1 className="login__hieroglyph">
                        読む猫
                    </h1>
                </article>
                <h2 className="login__welcome">
                    С&nbsp; 
                    <span className="back__word">
                        возвращением
                    </span>
                    !
                </h2>
                <ul className="login__list">
                    <li className="login__list__item">
                        <input type="text" placeholder="Почта" className="login__list__item__title" />
                        <img src={EmailIcon} alt="email icon" className="login__list__item__icon" />
                    </li>
                    <li className="login__list__item">
                        <input type="text" placeholder="Пароль" className="login__list__item__title" />
                        <img src={LockIcon} alt="lock icon" className="login__list__item__icon" />
                    </li>
                    <button className="login__button">
                        Войти
                    </button>
                </ul>
                <article className="login__already">
                    <p className="login__already__text">
                        Нет аккаунта?
                    </p>
                    <Link to="/register" className="register__login">Зарегистрироваться</Link>
                </article>
            </div>
            <div className="poster">
                <img src={Poster} alt="poster icon" className="LoginRegister__poster" />
            </div>
        </section>
    )
}

export default Login;