import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "../src/styles/base/typography.css"
import "../src/styles/layout/Register.css"
import "../src/styles/components/li.css"
import "../src/styles/components/a.css"
import "../src/styles/layout/Poster.css"
import "../src/styles/layout/Login.css"
import "../src/styles/layout/Home.css"
import "../src/styles/layout/Header.css"

createRoot(document.getElementById('root')).render(
    <App />
)