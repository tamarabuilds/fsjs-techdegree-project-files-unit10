import { createContext, useState, useEffect } from "react";

// To create the context with a default or fallback value of null
const ThemeContext = createContext(null);

// Create the provider
export const ThemeProvider = (props) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [accentColor, setAccentColor] = useState('#63537d');
    const [fontPercentage, setFontPercentage] = useState(100);

    useEffect(() => {
        if (isDarkMode) {
          document.body.classList.add('dark');
        } else {
          document.body.classList.remove('dark');
        }
        document.body.style.fontSize = `${fontPercentage}%`;
      }, [isDarkMode, fontPercentage]);
    
      const toggleDarkMode = () => {
        setIsDarkMode(currentMode => !currentMode);
      }

    return (
        <ThemeContext.Provider value= { {
            isDarkMode,
            accentColor,
            fontPercentage,
            // To pass a function through context, use actions
            actions: {
                toggleDarkMode: toggleDarkMode,
                updateAccentColor: setAccentColor,
                updateFontPercentage: setFontPercentage,

            }
        } }>
            {/* Enable context children */}
            {props.children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;