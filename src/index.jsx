import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Survey from './pages/Survey'
import Results from './pages/Results'
import Freelances from './pages/Freelances'
import Header from './components/Header'
import Error from './components/Error'

ReactDOM.render(
  <React.StrictMode>
    <Router>
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