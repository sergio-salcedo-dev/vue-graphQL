const { URL_SPACEX_GRAPHQL_API } = require("@/apollo/space-x-client/url-api");

module.exports = {
  client: {
    service: {
      name: "spacex-graphql-api",
      url: URL_SPACEX_GRAPHQL_API,
    },
    includes: ["src/**/*.vue", "src/**/*.js"],
  },
};
