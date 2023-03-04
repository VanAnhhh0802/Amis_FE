<template lang="">
  <button class="btn" :tabindex="tabIndex" :ref="refName" >{{ text }}</button>
</template>
<script>
export default {
  name: "MButton",
  props: {
    text: String,
    tabIndex: Number,
    refName: String,
  },
  methods:{
    /**\
     * Hàm xử lý btn focus 
     * Văn Anh (3/3/2023)
     */
    buttonFocus(){
      try {
        this.$refs[this.refName].focus();
      }
      catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style scoped>
@import url(./button.css);
</style>
