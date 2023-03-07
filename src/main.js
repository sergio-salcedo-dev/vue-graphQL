import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import apolloProvider from "@/apollo";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

Vue.config.productionTip = false;

const app = new Vue({
  router,
  apolloProvider,
  render: (h) => h(App),
});

app.$mount("#app");
