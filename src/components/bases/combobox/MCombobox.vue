<template lang="">
  <div class="a-combobox">
    <label for=""
      >{{ label }}
      <span class="input--required" v-if="isRequired">*</span>
    </label>
    <div class="combobox" :class="{ 'border-focus': inputOnFocus }">
      <input
        :id="id"
        type="text"
        class="input combobox__input"
        v-model="textSelected"
        @input="onSearchItem"
        @keydown="inputOnKeyDown"
        :tabindex="tabIndex"
        @focus="inputOnFocus = true"
        @blur="inputOnFocus = false"
      />
      <button
        class="combobox__button"
        @click="onShowHideData"
        @keydown="inputOnKeyDown"
      >
        <i class="icofont-rounded-down"></i>
      </button>
      <div class="error-text" v-if="isShowError">
        Đơn vị viên không được để trống
      </div>
    </div>
    <div class="combobox__data" v-show="isShowData">
      <a
        class="combobox-item"
        v-for="(department, index) in departmentSearch"
        :key="index"
        :value="department[propValue]"
        @click="itemOnSelect(department, index)"
        :ref="`item_${index}`"
        :class="{ 'combobox-item--active': index == indexItemSelect }"
        >{{ department[propName] }}</a
      >
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "MCombobox",
  data() {
    return {
      isShowData: false,
      indexItemSelect: 0,
      textSelected: null,
      itemSelected: null,
      isShowError: false,
      inputOnFocus: false,
      departments: [],
      //Tạo 1 mảng rỗng
      departmentSearch: [],
    };
  },
  props: {
    id: String,
    label: String,
    isRequired: Boolean,
    api: String,
    propName: String,
    propValue: String,
    modelValue: String,
    tabIndex: Number,
  },
  emits: ["modelValue"],
  created() {
    if (this.api) {
      axios
        .get(this.api)
        .then((data) => {
          this.departments = data.data;
          //Gán mảng search để khi thay đổi thì không ảnh hưởng  đến mảng departments
          this.departmentSearch = data.data;
          this.setItemSelected();
          console.log(this.departments);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  },
  computed: {
    findIdexSelected: function () {
      var me = this;
      //Tìm index của item đã được chọn
      let findIdex = this.departmentSearch.findIndex(
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
        const keyCode = event.keyCode;
        switch (keyCode) {
          case this.MISAEnum.KEY_CODE.ENTER:
            //Xác định item đang chọn dựa vào index
            //eslint-disable-next-line no-case-declarations
            const item = this.departmentSearch[this.indexItemSelect];
            this.itemOnSelect(item);
            break;
          case this.MISAEnum.KEY_CODE.ROW_UP:
            if (!this.isShowData) {
              this.isShowData = true;
            }
            if (this.indexItemSelect > 0) {
              this.indexItemSelect--;
            }
            break;
          case this.MISAEnum.KEY_CODE.ROW_DOWN:
            if (!this.isShowData) {
              this.isShowData = true;
            }
            //eslint-disable-next-line no-case-declarations
            let maxLength = this.departmentSearch.length;
            if (this.indexItemSelect < maxLength - 1) {
              this.indexItemSelect++;
            }
            break;
          default:
            break;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Sự kiện người dùng focus vào input
     * Author: Văn Anh (10/1/2023)
     */
    // inputOnFocus() {
    //   try {
    //     log("eeee");
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    /**
     * Click vào item thì hiển thị lên combobox
     * Author: Văn Anh (20/1/2023)
     */
    itemOnSelect(department) {
      try {
        var me = this;
        //Sau khi chọn 1 trường thì thực hiện reset lại danh sách
        this.departmentSearch = this.departments;
        //Gán item đang đc chọn cho department
        this.itemSelected = department;

        //set index của item được chọn
        this.indexItemSelect = me.findIdexSelected;
        this.textSelected = department[this.propName];
        this.isShowData = false;
        this.$emit("update:modelValue", department[this.propValue]);
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
        let departmentSelected = this.departments.find(
          (item) => item[me.propValue] == me.modelValue
        );
        //Nếu tìm thấy prop name truyền vào trùng với propName thì hiển thị lên ô input
        if (departmentSelected) {
          this.textSelected = departmentSelected[this.propName];
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm tìm kiếm department
     * Author: Văn Anh (20/1/2023)
     */
    onSearchItem() {
      try {
        console.log(this.textSelected);
        var me = this;
        //Tìm các trường tương ứng với nhập liệu ở input
        this.departmentSearch = this.departments.filter((item) =>
          item[me.propName]
            .toLowerCase()
            .includes(me.textSelected.toLowerCase())
        );
        this.isShowData = true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
@import url(./combobox.css);
</style>
