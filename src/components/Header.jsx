import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
    const [user, setUser] = useState(null);

    return(
        <header className="header">
            <div className="header__container">
                <h1 className="header__logo">
                    YomuNeko
                </h1>
                <h1 className="header__hieroglyph">
                    読む猫
                </h1>
            </div>
            <div className="header__right">
                <div className="header__search">
                    <input 
                        type="text"
                        placeholder="Search here"
                        className="header__search-input"
                    />
                </div>
                <div className="header__profile">
                    {user ? (
                        <Link to="/profile" className="header__user">
                            <img src={user.avatar} alt="User" className="header__avatar" />
                            <span className="header__username">{user.name}</span>
                        </Link>
                    ) : (
                        <Link to="/login" className="header__login">Войти</Link>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header;
