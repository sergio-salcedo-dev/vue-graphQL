<template>
  <li
    class="todo-list__item"
    :style="{ opacity: isOptimisticResponseToDo ? '0.5' : '1' }"
  >
    <p v-if="isRocketListLoading > 0">Loading</p>
    <template v-else>
      <!-- Title or Link -->
      <p class="m-0">
        <template v-if="rocket.name">
          <RocketListItemLink :rocket="rocket" class="m-0" />
        </template>
        <template v-else>{{ title }} </template>
      </p>

      <!-- Bagde -->
      <p
        :class="[
          isCompleted ? 'bg-success' : 'bg-danger',
          'mb-0 text-center badge',
        ]"
      >
        {{ isCompleted ? "Done" : "Undone" }}
      </p>

      <!-- Date -->
      <p class="m-0 fs-7">{{ formattedDate }}</p>

      <SpinnerLoader v-if="isOptimisticResponseToDo" />
      <!-- Action buttons -->
      <div v-else class="btn-group" role="group" aria-label="actions">
        <!-- Delete button-->
        <button
          type="button"
          class="btn btn-small"
          :class="
            canDeleteToDo
              ? 'btn btn-outline-danger'
              : 'btn btn-outline-secondary'
          "
          :disabled="!canDeleteToDo"
          @click="deleteTodo()"
        >
          <IconTrash />
          <span class="visually-hidden">Button</span>
        </button>

        <!-- Update button-->
        <button
          type="button"
          class="btn btn-small"
          :disabled="!this.canUpdateToDo || !this.canDeleteToDo"
          :class="[
            { 'btn-outline-secondary': !canUpdateToDo },
            { 'btn-outline-warning': isCompleted },
            { 'btn-outline-success': !isCompleted },
          ]"
          @click="updateTodo()"
        >
          <IconArrowRepeat />
          <span>Mark as {{ isCompleted ? "Undone" : "Done" }}</span>
        </button>
      </div>
    </template>
  </li>
</template>

<script>
import { format } from "date-fns";
import RocketListItemLink from "@/components/RocketListItemLink";
import { GET_ROCKETS } from "@/apollo/space-x-client/queries";
import { clientSpaceX } from "@/apollo/space-x-client";
import RocketModel from "@/Models/RocketModel";
import IconTrash from "@/components/Icons/IconTrash";
import IconArrowRepeat from "@/components/Icons/IconArrowRepeat";
import { clientHasura } from "@/apollo/hasura-client";
import { DELETE_TODO, UPDATE_TODO } from "@/apollo/hasura-client/mutations";
import { GET_MY_TODOS } from "@/apollo/hasura-client/queries";
import SpinnerLoader from "@/components/app/SpinnerLoader";

export default {
  name: "ToDoListItem",

  components: {
    RocketListItemLink,
    IconTrash,
    IconArrowRepeat,
    SpinnerLoader,
  },

  props: {
    toDo: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    rockets: [],
    isRocketListLoading: 0,
    toDos: [],
    canDeleteToDo: true,
    canUpdateToDo: true,
  }),

  apollo: {
    rockets: {
      client: clientSpaceX,
      query: GET_ROCKETS,
      loadingKey: "isRocketListLoading",
    },
  },

  computed: {
    title() {
      return this.toDo.title;
    },

    /** @return {RocketModel} */
    rocket() {
      const rocket = this.rockets.find(({ name }) => name === this.toDo.title);
      return new RocketModel(rocket || {});
    },

    isCompleted() {
      return this.toDo.isCompleted;
    },

    isOptimisticResponseToDo() {
      return this.toDo.id === -1;
    },

    formattedDate() {
      return format(new Date(this.toDo.createdAt), "PPPPpp");
    },
  },

  methods: {
    deleteTodo() {
      const { id } = this.toDo;

      if (!this.canDeleteToDo) {
        return;
      }

      this.canDeleteToDo = false;

      this.$apollo
        .mutate({
          client: [clientHasura],
          mutation: DELETE_TODO,
          variables: { id },
          update: (cache, { data: { delete_todos } }) => {
            try {
              if (delete_todos.affected_rows) {
                const data = cache.readQuery({ query: GET_MY_TODOS });
                const updatedToDos = data.toDos.filter(
                  (toDo) => toDo.id !== id
                );
                cache.writeQuery({
                  query: GET_MY_TODOS,
                  data: { toDos: updatedToDos },
                });
                this.canDeleteToDo = true;
              }
            } catch (error) {
              this.canDeleteToDo = true;
              console.log(`001. Deletion error - ${error}`);
              alert(`001. Deletion error - ${error}`);
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
        .then(() => (this.canDeleteToDo = true))
        .catch((error) => {
          console.log(`002. Deletion error - ${error}`);
          alert(`002. Deletion error - ${error}`);
          this.canDeleteToDo = true;
        });
    },

    updateTodo() {
      const { id } = this.toDo;

      if (!this.canUpdateToDo || !this.canDeleteToDo) {
        return;
      }

      this.canUpdateToDo = false;

      this.$apollo
        .mutate({
          client: [clientHasura],
          mutation: UPDATE_TODO,
          variables: {
            id,
            isCompleted: !this.isCompleted,
          },
          update: (cache, { data: { update_todos } }) => {
            try {
              if (update_todos.affected_rows) {
                const data = cache.readQuery({ query: GET_MY_TODOS });
                const toDoToBeUpdated = data.toDos.find(
                  (toDo) => toDo.id === id
                );
                toDoToBeUpdated.isCompleted = !toDoToBeUpdated.isCompleted;

                cache.writeQuery({
                  query: GET_MY_TODOS,
                  data,
                });
                this.canUpdateToDo = true;
              }
            } catch (error) {
              this.canUpdateToDo = true;
              console.log(`001. Update error - ${error}`);
              alert(`001. Update error - ${error}`);
            }
          },
          optimisticResponse: {
            __typename: "Mutation",
            update_todos: {
              affected_rows: 1,
              __typename: "todos_mutation_response",
            },
          },
        })
        .then(() => (this.canUpdateToDo = true))
        .catch((error) => {
          console.log(`002. Update error - ${error}`);
          alert(`002. Update error - ${error}`);
          this.canUpdateToDo = true;
        });
    },
  },
};
</script>

<style scoped lang="scss">
.todo-list__item {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  grid-gap: 1rem;
  margin-bottom: 1rem;
}

//.todo-list__item::v-deep .btn {
.todo-list__item:deep(.btn) {
  flex: 0 1 auto;
}
</style>
