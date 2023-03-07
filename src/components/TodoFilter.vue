<template>
  <div class="d-flex justify-content-start align-items-center p-2">
    <label for="todos-filter" class="pe-2">Filter</label>
    <select
      class="form-select w-fit"
      aria-label="toDos filter"
      id="todos-filter"
      v-model="selectedFilter"
      @change="onSelectedFilter"
    >
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="uncompleted">Uncompleted</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "TodoFilter",

  data() {
    return {
      selectedFilter: "all",
    };
  },

  methods: {
    onSelectedFilter() {
      this.$emit("update:selected-filter", this.selectedFilter);
    },
  },
};
</script>
<style scoped lang="scss">
.w-fit {
  width: fit-content;
}
</style>
