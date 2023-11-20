import { useContext } from 'react'
import { SurveyContext } from '../../utils/context'
import styled from 'styled-components'
import colors from '../../utils/styles/colors'
import { useFetch } from '../../utils/hooks'
import { StyledLink, Loader } from '../../utils/styles/Atoms'
import { ThemeContext } from '../../utils/context'

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 90px;
  padding: 30px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
`

const ResultsTitle = styled.h2`
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  font-weight: bold;
  font-size: 28px;
  max-width: 60%;
  text-align: center;
  & > span {
    padding-left: 10px;
  }
`

const DescriptionWrapper = styled.div`
  padding: 60px;
`

const JobTitle = styled.span`
  color: ${({ theme }) =>
    theme === 'light' ? colors.primary : colors.backgroundLight};
  text-transform: capitalize;
`

const JobDescription = styled.div`
  font-size: 18px;
  & > p {
    color: ${({ theme }) => (theme === 'light' ? colors.secondary : '#ffffff')};
    margin-block-start: 5px;
  }
  & > span {
    font-size: 20px;
  }
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

// Fonction utilitaire pour formater les paramètres de requête à partir des réponses
function formatFetchParams(answers) {
  // Récupère les numéros de question à partir des clés des réponses
  const answerNumbers = Object.keys(answers);

  // Utilise la méthode reduce pour construire une chaîne de paramètres de requête
  return answerNumbers.reduce((previousParams, answerNumber, index) => {
    // Vérifie si c'est le premier paramètre pour décider du séparateur
    const isFirstParam = index === 0;
    const separator = isFirstParam ? '' : '&';

    // Ajoute le paramètre actuel à la chaîne de paramètres
    return `${previousParams}${separator}a${answerNumber}=${answers[answerNumber]}`;
  }, '');
}

// Composant Results. Cette fonction Results effectue une requête à une API en utilisant les réponses collectées dans le contexte SurveyContext et affiche les résultats sous forme de composant React stylisé
function Results() {
  // Récupère le thème du contexte ThemeContext
  const { theme } = useContext(ThemeContext);

  // Récupère les réponses du contexte SurveyContext
  const { answers } = useContext(SurveyContext);

  // Formate les paramètres de requête à partir des réponses
  const fetchParams = formatFetchParams(answers);

  // Utilise le hook useFetch pour récupérer les données de l'API en fonction des paramètres de requête
  const { data, isLoading, error } = useFetch(
    `http://localhost:8000/results?${fetchParams}`
  );

  // Gère les erreurs éventuelles
  if (error) {
    return <span>Il y a un problème</span>;
  }

  // Extrait les données des résultats
  const resultsData = data?.resultsData;

  // Rendu conditionnel en fonction de l'état de chargement
  return isLoading ? (
    // Affiche un indicateur de chargement si les données sont en cours de chargement
    <LoaderWrapper>
      <Loader />
    </LoaderWrapper>
  ) : (
    // Affiche les résultats si le chargement est terminé
    <ResultsContainer theme={theme}>
      <ResultsTitle theme={theme}>
        Les compétences dont vous avez besoin :
        {resultsData &&
          resultsData.map((result, index) => (
            // Affiche les titres des résultats sous forme de composants JobTitle
            <JobTitle
              key={`result-title-${index}-${result.title}`}
              theme={theme}
            >
              {result.title}
              {index === resultsData.length - 1 ? '' : ','}
            </JobTitle>
          ))}
      </ResultsTitle>

      {/* Lien stylisé vers la page des freelances */}
      <StyledLink $isFullLink to="/freelances">
        Découvrez nos profils
      </StyledLink>

      {/* Section des descriptions de chaque résultat */}
      <DescriptionWrapper>
        {resultsData &&
          resultsData.map((result, index) => (
            // Affiche les descriptions de chaque résultat sous forme de composants JobDescription
            <JobDescription
              theme={theme}
              key={`result-detail-${index}-${result.title}`}
            >
              <JobTitle theme={theme}>{result.title}</JobTitle>
              <p>{result.description}</p>
            </JobDescription>
          ))}
      </DescriptionWrapper>
    </ResultsContainer>
  );
}


export default Results