<template >
  <div class="a-combobox" >
    <label v-if="label"
      >{{ label }}
      <span class="input--required" v-if="isRequired">*</span>
    </label>
    <div
      class="combobox"
      :class="{
        'border-focus': inputOnFocus,
        'field--error': isError,
        'combobox--disable': isDisabled
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
      <div class=" btn-combobox-icon"
      :style="{transform: isShowData ? 'rotate(180deg)' : 'rotate(0deg)', }" 
      
      ></div>
      </div>
      <div class="error-info error-bg" v-if="tooltipError" style="top: 42px;left: 44px">
        <div class="error-arrow error-bg" style="left: 50%;top: -15%;"></div>
        <div class="error-text">{{ tooltipContent }}</div>
      </div>
      
    </div>
    <div class="combobox__data" v-if="isShowData && !isTable&&!isDisabled">
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
    <!-- TABLE -->
    <div class="wrapper-table" v-if="isTable && isShowData">     
      <table class="table table-cbo">
          <tbody class="tbd" ref="refList">
              <tr class="table-row">
                  <th
                      v-for="(col, index) in columns"
                      :key="index"
                      :style="{ width: col.width, textAlign: col.align }"
                      style="text-transform: inherit;"
                  >
                      {{ col.columnName }}
                  </th>
              </tr>
              <tr
                  ref="refItem"
                  class="table-cbo-row"
                  v-for="(option, index) in entities"
                  :key="index"
                  @click="itemOnSelect(option, index)"
                  :class="{ 'combobox-item--active': index == indexItemSelect }"
              >
                  <td
                      v-for="(col, index) in columns"
                      :key="index"
                  >
                      {{ option[col.identityOption] }}
                  </td>
              </tr>
          </tbody>
      </table>
    </div>
</div>
</template>
<script>
import axios from "axios";
// import MTableCombobox from "./MTableCombobox.vue";
export default {
  name: "MCombobox",
  components: {
    // MTableCombobox,
  },
  data() {
    return {
      //Khai báo biến ngăn chặn tăng indexItemSelected
      unIndexItemSelect: true,
      isError: false,
      isShowData: false,
      indexItemSelect: 0,
      textSelected: this.defaultName,
      itemSelected: null,
      inputOnFocus: false,
      entities: [],
      //Tạo 1 mảng rỗng
      entitySearch: [],
    };
  },
  props: {
    id: String,
    label: String,
    isDisabled: Boolean,
    defaultName: String,
    defaultIndex: Number,
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
  emits: [
    "update:modelValue", 
    "inputFocus", 
    "comboboxOutFocus", 
    "dataCombobox", 
    "changeGrade", 
    "parentAccountNumber",
     "removeParentId"
  ],
  created() {
    if (this.api) {
      axios
        .get(this.api)
        .then((data) => {
          this.entities = [...data.data]; 
          this.entitySearch = data.data;
          //Gán mảng search để khi thay đổi thì không ảnh hưởng  đến mảng entities
          // this.entitySearch = data.data;
          this.indexItemSelect = 0;
          this.textSelected = null;
          this.setItemSelected();
        })
        .catch((response) => {
          console.log(response);
        });
    }
    else {
      this.entitySearch =[...this.list];
      this.entities =[...this.list];
    }
    if (this.options){
      this.entitySearch = [...this.options]
      this.entities = [...this.options]
    }
  },
  updated(){
    if(this.textSelected){
      this.setItemSelected();
    }
  },
  watch: {
    modelValue: {
      handler: function (newValue) {
        if (!newValue && !this.defaultName) {
          this.textSelected = "";
        }
      },immediate: true,
    },
    /**
     * Hàm theo dõi border combobox khi bị lỗi
     * Author: Văn Anh(25/3/2023)
     */
    inputErrorCombobox: function () {
      this.isError = this.inputErrorCombobox
      console.log("error",this.isError);
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
      console.log("findIdex",findIdex);
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
            console.log(this.indexItemSelect);
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
        if(!this.textSelected){
          this.$emit("removeParentId")
        }
        
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
        console.log("asd",this.itemSelected?.Grade);
        this.$emit("changeGrande", this.itemSelected?.Grade);

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
          (item) =>  {
            item[me.propValue] == me.modelValue
            console.log(me.modelValue);
          }
        );

        //Truyền bậc của tài khoản cha 
        if(this.isTable){
          this.$emit("changeGrade", entitySelected.Grade)
          this.$emit("parentAccountNumber", entitySelected.AccountNumber)
        }

        //Nếu tìm thấy prop name truyền vào trùng với propName thì hiển thị lên ô input
        if (entitySelected) {
          this.textSelected = entitySelected[this.propName];
          //Tính toán lại index của item đã được chọn
          let finIndex = this.entities.findIndex((item) => item[me.propName] === entitySelected[me.propValue]);

          this.indexItemSelect  = finIndex;
        }
        if(!this.isTable){
          this.$emit("update:modelValue", entitySelected[this.propValue])
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
        // this.entitySearch = this.entities.filter((item) =>
        //   item[me.propNa]
        // );
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

tr{
    height: 28px !important;
    border-bottom: none;
    cursor: pointer;
    
}
tr:hover>td{
    background-color: var(--main-color);
    color: #fff;
    font-weight: 600;
    cursor: pointer!important;
}
td, th{
    border: none !important;
}
.wrapper-table {
    border: 1px solid #babec5;
    border-radius: 2px;
    position: absolute;
    z-index: 11;
    top: 30px;
}

.table-cbo {
    background-color: #fff;
    border: 1px solid #babec5;
    border-radius: 2px;
    overflow: auto;
    box-shadow: 0 -8px 34px 0 rgb(0 0 0 / 5%);
    width: max-content !important;
    overflow: hidden;
    font-weight: 400;
}

.tbd {
    display: block;
    overflow: auto;
    max-height: 200px !important;
    width: max-content !important;
    position: relative;
}

.table-cbo th,
.table-cbo td {
    padding: 0 10px;
    height: 28px;
}
.table-cbo th:last-child {
    background: #f5f5f5;
    border: none!important;
}
.table-cbo td:last-child{
    border: none !important;
}
.table-cbo-text {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    overflow: hidden;
    line-height: 28px;
}.wrapper-cbo-table {
    border: 1px solid #babec5;
    border-radius: 2px;
}

.table-cbo {
    background-color: #fff;
    border: 1px solid #babec5;
    border-radius: 2px;
    overflow: auto;
    box-shadow: 0 -8px 34px 0 rgb(0 0 0 / 5%);
    width: max-content !important;
    overflow: hidden;
    font-weight: 400;
}

.tbd {
    display: block;
    overflow: auto;
    max-height: 200px !important;
    width: max-content !important;
    position: relative;
}

.table-cbo th,
.table-cbo td {
    padding: 0 10px;
    height: 28px;
}

.table-cbo-text {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    overflow: hidden;
    line-height: 28px;
}

.table-cbo-row > td:last-child {
  background: transparent;
}
.table-cbo-row:hover > td {
  background: var(--main-color);
}
</style>
