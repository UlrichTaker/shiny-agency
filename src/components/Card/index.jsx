import PropTypes from 'prop-types'
import DefaultPicture from '../../assets/profile.png'
import styled from 'styled-components'
import colors from '../../utils/styles/colors'

//crée un composant stylisé pour un label de carte (<span>)
const CardLabel = styled.span`
    color: #5843e4;
    font-size: 22px;
    font-weight: bold;
`

//crée un composant stylisé pour une image de carte (<img>)
const CardImage = styled.img`
    height: 80px;
    width: 80px;
    border-radius: 50%;
`

//crée un composant stylisé pour l'enveloppe générale de la carte (<div>)
const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    background-color: ${colors.backgroundLight};
    border-radius: 30px;
    width: 350px;
    transition: 200ms;
    &:hover {
        cursor: pointer;
        box-shadow: 2px 2px 10px #e2e3e9;
    }
`

function Card({ label, title, picture }) {
  return (
      <CardWrapper>
          <CardLabel>{label}</CardLabel>
          <CardImage src={picture} alt="freelance" />
          <span>{title}</span>
      </CardWrapper>
  )
}


// Déclaration des types attendus pour les propriétés (props) du composant
Card.propTypes = {
    label: PropTypes.string.isRequired,   // Étiquette en tant que chaîne de caractères requise
    title: PropTypes.string.isRequired,   // Titre en tant que chaîne de caractères requise
    picture: PropTypes.string.isRequired, // Image en tant que chaîne de caractères requise
  };
  
  // Définition des valeurs par défaut pour les propriétés (props) du composant. 
  Card.defaultProps = {
    label: '',                          // Par défaut, l'étiquette est une chaîne vide
    title: '',                          // Par défaut, le titre est une chaîne vide
    picture: DefaultPicture,            // Par défaut, l'image est l'image par défaut importée
  };
  
export default Card