import React, { useEffect, useState } from "react";
import { getRecommendations } from "../services/api";

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const data = await getRecommendations();
      setRecommendations(data);
    };
    fetchRecommendations();
  }, []);

  return (
    <div>
      <h2>Recommandations</h2>
      <ul>
        {recommendations.map((recommendation, index) => (
          <li key={index}>{recommendation}</li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendations;
