import React from "react";
import { Link, useLocation } from "react-router-dom"; 
import profileIcon from "../assets/images/profilecircle.png";
import messageIcon from "../assets/images/messagetext.png";
import authorIcon from "../assets/images/profile2user.png";
import discoverIcon from "../assets/images/discover.png";
import listIcon from "../assets/images/save2.png";
import homeIcon from "../assets/images/home.png";
import settingIcon from "../assets/images/setting.png";
import uploadsIcon from "../assets/images/uploads.png";

function Home() {
    const location = useLocation();

    return(
        <>
                <aside className="sidebar">
                    <nav className="sidebar__menu">
                        <p className="sidebar__section">Меню -</p>
                        <ul>
                            <li className={`sidebar__item ${location.pathname === "/home" ? "active" : ""}`}>
                                <Link to="/home" className="sidebar__link">
                                    <img src={homeIcon} alt="home icon" className="sidebar__image" />
                                    <span className="sidebar__text">Главная</span>
                                </Link>
                            </li>
                            <li className={`sidebar__item ${location.pathname.startsWith("/discover") ? "active" : ""}`}>
                                <Link to="/discover" className="sidebar__link">
                                    <img src={discoverIcon} alt="discover icon" className="sidebar__image" />
                                    <span className="sidebar__text">Открыть комиксы</span>
                                </Link>
                            </li>
                            <li className={`sidebar__item ${location.pathname.startsWith("/authors") ? "active" : ""}`}>
                                <Link to="/authors" className="sidebar__link">
                                    <img src={authorIcon} alt="author icon" className="sidebar__image" />
                                    <span className="sidebar__text">Авторы</span>
                                </Link>
                            </li>
                            <li className={`sidebar__item ${location.pathname.startsWith("/notifications") ? "active" : ""}`}>
                                <Link to="/notifications" className="sidebar__link">
                                    <img src={messageIcon} alt="notification icon" className="sidebar__image" />
                                    <span className="sidebar__text">Уведомления</span>
                                </Link>
                            </li>
                            <li className={`sidebar__item ${location.pathname.startsWith("/library") ? "active" : ""}`}>
                                <Link to="/library" className="sidebar__link">
                                    <img src={settingIcon} alt="library icon" className="sidebar__image" />
                                    <span className="sidebar__text">Моя библиотека</span>
                                </Link>
                            </li>
                        </ul>

                        <p className="sidebar__section">Общие -</p>
                        <ul>
                            <li className={`sidebar__item ${location.pathname.startsWith("/profile") ? "active" : ""}`}>
                                <Link to="/profile" className="sidebar__link">
                                    <img src={profileIcon} alt="profile icon" className="sidebar__image" />
                                    <span className="sidebar__text">Профиль</span>
                                </Link>
                            </li>
                            <li className={`sidebar__item ${location.pathname.startsWith("/favorites") ? "active" : ""}`}>
                                <Link to="/favorites" className="sidebar__link">
                                    <img src={listIcon} alt="my list icon" className="sidebar__image" />
                                    <span className="sidebar__text">Избранные</span>
                                </Link>
                            </li>
                            <li className={`sidebar__item uploads ${location.pathname.startsWith("/uploads") ? "active" : ""}`}>
                                <Link to="/uploads" className="sidebar__link">
                                    <img src={uploadsIcon} alt="uploads icon" className="sidebar__image uploads" />
                                    <span className="sidebar__text">Загрузки</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </aside>
        </>
    )
};

export default Home;