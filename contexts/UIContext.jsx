/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';
import useWindowDimensions from '../hooks/useWindowDimensions';

const UIContext = createContext();

export const useUI = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [darkMode, setDarkMode] = useState(false);
  const { width } = useWindowDimensions();
  const onMobile = width <= 768;

  const sidebarWidth = isSidebarCollapsed ? 50 : onMobile ? width : 300;

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      document.documentElement.classList.toggle('dark', !prevMode);
      localStorage.setItem('theme', !prevMode ? 'dark' : 'light');
      return !prevMode;
    });
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (
      storedTheme === 'dark' ||
      (!storedTheme &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    if (isSidebarCollapsed && onMobile) {
      setIsSidebarCollapsed(false);
    }
  }, [isSidebarCollapsed, onMobile]);

  const toggleCollapseSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const changeActiveTab = (value) => {
    setActiveTab(value);
  };

  const contextValue = {
    toggleCollapseSidebar,
    isSidebarCollapsed,
    changeActiveTab,
    toggleDarkMode,
    toggleSidebar,
    isSidebarOpen,
    sidebarWidth,
    activeTab,
    darkMode,
    onMobile,
  };

  return (
    <UIContext.Provider value={contextValue}>{children}</UIContext.Provider>
  );
};
