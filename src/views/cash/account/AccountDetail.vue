<template lang="">
    <div class="overlay-form">
        <div :class="{ 'account-form': true, 'account-form--extend': isResize }">
            <div class="modal__header">
                <div class="modal__header-left">
                    <div class="modal__header-left-text">{{this.titleForm}}</div>
                </div>
                <div class="modal__header-right">
                    <div class="icon w-h-24 tooltip form-icon--help">
                        <div class="tooltip-text">Giúp(F1)</div>
                    </div>
                    <div class="modal__close-btn" @click="onClose">
                        <label
                            for="show-modal"
                            class="modal__close-btn-icon"
                        ></label>
                    </div>
                </div>
            </div>
            <div class="account-main">
                <div class="row">
                    <MInput
                        v-model="newAccount.AccountNumber"
                        label="Số tài khoản"
                        inputRequired="true"
                        width="25%"
                        bottom="12px"
                        ref="AccountNumber"
                        nameRef="AccountNumber"
                        @inputOutFocus="this.borderAccountNumberError = false"
                        :name="this.nameInput"
                        :error = "this.borderAccountNumberError"
                        :tooltipError = "this.borderAccountNumberError"
                        :tooltipContent = "this.tooltipContentNumber"
                    />
                </div>
                <div class="row">
                    <MInput
                    v-model="newAccount.AccountName"
                        label="Tên tài khoản"
                        inputRequired="true"
                        width="100%"
                        bottom="12px"
                        @inputOutFocus="this.borderAccountNameError = false"
                        :name="this.nameInput"
                        :error = "this.borderAccountNameError"
                        :tooltipError = "this.borderAccountNameError"
                        :tooltipContent = "this.tooltipContentName"
                    />
                    <MInput
                    v-model="newAccount.EnglishName"
                        label="Tên tiếng Anh"
                        width="100%"
                        bottom="12px"
                        full-width
                        style="margin-left: 8px"
                    />
                </div>
                <div class="row">
                    <div class="checkbox-wrapper" style="width: 25%; margin-right: 8px">
                        <label for="">Tài khoản tổng hợp</label>
                        <MCombobox
                        api="https://localhost:7232/api/v1/Accounts"
                        propName="AccountNumber"
                        :columns = "this.comboboxAccount"
                        isTable="true"
                        ></MCombobox>
                    </div>
                    <div class="checkbox-wrapper" style="width: 25%">
                        <label for="">Tính chất
                            <span class="input--required">*</span>
                        </label>

                        <MCombobox
                            :list="this.comboboxNature"
                            isTable = "false"
                        ></MCombobox>
                    </div>
                </div>
                <div class="row" style="width: 100%">
                    <div class="textarea-wrapper">
                        <label class="textfield__label modal-label"> Diễn giải</label>
                        <textarea
                            class="account-form__textarea"
                        ></textarea>
                    </div>
                </div>
                <div class="row">
                    <label
                        for="accounting"
                        class="modal__header-left-wrapper account-checkbox"
                        tabindex="0"
                    >
                        <input
                            type="checkbox"
                            id="accounting"
                            :checked = "this.newAccount.HasForeignCurrencyAccounting"
                        />
                        <div class="check-icon"></div>
                    </label>
                    <span>Có hạch toán ngoại tệ</span>
                </div>
            </div>
            <div class="account-track-detail">
                <div
                    class="row account-track__title"
                    @click="isShowTrackDetail = !isShowTrackDetail"
                >
                    <div class="m-icon">
                        <div
                            class="account-track-detail__icon"
                            :style="{
                                transform: isShowTrackDetail ? 'rotate(90deg)' : 'rotate(0deg)',
                            }"
                        ></div>
                    </div>
                    Theo dõi chi tiết theo
                </div>
                <div class="track-detail" :style="{ height: !isShowTrackDetail ? '0' : '175px' }">
                    <MTrackDetail
                    v-for = "(item, index)  in ACCOUNT_TRACK"
                    :key="index"
                    :standard="item"
                    :index="index"
                    @select="handleSelected"
                    @onCheckInput="handleChecked"
                    :checked="this.newAccount[`IsTrack${item.identity}`]"
                    :selected="this.newAccount[`${item.identity}`]"
                    ></MTrackDetail>
                    

                </div>

                <label
                    for="accounting"
                    class="modal__header-left-wrapper account-checkbox"
                    tabindex="0"
                >
                    <input
                        type="checkbox"
                        id="accounting"
                        :checked = "this.newAccount.Object"
                    />
                    <div class="check-icon"></div>
                </label>
            </div>
            <div class="modal-footer account-form__footer">
                <div class="modal-footer__wrapper" style="padding-right: 46px">
                    <MButton
                        type="submit"
                        class="btn btn--secondary modal-btn__secondary btn-save"
                        tabindex="0"
                        text="Cất"
                        style="height: 28px;"
                        @click="btnSaveOnClick(false)"
                    >
                    </MButton>
                    <MButton 
                    class="btn btn--primary btn-save-add" 
                    text="Cất và Thêm" 
                    tabindex="0" 
                    style="height: 28px;"
                    ref="refSaveBtn"
                    @Click="btnSaveOnClick(true)"
                    >
                    </MButton>
                </div>
                <MButton
                    for="show-modal"
                    class="btn btn--secondary modal-btn-cancel"
                    tabindex="0"
                    ref="refCancelBtn"
                    @click="onClose"
                    style="height: 28px;"
                    text="Hủy"
                    ></MButton
                >
            </div>

            <div class="account-form__resize" @click="isResize = !isResize">
                <div class="form-resize__icon"></div>
            </div>
        </div>
        
    </div>
    <MDialogError
    v-if="isShowDialogError"
    :message="this.dialogMessage"
    title="Cảnh báo"
    @btnCloseDialog="hideDialogError"
    ></MDialogError>
