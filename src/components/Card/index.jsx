// Importation des modules nécessaires, y compris PropTypes pour la validation des types de propriétés, une image par défaut, styled-components pour la stylisation, et un fichier de couleurs.
import PropTypes from 'prop-types'
import DefaultPicture from '../../assets/profile.png'
import styled from 'styled-components'
import colors from '../../utils/styles/colors'
import { useTheme } from '../../utils/hooks'

const CardLabel = styled.span`
  color: ${({ theme }) => (theme === 'light' ? colors.primary : '#ffffff')};
  font-size: 22px;
  font-weight: normal;
  padding-left: 15px;
`

const CardTitle = styled.span`
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  font-size: 22px;
  font-weight: normal;
  align-self: center;
`

const CardImage = styled.img`
  height: 150px;
  width: 150px;
  align-self: center;
  border-radius: 50%;
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  border-radius: 30px;
  width: 300px;
  height: 300px;
  &:hover {
    cursor: pointer;
  }
`

// Composant Card
function Card({ label, title, picture }) {
  // Utilise le hook useTheme pour obtenir le thème actuel
  const { theme } = useTheme();

  // Rendu du composant avec des styles basés sur le thème
  return (
    <CardWrapper theme={theme}>
      {/* Étiquette de la carte (job label) avec le thème actuel */}
      <CardLabel theme={theme}>{label}</CardLabel>

      {/* Image de la carte avec la source provenant des propriétés (picture) */}
      <CardImage src={picture} alt="freelance" />

      {/* Titre de la carte (name/title) avec le thème actuel */}
      <CardTitle theme={theme}>{title}</CardTitle>
    </CardWrapper>
  );
}

// Définit les types attendus pour les propriétés (props) du composant Card
Card.propTypes = {
  label: PropTypes.string.isRequired,   // Attend une chaîne de caractères pour l'étiquette
  title: PropTypes.string.isRequired,   // Attend une chaîne de caractères pour le titre
  picture: PropTypes.string.isRequired, // Attend une chaîne de caractères pour la source de l'image
};

// Définit des valeurs par défaut pour les propriétés du composant Card au cas où elles ne seraient pas fournies
Card.defaultProps = {
  label: '',                           // Valeur par défaut pour l'étiquette (chaîne vide)
  title: '',                           // Valeur par défaut pour le titre (chaîne vide)
  picture: DefaultPicture,              // Valeur par défaut pour la source de l'image (une image par défaut)
};
export default Card