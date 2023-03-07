import HomeView from "@/views/HomeView";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/rockets",
    name: "rockets",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "rockets-view-vue" */ "@/views/RocketsView.vue"
      ),
  },
  {
    path: "/rocket/:id",
    name: "rocket",
    component: () =>
      import(
        /* webpackChunkName: "rocket-view-vue" */ "@/views/RocketView.vue"
      ),
  },
  {
    path: "/users-and-todos",
    name: "users-and-todos",
    component: () =>
      import(
        /* webpackChunkName: "users-and-todos-view-vue" */ "@/views/UsersAndTodosView.vue"
      ),
  },
  {
    path: "/my-todos",
    name: "my-todos",
    component: () =>
      import(/* webpackChunkName: "todos-view-vue" */ "@/views/TodosView.vue"),
  },
];

export default routes;
