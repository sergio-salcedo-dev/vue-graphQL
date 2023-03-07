<template>
  <div class="todos-config d-flex justify-content-center align-items-center">
    <p class="mb-0 me-5 h3">Config ToDos</p>
    <div>
      <label for="offset">Offset:</label>
      <input
        type="number"
        id="offset"
        v-model.number="toDosConfig.offset"
        min="0"
        max="10"
      />
    </div>

    <div class="ms-2">
      <label for="limit">Limit:</label>
      <input
        type="number"
        id="limit"
        v-model.number="toDosConfig.limit"
        min="1"
        max="100"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ToDosConfig",

  data: () => ({
    toDosConfig: {
      offset: 0,
      limit: 5,
    },
  }),

  watch: {
    toDosConfig: {
      deep: true,
      immediate: true,
      handler() {
        if (!this.toDosConfig.limit) {
          this.toDosConfig.limit = 1;
        }

        this.$emit("update:toDosConfig", this.toDosConfig);
      },
    },
  },
};
</script>
