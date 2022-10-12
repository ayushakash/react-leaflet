import React, { useRef } from 'react';
import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';

const defaultCenter = [12.910992237810687, 77.63791637508609];
const defaultZoom = 18;

function App() {
  const mapRef = useRef();


  return (
    <div className="App">
      <MapContainer ref={mapRef} center={defaultCenter} zoom={defaultZoom}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
        <Marker position={defaultCenter}>
        <Popup>
        Corvid Systems.
      </Popup>
        </Marker>
      </MapContainer>
      
    </div>
  );
}

export default App;
