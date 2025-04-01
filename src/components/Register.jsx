import React from "react";
import { Link } from "react-router-dom";
import Poster from "../assets/images/LoginRegisterPoster.png";
import LockIcon from "../assets/images/lock.png";
import ProfileIcon from "../assets/images/profile.png";
import EmailIcon from "../assets/images/@.png";

function Register() {
    return(
        <>
            <section className="register" id="register">
                <div className="register__main">
                    <article className="register__title">
                        <h1 className="register__yomuneko">
                            Yomuneko
                        </h1>
                        <h1 className="register__hieroglyph">
                            読む猫
                        </h1>
                    </article>
                    <h2 className="register__welcome">
                        Добро&nbsp; 
                        <span className="back__word">
                            пожаловать
                        </span>
                        !
                    </h2>
                    <p className="register__description">
                        Открывайте мир манги, маньхуа и манхвы с YomuNeko — управляйте своей библиотекой, <br /> отслеживайте прогресс чтения и наслаждайтесь любимыми историями! 📖😺
                    </p>
                    <ul className="register__list">
                        <li className="register__list__item">
                            <input type="text" placeholder="Имя" className="register__list__item__title" />
                            <img src={ProfileIcon} alt="profile icon" className="register__list__item__icon" />
                        </li>
                        <li className="register__list__item">
                            <input type="text" placeholder="Почта" className="register__list__item__title" />
                            <img src={EmailIcon} alt="email icon" className="register__list__item__icon" />
                        </li>
                        <li className="register__list__item">
                            <input type="text" placeholder="Пароль" className="register__list__item__title" />
                            <img src={LockIcon} alt="lock icon" className="register__list__item__icon" />
                        </li>
                        <li className="register__list__item">
                            <input type="text" placeholder="Подтвердите пароль" className="register__list__item__title" />
                            <img src={LockIcon} alt="lock icon" className="register__list__item__icon" />
                        </li>
                        <button className="register__button">
                            Зарегистрироваться
                        </button>
                    </ul>
                    <article className="register__already">
                        <p className="register__already__text">
                            Уже есть аккаунт?
                        </p>
                        <Link to="/login" className="register__login">Войти</Link>
                    </article>
                </div>
                <div className="poster">
                    <img src={Poster} alt="poster icon" className="LoginRegister__poster" />
                </div>
            </section>
        </>
    )
}

export default Register;