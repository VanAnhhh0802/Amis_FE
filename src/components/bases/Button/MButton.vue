<template lang="">
  <button class="btn" :tabindex="tabIndex">{{ text }}</button>
</template>
<script>
export default {
  name: "MButton",
  props: {
    text: String,
    tabIndex: Number,
  },
};
</script>
<style scoped>
@import url(./button.css);
</style>
