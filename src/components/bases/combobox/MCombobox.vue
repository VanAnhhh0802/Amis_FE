<template >
  <div class="a-combobox">
    <label v-if="label"
      >{{ label }}
      <span class="input--required" v-if="isRequired">*</span>
    </label>
    <div
      class="combobox"
      :class="{
        'border-focus': inputOnFocus,
        'field--error': isError,
      }"
    >
      <input
        :id="id"
        type="text"
        autocomplete="off"
        class="input combobox__input"
        v-model="textSelected"
        @input="onSearchItem"
        @keydown="inputOnKeyDown"
        :tabindex="tabIndex"
        @focus="inputFocus"
        @blur="inputOutFocus"
        :ref ="nameRef"
      />
      <div
        class="combobox__button "
        @click="onShowHideData"
        @keydown="inputOnKeyDown"
        v-click-outside-element="hideData"
      >
      <div class=" btn-combobox-icon"></div>
      </div>
      <div class="error-info error-bg" v-if="tooltipError" style="top: 42px;left: 44px">
        <div class="error-arrow error-bg" style="left: 50%;top: -15%;"></div>
        <div class="error-text">{{ tooltipContent }}</div>
      </div>
      
    </div>
    <div class="combobox__data" v-if="isShowData && !isTable">
      <a 
        class="combobox-item"
        v-for="(entity, index) in entitySearch"
        :key="index"
        :value="entity[propValue]"
        @click="itemOnSelect(entity, index)"
        :ref="`item_${index}`"
        :class="{ 'combobox-item--active': index == indexItemSelect }"
        >{{ entity[propName] }}
      </a>
    </div>
      <MTableCombobox
      v-if="isTable && isShowData"
      :columns="this.columns"
      :options="this.entities"
      @select="itemOnSelect($event.option, $event.index)"
      ></MTableCombobox>
