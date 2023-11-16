import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Survey from './pages/Survey'
import Results from './pages/Results'
import Freelances from './pages/Freelances'
import Header from './components/Header'
import Error from './components/Error'
import { createGlobalStyle } from 'styled-components'

//crée un composant de style global à l'aide de la bibliothèque styled-components. Ce composant applique le style spécifié à tous les éléments div dans l'application.
const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Trebuchet MS', Helvetica, sans-serif;
  }

  body {
    margin: 0;
  }
  `


ReactDOM.render(
  <React.StrictMode>
    <Router>
    <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />{/* Route pour la page d'accueil */}
        <Route path="/survey/:questionNumber" element={<Survey />} />{/* Route pour la page du questionnaire avec un paramètre 'questionNumber' */}
        <Route path="/results" element={<Results />} />
        <Route path="/freelances" element={<Freelances />} />
        <Route path="*" element={<Error />} />{/* Route pour toute autre URL qui ne correspond à aucune des routes précédentes */}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)