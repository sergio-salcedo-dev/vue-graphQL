<template>
  <div
    v-if="content"
    class="alert align-items-center d-flex justify-content-between mx-auto my-2 p-3 text-start w-fit"
    :class="finalCss"
    role="alert"
  >
    <p class="mb-0" v-html="content"></p>
  </div>
</template>

<script>
export default {
  name: "BaseAlert",

  props: {
    variant: {
      type: String,
      default: "warning",
      validator(variant) {
        const variants = ["info", "warning", "success", "danger"];

        return variants.includes(variant);
      },
    },
    content: {
      type: String,
      default: "",
    },
  },

  computed: {
    finalCss() {
      return `alert-${this.variant}`;
    },
  },
};
</script>
