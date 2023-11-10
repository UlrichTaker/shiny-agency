import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Survey() {
  const { questionNumber } = useParams() // Extraction du paramètre 'questionNumber' de l'URL
  const questionNumberInt = parseInt(questionNumber) // Conversion du 'questionNumber' en un entier
  const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1   // Calcul du numéro de la question précédente en vérifiant si la question actuelle est la première.
  const nextQuestionNumber = questionNumberInt + 1  // Calcul du numéro de la question suivante
  return (
    <div>
      <h1>Questionnaire 🧮</h1>
      <h2>Question {questionNumber}</h2> {/* Affichage du numéro de la question actuelle */}
      {/* Lien vers la question précédente, avec une condition pour gérer la première question */}
      <Link to={`/survey/${prevQuestionNumber}`}>Précédent</Link>
      {questionNumberInt === 10 ? (  /* Condition pour vérifier si la question actuelle est la dernière */
        <Link to="/results">Résultats</Link>  // Lien vers la page des résultats si c'est la dernière question
      ) : (
        <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>   // Lien vers la question suivante si ce n'est pas la dernière question
      )}
    </div>
  )
}

export default Survey