<template>
  <section class="mx-4 p-2">
    <article
      class="d-flex justify-content-evenly align-items-center p-2 border-bottom"
    >
      <TodoForm @on-submit="updateOperationMessage" />
      <TodoFilter :selected-filter.sync="selectedFilter" />
    </article>

    <p class="text-center" v-if="areToDosLoading > 0">Loading ToDos List</p>

    <template v-else-if="toDos.length">
      <BaseAlert
        class="mx-auto my-2 p-2 text-start w-fit"
        :content="alertContent"
        :variant="alertVariant"
        is-closable
      />

      <h2 class="text-primary mb-2 text-center">My ToDos</h2>
      <ul class="todo-list mx-auto w-75">
        <ToDoListItem
          v-for="toDo in filteredToDos"
          :key="toDo.id"
          :to-do="toDo"
        />
      </ul>

      <TodoDeleteCompleted v-if="completedToDos.length" />
    </template>

    <h2 v-else class="text-success text-center">No todos available</h2>
  </section>
</template>

<script>
import { GET_MY_TODOS } from "@/apollo/hasura-client/queries";
import TodoForm from "@/components/ToDoForm";
import ToDoListItem from "@/components/ToDoListItem";
import { clientHasura } from "@/apollo/hasura-client";
import BaseAlert from "@/components/app/BaseAlert";
import { DELETE_COMPLETED_TODOS } from "@/apollo/hasura-client/mutations";
import TodoDeleteCompleted from "@/components/TodoDeleteCompleted";
import TodoFilter from "@/components/TodoFilter";

export default {
  name: "TodoList",

  components: {
    TodoForm,
    ToDoListItem,
    BaseAlert,
    TodoDeleteCompleted,
    TodoFilter,
  },

  data: () => ({
    toDos: [],
    areToDosLoading: 0,
    alertVariant: "success",
    alertContent: "",
    canDeleteCompletedToDos: true,
    selectedFilter: "",
  }),

  computed: {
    filteredToDos() {
      switch (this.selectedFilter) {
        case "completed":
          return this.completedToDos;
        case "uncompleted":
          return this.uncompletedToDos;
        default:
          return this.toDos;
      }
    },

    completedToDos() {
      return this.toDos.filter(({ isCompleted }) => isCompleted);
    },

    uncompletedToDos() {
      return this.toDos.filter(({ isCompleted }) => !isCompleted);
    },
  },

  apollo: {
    toDos: {
      client: [clientHasura],
      query: GET_MY_TODOS,
      loadingKey: "areToDosLoading",
    },
  },

  methods: {
    updateOperationMessage(data) {
      const { success, message } = data;

      this.alertVariant = success ? "success" : "danger";
      this.alertContent = message;
    },

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
