<template>
  <section class="rockets">
    <header class="d-flex justify-content-center">
      <h1>Space X Rockets</h1>
    </header>
    <main class="d-flex justify-content-center">
      <RocketList />
    </main>
  </section>
</template>

<script>
import RocketList from "@/components/RocketList";

export default {
  name: "RocketsView",

  components: {
    RocketList,
  },
};
</script>
