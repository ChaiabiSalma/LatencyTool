// src/components/LatencyChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Enregistrer les composants nécessaires dans Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LatencyChart = ({ data }) => {
    // Vérification si les données sont valides
    if (!data || data.length === 0) {
        return <p>Aucune donnée disponible pour afficher le graphique.</p>;
    }

    // Formatage des données pour le graphique
    const chartData = {
        labels: data.map(d => new Date(d.timestamp).toLocaleString()), // Format des horodatages
        datasets: [
            {
                label: 'Latence (ms)', // Titre des barres
                data: data.map(d => d.latency), // Valeurs de latence sur l'axe Y
                backgroundColor: 'rgba(75,192,192,0.6)', // Couleur des barres
                borderColor: 'rgba(75,192,192,1)', // Couleur des contours des barres
                borderWidth: 1, // Épaisseur des contours
            },
        ],
    };

    // Configuration des options du graphique
    const chartOptions = {
        responsive: true, // Rendre le graphique réactif
        maintainAspectRatio: false, // Permet d'ajuster la taille dans un cadre donné
        plugins: {
            title: {
                display: true,
                text: 'Graphique de Latence', // Titre du graphique
            },
            legend: {
                position: 'top', // Position de la légende
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.raw} ms`; // Afficher la latence en ms dans les infobulles
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Horodatage', // Titre de l'axe X
                },
                ticks: {
                    autoSkip: true, // Saute les labels si trop nombreux
                    maxRotation: 45, // Rotation des labels pour éviter le chevauchement
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Latence (ms)', // Titre de l'axe Y
                },
                beginAtZero: true, // L'axe Y commence à zéro
            },
        },
    };

    return (
        <div style={{ width: '100%', height: '400px' }}> {/* Cadre pour le graphique */}
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default LatencyChart;
