// Ce code définit deux contextes (ThemeContext et SurveyContext) ainsi que des fournisseurs associés (ThemeProvider et SurveyProvider)

import { createContext, useState } from "react";

// Importe la fonction createContext depuis React pour créer des contextes
export const ThemeContext = createContext();

// Définit un fournisseur de thème qui utilisera le contexte ThemeContext
export const ThemeProvider = ({ children }) => {
  // Utilise le state pour stocker le thème actuel, initialisé à 'light'
  const [theme, setTheme] = useState('light');

  // Définit une fonction pour basculer entre les thèmes
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  // Rend le fournisseur de contexte avec les valeurs du thème et la fonction de bascule
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Crée un autre contexte pour les réponses à l'enquête
export const SurveyContext = createContext();

// Définit un fournisseur pour le contexte d'enquête
export const SurveyProvider = ({ children }) => {
  // Utilise le state pour stocker les réponses à l'enquête, initialisées à un objet vide
  const [answers, setAnswers] = useState({});

  // Définit une fonction pour enregistrer de nouvelles réponses
  const saveAnswers = (newAnswers) => {
    setAnswers({ ...answers, ...newAnswers });
  }

  // Rend le fournisseur de contexte avec les valeurs des réponses et la fonction d'enregistrement
  return (
    <SurveyContext.Provider value={{ answers, saveAnswers }}>
      {children}
    </SurveyContext.Provider>
  );
}