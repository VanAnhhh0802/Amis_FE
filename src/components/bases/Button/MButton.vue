<template lang="">
  <button 
  class="btn" 
  :class ="{'background-disable': disable}"
  :tabindex="tabIndex" 
  :ref="refName" 
  :disabled="disable"
  >{{ text }}</button>
</template>
<script>
export default {
  name: "MButton",
  props: {
    text: String,
    tabIndex: Number,
    refName: String,
    disable: Boolean,
  },
  methods:{
    /**\
     * Hàm xử lý btn focus 
     * Văn Anh (3/3/2023)
     */
    buttonFocus(){
      try {
        this.$nextTick(function () {
          this.$refs[this.refName].focus();
        });
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
