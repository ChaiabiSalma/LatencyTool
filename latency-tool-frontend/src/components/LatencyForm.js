import React, { useState } from "react";
import { measureLatency } from "../services/api"; // Utilisation de l'API pour mesurer la latence

function LatencyForm() {
  const [ipAddress, setIpAddress] = useState(""); // Adresse IP de l'utilisateur
  const [latencyResult, setLatencyResult] = useState(null); // Stocke le résultat de la latence

  const validateIP = (ip) => {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    return ipRegex.test(ip);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche la page de se recharger
    if (!validateIP(ipAddress)) {
      alert("Adresse IP invalide. Veuillez réessayer.");
      return;
    }

    try {
      const result = await measureLatency(ipAddress); // Appel à l'API pour mesurer la latence
      setLatencyResult(result); // Mettre à jour l'état avec le résultat
    } catch (error) {
      console.error("Erreur lors de la mesure de latence :", error);
    }
  };

  return (
    <div>
      <h2>Mesurer la Latence</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)} // Mettre à jour l'adresse IP entrée
          placeholder="Entrez une adresse IP"
          required
        />
        <button type="submit">Mesurer</button>
      </form>
      {latencyResult && (
        <div>
          <h3>Résultat</h3>
          <p>Latence : {latencyResult.latency} ms</p>
          <p>Timestamp : {latencyResult.timestamp}</p>
        </div>
      )}
    </div>
  );
}

export default LatencyForm;
