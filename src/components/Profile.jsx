import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import useUserStore from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import pfpIcon from "../assets/images/pfp_icon.jpg"; // Импорт аватарки

function Profile() {
    const { user, logout, updateUserName } = useUserStore();  
    const navigate = useNavigate();
    
    const [newName, setNewName] = useState(user?.name || "");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user) {
            setNewName(user.name);  
        }
    }, [user]);

    const handleSaveName = async () => {
        if (newName !== user?.name) {
            try {
                const response = await fetch('http://localhost:3001/api/auth/update-name', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: user.id,  
                        newName: newName,  
                    }),
                });

                const data = await response.json();
                if (response.ok) {
                    console.log("Name updated successfully:", data);

                    updateUserName(newName);  

                    setNewName(data.user.name);
                } else {
                    console.error("Failed to update name:", data.message);
                }
            } catch (error) {
                console.error('Ошибка при обновлении имени:', error);
            }

            setIsEditing(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (!user) {
        return (
            <>
                <Header />
                <Sidebar />
                <div className="profile__not-logged-in">
                    <p>Вы не авторизованы. Пожалуйста, войдите в систему.</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <Sidebar />
            <div className="profile">
                <h1 className="profile__title">Профиль пользователя</h1>
                
                <div className="profile__details">
                    <div className="profile__avatar">
                        <img 
                            src={pfpIcon} 
                            alt="User Avatar" 
                            className="profile__avatar-img" 
                        />
                    </div>
                    <p>
                        <strong>Имя:</strong> 
                        {isEditing ? (
                            <input 
                                type="text" 
                                value={newName} 
                                onChange={(e) => setNewName(e.target.value)} 
                            />
                        ) : (
                            <span> {user.name}</span>
                        )}
                    </p>

                    <p><strong>Email:</strong> {user.email}</p>
                    
                    <div className="profile__actions">
                        {isEditing ? (
                            <button className="profile__button" onClick={handleSaveName}>Сохранить</button>
                        ) : (
                            <button className="profile__button" onClick={() => setIsEditing(true)}>Изменить имя</button>
                        )}
                        <button className="profile__button" onClick={handleLogout}>Выйти</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
