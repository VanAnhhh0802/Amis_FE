<template lang="">
  <div class="input-wrapper">
    <label for=""
      >{{ label }}
      <span class="input--required" v-if="inputRequired">*</span></label
    >
    <br />
    <input
      :type="inputType"
      class="input"
      :class="classInput"
      :style="{ width: width }"
      v-model="value"
      :tabindex="tabIndex"
    />
    <div class="error-text" v-if="isBorderError">Mã không được để trống</div>
  </div>
</template>
<script>
export default {
  name: "MInput",
  props: {
    label: String,
    width: String,
    inputType: String,
    inputRequired: String,
    modelValue: String,
    isBorderError: String,
    tabIndex: Number,
  },

  updated() {},
  data() {
    return {
      isRequiredShow: false,
      isEmployeeCodeError: false,
      value: null,
    };
  },
  watch: {
    modelValue: function (newValue) {
      console.log("modelValue", newValue);
      this.value = newValue;
      console.log("value----", this.value);
    },
    value: function (newValue) {
      this.$emit("update:model-Value", newValue);
      console.log("a:", newValue);
    },
  },
  methods: {
    // showOnRequired() {
    //   this.isRequiredShow = true;
    // },
    // showInputBorderRequired() {
    //   try {
    //     this.$emit("isShowInputBorderRequired");
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    /**
     * Hàm xử lý biding 2 chiều
     * Author: Văn Anh (9/1/2023)
     */
  },
};
</script>
<style scoped>
@import url(./input.css);
</style>
