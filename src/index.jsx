import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Survey from './pages/Survey'
import Results from './pages/Results'
import Freelances from './pages/Freelances'
import Header from './components/Header'
import Error from './components/Error'
import { ThemeProvider, SurveyProvider } from './utils/context'
import GlobalStyle from './utils/styles/GlobalStyle'
import Footer from './components/Footer'

//crée un composant de style global à l'aide de la bibliothèque styled-components. Ce composant applique le style spécifié à tous les éléments div dans l'application.


ReactDOM.render(
  <React.StrictMode>
    <Router>{/* Utilise le Router pour la gestion des routes */}
      <ThemeProvider>{/*Englobe l'application dans le composant ThemeProvider qui gère le thème de l'application à l'aide du contexte ThemeContext. */}
        <SurveyProvider>{/* Englobe l'application dans le composant SurveyProvider qui gère les données liées à l'enquête à l'aide du contexte SurveyContext*/}
          <GlobalStyle />{/* Utilise le GlobalStyle pour les styles globaux */}
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />{/* Route pour la page d'accueil */}
            <Route path="/survey/:questionNumber" element={<Survey />} />{/* Route pour la page du questionnaire avec un paramètre 'questionNumber' */}
            <Route path="/results" element={<Results />} />
            <Route path="/freelances" element={<Freelances />} />
            <Route path="*" element={<Error />} />{/* Route pour toute autre URL qui ne correspond à aucune des routes précédentes */}
          </Routes>
          <Footer />
        </SurveyProvider>  
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)