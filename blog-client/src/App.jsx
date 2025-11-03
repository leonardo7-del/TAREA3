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
            <div className="header-left">
              <span className="app-logo" aria-label="Icono del blog">
                {/* Icono minimalista representando un documento/blog */}
                <svg viewBox="0 0 24 24" width="24" height="24" role="img" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                </svg>
              </span>
              <h1>Mi Blog Personal</h1>
            </div>
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