</div>
</template>
<script>
import axios from "axios";
import MTableCombobox from "./MTableCombobox.vue";
export default {
  name: "MCombobox",
  components: {
    MTableCombobox,
  },
  data() {
    return {
      //Khai báo biến ngăn chặn tăng indexItemSelected
      unIndexItemSelect: true,
      isError: false,
      isShowData: false,
      indexItemSelect: 0,
      textSelected: null,
      itemSelected: null,
      isShowError: false,
      inputOnFocus: false,
      entities: [],
      //Tạo 1 mảng rỗng
      entitySearch: [],
    };
  },
  props: {
    id: String,
    label: String,
    //Trường bắt buộc nhập
    isRequired: Boolean,
    api: String,
    propName: String,
    propValue: String,
    modelValue: String,
    tabIndex: Number,
    inputErrorCombobox: Boolean,
    nameRef: String,
    tooltipError: Boolean,
    tooltipContent: String,
    list: Array,
    columns: { 
      type: Array
    },
    options: {
      type: Array
    },
    isTable: Boolean,
  },
  emits: ["update:modelValue", "inputFocus", "comboboxOutFocus"],
  updated() {
    
    if (this.api) {
      axios
        .get(this.api)
        .then((data) => {
          this.entities = [...data.data]; 
          console.log(this.entities);
          this.entitySearch = data.data;
          
          //Gán mảng search để khi thay đổi thì không ảnh hưởng  đến mảng entities
          // this.entitySearch = data.data;
          this.setItemSelected();
        })
        .catch((response) => {
          console.log(response);
        });
    }
    else {
      this.entities =[...this.list];
      console.log(this.entities);
    }
    if (this.options){
      this.entitySearch = [...this.options]
      console.log(this.entitySearch);
    }
  },
  watch: {
    tabIndex: function(newValue) {
      console.log(newValue);
    },
    modelValue: {
      handler: function (newValue) {
        if (!newValue) {
          this.textSelected = "";
        }

      },immediate: true,
    },
    inputErrorCombobox: function () {
      if (!this.inputErrorCombobox){
        this.isError = false;
      }
      else {
        this.isError = true;
      }
    },
    /**
     * Hàm theo dõi text combobox sau khi đc chọn
     */
    textSelected: {
      handler: function (newValue) {
        if (!newValue) {
          this.$emit("update:modelValue", "");
          
        }
      },
      immediate: true,
    },
    list: function () {
      this.entities =[...this.list];
      console.log("watch",this.entities);
    }
  },
  computed: {
    /**
     * Hàm tính toán 
     */
    findIdexSelected: function () {
      var me = this;
      //Tìm index của item đã được chọn
      let findIdex = this.entitySearch.findIndex(
        (item) => item[me.propValue] == me.itemSelected[me.propValue]
      );
      return findIdex;
    },
  },
  methods: {
    /**
     * Hiển thị data combobox
     * Author: Văn Anh 10/1/2023
     */
    onShowHideData() {
      try {
        this.isShowData = !this.isShowData;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm sự kiện phím tắt
     * Author: Văn Anh (10/1/2023)
     */
    inputOnKeyDown(event) {
      try {
        console.log(event);
        const keyCode = event.keyCode;
        switch (keyCode) {
          case this.MISAEnum.KEY_CODE.ENTER:
            //Xác định item đang chọn dựa vào index
            this.unIndexItemSelect = true;
            //eslint-disable-next-line no-case-declarations
            const item = this.entitySearch[this.indexItemSelect];
            this.itemOnSelect(item);
            break;
          case this.MISAEnum.KEY_CODE.ROW_UP:
            if (!this.isShowData) {
              this.isShowData = true;
            }
            if (this.indexItemSelect > 0 && !this.unIndexItemSelect) {
              this.indexItemSelect--;
            }
            else {
              this.unIndexItemSelect = false;
            }
            break;
          case this.MISAEnum.KEY_CODE.ROW_DOWN:
            if (!this.isShowData) {
              this.isShowData = true;
            }
            //eslint-disable-next-line no-case-declarations
            let maxLength = this.entitySearch.length;
            if (this.indexItemSelect < maxLength - 1 && !this.unIndexItemSelect) {
              this.indexItemSelect++;
            }
            else {
              this.unIndexItemSelect = false;
            }
            break;
          default:
            break;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /*
     * Hàm xử lý  focus
     * Author: Văn Anh (9/1/2023)
     */
     comboboxFocus(){
      try {
        this.$nextTick(function () {
          this.$refs[this.nameRef].focus();
        });
      }
      catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm xử lý focus
     */
    inputFocus() {
      try {
        this.inputOnFocus = true;
        this.$emit("inputFocus");
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Sự kiện người dùng focus vào input
     * Author: Văn Anh (10/1/2023)
     */
    inputOutFocus() {
      try {
        this.inputOnFocus = false;
        this.isShowData = false;
        this.$emit("comboboxOutFocus");
        
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Click vào item thì hiển thị lên combobox
     * Author: Văn Anh (20/1/2023)
     */
    itemOnSelect(entity) {
      try {
        var me = this;
        //Sau khi chọn 1 trường thì thực hiện reset lại danh sách
        this.entitySearch = this.entities;
        //Gán item đang đc chọn cho entity
        this.itemSelected = entity;

        //set index của item được chọn
        this.indexItemSelect = me.findIdexSelected;
        this.textSelected = entity[this.propName];
        this.isShowData = false;
        this.$emit("update:modelValue", entity[this.propValue]);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm hiển thị 1 trường mặc định trong combobox
     * Author: Văn Anh (10/1/2023)
     */
    setItemSelected() {
      try {
        var me = this;
        //Tìm item tương ứng với modelValue truyền ở ngoài vào
        let entitySelected = this.entities.find(
          (item) => item[me.propValue] == me.modelValue
        );
        //Nếu tìm thấy prop name truyền vào trùng với propName thì hiển thị lên ô input
        if (entitySelected) {
          this.textSelected = entitySelected[this.propName];
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm tìm kiếm entity
     * Author: Văn Anh (20/1/2023)
     */
    onSearchItem() {
      try {
        var me = this;
        //Tìm các trường tương ứng với nhập liệu ở input
        this.entitySearch = this.entities.filter((item) =>
          item[me.propName]
            .toLowerCase()
            .includes(me.textSelected.toLowerCase())
        );
        this.isShowData = true;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm click outside ẩn data
     */
    hideData(){
      this.isShowData = false;
    }
  },
};
</script>
<style scoped>
@import url(./combobox.css);
</style>
