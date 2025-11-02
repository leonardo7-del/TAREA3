import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from "./pages/Post";
import PostDetail from "./pages/PostDetail";
import { ThemeProvider } from "./contexts/ThemeContext";
import ThemeSwitch from "./components/ThemeSwitch/ThemeSwitch";
import "./App.css";
import "./styles/darkMode.css";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app-container">
          <header className="app-header">
            <h1>Mi Blog Personal</h1>
            <div className="header-right">
              <ThemeSwitch />
            </div>
          </header>
          <main className="app-content">
            <Routes>
              <Route path="/" element={<Posts />} />
              <Route path="/posts/:id" element={<PostDetail />} />
            </Routes>
          </main>
          <footer className="app-footer">
            <p>&copy; {new Date().getFullYear()} Mi Blog Personal</p>
          </footer>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
