import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { cityQuery, citiesQuery2 } from "../queries";
import { startCase } from "lodash";
import useSWR from "swr";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { fetcher } from "../utils";

const Map = () => {
  const [map, setMap] = React.useState(null);
  const defaultCenter = [35.0936, -106.6423];
  const [variables, setVariables] = React.useState({
    city: "Albuquerque",
  });

  const handleFlyTo = (arr) => map.flyTo(arr, 14, { duration: 2 });

  const hasCity = Boolean(data?.us_states[0]?.us_cities[0]);
  const { data } = useSWR([cityQuery, variables], fetcher);
  const markers = data?.us_cities.map((el) => {
    const { latitude, longitude, city, county } = el;
    const { state_code, state_name } = el.us_state;

    console.log(el)
    return (

      <Marker key={el.id} position={[latitude, longitude]} animate={true}>
        <Popup>
          {city}, {county}
          {state_name}
        </Popup>
      </Marker>
    );
  });

  return (
    <>
      <aside>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            hasCity &&
              handleFlyTo([
                data?.us_states[0]?.us_cities[0]?.latitude,
                data?.us_states[0]?.us_cities[0]?.longitude,
              ]);
          }}
        >
          <input
            placeholder="Enter the name of a US City"
            type="text"
            value={variables.code}
            onChange={(e) => {
              setVariables((prevState) => ({
                ...prevState,
                city: startCase(e.target.value.toLowerCase()),
              }));
            }}
          />
          <small>
            <button>
              {hasCity
                ? `✈️✈️✈️Fly me to ${variables.city}, ${data?.us_states[0].state_name}✈️✈️✈️`
                : "✈️✈️✈️Lets go somewhere!✈️✈️✈️"}
            </button>
            {data?.us_cities.length > 1 && <>There are {data?.us_cities.length} cities in the US with the name {variables.city}</> }
          </small>
        </form>
      </aside>
      <MapContainer
        whenCreated={setMap}
        id="map"
        center={defaultCenter}
        zoom={14}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`}
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        />
        {markers}
      </MapContainer>
    </>
  );
};

export default Map;
