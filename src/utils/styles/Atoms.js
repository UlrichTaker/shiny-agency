import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from './colors'

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