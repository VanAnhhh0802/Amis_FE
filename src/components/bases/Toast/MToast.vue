<template>
  <div
      class="toast"
      :class="{
        'toast--success': isSuccessToast,
        'toast--error':isErrorToast
      }"
  >
    <p class="toast__icon">
      <i class="toast__icon__img"></i>
    </p>
    <div class="toast__content">
      <p class="toast__content__title">
        {{toastTitle}}
      </p>
      <p class="toast__content__text">{{toastContent}}</p>
    </div>
    <div class="toast__action">
      <div class="toast__action_close" @click="$emit('closeToast')">
        <i class="toast__action_close__img"></i>
      </div>
    </div>
  </div>
  </template>
  <script>
  import resource from "@/lib/resource";
  export default {
    emits:["closeToast","onHideToast"],
    data() {
    return {
      toastContent:"",// Nội dung toast
    }
    },
    props:{
      toastType:String,
    toastTitle:{
      default:'Thành công!',
      type: String
    },
    isSuccessToast:{
      default:true,
      type: Boolean
    },
    isErrorToast: {
      default:false,
      type: Boolean
    }
    },
    mounted() {
    // eslint-disable-next-line
     setTimeout(() => {
        this.$emit("onHideToast");
      }, 2000);
    },
    methods: {
    changeToastContent() {
      console.log("chay");
      switch(this.toastType){
        case resource.FORM_MODE.DUPLICATE:
          this.toastContent = resource.FORM_MESSAGE.SUCCESS.DUPLICATE
          break;
        case resource.FORM_MODE.ADD:
          this.toastContent = resource.FORM_MESSAGE.SUCCESS.ADD
          break;
        case resource.FORM_MODE.EDIT:
          this.toastContent = resource.FORM_MESSAGE.SUCCESS.EDIT
          break;
        case resource.FORM_MODE.DELETE:
          this.toastContent = resource.FORM_MESSAGE.SUCCESS.DELETE
          break;
        case resource.FORM_MODE.ERROR:
          this.toastContent = resource.FORM_MESSAGE.ERROR.ERRORSERVER
      }
      
    }
    },
    created() {
    this.changeToastContent()
    }
  };
</script>
<style scoped>
@import url(./toast.css);
</style>
