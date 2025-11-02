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
    <div className="theme-switch-wrapper">
      <span className="theme-icon">☀️</span>
      <label className="theme-switch">
        <input 
          type="checkbox" 
          checked={checked} 
          onChange={handleToggle} 
        />
        <span className="slider round"></span>
      </label>
      <span className="theme-icon">🌙</span>
    </div>
  );
};

export default ThemeSwitch;