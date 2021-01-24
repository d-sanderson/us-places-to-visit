export const stateQuery = `query stateQuery($code:String!) {
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

export const cityQuery = `query citiesQuery2($city: String!) {
    us_cities_aggregate(where: {city: {_eq: $city}}) {
      aggregate {
        count
      }
    }
      us_cities(where: {city: {_eq: $city}}) {
        city
        county
        latitude
        longitude
        us_state {
          state_name
        }
      }
    }
  `;
