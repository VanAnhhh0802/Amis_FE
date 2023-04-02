<template>
    <div>
      <input
        class="input input-money"
        type="text"
        v-model="valueFormat"
        @keydown="handleBackspace"
        style="text-align: right;"
      />
    </div>
  </template>
  <script>
  export default {
    name: "MInputMoney",
    props: ["modelValue"],
    emits: ["update:modelValue"],
    data() {
      return {
        value: null,
        valueFormat: null,
      };
    },
    watch: {
      valueFormat: function (newValue) {
        if(newValue){
            // Cập nhật giá trị value
            this.value = parseInt(newValue.replaceAll(".", ""));
            console.log("value: " + this.value);
            
            this.valueFormat = this.money;
        }
        else {
            this.valueFormat = 0;
        }
      },
      value: function (newValue) {
        this.$emit("update:modelValue", newValue);
      },
    },
    methods:{
        
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
    },
    updated(){
        this.valueFormat = this.money;
    },
    
  };
  </script>
  
  <style scoped>
  @import url(./input.css);
  </style>
  