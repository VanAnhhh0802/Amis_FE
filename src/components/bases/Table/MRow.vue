<template lang="">
    <tr
        class="employee-infor"
    >
        <td class="width-table-checkbox list-checkbox body-checkbox" >
        <MCheckbox
        ></MCheckbox>
        </td>
        <td class="w-150 text-align-center">{{ item.AccountingDate || "" }}</td>
        <td class="text-align-center">{{ item.VouchersDate || "" }}</td>
        <td class="text-align-left w-150">{{ item.VoucherNumber|| "" }}</td>
        <td class="text-align-left w-150">{{ item.Explain || ""}}</td>
        <td class="text-align-right w-150">{{ this.formatMoney(item.Money) || ""}}</td>
        <td class="text-align-left min-w-200">{{ item.SubjectId || ""}}</td>
        <td class="text-align-left min-w-200">{{ item.SubjectName || ""}}</td>
        <td class="text-align-left min-w-200">{{ item.Address || ""}}</td>
        <td class="text-align-center w-100 tb-function" >
        <div class="flex table__function" >
            <button
            class="btn-function-fix"
            @click="rowOnDbClick(item)"
            >
            Xem
            </button>
            <button
            class="btn-function__dropdown"
            @click="
                showOnDropMenu($event, item.PayId)
            "
            >
            <div class="icon w-h-24 function-dropdown-icon"></div>
            </button>
        </div>
        </td>
    </tr>
    <teleport to="body" >
    <div
      id="btn-dropdown-menu"
      class="dropdown-menu"
      v-if="isShowOnDropMenu"
      :style="[isDropdown ? dropdownPosition : dropdownPositionReverse]"
    >
      <ul class="dropdown-list">
        <li class="dropdown_list-item"
        @click="btnReplicationOnDetail()"
        >Nhân bản</li>
        <li id="btn-delete" class="dropdown_list-item" @click="showOnDialogDelete">
          Xóa
        </li>
        <div class="tooltip">
            <li class="dropdown_list-item">Ngừng sử dụng</li>
            <div class="tooltip-text tooltip-reload">Đang phát triển</div>
          </div>
      </ul>
    </div>
  </teleport>
</template>
<script>
import CommonJs from "@/script/common"

export default {
    name: "MRow",
    props: {
        item: Object,
        listCheck: Array,
        isCheckbox: Boolean,
    },
    data(){
        return {
          isShowOnDropMenu: false,
            dropdownPositionX: 0,
            dropdownPositionY: 0,
        }
    },
    watch: {
      item : function(){
        console.log("item",this.item);        

      }
    },
    computed: {
    /**
     * Hàm tính toán vị trí của dropdown function
     */
    dropdownPosition() {
      return {
        top: `calc(${this.dropdownPositionY}px + 10px)`,
        left: `calc(${this.dropdownPositionX}px - 55px)`,
      };
    },
    /**
     * Hàm tính toán vị trí ở cuối dropdown
     */
    dropdownPositionReverse(){
      return {
        top: `calc(${this.dropdownPositionY}px - 97px)`,
        left: `calc(${this.dropdownPositionX}px - 55px)`,
      }
    }
  },
    methods: {
      /**
     * Hàm định dạng tiền tệ
     * @param {String} money
     * Author: Văn Anh (15/3/2023) 
     */
    formatMoney(money){
        return CommonJs.formatMoney(money);
    },
        /**
     * Hiển thị drop menu
     * Athor: Văn Anh(21/12/2022)
     */
    showOnDropMenu(e, deleteEmployeeId, deleteEmployeeCode) {
      try {
        //Xét vị trí cho dropdown
        if (e.clientY > 560){
          this.isDropdown = false;
          console.log("chay");
        }
        else {
          this.isDropdown = true;
        }
        this.dropdownPositionX = e.clientX;
        this.dropdownPositionY = e.clientY;
        //Hiển thị drop menu
        this.isShowOnDropMenu = !this.isShowOnDropMenu;
        this.warningDeleteMessage = `Bạn có thực sự muốn xóa <${deleteEmployeeCode}> không?`;
        this.deleteEmployeeId = deleteEmployeeId;
      } catch (error) {
        console.log(error);
      }
    },
    }
}
</script>
<style scoped>
    @import url(./table.css);
</style>