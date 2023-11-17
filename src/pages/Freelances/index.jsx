import { useEffect, useState } from 'react'
import Card from '../../components/Card'
import styled from 'styled-components'
import colors from '../../utils/styles/colors'
import { Loader } from '../../utils/styles/Atoms'

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
  color: black;
  text-align: center;
  padding-bottom: 30px;
`

const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

function Freelances() {
  // État local pour gérer le chargement des données, les erreurs et la liste des freelances
  const [isDataLoading, setDataLoading] = useState(false)
  const [error, setError] = useState(false)
  const [freelancersList, setFreelancesList] = useState([])

  // Utilisation de useEffect pour effectuer des opérations après le rendu initial du composant
  useEffect(() => {
    async function fetchFreelances() {
      setDataLoading(true) // Marque le début du chargement des données

      try {
        const response = await fetch(`http://localhost:8000/freelances`) // Effectue une requête GET à l'API pour récupérer la liste de freelances
        const { freelancersList } = await response.json() // Extrait la liste de freelances depuis la réponse JSON
        setFreelancesList(freelancersList) // Met à jour l'état local avec la liste de freelances
      } catch (err) {
        console.log('===== error =====', err)
        setError(true) // En cas d'erreur, marque l'erreur comme vraie
      } finally {
        setDataLoading(false) // Marque la fin du chargement des données, qu'il ait réussi ou échoué
      }
    }

  // Appelle la fonction pour récupérer la liste de freelances lors du rendu initial du composant
    fetchFreelances()
  }, []) // Le tableau vide [] indique que ce useEffect s'exécute une seule fois après le rendu initial

  // Si une erreur s'est produite lors du chargement des données, affiche un message d'erreur
  if (error) {
    return <span>Oups il y a eu un problème</span>
  }

  // Rendu du composant
  return (
    <div>
      <PageTitle>Trouvez votre prestataire</PageTitle>
      <PageSubtitle>
        Chez Shiny nous réunissons les meilleurs profils pour vous.
      </PageSubtitle>
      {/* Si les données sont en cours de chargement, affiche un composant Loader, sinon affiche la liste de profils de freelances */}
      {isDataLoading ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <CardsContainer>
          {/* Map sur la liste des freelances et rendu de chaque profil en utilisant le composant Card */}
          {freelancersList.map((profile, index) => (
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
  )
}


export default Freelances

//  ce composant effectue une requête vers une API (supposée hébergée localement à http://localhost:8000/freelances), récupère la liste des freelances, gère le chargement et les erreurs, puis affiche les profils de freelances ou un message d'erreur en conséquence. Il utilise également des composants stylisés comme PageTitle, PageSubtitle, LoaderWrapper, et CardsContainer, ainsi que le composant Card pour représenter chaque profil de freelance.