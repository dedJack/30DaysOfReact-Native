import {createContext, ReactNode, useContext, useState} from 'react';

type Theme = 'light' | 'Dark';

//Type of theme context
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

//create context.
const themeContext = createContext<ThemeContextType | undefined>(undefined);

//custom hook.
export const useTheme = () => {
  const context = useContext(themeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

//To access all this function in all over program, We must have a provider component named as ThemeProvider.
//Provider component.

//prop interface
interface ThemeProviderProp {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProp> = ({children}) => {
  const [theme, setTheme] = useState<Theme>('light');

  //handle toggleTheme
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'Dark' : 'light'));
  };
  return (
    <themeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </themeContext.Provider>
  );
};

export default ThemeProvider;
