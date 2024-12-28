// HomePage.js
import React from "react";
import '../App.css';  // Assurez-vous que le fichier CSS est bien importé

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="typing-container">
        <h1>Bienvenue sur l'outil de mesure de latence</h1>
        <p>Vous pouvez maintenant calculer la latence et gérer les cibles.</p>
      </div>
    </div>
  );
}

export default HomePage;
