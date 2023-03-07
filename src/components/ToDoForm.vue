<template>
  <form
    class="d-flex justify-content-center align-items-center p-2"
    @submit.prevent="addToDo"
  >
    <p class="mb-0 me-5 h3">Insert ToDo</p>
    <RocketSelect
      class="ms-2"
      :rocket="selectedRocket"
      :selected-rocket.sync="selectedRocket"
      :are-rockets-loaded.sync="areRocketsLoaded"
      @on-focus="resetForm"
    />
    <input
      v-if="areRocketsLoaded"
      type="submit"
      value="Insert"
      class="btn btn-primary btn-sm ms-3"
    />
  </form>
</template>

<script>
import { INSERT_TODOS } from "@/apollo/hasura-client/mutations";
import RocketSelect from "@/components/RocketSelect";
import { clientHasura } from "@/apollo/hasura-client";
import { GET_MY_TODOS } from "@/apollo/hasura-client/queries";

export default {
  name: "TodoForm",

  components: {
    RocketSelect,
  },

  data: () => ({
    isProcessing: false,
    areRocketsLoaded: false,
    selectedRocket: "",
    insertionErrorMessage: "Something went wrong: <br>",
  }),

  methods: {
    addToDo() {
      if (this.isProcessing) {
        return;
      }

      if (!this.selectedRocket.trim()) {
        this.$emit("on-submit", {
          success: 0,
          message: "Select a Rocket",
        });

        return;
      }

      this.isProcessing = true;

      this.$apollo
        .mutate({
          client: [clientHasura],
          mutation: INSERT_TODOS,
          variables: {
            title: this.selectedRocket,
          },
          update: (cache, { data: { insert_todos } }) => {
            try {
              if (insert_todos.affected_rows) {
                const [insertedToDo] = insert_todos.returning;
                const data = cache.readQuery({ query: GET_MY_TODOS });

                data.toDos.unshift(insertedToDo);
                cache.writeQuery({ query: GET_MY_TODOS, data });
              }
            } catch (error) {
              this.onError(error);
            }
          },
          optimisticResponse: {
            __typename: "Mutation",
            insert_todos: {
              affected_rows: 1,
              returning: [
                {
                  title: this.selectedRocket,
                  id: -1,
                  isCompleted: false,
                  createdAt: new Date(),
                  __typename: "todos",
                },
              ],
              __typename: "todos_mutation_response",
            },
          },
        })
        .then(() => {
          this.$emit("on-submit", {
            success: 1,
            message: `Rocket "${this.selectedRocket}" inserted as ToDo`,
          });
          this.selectedRocket = "";
          this.isProcessing = false;
        })
        .catch((error) => this.onError(error));
    },

    resetForm() {
      this.selectedRocket = "";
      this.isProcessing = false;
      this.insertionErrorMessage = "Something went wrong: <br>";
      this.$emit("on-submit", {
        success: 1,
        message: "",
      });
    },

    onError(error) {
      this.isProcessing = false;
      this.insertionErrorMessage += `- ${error.toString()}<br>`;
      this.$emit("on-submit", {
        success: 0,
        message: this.insertionErrorMessage,
      });
      alert("dfgd");
    },
  },
};
</script>
