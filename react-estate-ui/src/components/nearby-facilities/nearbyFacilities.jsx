import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Checkbox, Radio, Switch } from 'pretty-checkbox-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
// Example Lat, Lng coordinates
// const lat = 13.0827; // your latitude
// const lon = 80.2707; // your longitude
const hospital = []
const restaurant = []
const school = []
const mall = []
const park = []
const policeStation = []
const pharmacy = []

// Define hospital icon
const hospitalIcon = new L.Icon({
    iconUrl: '/highlights/close_to_hospital.png', // Path to the bus marker image
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Anchor point of the icon
    popupAnchor: [0, -32]
  });
  
  // Define restaurant icon
  const restaurantIcon = new L.Icon({
    iconUrl: '/amenities/restaurant.png', // Path to the train marker image
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Anchor point of the icon
    popupAnchor: [0, -32]
  });
  
  const policeStationIcon = new L.Icon({
    iconUrl: '/amenities/siren.png', // Path to the train marker image
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Anchor point of the icon
    popupAnchor: [0, -32]
  });
  
    // Define restaurant icon
    const parkIcon = new L.Icon({
        iconUrl: '/amenities/park.png', // Path to the train marker image
        iconSize: [32, 32], // Size of the icon
        iconAnchor: [16, 32], // Anchor point of the icon
        popupAnchor: [0, -32]
      });
      const schoolIcon = new L.Icon({
        iconUrl: '/highlights/close_to_school.png', // Path to the train marker image
        iconSize: [32, 32], // Size of the icon
        iconAnchor: [16, 32], // Anchor point of the icon
        popupAnchor: [0, -32]
      });
      const pharmacyIcon = new L.Icon({
        iconUrl: '/highlights/close_to_pharmacy.png', // Path to the train marker image
        iconSize: [32, 32], // Size of the icon
        iconAnchor: [16, 32], // Anchor point of the icon
        popupAnchor: [0, -32]
      });
      const mallIcon = new L.Icon({
        iconUrl: '/amenities/shopping.png', // Path to the train marker image
        iconSize: [32, 32], // Size of the icon
        iconAnchor: [16, 32], // Anchor point of the icon
        popupAnchor: [0, -32]
      });

    

