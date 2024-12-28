import React from 'react';
import 'leaflet/dist/leaflet.css';
import './styles/App.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header'; // Assurez-vous que le chemin est correct
import Footer from './components/Footer'; // Assurez-vous que le chemin est correct
import HomePage from './pages/HomePage'; // Assurez-vous que le chemin est correct
import TargetsPage from './pages/TargetsPage';
import WelcomePage from './pages/WelcomePage';
import LatencyResults from './components/LatencyResults';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/TargetsPage" element={<TargetsPage />} />
        <Route path="/WelcomePage" element={<WelcomePage />} />
        <Route path="/LatencyResults" element={<LatencyResults />} />
        <Route path="*" element={<Navigate to="/" replace />} /> {/* Redirection pour les routes inconnues */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
