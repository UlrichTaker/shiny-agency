import PropTypes from 'prop-types'
import DefaultPicture from '../../assets/profile.png'

function Card({ label, title, picture }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: 15 }}>
      <span>{label}</span>
      <img src={picture} alt="freelance" height={80} width={80} />
      <span>{title}</span>
    </div>
  )
}

// Déclaration des types attendus pour les propriétés (props) du composant
Card.propTypes = {
    label: PropTypes.string.isRequired,   // Étiquette en tant que chaîne de caractères requise
    title: PropTypes.string.isRequired,   // Titre en tant que chaîne de caractères requise
    picture: PropTypes.string.isRequired, // Image en tant que chaîne de caractères requise
  };
  
  // Définition des valeurs par défaut pour les propriétés (props) du composant. Si une propriété n'est pas fournie, elle prendra la valeur par défaut spécifiée.
  Card.defaultProps = {
    label: '',                          // Par défaut, l'étiquette est une chaîne vide
    title: '',                          // Par défaut, le titre est une chaîne vide
    picture: DefaultPicture,            // Par défaut, l'image est l'image par défaut importée
  };
  
export default Card