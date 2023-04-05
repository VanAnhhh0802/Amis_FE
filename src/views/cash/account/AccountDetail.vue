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
                    <div class="modal__close-btn" @click="confirmDialog">
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
                        v-model="this.newAccount.AccountNumber"
                        label="Số tài khoản"
                        @keydown.shift.tab.prevent="onFocusBtnClose"
                        inputRequired="true"
                        :tabIndex="1"
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
                    v-model="this.newAccount.AccountName"
                        label="Tên tài khoản"
                        inputRequired="true"
                        :tabIndex ="2"
                        width="100%"
                        bottom="12px"
                        ref="AccountName"
                        nameRef="AccountName"
                        @inputOutFocus="this.borderAccountNameError = false"
                        :name="this.nameInput"
                        :error = "this.borderAccountNameError"
                        :tooltipError = "this.borderAccountNameError"
                        :tooltipContent = "this.tooltipContentName"
                    />
                    <MInput
                    v-model="this.newAccount.EnglishName"
                        label="Tên tiếng Anh"
                        width="100%"
                        bottom="12px"
                        :tabIndex ="3"
                        full-width
                        style="margin-left: 8px"
                    />
                </div>
                <div class="row">
                    <div class="checkbox-wrapper" style="width: 25%; margin-right: 8px">
                        <label for="">Tài khoản tổng hợp</label>
                        <MComboboxV2
                        v-model="this.newAccount.ParentId"
                        api="https://localhost:7232/api/v1/Accounts/All"
                        propName="AccountNumber"
                        propValue="AccountId"
                        defaultIndex="0"
                        :tabIndex="4"
                        :columns = "this.comboboxAccount"
                        isTable="true"
                        @changeObject="setGrade"
                        @parentAccountNumber="this.parentNumber = $event"
                        @removeParentId="removeParentId"
                        ></MComboboxV2>
                    </div>
                    <div class="checkbox-wrapper" style="width: 25%">
                        <label for="">Tính chất
                            <span class="input--required">*</span>
                        </label>
                        <MComboboxV1
                            :list="this.comboboxNature"
                            v-model="this.newAccount.Type"
                            propValue="optionId"
                            propName="optionName"
                            :defaultName="this.comboboxNature[0].optionName"
                            :defaultIndex="this.comboboxNature[0].optionId"
                            :tabIndex="5"
                            ref="AccountType"
                            nameRef="AccountType"
                            @comboboxOutFocus="this.borderNatureError = false"
                            :inputErrorCombobox = "this.borderNatureError"
                            :tooltipError = "this.borderNatureError"
                            :tooltipContent = "this.tooltipContentNature"
                            @changeObject="setType"

                        ></MComboboxV1>
                    </div>
                </div>
                <div class="row" style="width: 100%">
                    <div class="textarea-wrapper">
                        <label class="textfield__label modal-label"> Diễn giải</label>
                        <textarea
                            tabindex="6"
                            v-model="this.newAccount.Description"
                            class="account-form__textarea"
                        ></textarea>
                    </div>
                </div>
                <div class="row">
                    <label
                        for="accounting"
                        class="modal__header-left-wrapper account-checkbox"
                        tabindex="7"
                        @keydown.enter="this.newAccount.HasForeignCurrencyAccounting = !this.newAccount.HasForeignCurrencyAccounting"

                    >
                        <input
                            type="checkbox"
                            id="accounting"
                            v-model = "this.newAccount.HasForeignCurrencyAccounting"
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
                <div class="track-detail" v-if="isShowTrackDetail" :style="{ height: !isShowTrackDetail ? '0' : '175px' }">
                    <div class=" account-track__left-row" style="width: 50%;">
                        <div class="flex account-track-item" style="justify-content: space-between">
                            <div class="row-left" >
                                <label
                                    class="modal__header-left-wrapper account-checkbox"
                                    tabindex="8"
                                    @keydown.enter="this.newAccount.IsTrackObject = !this.newAccount.IsTrackObject"
                                >
                                    <input 
                                    type="checkbox" 
                                    v-model="this.newAccount.IsTrackObject" 
                                    />
                                    <div class="check-icon"></div>
                                </label>
                                
                                <span class="track-text">Đối tượng</span>
                            </div>
                            <div
                                class="checkbox-wrapper"
                                
                            >
                                <MCombobox
                                v-model="this.newAccount.Object"
                                propName="optionName"
                                propValue="optionId"
                                :tabIndex="this.newAccount.IsTrackObject ? 9 : 0"
                                :defaultName = "this.comboboxObject[1].optionName"
                                :defaultIndex="this.comboboxObject[1].optionId"
                                :isDisabled = "!this.newAccount.IsTrackObject"
                                :list="this.comboboxObject"
                                />
                            </div>
                        </div>
                        <div class="flex account-track-item" style="justify-content: space-between">
                            <div class="row-left" >
                                <label
                                    class="modal__header-left-wrapper account-checkbox"
                                    tabindex="10"
                                    @keydown.enter="this.newAccount.IsTrackJob = !this.newAccount.IsTrackJob"

                                >
                                    <input type="checkbox"  v-model="this.newAccount.IsTrackJob" />
                                    <div class="check-icon"></div>
                                </label>
                                <div class="tooltip">
                                    <span class="track-text">Đối tượng THCP</span>
                                    <div class="tooltip-text tooltip-track-job">Đối tượng tập hợp chi phí</div>
                                </div>
                            </div>
                            <div
                                class="checkbox-wrapper"
                            >
                                <MCombobox
                                propName="optionName"
                                propValue="optionId"
                                :tabIndex="this.newAccount.IsTrackJob ? 11 : 0"
                                v-model="this.newAccount.Job"
                                :defaultName = "this.comboboxTrackType[1].optionName"
                                :defaultIndex="this.comboboxTrackType[1].optionId"
                                :isDisabled = "!this.newAccount.IsTrackJob"
                                :list="this.comboboxTrackType"
                                />
                            </div>
                        </div>
                        <div class="flex account-track-item" style="justify-content: space-between">
                            <div class="row-left" >
                                <label
                                    class="modal__header-left-wrapper account-checkbox"
                                    tabindex="12"
                                    @keydown.enter="this.newAccount.IsTrackOrder = !this.newAccount.IsTrackOrder"

                                >
                                    <input type="checkbox"  v-model="this.newAccount.IsTrackOrder" />
                                    <div class="check-icon"></div>
                                </label>
                                <span class="track-text">Đơn đặt hàng </span>
                            </div>
                            <div
                                class="checkbox-wrapper"
                            >
                                <MCombobox
                                propName="optionName"
                                propValue="optionId"
                                :tabIndex="this.newAccount.IsTrackOrder ? 13 : 0"
                                v-model="this.newAccount.Order"
                                :defaultName = "this.comboboxTrackType[1].optionName"
                                :defaultIndex="this.comboboxTrackType[1].optionId"
                                :isDisabled = "!this.newAccount.IsTrackOrder"
                                :list="this.comboboxTrackType"
                                />
                            </div>
                        </div>
                        <div class="flex account-track-item" style="justify-content: space-between">
                            <div class="row-left" >
                                <label
                                    class="modal__header-left-wrapper account-checkbox"
                                    tabindex="14"
                                    @keydown.enter="this.newAccount.IsTrackPurchaseContract = !this.newAccount.IsTrackPurchaseContract"

                                >
                                    <input type="checkbox" v-model="this.newAccount.IsTrackPurchaseContract" />
                                    <div class="check-icon"></div>
                                </label>
                                <span class="track-text">Hợp đồng mua </span>
                            </div>
                            <div
                                class="checkbox-wrapper"
                            >
                                <MCombobox
                                propName="optionName"
                                propValue="optionId"
                                v-model="this.newAccount.PurchaseContract"
                                :tabIndex="this.newAccount.IsTrackPurchaseContract ? 15 : 0"
                                :defaultName = "this.comboboxTrackType[1].optionName"
                                :defaultIndex="this.comboboxTrackType[1].optionId"
                                :isDisabled = "!this.newAccount.IsTrackPurchaseContract"
                                :list="this.comboboxTrackType"
                                />
                            </div>
                        </div>
                        <div class="flex account-track-item" style="justify-content: space-between">
                            <div class="row-left" >
                                <label
                                    class="modal__header-left-wrapper account-checkbox"
                                    tabindex="16"
                                    @keydown.enter="this.newAccount.IsTrackOrganizationUnit = !this.newAccount.IsTrackOrganizationUnit"

                                >
                                    <input type="checkbox" v-model="this.newAccount.IsTrackOrganizationUnit" />
                                    <div class="check-icon"></div>
                                </label>
                                <span class="track-text">Đơn vị </span>
                            </div>
                            <div
                                class="checkbox-wrapper"
                            >
                                <MCombobox
                                propName="optionName"
                                propValue="optionId"
                                v-model="this.newAccount.OrganizationUnit"
                                :tabIndex="this.newAccount.IsTrackOrganizationUnit ? 17 : 0"
                                :defaultName = "this.comboboxTrackType[1].optionName"
                                :defaultIndex="this.comboboxTrackType[1].optionId"
                                :isDisabled = "!this.newAccount.IsTrackOrganizationUnit"
                                :list="this.comboboxTrackType"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="account-track__right-row" style="width: 50%;">
                        <div class="flew account-track-item" style="justify-content: space-between">
                            <div class="row-left" >
                                <label
                                    class="modal__header-left-wrapper account-checkbox"
                                    tabindex="18"
                                    @keydown.enter="this.newAccount.IsTrackBankAccount = !this.newAccount.IsTrackBankAccount"

                                >
                                    <input type="checkbox"  v-model="this.newAccount.IsTrackBankAccount" />
                                    <div class="check-icon"></div>
                                </label>
                                <span class="track-text">Tài khoản ngân hàng </span>
                            </div>
                            
                        </div>
                        <div class="flex account-track-item" style="justify-content: space-between">
                            <div class="row-left" >
                                <label
                                    class="modal__header-left-wrapper account-checkbox"
                                    tabindex="19"
                                    @keydown.enter="this.newAccount.IsTrackProjectWork = !this.newAccount.IsTrackProjectWork"

                                >
                                    <input type="checkbox" v-model="this.newAccount.IsTrackProjectWork" />
                                    <div class="check-icon"></div>
                                </label>
                                <span class="track-text">Công trình</span>
                            </div>
                            <div
                                class="checkbox-wrapper"
                            >
                                <MCombobox
                                propName="optionName"
                                propValue="optionId"
                                v-model="this.newAccount.ProjectWork"
                                :tabIndex="this.newAccount.IsTrackProjectWork ? 20 : 0"
                                :defaultName = "this.comboboxTrackType[1].optionName"
                                :defaultIndex="this.comboboxTrackType[1].optionId"
                                :isDisabled = "!this.newAccount.IsTrackProjectWork"
                                :list="this.comboboxTrackType"
                                />
                            </div>
                        </div>
                        <div class="flex account-track-item" style="justify-content: space-between">
                            <div class="row-left" >
                                <label
                                    class="modal__header-left-wrapper account-checkbox"
                                    tabindex="21"
                                    @keydown.enter="this.newAccount.IsTrackSaleContract = !this.newAccount.IsTrackSaleContract"

                                >
                                    <input type="checkbox" v-model="this.newAccount.IsTrackSaleContract" />
                                    <div class="check-icon"></div>
                                </label>
                                <span class="track-text">Hợp đồng bán </span>
                            </div>
                            <div
                                class="checkbox-wrapper"
                            >
                                <MCombobox
                                propName="optionName"
                                propValue="optionId"
                                v-model="this.newAccount.SaleContract"
                                :tabIndex="this.newAccount.IsTrackSaleContract ? 22 : 0"
                                :defaultName = "this.comboboxTrackType[1].optionName"
                                :defaultIndex="this.comboboxTrackType[1].optionId"
                                :isDisabled = "!this.newAccount.IsTrackSaleContract"
                                :list="this.comboboxTrackType"
                                />
                            </div>
                        </div>
                        <div class="flex account-track-item" style="justify-content: space-between">
                            <div class="row-left" >
                                <label
                                    class="modal__header-left-wrapper account-checkbox"
                                    tabindex="23"
                                    @keydown.enter="this.newAccount.IsTrackExpenseItem = !this.newAccount.IsTrackExpenseItem"

                                >
                                    <input type="checkbox" v-model="this.newAccount.IsTrackExpenseItem" />
                                    <div class="check-icon"></div>
                                </label>
                                <span class="track-text">Khoản mục CP</span>
                            </div>
                            <div
                                class="checkbox-wrapper"
                            >
                                <MCombobox
                                propName="optionName"
                                propValue="optionId"
                                v-model="this.newAccount.ExpenseItem"
                                :tabIndex="this.newAccount.IsTrackExpenseItem ? 24 : 0"
                                :defaultName = "this.comboboxTrackType[1].optionName"
                                :defaultIndex="this.comboboxTrackType[1].optionId"
                                :isDisabled = "!this.newAccount.IsTrackExpenseItem"
                                :list="this.comboboxTrackType"
                                />
                            </div>
                        </div>
                        <div class="flex account-track-item" style="justify-content: space-between">
                            <div class="row-left" >
                                <label
                                    class="modal__header-left-wrapper account-checkbox"
                                    tabindex="25"
                                    ref="IsTrackItem"
                                    @keydown.enter="this.newAccount.IsTrackItem = !this.newAccount.IsTrackItem"

                                >
                                    <input type="checkbox" v-model="this.newAccount.IsTrackItem" />
                                    <div class="check-icon"></div>
                                </label>
                                <span class="track-text">Mã thống kê</span>
                            </div>
                            <div
                                class="checkbox-wrapper"
                            >
                                <MCombobox
                                propName="optionName"
                                propValue="optionId"
                                v-model="this.newAccount.Item"
                                :tabIndex="this.newAccount.IsTrackExpenseItem ? 26 : 0"

                                :defaultName = "this.comboboxTrackType[1].optionName"
                                :defaultIndex="this.comboboxTrackType[1].optionId"
                                :isDisabled = "!this.newAccount.IsTrackItem"
                                :list="this.comboboxTrackType"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer account-form__footer">
                <div class="modal-footer__wrapper" style="padding-right: 46px">
                    <MButton
                        type="submit"
                        class="btn btn--secondary modal-btn__secondary btn-save"
                        tabindex="27"
                        text="Cất"
                        ref="refSave"
                        refName="refSave"
                        style="height: 28px;"
                        @click="btnSaveOnClick(false)"
                        @keydown.shift.tab.prevent="this.$refs[IsTrackItem]"

                    >
                    </MButton>
                    <MButton 
                    class="btn btn--primary btn-save-add" 
                    text="Cất và Thêm" 
                    tabindex="28" 
                    style="height: 28px;"
                    ref="refSaveAddBtn"
                    @keydown.shift.tab.prevent="onFocusBtnSave"
                    refName="refSaveAddBtn"
                    @Click="btnSaveOnClick(true)"
                    >
                    </MButton>
                </div>
                <MButton
                    for="show-modal"
                    class="btn btn--secondary modal-btn-cancel"
                    tabindex="29"
                    ref="refCancelBtn"
                    refName="refCancelBtn"
                    @click="onClose"
                    style="height: 28px;"
                    text="Hủy"
                    @keydown.shift.tab.prevent="onFocusBtnAdd"
                    @keydown.tab.prevent="tabOrder()"
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



    <MDialog v-if="isShowDialogWarning" 
    @btnCloseDialog="closeDialogWarning"
    @btnYes="btnSaveOnClick(false)"
    >
    <template v-slot:title>Cảnh báo</template>
    <template v-slot:message
      >
      <li class="flex dialog-mgs">
        <div
          class="icon w-h-36 btn-dialog--close dialog__confirm-icon"
        ></div>
        Dữ liệu bị thay đổi. Bạn có muỗn cất không
      </li>
      </template
    >
    <template v-slot:footer>
      <div class="flex w-full" style="justify-content: space-between">
        <MButton
          class="btn--secondary dialog__btn--acept"
          @click="this.isShowDialogWarning = false"
          text="Hủy"
        >
        </MButton>
        <div class="flex col-gap">
          <MButton
            class="btn--secondary dialog__btn--acept"
            @click="onClose"
            text="Không"
          >
          </MButton>
          <MButton
            class="btn--primary dialog__btn--acept"
            @click="btnWarningClickYes"
            text="Có"
          >
          </MButton>
        </div>
      </div>
    </template>
    </MDialog>
