import axios from "axios";

// Définir l'URL de base pour l'API
const API_BASE_URL = "http://localhost:8082";

// Fonction pour mesurer la latence en envoyant une requête POST
export const measureLatency = async (ipAddress) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/latency/measure`, { ipAddress });
    return response.data; // Retourne les données reçues en réponse
  } catch (error) {
    console.error("Erreur lors de la mesure de latence:", error.message || error);
    throw error; // Relance l'erreur après l'avoir journalisée
  }
};

// Fonction pour récupérer les recommandations via une requête GET
export const getRecommendations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/recommendations`);
    return response.data; // Retourne les données reçues en réponse
  } catch (error) {
    console.error("Erreur lors de la récupération des recommandations:", error.message || error);
    throw error; // Relance l'erreur après l'avoir journalisée
  }
};
// Fonction pour créer une nouvelle cible via une requête POST
export const createTarget = async (target) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/targets`, target);
    return response.data; // Retourne les données de la cible créée
  } catch (error) {
    console.error("Erreur lors de la création de la cible:", error.message || error);
    throw error; // Relance l'erreur après l'avoir journalisée
  }
};

// Fonction pour supprimer une cible via une requête DELETE
export const deleteTarget = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/api/targets/${id}`);
  } catch (error) {
    console.error("Erreur lors de la suppression de la cible:", error.message || error);
    throw error; // Relance l'erreur après l'avoir journalisée
  }
};


// Fonction pour récupérer les cibles via une requête GET
export const getTargets = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/targets`);
    return response.data; // Retourne les données reçues en réponse
  } catch (error) {
    console.error("Erreur lors de la récupération des cibles:", error.message || error);
    throw error; // Relance l'erreur après l'avoir journalisée
  }
};
