<template lang="">
  <div id="toast__success" class="toast">
    <div class="flex w-full">
      <div class="flex toast__content">
        <slot name="icon"> </slot>
        <div class="flex toast__desc">
          <slot name="message"> </slot>
        </div>
        <div class="icon w-h-24 toast-right-icon" @click="closeToast"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MToast",
  methods: {
    /**
     * bắn sự kiển ẩn lên cha để ẩn toast
     * Author: Văn Anh (10/1/2023)
     */
    closeToast() {
      try {
        this.$emit("btnCloseToast");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
@import url(./toast.css);
</style>
