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

export const cityQuery = `query cityQuery($city: String!) {
    us_states(where: {us_cities: {city: {_eq: $city}}}) {
      state_code
      state_name
      us_cities(where: {city: {_eq: $city}}) {
        county
        city
        latitude
        longitude
      }
    }
  }`;
