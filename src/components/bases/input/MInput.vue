<template>
  <div class="input-wrapper" :class="{'border-focus': isBorder}">
    <label for="" v-if="label"
      >{{ label }}
      <span class="input--required" v-if="inputRequired">*</span>
      <div class="error-info" v-if="tooltip">
        <div class="error-text">{{ tooltipMessage }}</div>
        <div class="error-arrow"></div>
      </div>
    </label>
    <div class="input_content" 
    
    >
      <input
        :type="inputType"
        autocomplete="off"
        class="input"
        :style="{ width: width, height: height, border: border}"
        v-model="value"
        :tabindex="tabIndex"
        :class="{ 'input--error': isError}"
        @focus="inputOnFocus"
        @blur="inputOutFocus"
        :placeholder="placeholder"
        @input="input"
        :ref="nameRef"
      />
      <div class="error-info error-bg" v-if="tooltipError" style="top: 33px;left: -32px">
        <div class="error-arrow error-bg" style="left: 50%;
    top: -15%;"></div>
        <div class="error-text">{{ tooltipContent }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MInput",
  props: {
    label: String,
    width: String,
    height: String,
    inputType: String,
    inputRequired: Boolean,
    modelValue: String,
    tabIndex: Number,
    border: String,
    placeholder: String,
    input:String,
    nameRef:String,
    tooltip: String,
    tooltipContent: String,
    error: Boolean,
    tooltipError:Boolean,
    tooltipMessage: String,
  },

  data() {
    return {
      //CÁc trường bắt buộc nhập
      isRequiredShow: false,
      isEmployeeCodeError: false,
      value: null,
      isError: false,
      isBorder: false,
    };
  },
  emits: ["update:model-Value", "inputFocus", "inputOutFocus"],
 
  watch: {
    /**
     * Theo dõi sự thay đổi của biến modelValue
     * @param {} newValue 
     */
    modelValue: function (newValue) {
      this.value = newValue;
    },
    /**
     * Theo dõi sự thay đổi của biến value
     * @param {*} newValue 
     */
    value: function (newValue) {
      this.$emit("update:model-Value", newValue);
    },
    error: function () {
        this.isError = this.error;
    },
    
  },
  methods: {
    
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
        this.isBorder = false;
      } catch (error) {
        console.log(error);
      }
    },
    
    /**
     * Hàm forcus vào input
     * Author: Văn Anh (9/1/2023)
     */
    inputFocus(){
      try {
        this.$nextTick(function () {
          this.$refs[this.nameRef].focus();
        });
      }
      catch (error) {
        console.log(error);
      }
    }
    
  },
};
</script>
<style scoped>
@import url(./input.css);

</style>
