<template>
  <router-link :to="{ name: 'rocket', params: { id: rocket.id } }">
    {{ rocket.name }}
  </router-link>
</template>

<script>
export default {
  name: "RocketListItemLink",

  /** @property {{id: number, name: string}} rocket */
  props: {
    rocket: {
      type: Object,
      required: true,
    },
  },
};
</script>
