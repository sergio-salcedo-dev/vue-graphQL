<template>
  <p v-if="isRocketLoading > 0">Loading Rocket</p>
  <RocketItem v-else :rocket="theRocket" />
</template>

<script>
import RocketItem from "@/components/RocketItem";
import RocketModel from "@/Models/RocketModel";
import { GET_ROCKET_BY_ID } from "@/apollo/space-x-client/queries";
import { clientSpaceX } from "@/apollo/space-x-client";

export default {
  name: "RocketView",

  components: { RocketItem },

  data: () => ({
    rocket: null,
    isRocketLoading: 0,
  }),

  apollo: {
    rocket: {
      client: clientSpaceX,
      query: GET_ROCKET_BY_ID,
      variables() {
        return { id: this.$route.params.id };
      },
      loadingKey: "isRocketLoading",
    },
  },

  computed: {
    theRocket() {
      return new RocketModel(this.rocket);
    },
  },
};
</script>
