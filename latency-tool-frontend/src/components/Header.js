import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';  // Importer le fichier CSS global

function Header() {
  return (
    <header>
      <div className="logo-container">
        <img src="/img.png" alt="Logo" />
        <h1>Latency Tool</h1>
      </div>
      <nav>
        <ul>
          <li><Link to="/HomePage">Accueil</Link></li>
          <li><Link to="/TargetsPage">Cibles</Link></li>
          <li><Link to="/LatencyResults">Mesurer la latence</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
