// TargetsPage.js
import React from "react";
import TargetList from "../components/TargetList";
import '../App.css';  // Assurez-vous d'importer le fichier CSS

function TargetsPage() {
  return (
    <div>
      <h1 className="centered-title">Gestion des Cibles</h1> {/* Appliquez la classe */}
      <TargetList />
    </div>
  );
}

export default TargetsPage;


