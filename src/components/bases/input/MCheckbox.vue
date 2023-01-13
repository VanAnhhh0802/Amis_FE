<template lang="">
  <div class="flex input-checkbox">
    <label>
      <input
        type="checkbox"
        id="chkProdTomove"
        @change="checkAll"
        :checked="selectChecked"
      />
      <span class="check-box-effect"></span>
    </label>
  </div>
</template>
<script>
export default {
  name: "MCheckbox",

  methods: {
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
