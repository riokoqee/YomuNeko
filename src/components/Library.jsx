import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import UploadComic from "../services/UploadComic";

function Library() {
    return (
        <>
            <Header />
            <Sidebar />
            <div className="library">
                <h1>Моя библиотека</h1>
                <UploadComic /> {/* Добавляем компонент загрузки */}
            </div>
        </>
    );
}

export default Library;