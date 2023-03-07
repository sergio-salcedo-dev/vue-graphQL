import Vue from "vue";
import VueApollo from "vue-apollo";
import apolloClientSpaceX, { clientSpaceX } from "@/apollo/space-x-client";
import apolloClientHasura, { clientHasura } from "@/apollo/hasura-client";

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  clients: {
    [clientSpaceX]: apolloClientSpaceX,
    [clientHasura]: apolloClientHasura,
  },
  defaultClient: apolloClientHasura,
});

export default apolloProvider;
