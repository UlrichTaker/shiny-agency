// Ce composant Survey est responsable du rendu et de la gestion de l'enquête

import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/styles/colors'
import { Loader } from '../../utils/styles/Atoms'
import { SurveyContext } from '../../utils/context'
import { useFetch } from '../../utils/hooks'
import { useTheme } from '../../utils/hooks'

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const QuestionContent = styled.span`
  margin: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`

const ReplyBox = styled.button`
  border: none;
  height: 100px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  border-radius: 30px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};
  &:first-child {
    margin-right: 15px;
  }
  &:last-of-type {
    margin-left: 15px;
  }
`

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

function Survey() {
  // Importe le hook useParams de React Router pour extraire les paramètres d'URL
  const { questionNumber } = useParams();
  // Convertit le numéro de question extrait en tant qu'entier
  const questionNumberInt = parseInt(questionNumber);
  // Calcule le numéro de la question précédente
  const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1;
  // Calcule le numéro de la question suivante
  const nextQuestionNumber = questionNumberInt + 1;
  // Utilise le hook useTheme pour obtenir le thème actuel de l'application
  const { theme } = useTheme();
  // Utilise le hook useContext pour obtenir les fonctions saveAnswers et les réponses actuelles depuis le contexte SurveyContext
  const { saveAnswers, answers } = useContext(SurveyContext);
  // Fonction pour sauvegarder la réponse à la question actuelle
  function saveReply(answer) {
    saveAnswers({ [questionNumber]: answer });
  }
  // Utilise le hook useFetch pour récupérer les données de l'enquête depuis l'URL spécifiée
  const { data, isLoading, error } = useFetch(`http://localhost:8000/survey`);
  // Extrait les données de l'enquête, si elles existent
  const surveyData = data?.surveyData;
  // Vérifie s'il y a une erreur lors de la récupération des données
  if (error) {
    // Renvoie un message d'erreur si une erreur est détectée
    return <span>Oups il y a eu un problème</span>;
  }
  // Rendu du composant Survey avec les éléments stylisés
  return (
    <SurveyContainer>
      {/* Affiche le titre de la question avec le thème actuel */}
      <QuestionTitle theme={theme}>Question {questionNumber}</QuestionTitle>
      {/* Affiche un indicateur de chargement ou le contenu de la question, en fonction de l'état de chargement */}
      {isLoading ? (
        <Loader />
      ) : (
        <QuestionContent theme={theme}>{surveyData[questionNumber]}</QuestionContent>
      )}
      {/* Boîtes de réponse avec des boutons pour "Oui" et "Non", chacun associé à la fonction saveReply */}
      <ReplyWrapper>
        <ReplyBox
          onClick={() => saveReply(true)}
          isSelected={answers[questionNumber] === true}
          theme={theme}
        >
          Oui
        </ReplyBox>
        <ReplyBox
          onClick={() => saveReply(false)}
          isSelected={answers[questionNumber] === false}
          theme={theme}
        >
          Non
        </ReplyBox>
      </ReplyWrapper>

      {/* Liens de navigation vers les questions précédentes, suivantes ou les résultats, en fonction des données disponibles */}
      <LinkWrapper theme={theme}>
        <Link to={`/survey/${prevQuestionNumber}`}>Précédent</Link>
        {surveyData && surveyData[questionNumberInt + 1] ? (
          <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
        ) : (
          <Link to="/results">Résultats</Link>
        )}
      </LinkWrapper>
    </SurveyContainer>
  );
}

// Exporte le composant Survey comme composant par défaut
export default Survey;
