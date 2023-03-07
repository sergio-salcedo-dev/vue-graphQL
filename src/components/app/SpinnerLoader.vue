<template functional>
  <figure class="spinner m-1">
    <img
      src="@/assets/loading.svg"
      alt="Loading"
      :width="props.width"
      :height="props.height"
    />
  </figure>
</template>

<script>
export default {
  name: "SpinnerLoader",

  props: {
    width: {
      type: String,
      default: "30",
    },
    height: {
      type: String,
      default: "30",
    },
  },
};
</script>
