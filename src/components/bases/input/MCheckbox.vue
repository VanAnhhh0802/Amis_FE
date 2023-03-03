<template lang="">
  <input 
  :disabled ="disabled" 
  type="checkbox" 
  name="" 
  :id="id" 
  class="m-input-checkbox" 
  :checked="checked" 
  @change="selectedCheckBox" 
  />
  <label 
  :for="id" 
  class="m-checkbox-lable"  
  ><span></span>
  </label>
</template>
<script>
export default {
  name: "MCheckbox",
  props: {
    id : String,
    checked : Boolean,
    
    disabled : {
      type : Boolean,
      default : false
    }
  },
  emits: ["checkbox-selected",],
  methods: {
    /**
     * sự kiện check toàn bộ nhân viên
     * Author: Văn Anh (13/1/2023)
     */
     selectedCheckBox(e){
        this.$emit("checkbox-selected",e.target.checked,this.id);
      }
  },
};
</script>
<style scoped>
@import url(./input.css);
</style>
