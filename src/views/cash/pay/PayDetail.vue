<template >
    <div class="payment">
        <div class="payment-header"> 
            <div class="payment-header__left">
                <div class="m-icon">
                    <div class="payment-header__icon"></div>
                </div>
                <div class="payment-title">{{ this.newPayment.PaymentNumber }}</div>
                <div class="checkbox-wrapper">
                    <MDropCombobox
                    :total="listPayDetail"
                    :default="this.listPayDetail[6].value"
                    styleData="top: 30px!important"
                    name="true"
                    @pageSize="this.newPayment.ReasonType"
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
                    <router-link to="/cash/procedure" class="close-icon"></router-link>
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
                            ></MCombobox>
                        </div>
                        <MInput 
                        label="Tên đối tượng" 
                        style="width: 500px" 
                        tabIndex="2"
                        v-model="newPayment.ObjectName"
                        />
                    </div>
                    <div class="row col-gap-12">
                        <MInput 
                        label="Người nhận" 
                        tabIndex="3"
                        v-model="newPayment.ObjectName"
                        style="width: 363px;"
                        
                        />
                        <MInput 
                        label="Địa chỉ" 
                        tabIndex="4"
                        style="width: 500px"  
                        v-model="newPayment.Address"
                        />
                    </div>
                    <div class="row">
                        <MInput 
                        label="Lý do chi"  
                        tabIndex="5"

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
                            propName="FullName"
                            propValue="EmployeeId"
                            api="https://localhost:7232/api/v1/Employees/GetAll"
                            @changeObject="getEmployee"
                            :columns = "this.comboboxEmployee"
                            ></MCombobox>
                        <MInput 
                        label="Kèm theo" 
                        style="width: 150px; text-align: right" 
                        tabIndex="7"

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
                        />
                    </div>
                    <div style="margin: 16px 0; width: 166px">
                        <label for="">Ngày phiếu chi</label>
                        <MDatePicker 
                            v-model="newPayment.PostedDate"
                            :tabIndex="9"
                            style="width: 166px;" 
                            dateName="VoucherDay"
                        />
                    </div>
                    <MInput 
                    label="Số phiếu chi" 
                    tabIndex="10"
                    width="166px" 
                    v-model="newPayment.PaymentNumber"
                    ref="PaymentNumber"
                    nameRef="PaymentNumber"
                    />
                </div>
                <div class="container-right">
                    Tổng tiền
                    <div class="payment-total">0</div>
                </div>
            </div>
            <div class="payment-detail">
                <label class="payment-detail-title">Hạch toán</label>
                <MTableDetail
                    :entities="this.newPaymentDetails"
                    :columnsTh="this.listThDetail"
                    hasColumnDelete="true"
                />
                <div class="payment-action">
                    <MButton 
                    text="Thêm dòng" 
                    class="btn btn--secondary" 
                    style="font-weight: 600; height: 24px; margin-right: 8px;border-color:#8d9096 ; "
                    tabIndex="15"
                    @click="addRowDetail"
                    ></MButton>
                    <MButton 
                    text="Xóa hết dòng" 
                    class="btn btn--secondary"
                     style="font-weight: 600; height: 24px;border-color:#8d9096 ;"
                    tabIndex="16"
                     @click="deleteRowDetail"
                     ></MButton>
                </div>
            </div>
        </div>
        <div class="import-footer">
            <router-link to="/cash/procedure"
              class="btn btn--secondary"
              tabIndex="19"
              
              text="Hủy"
              style="height: 28px;background-color: #38393d; color: #fff; text-decoration: none;box-sizing: border-box; "
            >
            </router-link>
            <div class="flex col-gap-12 form__footer-right">
                <div class="tooltip">
                    <MButton
                        id="btn--save"
                        tabIndex="17"

                        class="btn btn--secondary"
                        text="Cất"
                        style="height: 28px; background-color: #38393d; color: #fff"
                        @click="btnSaveOnClick(false)"
                    />
                    <div class="tooltip-text tooltip-text-payment">Ctrl + S</div>
                </div>
                <div class="tooltip">
                    <MButton
                        id="btn--edit"
                        tabIndex="17"
                        class="btn btn--secondary"
                        text="Sửa nhanh"
                        style="height: 28px; background-color: #38393d; color: #fff"
                        @click="btnSaveOnClick(false)"
                    />
                    <div class="tooltip-text tooltip-text-payment">Ctrl + E</div>
                </div>

                <div class="footer-right-btn">
                    <div class="tooltip">
                        <MButton
                            class="btn btn--primary btn-save-add btnClass"
                            text="Cất và Thêm"
                            tabIndex="18"
                            style="height: 28px; border-top-right-radius: 0; border-bottom-right-radius: 0;"
                            @click="btnSaveOnClick(true)"
                            
                        />
                        <div class="tooltip-text tooltip-save tooltip-text-payment">
                            Ctrl + Shift + S
                        </div>
                    </div>
                    <div class="btn-dropdown"
                        @click="this.isShowDropDownBtn = !this.isShowDropDownBtn"

                    >
                        <div class="icon btn-dropdown-icon"></div>
                        <div class="btn-dropdown-list"
                            v-if="isShowDropDownBtn"
                        >
                            <div class="btn-dropdown-item">Cất và Đóng</div>
                            <div class="btn-dropdown-item">Cất và Thêm</div>
                        </div>
                    </div>
                </div>
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
</template>
<script>
import resource from "@/lib/resource";
import MDialogError from "@/components/bases/Dialog/MDialogError.vue";
import MInput from "@/components/bases/input/MInput.vue";
import MTableDetail from "@/components/bases/Table/MTableDetail.vue";
import MDropCombobox from "@/components/bases/combobox/MDropCombobox.vue";
import MCombobox from "@/components/bases/combobox/MCombobox.vue";
import MDatePicker from "@/components/bases/DatePicker/MDatePicker.vue";
import MLoading from "@/components/bases/Loading/MLoading.vue";
import MButton from "@/components/bases/Button/MButton.vue";
import { HTTPPayments } from '@/script/api';