</template>
<script>
import MInput from '@/components/bases/input/MInput.vue';
import MButton from '@/components/bases/Button/MButton.vue';
import MCombobox from '@/components/bases/combobox/MCombobox.vue';
import MComboboxV2 from '@/components/bases/combobox/MComboboxV2.vue';
import MComboboxV1 from '@/components/bases/combobox/MComboboxV1.vue';
import MDialog from '@/components/bases/Dialog/MDialog.vue';
import MDialogError   from '@/components/bases/Dialog/MDialogError.vue';
import resource from '@/lib/resource';
import { HTTPAccounts } from '@/script/api';
import MISAEnum from '@/lib/enum';

export default {
    name:"AccountDetail",
    components: {
        MInput,
        MCombobox,
        MComboboxV1,
        MComboboxV2,
        MDialog,
        MButton,
        MDialogError,
    },
emits: ["CloseDetail", "reloadData", "onshowToast", "changeToastMsg"],
    props: {
        accounts: Object,
        accountId: String,
        isDuplicate: Boolean,
    },
    data(){
        return {
            parentNumber: "",
            DuplicateAccount:false,
            newAccount: {
                AccountNumber: "",
                AccountName: "",
                Grade: 1,
                ParentId: resource.Vi.GUID_EMPTY,
                EnglishName: "",
                Type: 1,
                Description: "",
                HasForeignCurrencyAccounting: false,
                IsActive: true,
                IsParent: false,
                IsTrackObject: false,
                IsTrackJob: false,
                IsTrackOrder: false,
                IsTrackPurchaseContract: false,
                IsTrackOrganizationUnit: false,
                IsTrackProjectWork: false,
                IsTrackBankAccount: false,
                IsTrackSaleContract: false,
                IsTrackExpenseItem: false,
                IsTrackItem: false,
                Object: 1,
                Job: 1,
                Order: 1,
                PurchaseContract: 1,
                OrganizationUnit: 1,
                BankAccount: 0,
                ProjectWork: 1,
                SaleContract: 1,
                ExpenseItem: 1,
                Item: 1,
                CreatedBy: "Hồ Văn Anh",
                CreatedDate: new Date(),
                ModifiedBy: "",
                ModifiedDate: new Date(),
            },
            accountChanged: false,
            dialogMessage: "",
            isShowDialogError: false,
            isShowDialogWarning: false,
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
            titleAdd: resource.Vi.Detail.TitleAdd,
            titleUpdate: resource.Vi.Detail.TitleUpdate,
            titleDuplicate: resource.Vi.Detail.TitleDuplicate,
            comboboxAccount:resource.COLUMNS_NAME_COMBOBOX_ACCOUNT,
            comboboxNature: resource.COLUMNS_NAME_COMBOBOX_NATURE,
            comboboxTrackType:resource.TRACK_TYPE,
            comboboxObject:resource.OBJECT_TYPE,

        }
    },
    created(){
        //Khi mở form focus mặc định số tài khoản
        this.$nextTick(function () {
            this.$refs.AccountNumber.inputFocus();
        });
        this.DuplicateAccount = this.isDuplicate;
        //Thay đổi title form 
        this.handleTitleForm()
        //Check nếu tồn tại ID thì sẽ là form sửaưm
        if(this.accountId || this.DuplicateAccount){
            this.getAccountId(this.accountId);
        }
    },
    computed: {
        /**
         * Kiểm tra xem form cái là form thêm mới hay không
         */
        isAdd: function(){
            if(!this.accountId){
                return true;
            }
            return false;
        },
        
    },
    methods: {
        setType(event){
            console.log("event: " + event);
        },
        /**
         * Set lại grade nếu là con của tài khoản tổng hợp
         * @param {*} event 
         * Author: Văn ANh (4/4/2023)
         */
        setGrade(event){
            this.newAccount.Grade = event.Grade + 1;
        },
        /**
         * Hàm đóng dialog warning
         * Author: Văn ANh(28/3/2023)
         */
        closeDialogWarning(){
            this.isShowDialogWarning = false;
            //Khi mở form focus mặc định số tài khoản
            this.$nextTick(function () {
                this.$refs.AccountNumber.inputFocus();
            });
        },
        /*
        * Hãm xử lý focus vao button Cất và thêm
        Author: Văn Anh (3/3/2023)
        */
        onFocusBtnClose(){
            try {
                this.$refs.refCancelBtn.buttonFocus();
            } catch (error) {
                console.log(error);
            }
        },
        onFocusBtnAdd(){
            try {
                this.$refs.refSaveAddBtn.buttonFocus();
            } catch (error) {
                console.log(error);
            }
        },
        enter(){
            console.log("ener");
        },
        onFocusBtnSave(){
            try {
                this.$refs.refSave.buttonFocus();
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Hàm xử lý khi người dùng tab đến button hủy tab lần nữa quay lại ô input đầu tiên
         * Author: Văn Anh(26/12/2022)
         */
        tabOrder() {
            try {
                this.$refs.AccountNumber.inputFocus();
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Hiển thị dialoa cảnh báo
         */
        confirmDialog(){
            if (this.accountChanged){
                console.log(this.accountChanged);
                this.isShowDialogWarning = true;
            }
            else {
            this.$emit("closeDetail");

            }
        },
        /**
         * Hàm phát ra sự kiện đóng form detail
         * Author: Văn Anh (23/3/2023)
         */
        onClose(){
            this.isShowDialogWarning = false;
            this.isShowDialogError = false;
            this.$emit("closeDetail");
        },
        
        
        //#region sự kiện sửa
        async getAccountId(id){
            try {
                const response = await HTTPAccounts.get(`/${id}`);
                
                this.newAccount = response.data;
                this.newAccount.AccountId = id;
               
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Nếu không phải tài khoản tổng hợp thì reset lại các trường
         * Author: Văn Anh(25/3/2023)
         */
        removeParentId(){
            this.newAccount.ParentId = resource.Vi.GUID_EMPTY,
            this.parentNumber = "",
            this.newAccount.Grade = 1
        },
        
        /**
         * Hàm xử lý nhấn save 
         * Author: Văn Anh (23/3/2023)
         */
        async handleSubmit(isSaveAndAdd, isAdd ,  toastMessage){
            try {
                if (this.DuplicateAccount){
                    this.newAccount.AccountId = null;
                }
                const response = isAdd || this.DuplicateAccount
                ? await HTTPAccounts.post("",{
                AccountNumber: this.newAccount.AccountNumber,
                AccountName:this.newAccount.AccountName,
                Grade: this.newAccount.Grade,
                IsParent: false,
                Description: this.newAccount.Description,
                EnglishName:this.newAccount.EnglishName,
                ParentId:this.newAccount.ParentId ? this.newAccount.ParentId : resource.Vi.GUID_EMPTY,
                HasForeignCurrencyAccounting: this.newAccount.HasForeignCurrencyAccounting,
                IsTrackObject: this.newAccount.IsTrackObject,
                IsTrackJob: this.newAccount.IsTrackJob,
                IsTrackOrder: this.newAccount.IsTrackOrder,
                IsTrackPurchaseContract: this.newAccount.IsTrackPurchaseContract,
                IsTrackOrganizationUnit: this.newAccount.IsTrackOrganizationUnit,
                IsTrackBankAccount: this.newAccount.IsTrackBankAccount,
                IsTrackProjectWork: this.newAccount.IsTrackProjectWork,
                IsTrackSaleContract: this.newAccount.IsTrackSaleContract,
                IsTrackExpenseItem: this.newAccount.IsTrackExpenseItem,
                IsTrackItem: this.newAccount.IsTrackItem,
                IsActive: isAdd ? this.newAccount.IsActive :  this.newAccount.IsActive = true,
                Type: this.newAccount.Type,
                Object: this.newAccount.Object|| 1 ,
                Job: this.newAccount.Job|| 1,
                Order: this.newAccount.Order|| 1,
                PurchaseContract: this.newAccount.PurchaseContract|| 1,
                OrganizationUnit: this.newAccount.OrganizationUnit|| 1,
                BankAccount: this.newAccount.BankAccount|| 1,
                ProjectWork: this.newAccount.ProjectWork|| 1,
                SaleContract: this.newAccount.SaleContract|| 1,
                ExpenseItem: this.newAccount.ExpenseItem|| 1,
                Item: this.newAccount.Item|| 1,
                CreatedBy: "Hồ Văn Anh",
                CreatedDate: new Date(),
                ModifiedBy: "",
                ModifiedDate: new Date(),
                })
                : await HTTPAccounts.put(`/${this.newAccount.AccountId}`,{
                AccountId: this.newAccount.AccountId,
                AccountNumber: this.newAccount.AccountNumber,
                AccountName:this.newAccount.AccountName,
                Grade: this.newAccount.Grade,
                IsParent: false,
                Description: this.newAccount.Description,
                EnglishName:this.newAccount.EnglishName,
                ParentId:this.newAccount.ParentId ? this.newAccount.ParentId : resource.Vi.GUID_EMPTY,
                HasForeignCurrencyAccounting: this.newAccount.HasForeignCurrencyAccounting,
                IsTrackObject: this.newAccount.IsTrackObject,
                IsTrackJob: this.newAccount.IsTrackJob,
                IsTrackOrder: this.newAccount.IsTrackOrder,
                IsTrackPurchaseContract: this.newAccount.IsTrackPurchaseContract,
                IsTrackOrganizationUnit: this.newAccount.IsTrackOrganizationUnit,
                IsTrackBankAccount: this.newAccount.IsTrackBankAccount,
                IsTrackProjectWork: this.newAccount.IsTrackProjectWork,
                IsTrackSaleContract: this.newAccount.IsTrackSaleContract,
                IsTrackExpenseItem: this.newAccount.IsTrackExpenseItem,
                IsTrackItem: this.newAccount.IsTrackItem,
                IsActive: this.newAccount.IsActive,
                Type: this.newAccount.Type,
                Object: this.newAccount.Object,
                Job: this.newAccount.Job,
                Order: this.newAccount.Order,
                PurchaseContract: this.newAccount.PurchaseContract,
                OrganizationUnit: this.newAccount.OrganizationUnit,
                BankAccount: this.newAccount.BankAccount,
                ProjectWork: this.newAccount.ProjectWork,
                SaleContract: this.newAccount.SaleContract,
                ExpenseItem: this.newAccount.ExpenseItem,
                Item: this.newAccount.Item,
                CreatedBy: "Hồ Văn Anh",
                CreatedDate: new Date(),
                ModifiedBy: "",
                ModifiedDate: new Date(),});

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
        /**
         * Khi người dùng bấm nút cất hoặc cất và thêm mới
         * Author: Văn Anh (23/3/2023)
         */
        async btnSaveOnClick(isSaveAndAdd) {
            console.log(this.newAccount);
            try {
                //Hiển thị loading
                var valid = await this.validate();
                //Validate dữ li
                if (valid) {
                this.isShowDialogWarning = false;
                this.dialogMessage = this.errorMessage[0];
                this.isShowDialogError = true;

                } else {
                this.isShowLoading = true;
                if(!this.newAccount.AccountId || this.DuplicateAccount){
                    this.handleSubmit(isSaveAndAdd, true, resource.FORM_MODE.ADD)
                }
                else {
                    this.handleSubmit(isSaveAndAdd, false, resource.FORM_MODE.EDIT)
                }
                this.isShowLoading = false;
            }
            } catch (error) {
                console.log(error);

            }
        },
        /**
         * Hàm trả về mã lỗi
         * Author: Văn Anh(24/3/2023)
         */
        handleException(error) {
            console.log(resource.STATUSCODE.BadRequest, error.response.status);
            if (error.response.status === resource.STATUSCODE.BadRequest) {
                switch (error.response.data.ErrorCode) {
                case MISAEnum.ERRORCODE.DuplicateCode:
                    this.isShowLoading = false;
                    //Trả về lỗi 400 thì hiển thị thông báo mã đã bị trùng
                    this.dialogMessage = error.response.data.UserMsg;
                    this.isShowDialogError = true;
                    this.$refs.AccountNumber.inputFocus();
                    break;
                // eslint-disable-next-line
                case MISAEnum.ERRORCODE.InvalidInput:
                    this.dialogMessage = error.response.data.UserMsg;
                    this.isShowDialogError = true;
                    break;
                    default:
                    break;
                }
            } 
            else if (error.response.status == resource.STATUSCODE.ServerError) {
                this.dialogMessage = error.response.data.UserMsg;
                this.isShowDialog = true;
            }
            else {
                for(const property in resource.STATUSCODES) {
                    if(error.response.status == property.Code) {
                    this.dialogMessage = property.Message;
                    this.isShowDialog = true;
                    }
                }
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
                else if (this.newAccount.AccountNumber.length < resource.Vi.ACCOUNT.ERROR_MESSAGE.MIN_NUMBER){
                    //Kiểm tra số tài khoản nhập vào bé hơn 3 ký tự
                    this.errorMessage.push(resource.Vi.ACCOUNT.TOOLTIP_ERROR.TITLE_ACCOUNT_NAMBER_MINLENGTH);
                }
                else if(this.parentNumber){
                    //Kiểm tra nếu có tài khoản cha thì số tài khoản bắt đầu từ tài khoản cha
                    let regex = new RegExp(`^${this.parentNumber}*`)
                    if(!regex.test(this.newAccount.AccountNumber)){
                        this.errorMessage.push(resource.Vi.ACCOUNT.TOOLTIP_ERROR.TITLE_ACCOUNT_NUMBER_PARENT);
                    }
                }
                else if(this.outLengthValid(this.newAccount.AccountNumber, resource.Vi.ACCOUNT.ERROR_MESSAGE.OUTLENGTH_NUMBER)){
                    this.errorMessage.push(resource.Vi.ACCOUNT.TOOLTIP_ERROR.TITLE_ACCOUNT_NUMBER_OUTLENGTH);
                }
                else {
                    this.borderAccountNumberError = false;
                }


                //validate trường tên tài khoản
                if (this.valueIsEmpty(this.newAccount.AccountName)){
                    this.errorMessage.push(this.tooltipContentName);
                    this.borderAccountNameError = true;
                }
                else if (this.outLengthValid(this.newAccount.AccountName, resource.Vi.ACCOUNT.ERROR_MESSAGE.OUTLENGTH_NAME)){
                    this.errorMessage.push(resource.Vi.ACCOUNT.TOOLTIP_ERROR.TITLE_ACCOUNT_NAME_OUTLENGTH);
                }
                else {
                    this.borderAccountNameError = false;
                }


                //validate trường tính chất
                if(this.valueIsEmpty(this.newAccount.Type)){
                    this.errorMessage.push(this.tooltipContentNature);
                    this.borderNatureError = true;
                }
                else {
                    this.borderNatureError = false;
                }
                //Nếu có lỗi thì return về true
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
            } 
            catch (error) {
                console.log(error);
            }
        },
        /**
         * Hàm focus khi có lỗi xảy ra
         */
        async inputErrorFocus() {
            try {
                if (this.borderAccountNumberError){
                   
                        this.$refs.AccountNumber.inputFocus();
                
                }

                else if (this.borderAccountNameError){
                    this.$nextTick(function () {
                        this.$refs.AccountName.inputFocus();
                    });
                    
                }
                else if (this.borderNatureError){
                         
                        this.$refs.AccountType.comboboxFocus();
                    
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Hàm ẩn dialog 
         * Author: Văn Anh (23/3/2023)
         */
         async hideDialogError(){
            try {
                this.isShowDialogError = false;
                this.validate();
              await  this.inputErrorFocus();
                
            } catch (error) {
                console.log(error);
            }

            
        },
        //Hàm dùng chung xử lý lỗi nhập vượt quá độ dài
        outLengthValid (value, number){
        try {
            if (value.length > number){
            return true;
            }
            return false;
        } 
        catch (error) {
            console.log(error);
        }
        },
        //#endregion

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
                    me.confirmDialog();
                }
                
            }
        },
        /**
         * Xét title form cho detail
         */
        handleTitleForm(){
            if(this.isAdd){
                this.titleForm = this.titleAdd;
                console.log(this.titleForm);
            }
            else if(this.DuplicateAccount){
                this.titleForm = this.titleDuplicate;
            }
            else {
                this.titleForm = this.titleUpdate;
            }
        }
    },
    
    watch: {
        newAccount:  {
            handler(newValue, oldValue) {
                console.log("value 2", newValue);
                if (oldValue){
                    this.accountChanged = false;
                }
               if (newValue) {
                    this.accountChanged = true;
                }
            },
            deep:true
        },
        
        
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
.account-track-item + .account-track-item{
    margin-top: 8px;
}
.account-track-item{
    position: relative;
}
.account-track-item-disabled{
    position: absolute;
    top: 0;
    right: 0;
    background-color: #eff0f2;
    cursor: default;
}
label:focus{
    outline: 1px solid #a0f5e1;
}
.tooltip-track-job{
  min-width: 150px;
  top: 20px;
}
</style>