<template>
  <div class="input-wrapper">
    <label for="" v-if="label"
      >{{ label }}
      <span class="input--required" v-if="inputRequired">*</span></label
    >
    <input
      :type="inputType"
      autocomplete="off"
      class="input"
      :style="{ width: width, border: border }"
      v-model="value"
      :tabindex="tabIndex"
      :class="inputError"
      @focus="inputOnFocus"
      @blur="inputOutFocus"
      :placeholder="placeholder"
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
    inputRequired: Boolean,
    modelValue: String,
    isBorderError: String,
    tabIndex: Number,
    border: String,
    inputError: Boolean,
    placeholder: String,
  },

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
    searchInput() {
      try {
        this.$parent.listEmployees();
      } catch (error) {
        console.log(error);
      }
    },
    inputOnFocus() {
      try {
        this.$emit("inputFocus");
      } catch (error) {
        console.log(error);
      }
    },
    inputOutFocus() {
      try {
        this.$emit("inputOutFocus");
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
