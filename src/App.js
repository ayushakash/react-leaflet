import React, { useRef, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
// import { Polyline } from 'https://cdn.esm.sh/react-leaflet/Polyline'
// import { Polyline } from 'react-leaflet/Polyline'
import './App.css';
import 'leaflet/dist/leaflet.css';

const defaultCenter = [12.910992237810687, 77.63791637508609];
const defaultZoom = 14;

function App() {
    const mapRef = useRef();
    const [location, setLocation] = useState([12.907767357865847, 77.57297653444661]);
    const [location2, setLocation2] = useState([12.1716, 76.7946]);

    const [error, setError] = useState(null);
    const [points, setPoints] = useState([]);




    useEffect(() => {
        // eslint-disable-next-line no-unsafe-negation
        if (!"geolocation" in navigator) {
            setError("Geolocation is not supported by your browser");
            return;
        }

        if (mapRef.current) {
            mapRef.current.leafletElement.fitBounds([location], {
                padding: [20, 20],
            });
        }

        const source = new EventSource("http://localhost:3001/stream");

        source.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (points.length >= 10) {
                console.log("points length exceeded")
                setPoints([]);
                source.close();
            } else {
                points.push(...[[data.latitude, data.longitude]]);

            }
            setLocation([data.latitude, data.longitude]);
            setLocation2([data.latitude1, data.longitude1]);
        };

        source.onerror = () => {
            setError("Error occurred while getting live location");
        };

        return () => {
            source.close();
        };
    }, [points]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="App">
            <MapContainer ref={mapRef} center={location} zoom={defaultZoom}>

                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />

                <Marker position={location} draggable={true} keyboard={true}>
                    <Popup keepInView={true}>
                        jp Nagar -btm
                    </Popup>
                </Marker>

                <Marker position={location2} draggable={true} keyboard={true}>
                    <Popup keepInView={true}>
                        Bangalore - Mangalore
                    </Popup>
                </Marker>
            </MapContainer>

        </div>
    );
}

export default App;
