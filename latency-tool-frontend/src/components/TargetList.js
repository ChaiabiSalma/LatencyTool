import React, { useEffect, useState } from "react";
import { getTargets, createTarget, deleteTarget } from "../services/api";

function TargetList() {
  const [targets, setTargets] = useState([]);
  const [newHostname, setNewHostname] = useState("");
  const [newIpAddress, setNewIpAddress] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTargets = async () => {
      try {
        const data = await getTargets();
        setTargets(data);
      } catch (err) {
        setError("Erreur lors de la récupération des cibles.");
      }
    };
    fetchTargets();
  }, []);

  const handleCreateTarget = async () => {
    if (!newHostname || !newIpAddress) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const newTarget = await createTarget({
        hostname: newHostname,
        ipAddress: newIpAddress,
      });
      setTargets([...targets, newTarget]);
      setNewHostname("");
      setNewIpAddress("");
      setError("");
    } catch (err) {
      setError("Erreur lors de la création de la cible.");
    }
  };

  const handleDeleteTarget = async (id) => {
    try {
      await deleteTarget(id);
      setTargets(targets.filter((target) => target.id !== id));
    } catch (err) {
      setError("Erreur lors de la suppression de la cible.");
    }
  };

  return (
    <div>
      <h2>Liste des Cibles</h2>

      {/* Formulaire d'ajout dans le même format que la liste */}
      <div className="target-list">
        <h3>Ajouter une Cible</h3>
        <div className="add-target-form">
          <input
            type="text"
            placeholder="Nom d'hôte"
            value={newHostname}
            onChange={(e) => setNewHostname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Adresse IP"
            value={newIpAddress}
            onChange={(e) => setNewIpAddress(e.target.value)}
          />
          <button onClick={handleCreateTarget}>Ajouter</button>
        </div>
      </div>

      {/* Gestion des erreurs */}
      {error && <p className="error-message">{error}</p>}

      {/* Liste des cibles */}
      <div className="target-list">
        <ul>
          {targets.map((target) => (
            <li key={target.id}>
              <span>{target.hostname}</span> - {target.ipAddress}
              <button onClick={() => handleDeleteTarget(target.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TargetList;
