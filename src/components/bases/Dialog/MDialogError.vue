<template >
    <div id="dialog--notice" class="dialog">
    <div class="flex" style="justify-content: center; height: 100%">
      <div class="dialog__content">
        <div class="flex dialog-content__header">
          <div class="dialog-header__title">{{  this.title}}</div>
          <div
            
            @click="hideDialog"
          >
          <div class="icon w-h-24 dialog__btn--acept dialog__header-icon"></div>
          </div>
        </div>
        <div class="dialog-content__container">
            <li class="flex dialog-mgs" style="font-weight: 500!important;">
                <div
                class="icon w-h-24 btn-dialog--close dialog__error-icon"
                ></div>
                {{ this.message }}
            </li>
        </div>
        <div class="dialog-content__footer">
            <MButton
                class="btn btn--primary dialog__btn--acept"
                text="Đóng"
            @click="hideDialog"
            >
            </MButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MButton from '../Button/MButton.vue';
export default {
    name: "MDialogError",
    components: {
        MButton
    },
    props:{
        title: String,
        message: String,
    },
    methods: {
        /**
         * Hàm đóng dialog
         * Author: Văn Anh (19/3/2023)
         */
        hideDialog(){
            this.$emit("btnCloseDialog")
        },
        /**
         * author:Văn Anh(2/3/2023)
         * Hàm onKeyDown xử lí khi nhấn phím tắt
         */
         onKeyDown(event) {
            if (event.key === "Escape" || event.key === "Enter"){
                this.$emit("btnCloseDialog")
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
}
</script>
<style scoped>
    @import url(./dialog.css);
</style>