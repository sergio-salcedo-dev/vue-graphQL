<template>
  <div id="app">
    <nav class="p-2 border-bottom">
      <ul class="d-flex justify-content-evenly align-items-center mb-0 p-0">
        <li class="p-2 m-1 fw-bold fst-normal fs-2">
          <router-link to="/">Home</router-link>
        </li>
        <li class="p-2 m-1 fw-bold fst-normal fs-2">
          <router-link to="/rockets">Rockets</router-link>
        </li>
        <li class="p-2 m-1 fw-bold fst-normal fs-2">
          <router-link to="/users-and-todos">Users and Todos</router-link>
        </li>
        <li class="p-2 m-1 fw-bold fst-normal fs-2">
          <router-link to="/my-todos">My ToDos</router-link>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1920px;
  min-width: 320px;
}

nav {
  a {
    color: inherit;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }

    &:hover {
      text-decoration: underline;
      color: #42b983;
    }
  }
}

li {
  list-style-type: none;
}

.w-fit {
  width: fit-content;
}

.fs-7 {
  font-size: 0.75rem !important;
}
</style>
