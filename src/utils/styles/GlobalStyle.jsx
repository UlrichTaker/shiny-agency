import { useContext } from 'react'
import { ThemeContext } from '../context'
import { createGlobalStyle } from 'styled-components'

// Définit les styles globaux en utilisant createGlobalStyle
const StyledGlobalStyle = createGlobalStyle`
    * {
        font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }

    body {
        // Définit la couleur de fond du corps en fonction du mode sombre ou clair
        background-color: ${({ isDarkMode }) => isDarkMode ? '#2F2E41' : 'white'};
        margin: 0;
    }
`;

// Définit une fonction composant React appelée GlobalStyle
function GlobalStyle() {
    // Utilise useContext pour extraire la valeur du thème depuis ThemeContext
    const { theme } = useContext(ThemeContext);

    // Renvoie le composant StyledGlobalStyle avec la propriété isDarkMode définie en fonction du thème
    return <StyledGlobalStyle isDarkMode={theme === 'dark'} />;
}

// Exporte le composant GlobalStyle en tant que composant par défaut de ce fichier
export default GlobalStyle;