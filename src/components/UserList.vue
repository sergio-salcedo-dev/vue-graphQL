<template>
  <section>
    <h1 class="mb-3 text-center">Users And Todos</h1>

    <article
      class="d-flex justify-content-center align-items-center mb-3 border"
    >
      <p class="mb-0 me-5 h3">Config users shown</p>
      <div>
        <label for="offset">Offset:</label>
        <input
          type="number"
          id="offset"
          v-model.number="offset"
          min="0"
          max="10"
        />
      </div>

      <div class="ms-2">
        <label for="limit">Limit:</label>
        <input
          type="number"
          id="limit"
          v-model.number="limit"
          min="0"
          max="10"
        />
      </div>
    </article>

    <p v-if="areUsersLoading > 0">Loading Users And Todos List</p>

    <ul v-else class="users-and-todos-list">
      <li v-for="user in users" :key="user.id" class="d-flex">
        <p>@{{ user.name }}</p>
        <template v-if="user.todos.length">
          ---> <span class="text-primary">ToDos:</span>
          <p v-for="(toDo, index) in user.todos" :key="toDo.id" class="ms-2">
            {{ index + 1 }}. {{ toDo.title }}
          </p>
        </template>
      </li>
    </ul>
  </section>
</template>

<script>
import { GET_USERS_AND_TODOS } from "@/apollo/hasura-client/queries";
import { clientHasura } from "@/apollo/hasura-client";

export default {
  name: "UserList",

  data: () => ({
    users: [],
    areUsersLoading: 0,
    offset: 0,
    limit: 10,
  }),

  apollo: {
    users: {
      client: [clientHasura],
      query: GET_USERS_AND_TODOS,
      variables() {
        return { offset: this.offset, limit: this.limit };
      },
      loadingKey: "areUsersLoading",
    },
  },
};
</script>
