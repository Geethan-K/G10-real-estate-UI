import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';
import TransportMap from '../transport-map/transportMap';

const NearbyTransport = ({ latitude, longitude }) => {
  const [places, setPlaces] = useState([])
  const [busStops, setBusStops] = useState([])
  const [railwayStations, SetRailwayStations] = useState([])
  const [metroStations, setMetroStations] = useState([])
  const [airports, setAirports] = useState([])
  const [expandBusstops, setExpandBusstops] = useState(false)
  const [expandRailways, setExpandRailways] = useState(false)
  const [expandAirports, setExpandAirports] = useState(false)

  
  const busStop = [];
  const railwayStation = [];
  const airport = []
  const metroStation = [];

  useEffect(() => {
    const fetchNearbyTransport = async () => {
      const overpassQuery = `
            [out:json];
            (
              node["public_transport"~"station|stop|platform"](around:2000, ${latitude}, ${longitude});
              node["railway"~"station|subway"](around:2000, ${latitude}, ${longitude});
              node["highway"="bus_stop"](around:1000, ${latitude}, ${longitude});
              node["aeroway"="aerodrome"](around:5000, ${latitude}, ${longitude});
              node["aeroway"="terminal"](around:5000, ${latitude}, ${longitude});
            );
            out body;
          `;

      const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;

      try {
        const response = await fetch(overpassUrl);
        const data = await response.json();
        
        data.elements.map((element) => {
          const tags = element.tags || {};
          // Check for bus stops
          if (tags.highway === "bus_stop" || (tags.public_transport === "platform" && tags.bus === "yes")) {
            busStop.push({
              id: element.id,
              name: tags.name || "Unnamed Bus Stop",
              lat: element.lat,
              lon: element.lon,
              type: "Bus Stop"
            });
          }

          // Check for railway stations
          if (tags.railway === "station") {
            railwayStation.push({
              id: element.id,
              name: tags.name || "Unnamed Railway Station",
              lat: element.lat,
              lon: element.lon,
              type: "Railway Station"
            });
          }

          if (tags.aeroway == "aerodome" || tags.aeroway == "terminal") {
            airport.push({
              id: element.id,
              name: tags.name || "Unnamed Airport",
              lat: element.lat,
              lon: element.lon,
              type: "Airport"
            })
          }

          // Check for metro stations
          if (tags.subway === "yes" || tags.station === "subway") {
            metroStation.push({
              id: element.id,
              name: tags.name || "Unnamed Metro Station",
              lat: element.lat,
              lon: element.lon,
              type: "Metro Station"
            });
          }
        })
        setBusStops(busStop)
        SetRailwayStations(railwayStation)
        setMetroStations(metroStation)
        setAirports(airport)

        return { busStop, railwayStation, metroStation };
      } catch (error) {
        console.error("Error fetching data from Overpass API", error);
      }
    };

    fetchNearbyTransport();
  }, [latitude, longitude]);

  return (
    <div className='flex-column padding-sm' >
      <div className="flex-column bus-stand " >
        <h4>Bus Stops</h4>
        {busStops.length > 0 ? (
          <ul className='flex'>
            {busStops.slice(0, expandBusstops ? busStops.length:6).map((place) => (
              <li key={place.id} className='margin-xs padding-xs mark-highlight'  >
                {place.name}
              </li>
            ))}
            <span>
              <FontAwesomeIcon icon={expandBusstops ? faChevronCircleUp : faChevronCircleDown} className='pointer' onClick={() => setExpandBusstops(!expandBusstops)} />
            </span>
          </ul>
        ) : (
          <p>No nearby transport found</p>
        )}
      </div>
      <div className="flex-column railway-station margin-xs" >
        <h4>Railway Stations</h4>
        {railwayStations.length > 0 ? (
          <ul className='flex'>
            {railwayStations.slice(0, expandRailways ? railwayStations.length : 6).map((place) => (
              <li key={place.id} className='margin-xs padding-xs mark-highlight' >
                {place.name}
              </li>
            ))}
            <span>
              <FontAwesomeIcon icon={expandRailways ? faChevronCircleUp : faChevronCircleDown} className='pointer' onClick={() => setExpandRailways(!expandRailways)} />
            </span>
          </ul>
        ) : (
          <p>No nearby transport found</p>
        )}
      </div>
      <div className="flex-column railway-station margin-xs" >
        <h4>Airports</h4>
        {airports.length > 0 ? (
          <ul className='flex'>
            {airports.slice(0, expandAirports ? airports.length : 6).map((place) => (
              <li key={place.id} className='margin-xs padding-xs mark-highlight' >
                {place.name}
              </li>
            ))}
            <span>
              <FontAwesomeIcon icon={expandAirports ? faChevronCircleUp : faChevronCircleDown} className='pointer' onClick={() => setExpandAirports(!expandAirports)} />
            </span>
          </ul>
        ) : (
          <p>No nearby transport found</p>
        )}
      </div>
      {
        metroStation.length > 0 && <div className="flex-column padding-sm margin-sm metro" >
          <span className="flex">
            <label>Metro Stations</label>
          </span>
          {metroStation.length > 0 ? (
            <ul className='padding-sm'>
              {metroStation.map((place) => (
                <li key={place.id}>
                  {place.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>No nearby transport found</p>
          )}
        </div>
      }
      <span>
        {
          busStops.length > 0 && <TransportMap busStation={busStops} trainStation={railwayStations} airport={airports} latitude={latitude} longitude={longitude} />
        }
      </span>

    </div>
  );
};

export default NearbyTransport;