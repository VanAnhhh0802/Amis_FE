<template>
    <div>
      <input
        class="input input-money"
        type="text"
        v-model="valueFormat"
        @keydown="handleBackspace"
        style="text-align: right;"
        :disabled="isDisabled"
        @blur="inputBlur"
      />
    </div>
  </template>
  <script>
  export default {
    name: "MInputMoney",
    props: ["modelValue", "isDisabled"],
    emits: ["update:modelValue", "blurInput"],
    data() {
      return {
        value: 0,
        valueFormat: 0,
      };
    },
    watch: {
      valueFormat: function (newValue) {
        if(newValue){
          console.log("value", this.value);
          // Cập nhật giá trị value
          this.value = parseInt(newValue.replaceAll(",", ""));
          this.valueFormat = this.money;
          console.log("format", this.valueFormat);
        }
        else {
            this.valueFormat = 0;
        }
      },
      value: function (newValue) {
        this.$emit("update:modelValue", newValue);
      },
      modelValue: function (newValue) {
        this.value = newValue;
        this.valueFormat = this.money;
      }
    },
    
    computed: {
      money: function () {
        if (this.value) {
          var money = new Intl.NumberFormat().format(this.value);
          return money;
        }
        else{
          return "";
        }
      },
    },
    created() {
      this.value = this.modelValue;
      this.valueFormat = this.money;
    },
    methods: {
      
    }
  };
  </script>
  
  <style scoped>
  @import url(./input.css);
  </style>
  