import React, { useRef, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
// import { Polyline } from 'https://cdn.esm.sh/react-leaflet/Polyline'
// import { Polyline } from 'react-leaflet/Polyline'
import './App.css';
import 'leaflet/dist/leaflet.css';

const defaultCenter = [12.910992237810687, 77.63791637508609];
const defaultZoom = 13;

function App() {
    const mapRef = useRef();
    const [location, setLocation] = useState([12.9716, 77.5946]);
    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(defaultCenter);

    const [error, setError] = useState(null);
    const limeOptions = { color: 'red' }
    const [points, setPoints] = useState([]);
    const [exceed, setExceed] = useState(false);
    const polyline1 = [
        [12.9716, 77.5946],
        [12.3716, 76.9946],
        [11.8716, 76.4946],
        [11.2716, 75.8946]
    ];

    let polyline = [];

    useEffect(() => {
        // eslint-disable-next-line no-unsafe-negation
        if (!"geolocation" in navigator) {
            setError("Geolocation is not supported by your browser");
            return;
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
                // setPoints(points)

                // const newPoints = [...points, [data.latitude, data.longitude]];
                // setPoints(newPoints);

            }

            // console.log(data);

            // let temp = [];
            // temp.push([data.latitude, data.longitude])
            // console.log(temp);
            // console.log([...points, [data.latitude, data.longitude]]);
            // setPoints(...[...points, [data.latitude, data.longitude]])
            // console.log(...[...points, [data.latitude, data.longitude]]);


            // polyline.push([data.latitude, data.longitude])

            setLocation([data.latitude, data.longitude]);
            setStart(start + 1);
            // console.log(location);
            setEnd([data.latitude, data.longitude]);
        };

        source.onerror = () => {
            setError("Error occurred while getting live location");
        };

        return () => {
            source.close();
        };
    }, [points]);

    console.log(points);


    if (error) {
        return <div>{error}</div>;
    }



    return (
        <div className="App">
            <MapContainer ref={mapRef} center={location} zoom={defaultZoom}>

                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
                <Polyline pathOptions={limeOptions} positions={points} />


                {
                    (points.length) && (
                        <Polyline pathOptions={limeOptions}
                            debugger
                            positions={
                                points
                            }
                        />
                    )
                }


                <Marker position={location} draggable={true} keyboard={true}>
                    <Popup>
                        Corvid Systems.
                    </Popup>
                </Marker>
            </MapContainer>

        </div>
    );
}

export default App;
