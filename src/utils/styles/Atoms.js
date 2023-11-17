// Ce code utilise styled-components pour définir deux composants stylisés : Loader et StyledLink
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import colors from './colors'

// crée une animation keyframes appelée rotate qui effectue une rotation de 0 à 360 degrés. Cette animation est utilisée dans le composant Loader.
const rotate = keyframes`
  from {
    transform: rotate(0deg); 
  }

  to {
    transform: rotate(360deg);
  }
`
export const Loader = styled.div`
  padding: 10px;
  border: 6px solid ${colors.primary};
  border-bottom-color: transparent;
  border-radius: 22px;
  animation: ${rotate} 1s infinite linear;
  height: 0;
  width: 0;
`

//crée un composant stylisé pour un lien (Link)
export const StyledLink = styled(Link)`
  padding: 10px 15px;
  color: #8186a0;
  text-decoration: none;
  font-size: 18px;
  text-align: center;
  ${(props) => //permet d'inclure des styles conditionnels basés sur les propriétés (props) du composant. Dans ce cas, si la propriété $isFullLink est vraie, des styles supplémentaires sont ajoutés.
    props.$isFullLink &&
    `color: white; 
    border-radius: 30px; 
    background-color: ${colors.primary};`}
`