export default {
    name : "PayDetail",
    components: {
    MInput,
    MDropCombobox,
    MCombobox,
    MTableDetail,
    MDatePicker,
    MButton,
    MLoading,
    MDialogError,
    },
    data(){
      return {
        isShowDropDownBtn: false,
        dialogMessage: null,
        isShowLoading: false,
        idPayment: null,
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
            PaymentDate: "",
            PostedDate: "",
            TotalAmount:0,
            CreatedDate: new Date(),
            CreatedBy: "Hồ Văn Anh ",
            ModifiedDate: new Date(),
            ModifiedBy:"",
        },
        
        newPaymentDetails: [
            {
                Description: resource.Vi.PEYMENT.DEFAULT.reason,
            }
        ],
        errorMessage: [],
        //#region 
        //Text resources

        comboboxEmployee: resource.COLUMNS_NAME_COMBOBOX_EMPLOYEE,
        comboboxObject: resource. COLUMNS_NAME_COMBOBOX_OBJECT,
        listPayDetail: resource.Vi.Combobox,
        textTitle: resource.Vi.Detail.TitleDetail,
        listThDetail: resource.Vi.ColumnsTablePayDetail,
        //#endregion
      }
    },
    created(){
         this.idPayment = this.$router.addRoute;
        //  this.$router.query.id;
         
        if (this.idPayment){
            console.log("asd");
        }
        else {
            this.getPayment(this.idPayment)
        }


        this.$nextTick(function () {
            this.$refs.PaymentObject.inputFocus();
        });
    },
    computed: {
        isAdd: function(){
            if (this.idPayment ){
                return true;
            }
            return false;
        }
    },
    watch:{
        
    },
    methods: {
        /**
         * Hàm ẩn dialog 
         * Author: Văn Anh (23/3/2023)
         */
         hideDialogError(){
            this.isShowDialogError = false;
            this.inputErrorFocus();
        },
        /**
         * Xóa hết các dòng ở bảng detail
         * Author: Văn Anh (4/2/2023)
         */
        deleteRowDetail(){
            this.newPaymentDetails = [
                {
                    Description: resource.Vi.PEYMENT.DEFAULT.reason,
                }
            ]
        },
        /**
         * Thêm dòng ở dettail
         * Văn Anh (4/2/2023)
         */
        addRowDetail(){
            let numberRowDetail = this.newPaymentDetails.length - 1;
            this.newPaymentDetails = [...this.newPaymentDetails, this.newPaymentDetails[numberRowDetail]]
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
            } catch (error) {
                console.log(error);
            }
        },

        //#region Sự kiện liên quan đến API
        /**
         * Lấy đổi tượng object theo id
         * @param {String} id 
         */
        async getPayment(id){
            try {
                const response = await HTTPPayments.get(`/${id}`);
                this.newPayment = response.data;
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Khi người dùng bấm nút cất hoặc cất và thêm mới
         * Author: Văn Anh (23/3/2023)
         */
         async btnSaveOnClick(isSaveAndAdd) {
            try {
                //Hiển thị loading
                var valid = this.validateData();
                //Validate dữ li
                if (valid) {
                this.isShowDialogWarning = false;
                this.dialogMessage = this.errorMessage[0];
                this.isShowDialogError = true;
                } 
                else {
                this.isShowLoading = true;
                if(this.newPayment.PaymentId){
                    this.handleSubmit(isSaveAndAdd, false, resource.FORM_MODE.EDIT)
                }
                else {
                    if (this.isAdd) {
                        this.handleSubmit(isSaveAndAdd, true, resource.FORM_MODE.ADD);
                    }
                    else if (this.isDuplicate) {
                        this.handleSubmit(isSaveAndAdd, false, resource.FORM_MODE.DUPLICATE)
                    
                    }
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
         async handleSubmit(isSaveAndAdd, isAdd ,  toastMessage){
            try {
                const response = isAdd 
                ? await HTTPPayments.post("",{
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
                : await HTTPPayments.put(`/${this.newPayment.PaymentId}`,{
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
                });
                if (response){
                    this.$emit("changeToastMsg",toastMessage,false,true, resource.NOTIFICATION_TITLE.SUCCESS);
                    this.$emit("onshowToast");
                    this.$emit("reloadData");
                }
                if (isSaveAndAdd) {
                    this.isAdd = true;
                    this.newAccount ={};
                }
                else {
                    this.$emit("closeDetail");
                }
            } catch (error) {
                console.log(error);
                this.handleException(error)
            }
        },
        //#endregion

        //#region Các sự kiện liên quan đến định dạng
        validateData(){
            try {
                this.errorMessage = [];
                if (!this.newPayment.PaymentNumber){
                    this.errorMessage.push(resource.Vi.PEYMENT.TOOLTIP_ERROR_PAYMENT.TILE_PAYMENT_NUMBER)
                    this.$nextTick(function () {
                        this.$refs.PaymentNumber.inputFocus();
                    });
                }
                if (this.errorMessage.length > 0) {
                    return true;
                }
                return false;
            } catch (error) {
                console.log(error);
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
</style>