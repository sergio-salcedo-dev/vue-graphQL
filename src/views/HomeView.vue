<template>
  <main class="home d-flex justify-content-center align-items-center">
    <img class="m-1" alt="Vue logo" src="@/assets/logo.png" />
    <HomeDashboard />
  </main>
</template>

<script>
import HomeDashboard from "@/components/HomeDashboard.vue";

export default {
  name: "HomeView",

  components: {
    HomeDashboard,
  },
};
</script>
