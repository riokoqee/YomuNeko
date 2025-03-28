import { HashRouter, Route, Routes} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<RegisterPage />}></Route>
        </Routes>
      </HashRouter>
    </>
  )
}

export default App;