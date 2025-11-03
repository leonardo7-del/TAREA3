import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './ThemeSwitch.css';

const ThemeSwitch = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [checked, setChecked] = useState(isDarkMode);
  
  // Mantener sincronizado el estado del checkbox con el tema actual
  useEffect(() => {
    setChecked(isDarkMode);
  }, [isDarkMode]);

  const handleToggle = (e) => {
    toggleTheme();
  };

  return (
    <div className={`theme-switch-wrapper ${isDarkMode ? 'is-dark' : 'is-light'}`}>
      <span className="theme-icon light" aria-hidden="true">
        {/* Sol minimalista */}
        <svg viewBox="0 0 24 24" width="18" height="18" role="img" aria-hidden="true">
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth="2" />
          <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="2" />
          <line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="2" />
          <line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" />
          <line x1="4" y1="4" x2="6.5" y2="6.5" stroke="currentColor" strokeWidth="2" />
          <line x1="17.5" y1="17.5" x2="20" y2="20" stroke="currentColor" strokeWidth="2" />
          <line x1="4" y1="20" x2="6.5" y2="17.5" stroke="currentColor" strokeWidth="2" />
          <line x1="17.5" y1="6.5" x2="20" y2="4" stroke="currentColor" strokeWidth="2" />
        </svg>
      </span>
      <label className="theme-switch" aria-label="Cambiar tema claro/oscuro">
        <input 
          type="checkbox" 
          checked={checked} 
          onChange={handleToggle} 
        />
        <span className="slider round"></span>
      </label>
      <span className="theme-icon dark" aria-hidden="true">
        {/* Luna minimalista (media luna) */}
        <svg viewBox="0 0 24 24" width="18" height="18" role="img" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
};

export default ThemeSwitch;