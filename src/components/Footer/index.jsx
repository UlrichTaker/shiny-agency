import styled from 'styled-components'
import colors from '../../utils/styles/colors'
import { ThemeContext } from '../../utils/styles/context'
import { useContext } from 'react'
 

const FooterContainer = styled.footer`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 60px;
`
 
const NightModeButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${colors.secondary};
`

// Ce composant permet aux utilisateurs de changer dynamiquement le thème de l'application en cliquant sur le bouton du pied de page. La fonction toggleTheme est responsable de cette bascule, et le texte affiche l'emoji correspondant au thème actuel.
// Importe le hook useContext depuis React pour accéder au contexte
function Footer() {
    // Utilise useContext pour extraire les valeurs du contexte ThemeContext
    const { toggleTheme, theme } = useContext(ThemeContext);

    return (
        <FooterContainer>
            {/* Bouton pour basculer entre les modes lumière et sombre */}
            <NightModeButton onClick={() => toggleTheme()}>
                Changer de mode : {theme === 'light' ? '☀️' : '🌙'}
            </NightModeButton>
        </FooterContainer>
    );
}


export default Footer