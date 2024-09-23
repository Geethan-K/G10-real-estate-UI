import React, { useRef, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';


// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
// });
// const customIcon = new L.Icon({
//   iconUrl: '/highlights/close_to_bustand.png', // Path to the custom marker image in public folder
//   iconSize: [32, 32], // Size of the icon
//   iconAnchor: [16, 32], // Anchor point of the icon
//   popupAnchor: [0, -32], // Position of the popup relative to the icon
// //  shadowUrl: '/custom-marker-shadow.png', // Optional: custom shadow image
//   shadowSize: [50, 64],
//   shadowAnchor: [16, 64]
// });
// Component to automatically fit the bounds of the markers

// Define bus icon
const busIcon = new L.Icon({
  iconUrl: '/highlights/close_to_bustand.png', // Path to the bus marker image
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Anchor point of the icon
  popupAnchor: [0, -32]
});

// Define train icon
const trainIcon = new L.Icon({
  iconUrl: '/highlights/close_to_railway_station.png', // Path to the train marker image
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Anchor point of the icon
  popupAnchor: [0, -32]
});

const flightIcon = new L.Icon({
  iconUrl: '/highlights/close_to_airport.png', // Path to the train marker image
  iconSize: [62, 62], // Size of the icon
  iconAnchor: [16, 32], // Anchor point of the icon
  popupAnchor: [0, -32]
});

const TransportMap = ({ busStation, trainStation, airport,latitude,longitude }) => {
  // console.log(busStations)
  // console.log(trainStations)
  // console.log(airport)

  const [busStations,setBusStations] = useState(busStation)
  const [trainStations,setTrainStations] = useState(trainStation)
  const [airports,setAirports]=useState(airport)
  const [center,setCenter]=useState([latitude,longitude])
  return (
    <MapContainer center={center} zoom={13} style={{ height: "45vh", width: "100%" }}  >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* {places.map((place) => (
          <Marker key={place.id} position={[place.lat, place.lon]}  icon={customIcon}>
            <Popup>
              {place.name} <br /> (Lat: {place.lat}, Lon: {place.lon})
            </Popup>
          </Marker>
        ))} */}
      {/* Add bus markers */}
      {busStations.map((bus) => (
        <Marker key={bus.lat} position={[bus.lat, bus.lon]} icon={busIcon}>
          <Popup>{bus.name}</Popup>
        </Marker>
      ))}

      {/* Add train markers */}

      {/* {trainStations.length > 0 && trainStations.map((train) => (
        <Marker key={train.lat} position={[train.lat, train.lon]} icon={trainIcon}>
          <Popup>{train.name}</Popup>
        </Marker>
      ))} */}

      {airports.length > 0 && airports.map((airport) => (
        <Marker key={airport.lat} position={[airport.lat, airport.lon]} icon={flightIcon}>
          <Popup>{airport.name}</Popup>
        </Marker>
      ))}
      {/* <FitBounds places={places} /> */}
    </MapContainer>
  );
};

export default TransportMap