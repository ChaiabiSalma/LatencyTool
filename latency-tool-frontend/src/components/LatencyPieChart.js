// src/components/LatencyPieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Enregistrer les composants nécessaires dans Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const LatencyPieChart = ({ data }) => {
    // Catégoriser les latences
    const categories = {
        faible: data.filter(d => d.latency < 500).length,
        moderee: data.filter(d => d.latency >= 500 && d.latency < 1000).length,
        elevee: data.filter(d => d.latency >= 1000).length,
    };

    // Données du graphique
    const chartData = {
        labels: ['Faible (<500ms)', 'Modérée (500-1000ms)', 'Élevée (>1000ms)'],
        datasets: [
            {
                data: [categories.faible, categories.moderee, categories.elevee],
                backgroundColor: ['green', 'orange', 'red'],
                hoverBackgroundColor: ['darkgreen', 'darkorange', 'darkred'],
            },
        ],
    };

    return <Pie data={chartData} />;
};

export default LatencyPieChart;
