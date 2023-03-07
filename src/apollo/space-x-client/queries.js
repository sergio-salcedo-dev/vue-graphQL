import gql from "graphql-tag";

export const GET_ROCKETS = gql`
  query getRockets($offset: Int, $limit: Int) {
    rockets(offset: $offset, limit: $limit) {
      id
      name
    }
  }
`;

export const GET_ROCKET_BY_ID = gql`
  query getRocket($id: ID!) {
    rocket(id: $id) {
      description
      mass {
        kg
      }
      name
      urlWikipedia: wikipedia
      costPerLaunch: cost_per_launch
    }
  }
`;
