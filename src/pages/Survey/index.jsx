// Ce composant Survey est responsable du rendu et de la gestion de l'enquête

import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/styles/colors'
import { Loader } from '../../utils/styles/Atoms'
import { SurveyContext } from '../../utils/context'

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
`

const QuestionContent = styled.span`
  margin: 30px;
`

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: black;
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
  background-color: ${colors.backgroundLight};
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

// Importe le hook useParams depuis React Router pour extraire les paramètres de l'URL
function Survey() {
  // Extraction du paramètre 'questionNumber' de l'URL
  const { questionNumber } = useParams();

  // Conversion du 'questionNumber' en un entier
  const questionNumberInt = parseInt(questionNumber);

  // Calcul du numéro de la question précédente en vérifiant si la question actuelle est la première
  const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1;

  // Calcul du numéro de la question suivante
  const nextQuestionNumber = questionNumberInt + 1;

  // Utilisation du hook useState pour gérer l'état local du composant
  const [surveyData, setSurveyData] = useState({});
  const [isDataLoading, setDataLoading] = useState(false);
  const { saveAnswers, answers } = useContext(SurveyContext);
  const [error, setError] = useState(false);

  // Fonction pour enregistrer une réponse
  function saveReply(answer) {
    saveAnswers({ [questionNumber]: answer });
  }

  // Utilisation du hook useEffect pour effectuer des effets de côté dans le composant
  useEffect(() => {
    async function fetchSurvey() {
      // Indique que la récupération des données est en cours
      setDataLoading(true);

      try {
        // Effectue une requête à l'API pour obtenir les données du questionnaire
        const response = await fetch(`http://localhost:8000/survey`);
        const { surveyData } = await response.json();
        
        // Met à jour l'état local avec les données du questionnaire
        setSurveyData(surveyData);
      } catch (err) {
        console.log(err);
        // En cas d'erreur, déclenche le flag d'erreur
        setError(true);
      } finally {
        // Indique que la récupération des données est terminée
        setDataLoading(false);
      }
    }

    // Appelle la fonction fetchSurvey au montage du composant (une seule fois avec une dépendance vide [])
    fetchSurvey();
  }, []);

  // Si une erreur s'est produite pendant la récupération des données, affiche un message d'erreur
  if (error) {
    return <span>Oups il y a eu un problème</span>;
  }

  // Le rendu du composant Survey inclut le titre de la question, le contenu de la question (ou un indicateur de chargement),
  // et des liens de navigation vers les questions précédentes et suivantes ou vers les résultats si la dernière question est atteinte.
  return (
    <SurveyContainer>
      <QuestionTitle>Question {questionNumber}</QuestionTitle>
      {isDataLoading ? (
        // Affiche un indicateur de chargement pendant la récupération des données
        <Loader />
      ) : (
        // Affiche le contenu de la question une fois les données récupérées
        <QuestionContent>{surveyData[questionNumber]}</QuestionContent>
      )}
      {answers && (
        // Si des réponses existent, affiche les options de réponse
        <ReplyWrapper>
          <ReplyBox
            onClick={() => saveReply(true)}
            isSelected={answers[questionNumber] === true}
          >
            Oui
          </ReplyBox>
          <ReplyBox
            onClick={() => saveReply(false)}
            isSelected={answers[questionNumber] === false}
          >
            Non
          </ReplyBox>
        </ReplyWrapper>
      )}
      <LinkWrapper>
        {/* Lien vers la question précédente */}
        <Link to={`/survey/${prevQuestionNumber}`}>Précédent</Link>

        {/* Condition pour afficher le lien suivant ou le lien vers les résultats */}
        {surveyData[questionNumberInt + 1] ? (
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
