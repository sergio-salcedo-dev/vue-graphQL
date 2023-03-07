<template>
  <p v-if="areRocketsLoading > 0">Loading rockets</p>
  <div v-else class="d-flex justify-content-center align-items-center">
    <label for="rockets">Rockets:</label>
    <select
      v-model.trim="selectedRocket"
      id="rockets"
      @focus="$emit('on-focus')"
    >
      <option selected value="">Choose a rocket</option>
      <option v-for="rocket in rockets" :key="rocket.id" :value="rocket.name">
        {{ rocket.name }}
      </option>
    </select>
  </div>
</template>

<script>
import { GET_ROCKETS } from "@/apollo/space-x-client/queries";
import { clientSpaceX } from "@/apollo/space-x-client";

export default {
  name: "RocketSelect",

  props: {
    rocket: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    areRocketsLoading: 0,
    rockets: [],
    selectedRocket: "",
  }),

  apollo: {
    rockets: {
      client: clientSpaceX,
      query: GET_ROCKETS,
      loadingKey: "areRocketsLoading",
    },
  },

  watch: {
    rockets() {
      if (!this.rockets.length) {
        return;
      }

      this.$emit("update:are-rockets-loaded", true);
    },

    rocket() {
      this.selectedRocket = this.rocket;
    },

    selectedRocket() {
      this.$emit("update:selected-rocket", this.selectedRocket);
    },
  },
};
</script>
