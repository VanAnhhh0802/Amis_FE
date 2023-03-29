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
            @click="btnClose"
          >
          <div class="icon w-h-24 dialog__btn--acept dialog__header-icon"></div>
          </div>
        </div>
        <div class="dialog-content__container">
          <slot name="message" >
            {{message}}
          </slot>
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
  emits: ["btnYes"],
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
     * author:Văn Anh(2/3/2023)
     * Hàm onKeyDown xử lí khi nhấn phím tắt
     */
      onKeyDown(event) {
        console.log(event);
        if (event.key === "Escape"){
            this.$emit("btnCloseDialog")
        }
        else if (event.key === "Enter"){
          this.$emit("btnYes");
        }
        
    }
  },
  mounted() {
      //Sự kiện bàn phím 
      document.addEventListener("keydown",this.onKeyDown);
  },
  unmounted() {
      //Sự kiện bàn phím
      document.removeEventListener("keydown",this.onKeyDown);
  }
};
</script>
<style scoped>
@import url(./dialog.css);
</style>
