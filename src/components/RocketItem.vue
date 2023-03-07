<template>
  <article v-if="rocket">
    <h2>{{ rocket.name }}</h2>
    <h3>{{ rocket.description }}</h3>
    <h4>Weight: {{ rocket.weight }} Kg.</h4>
    <h4>Cost per launch: {{ rocket.costPerLaunch }} $</h4>
    <h5>
      <a :href="rocket.urlWikipedia" target="_blank">
        Learn more about it in wikipedia
      </a>
    </h5>
  </article>
</template>

<script>
import RocketModel from "@/Models/RocketModel";

export default {
  name: "RocketItem",

  props: {
    rocket: {
      type: RocketModel,
      required: false,
    },
  },
};
</script>
