<template >
    <div class="payment">
        <div class="payment-header"> 
            <div class="payment-header__left">
                <div class="m-icon">
                    <div class="payment-header__icon"></div>
                </div>
                <div class="payment-title">Phiếu chi {{ this.newPayment.PaymentNumber }}</div>
                <div class="checkbox-wrapper">
                    <MDropCombobox
                    :total="listPayDetail"
                    :default="this.listPayDetail[6].value"
                    styleData="top: 30px!important"
                    name="true"
                    @pageSize="this.newPayment.ReasonType"
                    :disabledInput="this.isDisabled"
                    ></MDropCombobox>
                </div>
            </div>
            <div class="payment-header__right">
                <div class="m-icon">
                    <div class="instruct-icon"></div>
                </div>
                <router-link to="/" class="instruct-link">Hướng dẫn</router-link>
                <div class="m-icon m-icon__second">
                    <div class="setting-icon"></div>
                </div>
                <div class="m-icon m-icon__second">
                    <div class="help-icon"></div>
                </div>
                <div class="m-icon m-icon__second">
                    <div @click="closeForm"  class="close-icon"></div>
                </div>
            </div>
        </div>
         <div class="payment-content">
            <div style="display: flex; background-color: #eceef1;margin: 0 -24px; padding: 6px 24px 12px; justify-content: flex-start;">
                <div class="container-left">
                    <div class="row col-gap-12">
                        <div style="min-width: 363px;">
                            <label for="">Mã đối tượng  </label>
                            <MCombobox
                            v-model="newPayment.ObjectId"
                            style="width: 363px"
                            tabIndex="1"
                            isTable="true"
                            propName="ObjectCode"
                            propValue="ObjectId"
                            api="https://localhost:7232/api/v1/Objects/GetAll"
                            @changeObject="getObject"
                            :columns = "this.comboboxObject"
                            ref="PaymentObject"
                            nameRef="PaymentObject"
                            :isDisabledInput="this.isDisabled"
                            maxLength="20"
                            ></MCombobox>
                        </div>
                        <MInput 
                        label="Tên đối tượng" 
                        style="width: 500px" 
                        tabIndex="2"
                        v-model="newPayment.ObjectName"
                        :isDisabled="this.isDisabled"
                        maxLength="100"

                        />
                    </div>
                    <div class="row col-gap-12">
                        <MInput 
                        label="Người nhận" 
                        tabIndex="3"
                        v-model="newPayment.Receiver"
                        style="width: 363px;"
                        :isDisabled="this.isDisabled"
                        maxLength="100"
                        />
                        <MInput 
                        label="Địa chỉ" 
                        tabIndex="4"
                        style="width: 500px"  
                        v-model="newPayment.Address"
                        :isDisabled="this.isDisabled"
                        maxLength="255"

                        />
                    </div>
                    <div class="row">
                        <MInput 
                        label="Lý do chi"  
                        tabIndex="5"
                        :isDisabled="this.isDisabled"
                        maxLength="255"
                        style="width: 100%" 
                        v-model="newPayment.Reason" 
                        />
                    </div>
                    <div class="row col-gap-12">
                        <MCombobox
                            label="Nhân Viên"
                            tabIndex="6"
                            style="width: 363px"
                            isTable="true"
                            v-model="newPayment.EmployeeId"
                            propName="FullName"
                            propValue="EmployeeId"
                            api="https://localhost:7232/api/v1/Employees/GetAll"
                            @changeObject="getEmployee"
                            :columns = "this.comboboxEmployee"
                            :isDisabledInput="this.isDisabled"
                            maxLength="255"
                            top="47px"
                            ></MCombobox>
                        <MInput 
                        label="Kèm theo" 
                        style="width: 150px; text-align: right" 
                        tabIndex="7"
                        :isDisabled="this.isDisabled"
                        maxLength="255"

                        />
                        <div class="row-text" style="margin-top: 17px;">chứng từ gốc</div>
                    </div>
                    <div class="flex m-t-8">Tham chiếu
                        <div style="cursor: pointer; margin-left: 16px;">...</div>
                    </div>
                </div>
                <div class="container-center">
                    <div>
                        <label for="">Ngày hạch toán</label>
                        <MDatePicker  style="width: 166px;" 
                        v-model="newPayment.PaymentDate"
                        name="PaymentDate"
                        :tabIndex="8"
                        dateName="'PaymentDatePicker'"
                        ref="PaymentDate"
                        :isDisabled="this.isDisabled"
                        maxLength="255"
                        :isErrorInput = "this.borderErrorPaymentDate"
                        :tooltipError = "this.borderErrorPaymentDate"
                        @blurInput = "this.borderErrorPaymentDate = false"
                        :tooltipContent = "this.tooltipContentDate"
                        @changeDate="handlePaymentDate"
                        />
                    </div>
                    <div style="margin: 16px 0; width: 166px">
                        <label for="">Ngày phiếu chi</label>
                        <MDatePicker 
                            v-model="newPayment.PostedDate"
                            :tabIndex="9"
                            style="width: 166px;" 
                            name="PostedDate"
                            dateName="'PostedDatePicker'"
                            :isDisabled="this.isDisabled"
                            @changeDate="handleChangeDate"
                            maxLength="255"
                            :isErrorInput = "this.borderErrorPostedtDate"
                            :tooltipError = "this.borderErrorPostedtDate"
                            @blurInput = "this.borderErrorPostedtDate = false"
                            :tooltipContent = "this.tooltipContentPostedDate"
                            topTooltip="30px"
                            left-tooltip="-200px"
                        />
                    </div>
                    <MInput 
                    label="Số phiếu chi" 
                    tabIndex="10"
                    width="166px" 
                    v-model="this.newPayment.PaymentNumber"
                    ref="PaymentNumber"
                    nameRef="PaymentNumber"
                    :error = "this.borderErrorNumber"
                    :tooltipError = "this.borderErrorNumber"
                    :tooltipContent = "this.tooltipContentNumber"
                    @inputOutFocus="this.borderErrorNumber = false"
                    :isDisabled="this.isDisabled"
                    maxLength="20"
                    />
                </div>
                <div class="container-right">
                    Tổng tiền
                    <div class="payment-total">{{ this.formatMoney(this.newPayment.TotalAmount) }}</div>
                </div>
            </div>
            <div class="payment-detail">
                <label class="payment-detail-title">Hạch toán</label>
    <!-- Detail -->
                <div class="list__table" style="height: 100% ;box-sizing: border-box;">
                    <table>
                        <thead>
                            <tr>
                                <th
                                v-for="(column, index) in listThDetail"
                                :key="index"
                                :style="{ 'text-align' : column.align}"
                                >
                                {{column.columnName}}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                class="employee-infor"
                                v-for="(detail, index) in this.newPaymentDetails"
                                :key="index"
                                :class="{'disable': this.isDisabled}"
                            >
                                <td class="text-align-center" style="text-align: center; width: 35px;" >{{ index + 1}}</td>
                                <td class=" text-align-left">
                                    <MInput 
                                    v-model="this.newPaymentDetails[index].Description"
                                    tabIndex="11"
                                    :isDisabled="this.isDisabled"
                                    style="min-width: 250px; width: 250px;"
                                    />
                                </td>
                                <td class="text-align-left" 
                                style="min-width: 155px;width: 155px;"
                                
                                >
                                    <MCombobox
                                    :columns = "this.comboboxAccount"
                                    api="https://localhost:7232/api/v1/Accounts/All"
                                    isTable="true"
                                    tabIndex="12"
                                    :isDisabledInput="this.isDisabled"
                                    propValue="AccountId"
                                    propName="AccountNumber"
                                    v-model="this.newPaymentDetails[index].DebitAccount"
                                    style="min-width: 155px;width: 155px;"
                                    @comboboxOutFocus="this.borderErrorDebitAccount = false"
                                    :inputErrorCombobox = "this.borderErrorDebitAccount"
                                    :tooltipError = "this.borderErrorDebitAccount"
                                    :tooltipContent = "this.tooltipContentDebitAccount"
                                    position="fixed"
                                    top="414px"
                                    right="358px"
                                    ></MCombobox> 
                                </td>
                                <td class="text-align-left"
                                style="min-width: 165px;width: 165px;"
                                
                                >
                                    <MCombobox
                                    style="min-width: 165px;width: 165px;"
                                    :columns = "this.comboboxAccount"
                                    api="https://localhost:7232/api/v1/Accounts/All"
                                    isTable="true"
                                    tabIndex="13"
                                    :isDisabledInput="this.isDisabled"
                                    propValue="AccountId"
                                    propName="AccountNumber"
                                    v-model="this.newPaymentDetails[index].CreditAccount"
                                    @comboboxOutFocus="this.borderErrorCreditAccount = false"
                                    :inputErrorCombobox = "this.borderErrorCreditAccount"
                                    :tooltipError = "this.borderErrorCreditAccount"
                                    :tooltipContent = "this.tooltipContentCreditAccount"
                                    position="fixed"
                                    top="414px"
                                    right="172px"
                                    ></MCombobox>    
                                </td>
                                <td class="text-align-right ">
                                    <MInputMoney
                                    style="min-width: 176px;width: 176px;"
                                    tabIndex="14"
                                    :isDisabled="this.isDisabled"
                                    v-model="this.newPaymentDetails[index].Amount"
                                    :maxLength="14"
                                    ></MInputMoney>
                                </td>
                                <td class="text-align-left ">
                                    <MCombobox
                                    style="width: 363px; min-width: 175px;width: 175px;"
                                        v-model="detail.ObjectId"
                                        tabIndex="15"
                                        isTable="true"
                                        propName="ObjectCode"
                                        propValue="ObjectId"
                                        api="https://localhost:7232/api/v1/Objects/GetAll"
                                        :columns = "this.comboboxObject"
                                        ref="PaymentDetailObject"
                                        nameRef="PaymentDetailObject"
                                        :isDisabledInput="this.isDisabled"
                                        @changeObject="getObjectDetail(index, $event)"
                                        position="fixed"
                                        top="414px"
                                        right="28px"
                                    ></MCombobox>
                                </td>
                                <td class="text-align-left " style="min-width: 280px;width: 280px;" >{{ newPaymentDetails[index].ObjectName || ""}}</td>
                                <td
                                    class="tbl-col tbl-col-delete"
                                    style="width: 34px; min-width: 34px"
                                    :class="{'disable': this.isDisabled}"
                                >
                                    <div class="delete-icon"></div>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot style="position: sticky;bottom: 0;z-index: 1;">
                        <tr style="border-top: 1px solid #f5f5f5; border-bottom: 1px solid #f5f5f5;">
                            <th class="text-align-center no-border" ></th>            
                            <th class="text-align-center w-200 no-border" style="text-transform: inherit">Tổng{{ this.isDisabled }}</th>
                            <th class="text-align-left w-150 no-border" ></th>
                            <th class="text-align-left no-border" style="min-width: 200px;"></th>
                            <th class="text-align-right w-150 no-border">{{ this.formatMoney(this.newPayment.TotalAmount) }}</th>
                            <th class="text-align-left w-150 no-border"></th>
                            <th class="text-align-left no-border" style="min-width: 200px; background-color:#f5f5f5"></th>
                            <th class="text-align-left no-border" style="min-width: 34px; background-color:#f5f5f5"></th>
                        </tr>
                    </tfoot>
                    </table>
                </div>

                <div class="payment-action">
                    <MButton 
                    text="Thêm dòng" 
                    class="btn btn--secondary" 
                    style="font-weight: 600; height: 24px; margin-right: 8px;border-color:#8d9096 ; "
                    tabIndex="16"
                    @click="addRowDetail"
                    :disable="this.isDisabled"
                    ></MButton>
                    <MButton 
                    text="Xóa hết dòng" 
                    class="btn btn--secondary"
                     style="font-weight: 600; height: 24px;border-color:#8d9096 ;"
                    tabIndex="17"
                     @click="deleteRowDetail"
                     :disable="this.isDisabled"
                     ></MButton>
                </div>
            </div>
        </div>
        <div class="import-footer">
            <MButton 
              class="btn btn--secondary"
              tabIndex="20"
              @click="closeForm"
              text="Hủy"
              style="height: 28px;background-color: #38393d; color: #fff; text-decoration: none;box-sizing: border-box; "
              @keydown.tab.prevent="firstTab()"

            >
            </MButton>
            <div class="flex col-gap-12 form__footer-right">
                <div class="tooltip"
                v-if="!this.isDisabled && !this.isWatch"
                >
                    <MButton
                        id="btn--save"
                        tabIndex="18"

                        class="btn btn--secondary"
                        text="Cất"
                        style="height: 28px; background-color: #38393d; color: #fff"
                        @click="btnSaveOnClick(false)"
                    />
                    <div class="tooltip-text tooltip-text-payment">Ctrl + S {{ !this.isWatch }}</div>
                </div>
                <div class="tooltip"
                    v-if="this.isDisabled && this.isWatch"
                >
                    <MButton
                        id="btn--edit"
                        tabIndex="18"
                        class="btn btn--secondary"
                        text="Sửa"
                        style="height: 28px; background-color: #38393d; color: #fff"
                        @click="btnEditOnClick"
                    />
                    <div class="tooltip-text tooltip-text-payment">Ctrl + E</div>
                </div>

                <MComboButton 
                tabIndex="19"
                :entities="this.comboButton"
                :textDefault="this.comboButton[this.indexCoboButtonLocal]?.name"
                :defaultTooltip="this.comboButton[this.indexCoboButtonLocal]?.tooltipText"
                @clickBtn="clickBtn"
                />
                
            </div>
        </div> 
    </div>
    <!-- LOading -->
    <MLoading 
    v-if="isShowLoading"
    />
    <!-- DialogErrot -->
    <MDialogError 
    v-if="isShowDialogError"
    title="Cảnh báo"
    :message="this.dialogMessage"
    @btnCloseDialog="hideDialogError"
    />
    <!-- Dialog Warning -->
    <MDialogWarning
    v-if="isShowDialogWarning"
    :message="this.dialogMessage"
    @btnCloseDialog="hideDialogWarning"
    @btnClickYes="SavPayment"
    ></MDialogWarning>
    <!-- Toast Message -->
    <MToast
        v-if="isShowToast"
        @closeToast="closeToast"
        @onHideToast="onHideToast"
        :toastType="toastContent"
        :toastTitle="toastTitle"
        :isSuccessToast="isSuccessToast"
        :isErrorToast="isErrorToast"
    ></MToast>
