import React, { useRef, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';

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
  
  // useEffect(() => {
  //   const fetchNearbyTransport = async () => {
  //     const overpassQuery = `
  //           [out:json];
  //           (
  //             node["public_transport"~"station|stop|platform"](around:2000, ${latitude}, ${longitude});
  //             node["railway"~"station|subway"](around:2000, ${latitude}, ${longitude});
  //             node["highway"="bus_stop"](around:1000, ${latitude}, ${longitude});
  //             node["aeroway"="aerodrome"](around:5000, ${latitude}, ${longitude});
  //             node["aeroway"="terminal"](around:5000, ${latitude}, ${longitude});
  //           );
  //           out body;
  //         `;

  //     const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;

  //     try {
  //       const response = await fetch(overpassUrl);
  //       const data = await response.json();
        
  //       data.elements.map((element) => {
  //         const tags = element.tags || {};
  //         // Check for bus stops
  //         if (tags.highway === "bus_stop" || (tags.public_transport === "platform" && tags.bus === "yes")) {
  //           busStop.push({
  //             id: element.id,
  //             name: tags.name || "Unnamed Bus Stop",
  //             lat: element.lat,
  //             lon: element.lon,
  //             type: "Bus Stop"
  //           });
  //         }

  //         // Check for railway stations
  //         if (tags.railway === "station") {
  //           railwayStation.push({
  //             id: element.id,
  //             name: tags.name || "Unnamed Railway Station",
  //             lat: element.lat,
  //             lon: element.lon,
  //             type: "Railway Station"
  //           });
  //         }

  //         if (tags.aeroway == "aerodome" || tags.aeroway == "terminal") {
  //           airport.push({
  //             id: element.id,
  //             name: tags.name || "Unnamed Airport",
  //             lat: element.lat,
  //             lon: element.lon,
  //             type: "Airport"
  //           })
  //         }

  //         // Check for metro stations
  //         if (tags.subway === "yes" || tags.station === "subway") {
  //           metroStation.push({
  //             id: element.id,
  //             name: tags.name || "Unnamed Metro Station",
  //             lat: element.lat,
  //             lon: element.lon,
  //             type: "Metro Station"
  //           });
  //         }
  //       })
  //       setBusStops(busStop)
  //       SetRailwayStations(railwayStation)
  //       setMetroStations(metroStation)
  //       setAirports(airport)

  //       return { busStop, railwayStation, metroStation };
  //     } catch (error) {
  //       console.error("Error fetching data from Overpass API", error);
  //     }
  //   };

  //   fetchNearbyTransport();
  // }, [latitude, longitude]);

  // const [wikimediaImages, setWikimediaImages] = useState([]);
  // const [openStreetCamImages, setOpenStreetCamImages] = useState([]);
  // const [wikidataInfo, setWikidataInfo] = useState([]);

  const [imagesData, setImagesData] = useState({});

  // const fetchWikimediaImages = async (placeName) => {
  //   const response = await axios.get(
  //     `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${placeName}&format=json`
  //   );
  //   alert(response.data.query.search)
  //   return response.data.query.search;
  // };

  // const fetchWikidataInfo = async (placeName) => {
  //   const sparqlQuery = `
  //     SELECT ?place ?placeLabel ?image WHERE {
  //       ?place rdfs:label "${placeName}"@en.
  //       OPTIONAL { ?place wdt:P18 ?image. }
  //       SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  //     }
  //   `;
  //   const response = await axios.get(
  //     `https://query.wikidata.org/sparql?query=${encodeURIComponent(sparqlQuery)}&format=json`
  //   );
  //   return response.data.results.bindings;
  // };
  
  
    // const fetchData = async (placeName) => {
    //   // Fetch images from Wikimedia Commons
    //   const wikiImages = await fetchWikimediaImages(placeName);
    //   setWikimediaImages(wikiImages);

    //   // Fetch street-level imagery from OpenStreetCam
    //   // const openStreetImages = await fetchOpenStreetCamImages(lat, lon);
    //   // setOpenStreetCamImages(openStreetImages);

    //   // Fetch additional info and images from Wikidata
    //   const wikidataResults = await fetchWikidataInfo(placeName);
    //   setWikidataInfo(wikidataResults);
    // };    

    // const fetchData = async (placeName, index) => {
    //   try {
    //     // Fetch images from Wikimedia Commons
    //     const wikiImages = await fetchWikimediaImages(placeName);
    //     setImagesData(prevState => ({
    //       ...prevState,
    //       [index]: wikiImages, // Set images specific to the bus station
    //     }));
    //   } catch (error) {
    //     console.error("Error fetching data: ", error);
    //   }
    // };

  const [busStations,setBusStations] = useState(busStation)
  const [trainStations,setTrainStations] = useState(trainStation)
  const [airports,setAirports]=useState(airport)
  const [center,setCenter]=useState([latitude,longitude])

  // useEffect(() => {
  //   // Loop through bus stations and fetch data for each one
  //   busStations.forEach((bus, index) => {
  //     fetchData(bus.name, index);
  //   });
  //   airports.forEach((flight,index)=>{
  //     fetchData(flight.name,index)
  //   })
  //   console.log(imagesData)
  // }, [busStations,airports]);
  return (
    <MapContainer center={center} zoom={13} style={{ height: "30vh", width: "100%" }}  >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* {places.map((place) => (
          <Marker key={place.id} position={[place.lat, place.lon]}  icon={customIcon}>
            <Popup>
              {place.name} <br /> (Lat: {place.lat}, Lon: {place.lon})
            </Popup>
          </Marker>
        ))} */}
      {/* Add bus markers */}
      {busStations.map((bus,index) => (     
        <Marker key={index} position={[bus.lat, bus.lon]} icon={busIcon} >
          <Popup>
            <div className="flex">
            {/* <span>
               
                {imagesData[index] ? (
                  imagesData[index].map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={`https://commons.wikimedia.org/wiki/${image.title}`}
                      alt={bus.name}
                      width="100"
                    />
                  ))
                ) : (
                  <p>Loading images...</p>
                )}
              </span> */}
              <span>
              {bus.name}
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
      {/* Add train markers */}
      {trainStations.length > 0 && trainStations.map((train,index) => (
        <Marker key={index} position={[train.lat, train.lon]} icon={trainIcon}>
          <Popup>{train.name}</Popup>
        </Marker>
      ))}
      {airports.length > 0 && airports.map((airport,index) => (
        <Marker key={index} position={[airport.lat, airport.lon]} icon={flightIcon}>
          <Popup>
            <div className="flex">
            <span>
                {/* Check if images data for the current bus stop is available */}
                {imagesData[index] ? (
                  imagesData[index].map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={`https://commons.wikimedia.org/wiki/${image.title}`}
                      alt={airport.name}
                      width="100"
                    />
                  ))
                ) : (
                  <p>Loading images...</p>
                )}
              </span>
              <span></span>
            </div>
            {airport.name}
          </Popup>
        </Marker>
      ))}
      {/* <FitBounds places={places} /> */}
    </MapContainer>
  );
};

export default TransportMap