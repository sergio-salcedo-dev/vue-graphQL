import ApolloClient from "apollo-boost";
import { URL_SPACEX_GRAPHQL_API } from "@/apollo/space-x-client/url-api";

export const clientSpaceX = "clientSpaceX";

const apolloClientSpaceX = new ApolloClient({
  uri: URL_SPACEX_GRAPHQL_API,
});

export default apolloClientSpaceX;
