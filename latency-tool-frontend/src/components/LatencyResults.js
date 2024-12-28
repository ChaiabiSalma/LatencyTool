import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { Line, Bar } from 'react-chartjs-2';
import LatencyPieChart from './LatencyPieChart';
import LatencyMap from './LatencyMap';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function LatencyResults() {
    const [ipAddress, setIpAddress] = useState('');
    const [latency, setLatency] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState('');
    const [latencyHistory, setLatencyHistory] = useState([]);
    const [mapData, setMapData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log('mapData updated:', mapData);
    }, [mapData]);

    const validateIP = (ip) => {
        const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return regex.test(ip);
    };

    const measureLatency = async () => {
        if (!validateIP(ipAddress)) {
            setError('Veuillez entrer une adresse IP valide.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:8082/latency/measure', null, {
                params: { ipAddress }
            });

            console.log('Response:', response.data);

            if (response.data && response.data.latency !== undefined) {
                const newLatency = response.data.latency;
                setLatency(newLatency);
                setRecommendations(response.data.recommendations || []);
                setLatencyHistory((prevHistory) => [...prevHistory, newLatency]);

                if (response.data.latitude !== undefined && response.data.longitude !== undefined) {
                    setMapData((prevData) => [
                        ...prevData,
                        {
                            ip: ipAddress,
                            latency: newLatency,
                            latitude: response.data.latitude,
                            longitude: response.data.longitude
                        },
                    ]);
                } else {
                    console.log('No latitude or longitude available in the response');
                }
            } else {
                setError('La réponse ne contient pas les données attendues.');
            }
        } catch (err) {
            setError('Erreur lors de la mesure de la latence.');
            console.error('Erreur de mesure de latence:', err);
        } finally {
            setLoading(false);
        }
    };

    const chartData = {
        labels: latencyHistory.map((_, index) => `Mesure ${index + 1}`),
        datasets: [
            {
                label: 'Latence (ms)',
                data: latencyHistory,
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
            },
        ],
    };

    const barChartData = {
        labels: latencyHistory.map((_, index) => `Mesure ${index + 1}`),
        datasets: [
            {
                label: 'Latence (ms)',
                data: latencyHistory,
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Latence (ms)',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Mesures',
                },
            },
        },
    };

    const latencyData = latencyHistory.map(latency => ({ latency }));

    return (
        <div className="latency-results">
            <h2>Mesurer la latence</h2>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Entrez une adresse IP"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                />
                <button onClick={measureLatency} disabled={loading}>
                    {loading ? 'Mesure en cours...' : 'Mesurer la latence'}
                </button>
            </div>

            {latency !== null && (
                <div className="latency-info">
                    <h3>Latence mesurée : {latency} ms</h3>
                    <h4>Recommandations :</h4>
                    <ul>
                        {recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                        ))}
                    </ul>
                </div>
            )}

            {error && <p className="error">{error}</p>}

            {latencyHistory.length > 0 && (
                <div className="latency-visuals">
                    <h3>Graphique de Latence</h3>
                    <div className="chart-container">
                        <Line data={chartData} options={chartOptions} />
                    </div>
                    <div className="latency-bar-chart">
                        <h4>Graphique de Latence</h4>
                        <div className="chart-container">
                            <Bar data={barChartData} options={chartOptions} />
                        </div>
                    </div>
                    <div className="latency-pie-chart">
                        <h4>Pie Chart de Latence</h4>
                        <LatencyPieChart data={latencyData} />
                    </div>
                </div>
            )}

            {mapData.length > 0 && (
                <div className="latency-map">
                    <h4>Carte de Latence</h4>
                    <LatencyMap data={mapData} />
                </div>
            )}

            {mapData.length === 0 && (
                <p></p>
            )}
        </div>
    );
}

export default LatencyResults;
