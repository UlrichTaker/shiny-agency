import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/styles/colors'
import { Loader } from '../../utils/styles/Atoms'

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

// Dans la fonction Survey, les hooks d'état (useState) sont utilisés pour gérer l'état local du composant. useParams est utilisé pour extraire le paramètre questionNumber de l'URL. Les variables prevQuestionNumber et nextQuestionNumber sont calculées pour la navigation entre les questions.
function Survey() {
  const { questionNumber } = useParams() // Extraction du paramètre 'questionNumber' de l'URL
  const questionNumberInt = parseInt(questionNumber) // Conversion du 'questionNumber' en un entier
  const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1   // Calcul du numéro de la question précédente en vérifiant si la question actuelle est la première.
  const nextQuestionNumber = questionNumberInt + 1  // Calcul du numéro de la question suivante
  const [surveyData, setSurveyData] = useState({})
  const [isDataLoading, setDataLoading] = useState(false)
  const [error, setError] = useState(false)

  // Cette syntaxe permet aussi bien de faire des calls API.
  // Mais pour utiliser await dans une fonction, il faut que celle-ci soit async (pour asynchrone).
  // Comme la fonction passée à useEffect ne peut pas être asynchrone,
  // il faut utiliser une fonction qui est appelée dans useEffect et déclarée en dehors, comme ici 👇.
  // Essayez de commenter le code créé dans le chapitre et de décommenter fetchData pour voir.

  // async function fetchData() {
  //   try {
  //     const response = await fetch(`http://localhost:8000/survey`)
  //     const { surveyData } = await response.json()
  //     setSurveyData(surveyData)
  //   } catch (error) {
  // console.log('===== error =====', error)
  // setError(true)
  //   }
  // }


  // Le hook useEffect est utilisé pour effectuer des effets de côté dans le composant. Ici, il fait une requête à http://localhost:8000/survey pour obtenir les données du questionnaire. Ces données sont stockées dans l'état local (surveyData).
  useEffect(() => {
    async function fetchSurvey() {
      setDataLoading(true)
      try {
        const response = await fetch(`http://localhost:8000/survey`)
        const { surveyData } = await response.json()
        setSurveyData(surveyData)
      } catch (err) {
        console.log(err)
        setError(true)
      } finally {
        setDataLoading(false)
      }
    }
    fetchSurvey()
  }, [])
// Si une erreur se produit pendant la récupération des données, un message d'erreur est rendu.
  if (error) {
    return <span>Oups il y a eu un problème</span>
  }

  // le rendu du composant Survey inclut le titre de la question, le contenu de la question (ou un indicateur de chargement), et des liens de navigation vers les questions précédentes et suivantes ou vers les résultats si la dernière question est atteinte.
  return (
    <SurveyContainer>
      <QuestionTitle>Question {questionNumber}</QuestionTitle>
      {isDataLoading ? (
        <Loader />
      ) : (
        <QuestionContent>{surveyData[questionNumber]}</QuestionContent>
      )}
      <LinkWrapper>
        <Link to={`/survey/${prevQuestionNumber}`}>Précédent</Link>
        {surveyData[questionNumberInt + 1] ? (
          <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
        ) : (
          <Link to="/results">Résultats</Link>
        )}
      </LinkWrapper>
    </SurveyContainer>
  )
}

export default Survey