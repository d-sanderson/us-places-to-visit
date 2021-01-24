import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import useSWR from "swr";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { fetcher } from "../utils";

const Map = () => {


  const query = `query stateQuery($code:String!) {
    us_cities(where: {us_state: {state_code: {_eq: $code}}}) {
      id
      latitude
      longitude
      city
      county
      us_state {
        state_name
      }
    }
  }
  `;
  const [variables, setVariables] = useState({
    code: "NM",
  });

  const { data, error, isValidating } = useSWR([query, variables], fetcher);
  
  const cities = data?.us_cities;
  const markers =
    cities &&
    cities.map((el) => {
      const { latitude, longitude, city, county } = el;
      return (
        <Marker key={el.id} position={[latitude, longitude]} animate={true}>
          <Popup>
            {city}, {county}
          </Popup>
        </Marker>
      );
    });
  return (
    <>
        <input
          type="text"
          value={variables.code}
          onChange={(e) => setVariables({ code: e.target.value.toUpperCase() })}
        />
        <info>
          There are {cities ? cities.length : 0} cities in {variables.code},{" "}
          {cities && cities.length > 1 ? cities[0]?.us_state?.state_name : ""}
        </info>
      <MapContainer
        center={[35.0936, -106.6423]}
        zoom={14}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`}
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        />
        {cities && markers}
      </MapContainer>
    </>
  );
};

export default Map;
