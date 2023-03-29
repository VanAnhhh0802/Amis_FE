<template lang="">
    <div class="list__table">
        <table style="width: 100%">
            <thead>
                <tr>
                    <th class="width-table-checkbox list-checkbox text-align-left " 
                    
                    >
                    <MCheckbox 
                    id ="check-all"
                    @checkbox-selected="selectPaymentCheck"
                    :checked ="this.checkAll"
                    ></MCheckbox>
                    </th>
                    <th class="text-align-center w-200" >{{ this.textAccountingDate }}</th>
                    <th class="text-align-center w-200" >{{ this.textVouchersDate}}</th>
                    <th class="text-align-left w-150" >{{ this.textNumberOfVouchers }}</th>
                    <th class="text-align-left " style="min-width: 200px;">{{ this.textExplain }}</th>
                    <th class="text-align-right w-150">{{ this.textMoney }}</th>
                    <th class="text-align-left w-150">{{ this.textSubjectId }}</th>
                    <th class="text-align-left w-150">{{ this.textSubjectName }}</th>
                    <th class="text-align-left " style="min-width: 200px;">{{ this.textBranch}}</th>
                    <th
                    class="text-align-center w-100 tb-function"
                    style="background-color: #f5f5f5; min-width: 130px;"
                    >
                    {{ this.textFunction }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    class="employee-infor"
                    v-for="(item, index) in entities"
                    :key="index"
                    :class="{employee__active: this.paymentSelected.includes(item.PaymentId) }"
                >
                    <td class="width-table-checkbox list-checkbox body-checkbox" 
                    :class="{employee__active: this.paymentSelected.includes(item.PaymentId) }"
                    >
                    <MCheckbox
                    :id ="item.PaymentId" 
                    :checked ="this.paymentSelected.includes(item.PaymentId)"
                    @checkboxSelected="selectPaymentCheck"
                    ></MCheckbox>
                    </td>
                    <td class="w-150 text-align-center">{{ this.formatDate(item.PaymentDate) || "" }}</td>
                    <td class="text-align-center">{{ this.formatDate(item.PostedDate) || "" }}</td>
                    <td class="text-align-left w-150">{{ item.PaymentNumber|| "" }}</td>
                    <td class="text-align-left w-150">{{ item.Reason || ""}}</td>
                    <td class="text-align-right w-150">{{ this.formatMoney(item.TotalAmount) || ""}}</td>
                    <td class="text-align-left min-w-200">{{ item.ObjectCode || ""}}</td>
                    <td class="text-align-left min-w-200">{{ item.ObjectName || ""}}</td>
                    <td class="text-align-left min-w-200">{{ item.Address || ""}}</td>
                    <td class="text-align-center w-100 tb-function"
                    :class="{employee__active: this.paymentSelected.includes(item.PaymentId) }"
                    
                    >
                    <div class="flex table__function" >
                        <button
                        class="btn-function-fix"
                        @click="rowOnDbClick(item)"
                        >
                        Xem
                        </button>
                        <button
                        class="btn-function__dropdown"
                        @click="this.showOnDropMenu($event, item.PaymentId, item.PaymentNumber)"
                        >
                        <div class="icon w-h-24 function-dropdown-icon"></div>
                        </button>
                    </div>
                    </td>
                </tr>
            </tbody>
            <tfoot
                v-if="!isNoData"
            style="position: sticky;bottom: 0;z-index: 99;">
                <tr style="border-top: 1px solid #f5f5f5; border-bottom: 1px solid #f5f5f5;">
                    <th class="text-align-center no-border" ></th>
                    <th class="text-align-center w-200 no-border" style="text-transform: inherit">Tổng</th>
                    <th class="text-align-left w-150 no-border" ></th>
                    <th class="text-align-left no-border" style="min-width: 200px;"></th>
                    <th class="text-align-left w-150 no-border"></th>
                    <th class="text-align-right w-150 no-border">{{this.formatMoney(this.totalMoney)}}</th>
                    <th class="text-align-left w-150 no-border"></th>
                    <th class="text-align-left no-border" style="min-width: 200px; background-color:#f5f5f5"></th>
                    <th class="text-align-left no-border" style="min-width: 200px; background-color:#f5f5f5"></th>
                    <th class="text-align-left no-border tb-function" style="min-width: 200px; background-color:#f5f5f5"></th>
                </tr>
            </tfoot>
        </table>
        <div v-if="isNoData" class="no-data-wrapper">
            <div
                :class="{'w-h-no-data': true}"
                class="no-data"
            ></div>
            <p style="text-align:center">Không có dữ liệu</p>
        </div>
    </div>
    <teleport to="body" >
    <div
      class="dropdown-menu"
      v-if="isShowOnDropMenu"
      :style="[isDropdown ? dropdownPosition : dropdownPositionReverse]"
    >
      <ul class="dropdown-list">
        <li class="dropdown_list-item">Xem</li>
        <li class="dropdown_list-item">Sửa</li>
        <li id="btn-delete" class="dropdown_list-item" @click="showOnDialogDelete">
          Xóa
        </li>
      </ul>
    </div>
    </teleport>
    <!-- Dialog -->
    <MDialog v-if="isShowDialog" @btnCloseDialog="closeDialog">
    <template v-slot:title>Cảnh báo</template>
    <template v-slot:message>
      <li class="flex dialog-mgs">
        <div
          class="icon w-h-24 btn-dialog--close dialog__warning-icon"
        ></div>
        {{ this.warningDeleteMessage }}
      </li>
    </template>
    <template v-slot:footer>
      <MButton
        class="btn btn--primary dialog__btn--acept"
        @click="btnOnDelete(this.deleteEmployeeId)"
        text="Có"
      >
      </MButton>
      <MButton
        class="btn--secondary dialog__btn--acept"
        @click="closeDialog"
        text="Không"
      >
      </MButton>
    </template>
  </MDialog>
  <MLoading v-if="isShowLoading"></MLoading>
</template>
<script>
import resource from "@/lib/resource";
import commonJs from '@/script/common';
import MDialog from '@/components/bases/Dialog/MDialog.vue';
import MLoading from "../Loading/MLoading.vue";
import { HTTPPayments } from '@/script/api';
export default {
    name: 'MTable',
    components: {
        MDialog,
        MLoading,
    },
    watch: {
        entities: function(newValue) {
            if(this.entities.length == 0){
                this.isNoData = true;
            }
            else {
                this.isNoData = false;
            }  
            if(newValue){
                this.testCheckAll();
            }
        },
        item : function() {
            console.log("item table",this.item);    
        }
    },  
    props:{
        isCheckbox: Boolean,
        entities: { 
            type: Array, 
        },
    },
    created(){
         this.entities.forEach((item) => {
            this.totalMoney += item.TotalAmount;
        });
    },
     
    data(){
        return {
            totalMoney: 0,
            isNoData: false,
            isShowDialog: false,
            isShowLoading: false,
            paymentSelected: [],
            checkAll: false,
            isShowToolbar: false,
            //Text tiêu đề bảng
            textAccountingDate: resource.Vi.ColumsTablePay.AccountingDate,
            textVouchersDate: resource.Vi.ColumsTablePay.VouchersDate,
            textNumberOfVouchers: resource.Vi.ColumsTablePay.NumberOfVouchers,
            textExplain: resource.Vi.ColumsTablePay.Explain,
            textMoney: resource.Vi.ColumsTablePay.Money,
            textSubjectId: resource.Vi.ColumsTablePay.SubjectId,
            textSubject: resource.Vi.ColumsTablePay.Subject,
            textSubjectName: resource.Vi.ColumsTablePay.SubjectName,
            textBranch: resource.Vi.ColumsTablePay.Branch,
            textFunction: resource.Vi.ColumsTablePay.Function,
            textAccountDebt: resource.Vi.ColumsTablePay.AccountDebt,
            textAccountHas: resource.Vi.ColumsTablePay.AccountHas,
            isShowOnDropMenu: false,
            dropdownPositionX: 0,
            dropdownPositionY: 0,
            deleteId: null,
            warningDeleteMessage: "",
        }
    },
    methods: {
        //#region Hàm liên quan đến xử lý sự kiện
        
        /**
         * Check  nhân viên
         * Author: Văn Anh (12/10/2023)
         */
        selectPaymentCheck(isChecked, id) {
        try {
            //checl all 
            if (id === "check-all"){
            if (!isChecked) {
                //Kiểm tra khi bỏ check all
                
                this.entities.map(x => x.PaymentId).forEach(e => {
                    console.log(e);
                    this.paymentSelected = this.paymentSelected.filter(x => x != e)
                });
                this.checkAll = false;
                this.$emit("showToolbar", false);
            }
            else{
                //Kiểm tra khi check all
                this.paymentSelected = this.paymentSelected.concat(
                this.entities.filter(
                    x => !this.paymentSelected.includes(x.PaymentId)
                    ).map(x => x.PaymentId));
                this.checkAll = true;
                this.isShowToolbar = true;
                this.$emit("showToolbar", this.isShowToolbar);
            }
            }
            else {
            //Kiểm tra các item check
            if (!isChecked) {
                this.paymentSelected = this.paymentSelected.filter(x => x != id);
                this.$emit("showToolbar", false);

            }
            else {
                this.paymentSelected.push(id);
                if (this.paymentSelected.length >= 2) {
                this.isShowToolbar = true;
                this.$emit("showToolbar", this.isShowToolbar);
                }
                
            }
            this.testCheckAll();
            }
            this.isShowHideToolbar();
            this.$emit("listId", this.paymentSelected);
        } catch (error) {
            console.log(error);
        }
        },
        /**
         * Check all nhân viên
         * Author: Văn Anh (12/10/2023)
         */
        testCheckAll(){
            try {
                //kiểm tra xem có đang check all hay không 
                var count = 0;
                
                //Đếm số phần tử check của page
            this.entities
                .map(x => x.PaymentId)
                .forEach(e => {
                if(this.paymentSelected.filter(x => x === e).length > 0) {
                    count++;
                }
                });
                //Kiểm tra để check
                if (this.entities.length > 0 && count == this.entities.length) {
                    this.checkAll = true;
                    this.$emit("showToolbar", this.isShowToolbar);
                    
                }
                else if (count < this.entities.length) {
                    this.checkAll = false;
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Kiểm tra ẩn hiển tool bả left
         */
        isShowHideToolbar() {
            try {
                
                if (this.paymentSelected.length >= 2) {
                this.isShowToolbar = true;
                this.$emit("showToolbar", this.isShowToolbar);
                console.log(this.$emit("showToolbar", this.isShowToolbar));

                }
                else {
                this.isShowToolbar = false
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Hàm click đóng dialog
         * 
         * Author: văn ANh (28/3/2023)
         */
        closeDialog(){
            this.isShowDialog = false;
        },
        /**
         * Hàm click outside ẩn dropmenu
         */
         hideDropMenu(){
            this.isShowOnDropMenu = !this.isShowOnDropMenu;
        },
        /**
         * Hiển thị drop menu
         * Athor: Văn Anh(21/12/2022)
         */
         showOnDropMenu(e, id, code) {
        try {
            //Xét vị trí cho dropdown
            if (e.clientY > 560){
            this.isDropdown = false;
            }
            else {
            this.isDropdown = true;
            }
            this.dropdownPositionX = e.clientX;
            this.dropdownPositionY = e.clientY;
            //Hiển thị drop menu
            this.isShowOnDropMenu = !this.isShowOnDropMenu;
            console.log(this.dropdownPositionX,this.dropdownPositionY,  this.isShowOnDropMenu);

            this.warningDeleteMessage = `Bạn có thực sự muốn xóa Chứng từ <${code}> không?`;
            this.deleteId = id;
        } catch (error) {
            console.log(error);
        }
        },
        //#endregion

        //#region Sự kiện liên quan đến APi
         
        /**
         * Hàm gọi api xóa chứng từ
         * Author: Văn Anh((28/3/2023)
         */
        async btnOnDelete(){
            try {
                this.isShowDialog = false;
                this.isShowLoading = true;
                const response = await HTTPPayments.delete(`${this.deleteId}`)
                if(response){
                    this.isShowLoading = false;
                    this.$emit("deleteResponse");
                }
                this.isShowLoading = false;
            } catch (error) {
                this.isShowLoading = false;
                console.log(error);
            }
        },
        //#endregion

        //#region Hàm liên quan đến định dạng
        /**
         * Hàm định dạng tiền tệ
         * @param {String} money
         * Author: Văn Anh (15/3/2023) 
         */
        formatMoney(money){
            return commonJs.formatMoney(money);
        },
        /**
         * Định dạng ngày tháng
         * @param {Date} date \
         * Author: Văn Anh (26/3/2023)
         */
        formatDate(date){
            return commonJs.formatDate(date);
        },
        //#endregion
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
    }

}
</script>
<style scoped>
    .list__header{
        background: #f5f5f5;
        height: 26px;
    }
    .no-data-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: calc(100% - 30px);
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    
    @import url(./table.css);
</style>