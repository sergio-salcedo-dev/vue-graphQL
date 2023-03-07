<template>
  <article
    class="border-top d-flex justify-content-center align-items-justify-content-center p-3"
  >
    <button
      type="button"
      class="btn btn-small btn-warning"
      :disabled="!canDeleteCompletedToDos"
      @click="deleteCompletedToDos"
    >
      Clear completed ToDos
    </button>
  </article>
</template>

<script>
import { GET_MY_TODOS } from "@/apollo/hasura-client/queries";
import { clientHasura } from "@/apollo/hasura-client";
import { DELETE_COMPLETED_TODOS } from "@/apollo/hasura-client/mutations";

export default {
  name: "TodoDeleteCompleted",

  data: () => ({
    canDeleteCompletedToDos: true,
  }),

  methods: {
    deleteCompletedToDos() {
      if (!this.canDeleteCompletedToDos) {
        return;
      }

      this.canDeleteCompletedToDos = false;

      this.$apollo
        .mutate({
          client: [clientHasura],
          mutation: DELETE_COMPLETED_TODOS,
          update: (cache, { data: { delete_todos } }) => {
            try {
              if (delete_todos.affected_rows) {
                const data = cache.readQuery({ query: GET_MY_TODOS });
                const updatedToDos = data.toDos.filter(
                  ({ isCompleted }) => !isCompleted
                );
                cache.writeQuery({
                  query: GET_MY_TODOS,
                  data: { toDos: updatedToDos },
                });
                this.canDeleteCompletedToDos = true;
              }
            } catch (error) {
              this.canDeleteCompletedToDos = true;
              console.log(`003. Deletion error - ${error}`);
            }
          },
          optimisticResponse: {
            __typename: "Mutation",
            delete_todos: {
              affected_rows: 1,
              __typename: "todos_mutation_response",
            },
          },
        })
        .then(() => (this.canDeleteCompletedToDos = true))
        .catch((error) => {
          console.log(`004. Deletion error - ${error}`);
          this.canDeleteCompletedToDos = true;
        });
    },
  },
};
</script>
