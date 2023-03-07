<template>
  <section>
    <article>
      <p v-if="isRocketListLoading > 0">Loading Rocket List</p>
      <ul v-else class="rockets-list">
        <li v-for="rocket in rockets" :key="rocket.id">
          <RocketListItemLink :rocket="rocket"></RocketListItemLink>
        </li>
      </ul>
    </article>
  </section>
</template>

<script>
import { GET_ROCKETS } from "@/apollo/space-x-client/queries";
import RocketListItemLink from "@/components/RocketListItemLink";
import { clientSpaceX } from "@/apollo/space-x-client";

export default {
  name: "RocketList",

  components: {
    RocketListItemLink,
  },

  data: () => ({
    /** @type {RocketModel[]} */
    rockets: [],
    isRocketListLoading: 0,
  }),

  apollo: {
    rockets: {
      client: clientSpaceX,
      query: GET_ROCKETS,
      // Will update the 'loading' attribute
      // +1 when a new query is loading
      // -1 when a query is completed
      loadingKey: "isRocketListLoading",
    },
  },
};
</script>
