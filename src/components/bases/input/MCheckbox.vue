<template lang="">
  <input :disabled ="disabled" type="checkbox" name="" :id="id" class="m-input-checkbox" :checked="checked" @change="selectedCheckBox()" />
  <label :for="id" class="m-checkbox-lable"  ><span></span></label>
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
  emits: ["checkbox-selected", "btnCheck"],
  methods: {
      selectedCheckBox(){
        this.$emit("checkbox-selected",!this.checked,this.id);
      },
    /**
     * sự kiện check toàn bộ nhân viên
     * Author: Văn Anh (13/1/2023)
     */
    checkAll() {
      try {
        this.$emit("btnCheck");
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * sự kiện check 1 nhân viên
     * Author: Văn Anh (13/1/2023)
     */
    selectChecked() {
      try {
        this.$emit("checkedEmployee");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
@import url(./input.css);
</style>