</template>
<script>
import MInput from '@/components/bases/input/MInput.vue';
import MButton from '@/components/bases/Button/MButton.vue';
import MCombobox from '@/components/bases/combobox/MCombobox.vue';
import MTrackDetail from "@/components/bases/Table/MTrackDetail.vue";
import MDialogError   from '@/components/bases/Dialog/MDialogError.vue';
import resource from '@/lib/resource';
import { HTTPAccounts } from '@/script/api';
export default {
    name:"AccountDetail",
    components: {
        MInput,
        MCombobox,
        MTrackDetail,
        MButton,
        MDialogError,
    },
    emits: ["CloseDetail"],
    props: {
        accounts: Object,
        accountId: String,
        isDuplicate: Boolean,
    },
    data(){
        return {
            newAccount: {
                
            },
            dialogMessage: "",
            isShowDialogError: false,
            titleForm: "",
            isShowTrackDetail:true,

            //Các biến sử dụng cho validate
            errorMessage: [],
            borderAccountNumberError: false,
            borderAccountNameError: false,
            borderNatureError: false,
            tooltipContentNumber: resource.Vi.ACCOUNT.TOOLTIP_ERROR.TILE_ACCOUNT_NUMBER,
            tooltipContentName: resource.Vi.ACCOUNT.TOOLTIP_ERROR.TILE_ACCOUNT_NAME,
            tooltipContentNature: resource.Vi.ACCOUNT.TOOLTIP_ERROR.TILE_ACCOUNT_NATURE,
            titleAdd: resource.Vi.Detail.titleAdd,
            titleUpdate: resource.Vi.Detail.titleUpdate,
            titleDuplicate: resource.Vi.Detail.titleDuplicate,
            comboboxAccount:resource.COLUMNS_NAME_COMBOBOX_ACCOUNT,
            comboboxNature: resource.COLUMNS_NAME_COMBOBOX_NATURE,
            ACCOUNT_TRACK : [
                {
                    trackText: "Đối tượng",
                    isComboBox: true,
                    options: resource.OBJECT_TYPE,
                    default: resource.OBJECT_TYPE[1].optionId,
                    identity: "Object",
                },
                {
                    trackText: "Tài khoản ngân hàng",
                    isComboBox: false,
                    options: resource.TRACK_TYPE,
                    default: resource.TRACK_TYPE[1].optionId,
                    identity: "BankAccount",
                },
                {
                    trackText: "Đối tượng THCP",
                    isComboBox: true,
                    options:resource.TRACK_TYPE,
                    default:resource.TRACK_TYPE[1].optionId,
                    identity: "Job",
                },
                {
                    trackText: "Công trình",
                    isComboBox: true,
                    options:resource.TRACK_TYPE,
                    default:resource.TRACK_TYPE[1].optionId,
                    identity: "ProjectWork",
                },
                {
                    trackText: "Đơn đặt hàng",
                    isComboBox: true,
                    options:resource.TRACK_TYPE,
                    default:resource.TRACK_TYPE[1].optionId,
                    identity: "Order",
                },
                {
                    trackText: "Hợp đồng bán",
                    isComboBox: true,
                    options:resource.TRACK_TYPE,
                    default:resource.TRACK_TYPE[1].optionId,
                    identity: "PurchaseContract",
                },
                {
                    trackText: "Hợp đồng mua",
                    isComboBox: true,
                    options:resource.TRACK_TYPE,
                    default:resource.TRACK_TYPE[1].optionId,
                    identity: "SaleContract",
                },
                {
                    trackText: "Khoản mục CP",
                    isComboBox: true,
                    options:resource.TRACK_TYPE,
                    default:resource.TRACK_TYPE[1].optionId,
                    identity: "ExpenseItem",
                },
                {
                    trackText: "Đơn vị",
                    isComboBox: true,
                    options:resource.TRACK_TYPE,
                    default:resource.TRACK_TYPE[1].optionId,
                    identity: "OrganizationUnit",
                },
                {
                    trackText: "Mã thống kê",
                    isComboBox: true,
                    options:resource.TRACK_TYPE,
                    default:resource.TRACK_TYPE[1].optionId,
                    identity: "Item",
                },
            ],

        }
    },
    created(){
        //Khi mở form focus mặc định số tài khoản
        this.$nextTick(function () {
            this.$refs.AccountNumber.inputFocus();
        });
        //Check nếu tồn tại ID thì sẽ là form sửaưm
        if(this.accountId || this.isDuplicate){
            this.getAccountId(this.accountId);
        }
    },
    methods: {
        handleSelected (event) {
            try {
                if (event.identity) {
                    this.newAccount[`${event.identity}`] = event.option.optionId;
                }
            } catch (error) {
                console.log(error);
            }
        },
        handleChecked (event) {
            try {
                if (event.identity) {
                    this.newAccount[`IsTrack${event.identity}`] = event.isChecked;
                    console.log("ee");
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Hàm phát ra sự kiện đóng form detail
         * Author: Văn Anh (23/3/2023)
         */
        onClose(){
            console.log("click");
            this.$emit("closeDetail");
        },
        /**
         * Hàm ẩn dialog 
         * Author: Văn Anh (23/3/2023)
         */
        hideDialogError(){
            this.isShowDialogError = false;

        },
        //#region sự kiện sửa
        async getAccountId(id){
            try {
                const response = await HTTPAccounts.get(`/${id}`);
                this.newAccount = response.data;
                console.log(response.data);
                console.log(this.newAccount);
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Hàm xử lý nhấn save 
         * Author: Văn Anh (23/3/2023)
         */
        async handleSubmit(isSaveAndAdd, isAdd ,  toastMessage){
            try {
                const response = isAdd || this.isDuplicate
                ? await HTTPAccounts.post("", this.newAccount)
                : await HTTPAccounts.put(`/${this.newAccount.AccountId}`,this.newAccount);
                console.log(response);
                this.$emit("changeToastMsg",toastMessage,false,true, resource.NOTIFICATION_TITLE.SUCCESS);
                this.$emit("onshowToast");
                await this.$parent.listAccounts();
                if (isSaveAndAdd) {
                    this.newAccount ={};
                }
                else {
                    this.$emit("closeDetail");
                }
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
                var valid = this.validate();
                //Validate dữ liệu
                if (valid) {
                this.isShowDialogWarning = false;
                this.dialogMessage = this.errorMessage[0];
                this.isShowDialogError = true;
                } else {
                this.isShowLoading = true;
                if (this.isAdd) {
                    this.titleForm = this.titleAdd;
                    this.handleSubmit(isSaveAndAdd, true, resource.FORM_MODE.ADD)
                }
                else if (this.isDuplicate) {
                    this.titleForm = this.titleDuplicate;
                    this.handleSubmit(isSaveAndAdd, false, resource.FORM_MODE.DUPLICATE)
                }
                else {
                    this.titleForm = this.titleUpdate;
                    this.handleSubmit(isSaveAndAdd, false, resource.FORM_MODE.EDIT)
                }
                this.isShowLoading = false;
                this.isShowDialogWarning = false;
                }
            } catch (error) {
                console.log(error);
            }
        },
        //#endregion

        //#region Validate  
        /**
         * Hàm validate các trường 
         * Author: Văn Anh (23/3/2023)
         */
        validate(){
            try {
                this.errorMessage = [];
                //Validate trường mã tài khoản
                if (this.valueIsEmpty(this.newAccount.AccountNumber)){
                    this.errorMessage.push(this.tooltipContentNumber);
                    this.borderAccountNumberError = true;
                }
                //validate trường tên tài khoản
                if (this.valueIsEmpty(this.newAccount.AccountName)){
                    this.errorMessage.push(this.tooltipContentName);
                    this.borderAccountNameError = true;
                }

                if(this.errorMessage.length > 0){
                    return true
                }
                return false
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Hàm check value
         * Author: Văn Anh (23/3/2023)
         */
        valueIsEmpty(value) {
        try {
            if (!value) {
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
        }
        },
        //#endregion
    },
    computed: {
        isAdd: function(){
            if(!this.accountId){
                return true;
            }
            return false;
        }
    }
}
</script>
<style scoped>
@import url(./account.css);
.textarea-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.account-form__textarea {
    resize: none;
    border-radius: 3px;
    border: 1px solid #babec5;
    font-family: inherit;
    display: block;
    padding: 9px;
    color: #000;
    font-size: 13px;
    width: 100%;
    height: 100%;
    border: 1px solid var(--border-color);
    outline: none;
    margin-bottom: 12px;
}

.account-form__textarea:focus {
    border: 1px solid var(--main-color);
}


.track-detail {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.track-text {
    line-height: 28px;
}

.toast-account {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99;
}
.form-icon--help {
  background-position: -89px -144px;
}
</style>