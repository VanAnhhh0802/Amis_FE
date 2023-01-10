<template lang="">
  <div id="dialog--notice" class="dialog">
    <div class="flex" style="justify-content: center; height: 100%">
      <div class="dialog__content">
        <div class="flex dialog-content__header">
          <div class="dialog-header__title">
            <slot name="title">
              {{ textTitle }}
            </slot>
          </div>
          <div
            class="icon w-h-24 dialog__btn--acept dialog__header-icon"
            @click="btnClose"
          ></div>
        </div>
        <div class="dialog-content__container">
          <li class="flex dialog-mgs">
            <div
              class="icon w-h-24 btn-dialog--close dialog__container-icon"
            ></div>
            <slot name="message">{{ message }}</slot>
          </li>
        </div>
        <div class="dialog-content__footer">
          <slot name="footer"> </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MDialog",
  data() {
    return {};
  },
  props: ["textTitle", "message"],
  methods: {
    /**
     * button đóng
     * Author: Văn Anh(9/1/2023)
     */
    btnClose() {
      try {
        this.$emit("btnCloseDialog");
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Click vào đồng ý
     * Author: Văn Anh (9/1/2023)
     */
    // btnDelete() {
    //   try {
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
};
</script>
<style scoped>
@import url(./dialog.css);
</style>
