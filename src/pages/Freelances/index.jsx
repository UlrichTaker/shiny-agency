import Card from '../../components/Card'
import styled from 'styled-components'
import colors from '../../utils/styles/colors'
import { Loader } from '../../utils/styles/Atoms'
import { useTheme, useFetch } from '../../utils/hooks'

const CardsContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-rows: 350px 350px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
`

const PageTitle = styled.h1`
  font-size: 30px;
  text-align: center;
  padding-bottom: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

// Composant Freelances. La fonction Freelances récupère une liste de freelances depuis une API, utilise le thème actuel, et rend une liste de cartes (Card) pour afficher les profils des freelances
function Freelances() {
  // Utilise le hook useTheme pour obtenir le thème actuel
  const { theme } = useTheme();

  // Utilise le hook useFetch pour récupérer les données des freelances depuis l'API
  const { data, isLoading, error } = useFetch(
    `http://localhost:8000/freelances`
  );

  // Utilise l'opérateur "?." pour s'assurer que data existe avant d'accéder à sa propriété freelancersList
  const freelancersList = data?.freelancersList;

  // Gère les erreurs éventuelles lors de la récupération des données
  if (error) {
    return <span>Oups il y a eu un problème</span>;
  }

  // Rendu conditionnel en fonction de l'état de chargement
  return (
    <div>
      {/* Titre de la page avec le thème actuel */}
      <PageTitle theme={theme}>Trouvez votre prestataire</PageTitle>

      {/* Sous-titre de la page avec le thème actuel */}
      <PageSubtitle theme={theme}>
        Chez Shiny nous réunissons les meilleurs profils pour vous.
      </PageSubtitle>

      {/* Rendu conditionnel en fonction de l'état de chargement */}
      {isLoading ? (
        // Affiche un indicateur de chargement si les données sont en cours de chargement
        <LoaderWrapper>
          <Loader theme={theme} />
        </LoaderWrapper>
      ) : (
        // Affiche la liste des cartes (profils de freelances) une fois le chargement terminé
        <CardsContainer>
          {freelancersList.map((profile, index) => (
            // Chaque carte (Card) représente un profil de freelance
            <Card
              key={`${profile.name}-${index}`}
              label={profile.job}
              title={profile.name}
              picture={profile.picture}
            />
          ))}
        </CardsContainer>
      )}
    </div>
  );
}

export default Freelances