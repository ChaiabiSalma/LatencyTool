import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const LatencyMap = ({ data }) => {
    if (data.length === 0) {
        return <div>No map data available</div>;
    }

    const center = data.length > 0
        ? [data[0].latitude, data[0].longitude]
        : [0, 0];

    return (
        <div style={{ height: '400px', width: '100%' }}>
            <MapContainer center={center} zoom={2} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {data.map((point, index) => (
                    point.latitude && point.longitude && (
                        <Marker key={index} position={[point.latitude, point.longitude]}>
                            <Popup>
                                <div>
                                    <p>IP : {point.ip}</p>
                                    <p>Latence : {point.latency} ms</p>
                                </div>
                            </Popup>
                        </Marker>
                    )
                ))}
            </MapContainer>
        </div>
    );
};

export default LatencyMap;
