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
      :class="{ 'input--error': inputError }"
      @focus="inputOnFocus"
      @blur="inputOutFocus"
      :placeholder="placeholder"
      ref="refs"
      @input="input"
    />
    <!-- <div class="error-text" v-if="inputError">{{ inputErrorText }}</div> -->
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
    refs: String,
    inputErrorText: String,
    input:String,
  },

  data() {
    return {
      //CÁc trường bắt buộc nhập
      isRequiredShow: false,
      isEmployeeCodeError: false,
      value: null,
    };
  },
  watch: {
    modelValue: function (newValue) {
      this.value = newValue;
    },
    value: function (newValue) {
      this.$emit("update:model-Value", newValue);
    },
  },
  methods: {
    /*
     * Hàm xử lý biding 2 chiều
     * Author: Văn Anh (9/1/2023)
     */
    // searchInput() {
    //   try {
    //     console.log("ádash");
    //     this.$parent.searchEmployee();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    /*
     * Hàm xử lý Input focus
     * Author: Văn Anh (9/1/2023)
     */
    inputOnFocus() {
      try {
        this.$emit("inputFocus");
      } catch (error) {
        console.log(error);
      }
    },
    /*
     * Hàm xử lý input không focus
     * Author: Văn Anh (9/1/2023)
     */
    inputOutFocus() {
      try {
        this.$emit("inputOutFocus");
      } catch (error) {
        console.log(error);
      }
    },
    /*
     * Hàm xử lý Tab order
     * Author: Văn Anh (9/1/2023)
     */
    inputTabOrderFocus() {
      try {
        this.$emit.refs.focus();
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
