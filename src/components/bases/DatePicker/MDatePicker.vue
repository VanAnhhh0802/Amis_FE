<template>
  <div class="date_wrapper" >
    <DatePicker
        style="min-width: 150px;padding: 0px;border: 0px;"
        class="textfield__input "
        :enable-time-picker="false"
        v-model="date"
        :disabled-dates="disabledDate"
        @update:modelValue="changeDateValue"
        :config="options"
        locale="vi"
        now-button-label="Hôm nay"
        text-input
        :ref="dateName"
        auto-apply
        start-date="now"
        close-on-scroll
        show-now-button
        format="dd/MM/yyyy"
        :day-names="['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']"
      >
        <template #dp-input="{ value }">  
          <div class="date-picker__wrapper">
            <input
              :class="{
                'textfield__input':true, 
                'modal-textfield__input': true,
                'textfield--error-input': isError 
              }"
              type="text"
              placeholder="DD/MM/YYYY"
              :ref="name"
              :name="name"
              :value="value"
              :style="style"
              autocomplete="off"
              :tabindex="tabIndex"
              @blur="blurInputValue"
              @input="onInputValue"
              :disabled="isDisabled"
              
            />
            <p class="text-error">{{ errorMsg}}</p>
            <p class="date-picker__icon">
              <i></i>
            </p>
          </div>
        </template>
      </DatePicker>
      <div class="error-info error-bg" v-if="tooltipError" style="top: 42px;left: -80px"
      :style="{'top' : topTooltip, 'left': leftTooltip}"
      >
        <div class="error-arrow error-bg" style="left: 50%;top: -15%;"></div>
        <div class="error-text">{{ tooltipContent }}</div>
      </div>
  </div>
</template>
<script>
import commonJS from "@/script/common.js"
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
export default {
  name: "MDatePicker",
  emits: ["errorInputMessage","update:modelValue", "blurInput", "changeDate"],
  components: {
    DatePicker
  },
  data() {
    return {
      isError:false,
      disabled:false,
      date: this.modelValue,
      options: {
        format: "DD/MM/YYYY",
        useCurrent: false,
      },
    };
  },
  props: {
    isErrorInput:Boolean,
    name: {
      type: String,
    },
    errorMsg: {
      type: String,
    },
    rules: {
      type: Array,
      default: new Array(0),
    },
    tabIndex : Number,
    modelValue: [String,Date],
    dateName:String,
    tooltipError: Boolean,
    tooltipContent: String,
    style:String,
    isDisabled: Boolean,
    topTooltip: String,
    leftTooltip: String,
  },
  created(){
    this.disabled = this.isDisabled;
  },
  methods: {
    /**
     * Truyền sự kiện date thay đổi
     * Author : Văn anh (05/1/2023)
     */
    changeDateValue(date) {
      this.$emit("update:modelValue", date, this.name);
      this.$refs[this.dateName].closeMenu();
    },
    
    /**
     * Xử lý khi blur input
     * Author : Văn Anh (05/1/2023)
     */
    blurInputValue(event){
      if(this.isValidDate(event)){
        const newDate = new Date(event.target.value.split('/').reverse().join('-'));
        this.$emit('update:modelValue',newDate, this.name);
        this.$emit("blurInput");
       }else{
        this.date= null;
        this.$refs[this.name] = "";
        this.$emit('update:modelValue',undefined, this.name);
       }
    }, 
    /**
     * Xử lý khi nhập input
     * Author : Văn anh (05/1/2023)
     */
    onInputValue(event) {
      if(this.isValidDate(event)){
        const newDate = new Date(event.target.value.split('/').reverse().join('-'));
        this.$emit('update:modelValue',newDate, this.name);
        }
    },
      /**
     * Check date hợp lệ
     * Author : Văn anh (05/1/2023)
     */
    isValidDate(event) {
    //   var propertyName = this.dateName;
      var value = event.target.value;
      const dateRegex =/^([1-9]|[0-2][0-9]|3[0-1])\/([1-9]|0[1-9]|1[0-2])\/[1-2][0-9][0-9][0-9]$/;
      return dateRegex.test(value)
    },
     /**
     * Disable ngày lớn hơn ngày hiện tại
     * Author: Văn anh (10/2/2023)
     */
    disabledDate(time) {
      return time.getTime() > Date.now();
    },
       /**
     * author:Văn anh(2/1/2023)
     * Focus vào ô input
     */
    onFocus() {
      this.$refs[this.name].focus();
    },
    /**
     * Hàm forcus vào input khi có lỗi
     * Author: Văn Anh (9/1/2023)
     */
     inputFocus(){
      try {
        this.$nextTick(function () {
          this.$refs[this.name].focus();
        });
      }
      catch (error) {
        console.log(error);
      }
    }
  },
  watch: {
    isDisabled: function(newValue){
      console.log("disabled", newValue);
     this.disabled = newValue;

    },

    date: function(){
      this.$emit("changeDate");
      console.log("change");
    },
    /**
     * Truyền modelValue thay đổi
     * Author : Văn anh (05/1/2023)
     */
    modelValue: function () {
      this.date = this.modelValue;
      this.$emit("changeDate", this.date);

      console.log("date: " + this.$emit("changeDate", this.date));
    },
    /**
     * Hàm theo dõi sự thay đổi của isErrorInput mỗi khi validate
     * Author: Văn ANh(2/3/2023)
     */
    isErrorInput: function (newValue) {
      console.log("date 1", this.isErrorInput);
      // this.isError = this.isErrorInput ;
      this.isError = newValue ;
      
    }
   
  },
  computed: {
    /**
     * Format date
     * Author : Văn anh (05/1/2023)
     */
    formatDate() {
      console.log(this.modelValue);
      return commonJS.formatDate(this.modelValue);
    },
  },
};
</script>
  <style scoped>
    @import url(./datepicker.css);
  </style>