const NearbyFacilities = ({ lat, lon }) => {
    const [hospitals, setHospitals] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [schools, setSchools] = useState([])
    const [policeStations, setPoliceStation] = useState([])
    const [malls,setMalls]=useState([])
    const [pharmacies,setPharmacies]=useState([])
    const [parks,setParks]=useState([])
    const [showPlaces,setShowPlaces] = useState({
        show_schools:false,
        show_hospitals:false,
        show_pharmacies:false,
        show_restuarants:false,
        show_parks:false,
        show_malls:false,
        show_police_stations:false
    })
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        // Overpass API URL with the query to fetch nearby schools and hospitals
        const query = `
      [out:json];
      (
        node["amenity"="school"](around:5000, ${lat}, ${lon});
        node["amenity"="hospital"](around:5000, ${lat}, ${lon});
        node["leisure"="park"](around:5000, ${lat}, ${lon});
        node["amenity"="restaurant"](around:5000, ${lat}, ${lon});
        node["amenity"="pharmacy"](around:5000, ${lat}, ${lon});
        node["amenity"="police"](around:5000, ${lat}, ${lon});
        node["shop"="mall"](around:5000, ${lat}, ${lon});
      );
      out body;
    `;

        const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

        axios
            .get(overpassUrl)
            .then((response) => {
                // setPlaces(response.data.elements); // Setting the data from Overpass API
                response.data.elements.map((element) => {
                  
                    const tags = element.tags || {};
                    if (element.tags.amenity == 'school') {
                        school.push({
                            id: element.id,
                            name: tags.name || "Unnamed School",
                            lat: element.lat,
                            lon: element.lon,
                            type: "School"
                        })
                       
                    }
                    if (element.tags.amenity == 'restaurant') {
                        restaurant.push({
                            id: element.id,
                            name: tags.name || "Unnamed restaurant",
                            lat: element.lat,
                            lon: element.lon,
                            type: "restaurant"
                        })
                    }
                    if (element.tags.amenity == 'park') {
                        park.push({
                            id: element.id,
                            name: tags.name || "Unnamed park",
                            lat: element.lat,
                            lon: element.lon,
                            type: "Park"
                        })
                    }
                    if (element.tags.amenity == 'pharmacy') {
                        pharmacy.push({
                            id: element.id,
                            name: tags.name || "Unnamed pharmacy",
                            lat: element.lat,
                            lon: element.lon,
                            type: "pharmacy"
                        })
                    }
                    if (element.tags.amenity == 'hospital') {
                        hospital.push({
                            id: element.id,
                            name: tags.name || "Unnamed hospital",
                            lat: element.lat,
                            lon: element.lon,
                            type: "hospital"
                        })
                    }
                    if (element.tags.amenity == 'police') {
                        policeStation.push({
                            id: element.id,
                            name: tags.name || "Unnamed police station",
                            lat: element.lat,
                            lon: element.lon,
                            type: "Police Station"
                        })
                    }
                    if (element.tags.amenity == 'mall') {
                        mall.push({
                            id: element.id,
                            name: tags.name || "Unnamed mall",
                            lat: element.lat,
                            lon: element.lon,
                            type: "mall"
                        })
                    }
                })
                
                setHospitals(hospital)
                setPharmacies(pharmacy)
                setRestaurants(restaurant)
                setSchools(school)
                setPoliceStation(policeStation)
                setParks(park)
                setMalls(mall)
            })
            .catch((error) => {
                console.error('Error fetching Overpass API data:', error);
            });
    }, [lat, lon]);

    const highlightsCheck = async (e) => {

        setShowPlaces((prevDetails) => ({
          ...prevDetails,
          [e.target.name]: e.target.checked
        }))
      }
    return (
        <>
        <div className='flex padding-sm'>
            <span className="check-area padding-sm">
                <Checkbox color="warning-o" bigger="true" name="show_hospitals" icon={showPlaces.show_hospitals ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={showPlaces.show_hospitals} shape="curve" onChange={(e) => highlightsCheck(e)}>
                   Show Nearby Hopitals
                </Checkbox>
            </span>
            <span className="check-area padding-sm">
                <Checkbox color="warning-o" bigger="true" name="show_pharmacies" icon={showPlaces.show_pharmacies ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={showPlaces.show_pharmacies} shape="curve" onChange={(e) => highlightsCheck(e)}>
                   Show Nearby Pharmacies
                </Checkbox>
            </span>
            <span className="check-area padding-sm">
                <Checkbox color="warning-o" bigger="true" name="show_schools" icon={showPlaces.show_schools ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={showPlaces.show_schools} shape="curve" onChange={(e) => highlightsCheck(e)}>
                   Show Nearby Schools
                </Checkbox>
            </span>
            <span className="check-area padding-sm">
                <Checkbox color="warning-o" bigger="true" name="show_police_stations" icon={showPlaces.show_police_stations ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={showPlaces.show_police_stations} shape="curve" onChange={(e) => highlightsCheck(e)}>
                   Show Nearby Police stations
                </Checkbox>
            </span>
            <span className="check-area padding-sm">
                <Checkbox color="warning-o" bigger="true" name="show_malls" icon={showPlaces.show_malls ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={showPlaces.show_malls} shape="curve" onChange={(e) => highlightsCheck(e)}>
                   Show Nearby Shopping malls
                </Checkbox>
            </span>
        </div>
         <MapContainer center={[lat, lon]} zoom={12} style={{ height: '30vh', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {/* {places.map((place) => (
                <Marker key={place.id} position={[place.lat, place.lon]}>
                    <Popup>
                        <strong>{place.tags.name || 'Unnamed Place'}</strong>
                        <br />
                        {place.tags.amenity ? <span>Amenity: {place.tags.amenity}</span> : null}
                        {place.tags.leisure ? <span>Leisure: {place.tags.leisure}</span> : null}
                        {place.tags.shop ? <span>Shop: {place.tags.shop}</span> : null}
                    </Popup>
                </Marker>
            ))} */}
            { showPlaces.show_hospitals && hospitals.length > 0 &&  hospitals.map((hospital) => (
                <Marker key={hospital.id} position={[hospital.lat, hospital.lon]} icon={hospitalIcon}>
                    <Popup>{hospital.name}</Popup>
                </Marker>
            ))}
             {showPlaces.show_pharmacies && pharmacies.length > 0 && pharmacies.map((medicalShop) => (
                <Marker key={medicalShop.id} position={[medicalShop.lat, medicalShop.lon]} icon={pharmacyIcon}>
                    <Popup>{medicalShop.name}</Popup>
                </Marker>
            ))}
            { showPlaces.show_restuarants && restaurants.length && restaurants.map((restaurant) => (
                <Marker key={restaurant.id} position={[restaurant.lat, restaurant.lon]} icon={restaurantIcon}>
                    <Popup>{restaurant.name}</Popup>
                </Marker>
            ))}
             {showPlaces.show_schools && schools && schools.map((school) => (
                <Marker key={school.id} position={[school.lat, school.lon]} icon={schoolIcon}>
                    <Popup>{school.name}</Popup>
                </Marker>
            ))}
             {showPlaces.show_police_stations && policeStations && policeStations.map((station) => (
                <Marker key={station.id} position={[station.lat, station.lon]} icon={policeStationIcon}>
                    <Popup>{station.name}</Popup>
                </Marker>
            ))}
             {showPlaces.show_parks && parks.length >0 && parks.map((park) => (
                <Marker key={park.id} position={[park.lat, park.lon]} icon={parkIcon}>
                    <Popup>{park.name}</Popup>
                </Marker>
            ))}
          { showPlaces.show_malls && malls.length > 0 && malls.map((mall) => (
                <Marker key={mall.id} position={[mall.lat, mall.lon]} icon={mallIcon}>
                    <Popup>{mall.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
        </>
       
    );
};

// const App = () => {
//     return (
//         <div>
//             <h1>Real Estate Project</h1>
//             <OverpassAPIQuery lat={lat} lon={lon} />
//         </div>
//     );
// };

export default NearbyFacilities;