</template>
<script>
import resource from "@/lib/resource";
import MDialogError from "@/components/bases/Dialog/MDialogError.vue";
import MDialogWarning from "@/components/bases/Dialog/MDialogWarning.vue";
import MInput from "@/components/bases/input/MInput.vue";
import MInputMoney from "@/components/bases/input/MInputMoney.vue"
import MDropCombobox from "@/components/bases/combobox/MDropCombobox.vue";
import MCombobox from "@/components/bases/combobox/MCombobox.vue";
import MComboButton from "@/components/bases/Button/MComboButton.vue";
import MDatePicker from "@/components/bases/DatePicker/MDatePicker.vue";
import MLoading from "@/components/bases/Loading/MLoading.vue";
import MButton from "@/components/bases/Button/MButton.vue";
import MToast from "@/components/bases/Toast/MToast.vue";
import { HTTPPayments, HTTPPaymentsDetails } from '@/script/api';
import CommonJs from "@/script/common";
import MISAEnum from '@/lib/enum';

export default {
    name : "PayDetail",
    components: {
    MInput,
    MToast,
    MDropCombobox,
    MInputMoney,
    MCombobox,
    MComboButton,
    MDatePicker,
    MButton,
    MLoading,
    MDialogError,
    MDialogWarning,
    },
    data(){
      return {
        isShowToast: false,
        isDisabled:false,
        newPaymentId: null,
        isDateChange: true,

        //Validate PAYMENT
        tooltipContentDate: null,
        tooltipContentNumber: null,
        tooltipContentDebitAccount:null,
        tooltipContentCreditAccount:null,
        tooltipContentPostedDate:null,
        borderErrorPaymentDate: false,
        borderErrorPostedtDate: false,
        borderErrorNumber:false,
        borderErrorDebitAccount:false,
        borderErrorCreditAccount: false,
        //
        isEdit: false,
        isDuplicate: null,
        isWatch: null,
        textBtnSave: null,
        isShowDropDownBtn: false,
        dialogMessage: null,
        isShowLoading: false,
        idPayment: null,
        isShowDialogWarning:false,
        isShowDialogError:false,
        //Khởi tạo các thông tin cho đôi tượng patment
        newPayment: {
            PaymentNumber: "",
            EmployeeId: "",
            EmployeeName: "",
            ObjectId: "",
            ObjectCode: "",
            ObjectName: "",
            Receiver: "",
            Address: "",
            Reason: "",
            Attachment: 0,
            ReasonType: 0,
            PaymentDate: new Date(),
            PostedDate: new Date(),
            TotalAmount:0,
            CreatedDate: new Date(),
            CreatedBy: "Hồ Văn Anh ",
            ModifiedDate: new Date(),
            ModifiedBy:"",
        },
        newPaymentDetails: [
            {
                Description: resource.Vi.PEYMENT.DEFAULT.reason ,
            }
        ],
        errorMessage: [],
        //#region 
        //Text resources
        indexCoboButtonLocal: localStorage.actionSelect,
        comboboxAccount:resource.COLUMNS_NAME_COMBOBOX_ACCOUNT,
        comboButton:resource.BUTTON_SAVE_DROPDOWN,
        comboboxEmployee: resource.COLUMNS_NAME_COMBOBOX_EMPLOYEE,
        comboboxObject: resource. COLUMNS_NAME_COMBOBOX_OBJECT,
        listPayDetail: resource.Vi.Combobox,
        textTitle: resource.Vi.Detail.TitleDetail,
        listThDetail: resource.Vi.ColumnsTablePayDetail,
        //#endregion
      }
    },
    async created(){
        //Check nếu tồn tại id không và không tồn tại form mode thì là sửa 
        this.idPayment = this.$route.query.id;
        //Nếu tồn tại id và form mode = 3 thì là nhân bản
        this.isDuplicate = this.$route.query.formMode;
        //Nếu tồn tại id và form mode = 4 thì là xem chi phiếu
        this.isWatch = this.$route.query.formMode;

        if (this.idPayment || this.isDuplicate || this.isWatch) {
           await this.getPayment(this.idPayment)
            // this.GetPaymentDetailById(this.idPayment);
            //Mếu trạng thái là xem thì disable các trường nhập liệu 
            if(this.isWatch){
                this.isDisabled = true;
            }
            else {
                this.isDisabled = false;
            }
        }
        else {
        await    this.getNewNumber();
        }
        
        this.$nextTick(function () {
            this.$refs.PaymentObject.comboboxFocus();
        });
    },
    computed: {
        isAdd: function(){
            if (!this.idPayment && !this.newPayment.PaymentId){
                return true;
            }
            return false;
        }
    },
    watch:{
        isDisabled: function(newValue){
            console.log("newValue dis", newValue);
        },
        newPaymentDetails: {
            handler: function(){
            this.newPayment.TotalAmount = this.newPaymentDetails.reduce((result, current) => {
                console.log("result",result);
                return result += current.Amount;
            }, 0);
        },
        deep: true,
        },
        newPayment: {
            handler: function(newValue){
                console.log("payment",newValue);
            },
            deep: true,
        }
    },
    methods: {
        firstTab(){
            try {
                this.$nextTick(function () {
                this.$refs.PaymentObject.comboboxFocus();
                });
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Hàm show toast
         */
        onshowToast() {
        this.isShowToast = true;
        
        },
        /**
         * author:Văn anh(3/1/2023)
         * Hàm onHideToast ẩn  Toast thông báo
         */
        onHideToast() {
        this.isShowToast = false;
        },
        /**
         * Hàm xử lý sự kiện toast 
         * @param {*} text 
         * @param {*} error 
         * @param {*} success 
         * @param {*} title 
         * Author: Văn Anh (4/4/2023)
         */
        changeToastMsg(text, error, success, title) {
            this.toastContent = text;
            this.isErrorToast = error;
            this.isSuccessToast = success;
            this.toastTitle = title;
        },
        /**
         * /Xử lú sự kiện cho combobutton
         * Author: Văn ANh (4/4/2023)
         */
        clickBtn(event){
            if(!event){
                this.btnSaveOnClick(true, false);
            }
            else {
                this.btnSaveOnClick(true, true);
            }
        },
        /**
         * Hàm ẩn dialog 
         * Author: Văn Anh (23/3/2023)
         */
         hideDialogError(){
            this.isShowDialogError = false;
        },
          /**
         * Hàm ẩn dialog 
         * Author: Văn Anh (23/3/2023)
         */
        hideDialogWarning(){
            this.isShowDialogWarning = false;
        },
        /**
         * Xóa hết các dòng ở bảng detail
         * Author: Văn Anh (4/2/2023)
         */
        deleteRowDetail(){
            this.newPaymentDetails = [
                
            ]
        },
        /**
         * Thêm dòng ở dettail
         * Văn Anh (4/2/2023)
         */
        addRowDetail(){
            let numberRowDetail = this.newPaymentDetails.length;
            //copy mảng detail 
            let newLine = Object.assign({}, this.newPaymentDetails[numberRowDetail - 1]);
            this.newPaymentDetails = [...this.newPaymentDetails, newLine];
        },
        /**
         * Gán giá trị cho đối tượng dettail
         * Author: Văn Anh (4/3/2023)
         */
        getObjectDetail(index, event){
            this.newPaymentDetails[index].ObjectId = event.ObjectId;
            this.newPaymentDetails[index].ObjectCode = event.ObjectCode;
            this.newPaymentDetails[index].ObjectName = event.ObjectName;
        },
        /**
         * Người dùng chọn đối tượng nhận viên ở combobox và gán lại dữ liệu cho đối tượng payment
         * Author: văn Anh (4/2/2023)
         */
        getEmployee(event){
            try {
                console.log(event);
                this.newPayment.EmployeeId = event.EmployeeId;
                this.newPayment.EmployeeName = event.FullName;
                
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Lấy thông tin object sau khi chọn ở combobox
         * Author: Văn Anh (4/1/2023)
         */
        getObject(event){
            try {
                this.newPayment.ObjectId = event.ObjectId;
                this.newPayment.ObjectCode = event.ObjectCode;
                this.newPayment.ObjectName = event.ObjectName;
                this.newPayment.Receiver = event.ObjectName;
                this.newPayment.Address = event.Address;
                this.newPayment.Reason = "Lý do chi " + event.ObjectName;
                
                this.newPaymentDetails.map((item) => {
                    item.Description =  "Chi tiền cho " +  event.ObjectName;
                    item.ObjectId = event.ObjectId;
                });
                console.log("event",event, this.newPaymentDetails);
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Xử lý thay đổi ngày chứng từ
         * Author: văn Anh (4/4/2023)
         */
        handlePaymentDate(){
            this.newPayment.PostedDate = this.newPayment.PaymentDate
        },
        /**
         * Xử lý khi date thay đổi
         * Author: văn Anh (4/4/2023)
         */
        handleChangeDate(){
            if (this.newPayment.PaymentDate && this.newPayment.PostedDate){
                let datePayment  = this.newPayment.PaymentDate.getTime();
                let datePosted  = this.newPayment.PostedDate.getTime();

                if(datePayment < datePosted){
                    this.borderErrorPostedtDate = true;
                    this.tooltipContentPostedDate = resource.Vi.PEYMENT.TOOLTIP_ERROR_PAYMENT.TITLE_ERROR_DATE;

                }
            }
        },
        /**
         * Xử lý click nút sửa bỏ disable các trường nhập liệu => Thực hiện gọi sửa nhân viên
         * Author: Văn Anh (4/3/2023)
         */
        btnEditOnClick(){
            this.isDisabled = false;
            this.isWatch = null;

        },  
        //#region Sự kiện liên quan đến API
        /**
         * Gọi API lẩy mã phiếu chi mới
         * Author: Văn ANh (4/4/2023)
         */
        async getNewNumber(){
            try {
                const res = await HTTPPayments.get("/newPaymentNumber");
                this.newPayment.PaymentNumber = res.data;
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Lấy đổi tượng object theo id
         * @param {String} id 
         * Author: Văn Anh (4/4/2023)
         */
        async getPayment(id){
            try {
                await HTTPPayments.get(`/${id}`)
                .then(response => {
                    this.newPayment = response.data;
                })
                .then(()=>{
                    HTTPPaymentsDetails.get(`/getDetail/${id}`)
                    .then((response) => {
                        this.newPaymentDetails = response.data;
                    })
                })
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Xử lý khi số chứng từ bị trùng => Người dùng chọn có sẽ lấy số chứng từ mới và thực hiện cất
         * Author: Văn Anh (4/4/2023)
         */
        SavPayment(event){
            try {
                if(event){
                    console.log(event);
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Khi người dùng bấm nút cất hoặc cất và thêm mới
         * Author: Văn Anh (23/3/2023)
         */
         async btnSaveOnClick(isSaveAndAdd, isActionBtnClose) {
            try {
                //Hiển thị loading
                var valid = this.validateData();
                //Validate dữ liệu
                if (valid) {
                this.isShowDialogWarning = false;
                this.dialogMessage = this.errorMessage[0];
                this.isShowDialogError = true;
                } 
                else {
                    this.isShowLoading = true;
                    //Thêm hoặc nhân bản chi phiếu
                    if(this.isAdd || this.isDuplicate){
                        this.handleSubmitAdd( isSaveAndAdd,resource.FORM_MODE.ADD, isActionBtnClose );
                    }
                    else {
                        this.handleSubmitEdit(isSaveAndAdd,resource.FORM_MODE.EDIT)
                    }
                this.isShowLoading = false;
            }
            } catch (error) {
                console.log(error);

            }
        },

        /**
         * Hàm gọi API Thêm hoặc sủa chi phiếu
         * Author: Văn Anh (4/1/2023)
         */
        async  handleSubmitAdd(isSaveAndAdd ){
            try {
                 this.isShowLoading = true;
                 
                 //Goji api thêm phiếu chi
                await HTTPPayments.post("",{
                PaymentNumber: this.newPayment.PaymentNumber,
                EmployeeId: this.newPayment.EmployeeId,
                EmployeeName:this.newPayment.EmployeeName,
                ObjectId: this.newPayment.ObjectId,
                ObjectCode: this.newPayment.ObjectCode,
                ObjectName: this.newPayment.ObjectName,
                Receiver: this.newPayment.Receiver,
                Address: this.newPayment.Address,
                Reason: this.newPayment.Reason,
                Attachment: this.newPayment.Attachment,
                ReasonType: this.newPayment.ReasonType,
                PaymentDate: this.newPayment.PaymentDate,
                PostedDate: this.newPayment.PostedDate,
                TotalAmount:this.newPayment.TotalAmount,
                CreatedDate: new Date(),
                CreatedBy: "Hồ Văn Anh ",
                ModifiedDate: new Date(),
                ModifiedBy:"",
                })
                .then((response) =>{
                    this.isShowLoading = false;
                    //Gán paymentId cho đối tượng detai;
                    this.newPaymentDetails = this.newPaymentDetails.map((item) => {
                        return {
                            ...item,
                            PaymentId :  response.data,
                        };
                    });
                    //Gọi api thêm payment details
                     this.handleAddPaymentDetail();

                     //Show toast thông báo

                    //Check trạng thái của button
                    if(!isSaveAndAdd){
                            this.newPayment.PaymentId = response.data;
                            this.isDisabled = true;
                        }
                        else if (this.indexCoboButtonLocal == "0"){
                            this.resetForm();
                        }
                        else {
                            this.closeForm();
                        }
                    
                    
                })
                .catch(error => {
                    this.isDisabled = false;
                    this.handleException(error)
                })
                
                this.isShowToast = true;
                    this.changeToastMsg(resource.Vi.PEYMENT.TOOLTIP_ERROR_PAYMENT.DETAIL.DEBIT_ACCOUNT_ERROR ,false,true, resource.NOTIFICATION_TITLE.SUCCESS)
                    this.onHideToast();
            } catch (error) {
                this.isDisabled = false;

                this.isShowLoading = false;
                console.log(error);
                this.handleException(error)
            }
        },
        /**
         * Handle Sủa phiếu chi
         * Author: Văn Anh (4/3/2023)
         */
        async handleSubmitEdit(isEdit, toastMessage){
            try {
                const response = await HTTPPayments.put(`/${this.newPayment.PaymentId}`,[
                    {
                        PaymentNumber: this.newPayment.PaymentNumber,
                        EmployeeName:this.newPayment.EmployeeName,
                        ObjectCode: this.newPayment.ObjectCode,
                        ObjectName: this.newPayment.ObjectName,
                        Receiver: this.newPayment.Receiver,
                        Address: this.newPayment.Address,
                        Reason: this.newPayment.Reason,
                        Attachment: this.newPayment.Attachment,
                        ReasonType: this.newPayment.ReasonType,
                        PaymentDate: this.newPayment.PaymentDate,
                        PostedDate: this.newPayment.PostedDate,
                        TotalAmount:this.newPayment.TotalAmount,
                    }
                ]);
                if(response){
                console.log(toastMessage);
                    
                    this.newPaymentDetails.PaymentId = response.data;
                    this.newPayment.PaymentId = response.data;
                    this.isDisabled = true;
                }
            } catch (error) {
            console.log(error);
            this.handleException(error)
            }
        },
        /**
         * Api Thêm payment details 
         * Author: Văn Anh (4/3/2023)
         */
        async handleAddPaymentDetail(){
            try {
                const response = await HTTPPaymentsDetails.post("/InsertMany", this.newPaymentDetails)
                this.newPaymentDetails = response.data;
            } catch (error) {
                this.isDisabled = false
                console.log(error);
                this.handleException(error);
            }
        },
        /**
         * Lấy detail theo id 
         * Author: văn Anh (4/4/2023)
         */
        // async GetPaymentDetailById(id){
        //     try {
        //         const response = await HTTPPaymentsDetails.get(`/getDetail/${id}`);
        //         this.newPaymentDetails = response.data;
        //     } catch (error) {
        //         this.handleException(error)
        //         console.log(error);
        //     }
        // },
        //#endregion

        //#region Các sự kiện liên quan đến định dạng
        validateData(){
            try {
                this.errorMessage = [];
                //Số phiếu chi
                if (!this.newPayment.PaymentNumber){
                    this.errorMessage.push(resource.Vi.PEYMENT.TOOLTIP_ERROR_PAYMENT.TILE_PAYMENT_NUMBER)
                    this.borderErrorNumber = true;
                    this.tooltipContentNumber = resource.Vi.PEYMENT.TOOLTIP_ERROR_PAYMENT.TILE_PAYMENT_NUMBER
                }
                else if(this.newPayment.PaymentNumber > MISAEnum.MAX_LENGTH_PAYMENT.NUMBER){
                    this.errorMessage.push(resource.Vi.PEYMENT.TOOLTIP_ERROR_PAYMENT.TITLE_PAYMENT_NUMBER_OUTLENGTH)
                    this.borderErrorNumber = true;
                    this.tooltipContentNumber = resource.Vi.PEYMENT.TOOLTIP_ERROR_PAYMENT.TITLE_PAYMENT_NUMBER_OUTLENGTH
                }
                else {
                    this.borderErrorNumber = false;
                }

                //Ngày hạch toán
                if(!this.newPayment.PaymentDate){
                    this.errorMessage.push(resource.Vi.PEYMENT.TOOLTIP_ERROR_PAYMENT.PAYMENT_DATE);
                    this.borderErrorPaymentDate = true;
                    this.tooltipContentDate= resource.Vi.PEYMENT.TOOLTIP_ERROR_PAYMENT.PAYMENT_DATE
                }
                else {
                    this.borderErrorPaymentDate = false;
                }

                //Ngày chi phiếu 
                if(!this.newPayment.PostedDate){
                    this.errorMessage.push(resource.Vi.PEYMENT.TOOLTIP_ERROR_PAYMENT.POSTED_DATE);
                    this.borderErrorPostedtDate = true;
                    this.tooltipContentPostedDate= resource.Vi.PEYMENT.TOOLTIP_ERROR_PAYMENT.POSTED_DATE
                }
                else {
                    this.borderErrorPostedtDate = false;
                }
                //Detail
                this.validateDetail();

                if (this.errorMessage.length > 0) {

                    return true;
                }
                return false;
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Hàm validate cho đối tượng detail
         * Author: Văn Anh (4/3/2023)
         */
        validateDetail(){
            if(this.newPaymentDetails.length < 1){
                this.errorMessage.push(resource.Vi.PEYMENT.TOOLTIP_ERROR_PAYMENT.DETAIL.NO_DETAIL);
            }
            else{
                for(let i = 0; i < this.newPaymentDetails.length; i++) {
                    if(!this.newPaymentDetails[i].DebitAccount){
                        this.errorMessage.push(resource.Vi.PEYMENT.TOOLTIP_ERROR_PAYMENT.DETAIL.DEBIT_ACCOUNT_ERROR);
                        this.borderErrorDebitAccount = true;
                        this.tooltipContentDebitAccount= resource.Vi.PEYMENT.TOOLTIP_ERROR_PAYMENT.DETAIL.DEBIT_ACCOUNT_ERROR
                        break;
                    }
                    else{
                        this.borderErrorDebitAccount = false;
    
                    }
    
                    if(!this.newPaymentDetails[i].CreditAccount){
                        this.errorMessage.push(resource.Vi.PEYMENT.TOOLTIP_ERROR_PAYMENT.DETAIL.CREBIT_ACCOUNT_ERROR);
                        this.borderErrorCreditAccount = true;      
                        this.tooltipContentCreditAccount= resource.Vi.PEYMENT.TOOLTIP_ERROR_PAYMENT.DETAIL.CREBIT_ACCOUNT_ERROR
                        break;
                    }
                    else {
                        this.borderErrorCreditAccount = false;
    
                    }
                }
            }

        },
        /**
     * Hàm xử lý lỗi trả về
     * @param {Mã lỗi} error 
     * Author: Văn ANh(3/2/2023)
     */
    handleException(error) {
      console.log(error);
      this.isShowLoading = false;
      if (error.response.status == resource.STATUSCODE.BadRequest) {
        switch (error.response.data.ErrorCode) {
          case MISAEnum.ERRORCODE.DuplicateCode:
            //Trả về lỗi 400 thì hiển thị thông báo mã đã bị trùng
            this.dialogMessage = error.response.data.UserMsg;
            this.isShowDialogError = true;
            this.$refs.PaymentNumber.inputFocus();
            break;
          // eslint-disable-next-line
          case MISAEnum.ERRORCODE.InvalidInput:
            this.dialogMessage = error.response.data.userMsg;
            break;
          default:
            break;
        }
      } 
      else if (error.response.status == resource.STATUSCODE.ServerError) {
        this.dialogMessage = error.response.data.UserMsg;
        this.isShowDialogError = true;

      }
      else {
        for(const property in resource.STATUSCODES) {
          if(error.response.status == property.Code) {
            this.dialogMessage = property.Message;
            this.isShowDialogError = true;
          }
        }
      }
    },
        //#endregion

        //#region Sự kiện liên quan đến phím tắt
        /**
         * author:Văn Anh(2/3/2023)
         * Hàm onKeyDown xử lí khi nhấn phím tắt
         */
         onKeyDown(event) {
            var me = this;
            if(!this.isShowDialogError && !this.isShowDialogWarning){
                if(event.ctrlKey  &&  event.key === "s") {
                event.preventDefault();
                me.btnSaveOnClick(false);
                }
                else if (event.ctrlKey && event.key === "S") {
                    event.preventDefault();
                    me.btnSaveOnClick(true) 
                }
                else if (!this.isShowDialogError &&event.key === "Escape"){
                    event.preventDefault();
                }
                
            }
        },
        /**
         * Hàm định dạng tiền tệ
         * @param {String} money
         * Author: Văn Anh (15/3/2023) 
         */
        formatMoney(money){
            return CommonJs.formatMoney(money);
        },
        /**
         * Xử lý khi click đóng form trước về trang trước
         * Author: Văn Anh (4/3/2023)
         */
        closeForm(){
            // if (this.isAdd){
                console.log(this.$router.back);
                this.$router.back();
            // }
            // else {
            //     this.$router.push({
            //     path: "/cash/pay"
            //     })
            // }
        },
        resetForm(){
            this.newPayment = {
            
            };
            this.newPaymentDetails = [
                {

                    Description: resource.Vi.PEYMENT.DEFAULT.reason,
                },
            ]
        }
        //#endregion
    },
    mounted() {
        //Sự kiện bàn phím 
        document.addEventListener("keydown",this.onKeyDown);
    },
    unmounted() {
        //Sự kiện bàn phím
        document.removeEventListener("keydown",this.onKeyDown);
    }
}
</script>
<style scoped>
@import url(./pay.css);
@import url(../../../components/bases/Table/table.css);
.payment-btn-save {
    margin: 0 8px;
    color: #fff;
    background-color: transparent;
    border: 1px solid #8d9096;
}

.payment-btn-save:hover {
    background-color: #2f3034;
}

.payment-btn-save::after {
    content: "Cất (Ctrl + S)";
    position: absolute;
    background-color: #434242;
    color: #fff;
    top: -30px;
    width: max-content;
    padding: 4px 8px;
    border-radius: 4px;
    display: none;
    line-height: 18px;
    animation: identifier 0.3s ease-in;
}

.payment-btn-save:hover::after {
    display: block;
}

.pay-cancel-btn {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    color: #fff !important;
    align-items: center;
}
.import-footer{
    box-sizing: border-box;
    height: 42px;
    background-color: #38393d;
    padding: 8px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.tooltip-text-payment{
    top: -29px;
}
.disable{
    background-color: #edeef0;
}
tr:hover, tr:hover > td:last-child{
    background-color: #e5f3ff!important;
}
table{
    width: 100%;
}
th:last-child {
    background-color: #f5f5f5!important;
}
td:last-child{
    background-color: #fff;
}
.combobox__button {
    background-color: #fff;
}
</style>