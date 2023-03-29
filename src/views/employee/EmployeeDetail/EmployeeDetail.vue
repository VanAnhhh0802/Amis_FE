<template lang="">
  <div id="form__add" class="form"
    
  >
    <div class="flex" style="justify-content: center; height: 100%">
      <div class="form__wrapper"
        v-on:keydown.esc="btnClose"
      >
        <div class="flex form__header">
          <div class="flex col-gap-16 form__header--left">
            <h1 id="form__title" class="heading form__title">
              <!-- Thông tin nhân viên -->
              {{this.DetailTile}}
            </h1>
            <span class="flex col-gap">
              <MCheckbox></MCheckbox>
              <span style = "margin-top: 0;">Là khách hàng</span>
            </span>
            <span class="flex col-gap">
              <MCheckbox></MCheckbox>
              <span style = "margin-top: 0;">Là nhà cung cấp</span>
            </span>
          </div>
          <div class="flex form-icon">
            <div class="icon w-h-24 tooltip form-icon--help">
              <div class="tooltip-text">{{this.textTooltipHelp}}</div>
            </div>
            <div
              class="icon w-h-24 tooltip form-icon--close btn--close"
              @click="btnClose"
            >
              <div class="tooltip-text">{{this.textTooltipClose}}</div>
            </div>
          </div>
        </div>
        <div class="form__content">
          <div class="flex form__content-top">
            <div class="form-content--left">
              <div class="row col-gap">
                <MInput
                  :label="this.textLabelCode"
                  width="150px"
                  style="width: 150px"
                  v-model:modelValue.trim()="newEmployee.employeeCode"
                  :inputRequired="true"
                  :tabIndex="1"
                  ref="EmployeeCode"
                  nameRef ="EmployeeCode"
                  @inputOutFocus="this.errorBorderCode = false"
                  :name="this.nameInput"
                  :error = "this.errorBorderCode"
                  :tooltipError = "this.errorBorderCode"
                  :tooltipContent = "this.tooltipContentCode"
                  @keydown.shift.tab.prevent="onFocusCancelButton()"
                ></MInput>
                <MInput
                  :label="this.textLabelName"
                  v-model:modelValue.trim()="newEmployee.fullName"
                  :inputRequired="true"
                  :tabIndex="2"
                  ref="FullName"
                  nameRef ="FullName"
                  @inputOutFocus="this.errorBorderName = false"
                  :error = "this.errorBorderName"
                  :tooltipError = "this.errorBorderName"
                  :tooltipContent = "this.tooltipContentName"
                ></MInput>
              </div>
              <div class="row">
                <div class="form__unit">
                  <MCombobox
                    id="cbxDepartment"
                    :label="this.textLabelDepartment "
                    :isRequired="true"
                    propName="DepartmentName"
                    propValue="DepartmentId"
                    api="https://localhost:7232/api/v1/Departments/filter?pageSize=10&pageNumber=1"
                    v-model.trim()="newEmployee.DepartmentId"
                    :isShowError="false"
                    :tabIndex="3"
                    ref="DepartmentName"
                    nameRef="DepartmentName"
                    @comboboxOutFocus="this.errorBorderDepartment = false"
                    :inputErrorCombobox = "this.errorBorderDepartment"
                    :tooltipError = "this.errorBorderDepartment"
                    :tooltipContent = "this.tooltipContentDepartment"
                  ></MCombobox>
                </div>
              </div>
              <div class="row">
                <MInput
                  :label="this.textLabelPositionName"
                  type="text"
                  :tabIndex="4"
                  v-model:modelValue.trim()="newEmployee.positionName"
                ></MInput>
              </div>
            </div>
            <div class="form-content--right">
              <div class="row col-gap">
                <div style = "height: 62px">
                  <label>Ngày sinh</label>
                  <br>
                  <MDatePicker
                    v-model.trim()="newEmployee.dateOfBirth"
                    :tabIndex="5"
                    name="DateOfBirth"
                    dateName="'DateOfBirthPicker'"
                    ref="DateOfBirth"
                    :isErrorInput = "this.errorBorderDateOfBirth"
                    :tooltipError = "this.errorBorderDateOfBirth"
                    @blurInput = "this.errorBorderDateOfBirth"
                    tooltipContent = "Ngày không được lớn hơn ngày hiện tại"
                  />
                </div>
                <div class="form__sex-wrapper input-wrapper">
                  <label for="" class="form__sex">Giới tính</label>
                  <div class="flex form__male-wrapper">
                    <div class="flex m-8">
                      <input
                        type="radio"
                        checked
                        id="gender-male"
                        tabindex="6"
                        value="0"
                        name=" gender"
                        class="input__form-sex-male"
                        v-model="newEmployee.gender"
                      /> 
                      <label for="" style="padding-top: 2px">Nam</label>
                    </div>
                    <div class="flex m-8">
                      <input
                        type="radio"
                        id="gender-female"
                        property-name="employeeGender"
                        tabindex="7"
                        value="1"
                        name=" gender"
                        class="input__form-sex-female"
                        v-model="newEmployee.gender"

                      /><label for="" style="padding-top: 2px">Nữ</label>
                    </div>
                    <div class="flex m-8">
                      <input
                        type="radio"
                        id="gender-other"
                        value="2"
                        tabindex="8"
                        name=" gender"
                        property-name="employeeGender"
                        class="input__form-sex-female"
                        v-model="newEmployee.gender"
                      />
                      <label for="" style="padding-top: 2px">Khác</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row col-gap">
                  <MInput 
                  label="Số CMND" 
                  :tabIndex="9"
                  v-model:modelValue.trim() = "newEmployee.identityNumber"
                  tooltip="true"
                  tooltipMessage="Số chứng minh nhân dân"
                  ></MInput>
                  <div style = "height: 44px">
                  <label>Ngày cấp</label>
                  <br>
                  <MDatePicker
                    v-model.trim()="newEmployee.identityDate"
                    :tabIndex="10"
                    name="IdentityDate"
                    dateName="'IdentityDatePicker'"
                    ref="IdentityDate"
                    :isErrorInput = "this.errorBorderIdentityDate"
                    :tooltipError = "this.errorBorderIdentityDate"
                    @blurInput = "this.errorBorderIdentityDate"
                    tooltipContent = "Ngày không được lớn hơn ngày hiện tại"
                  />
                </div>
              </div>
              <div class="row">
                <MInput
                  :label="this.textLabelIdentityPlace"
                  class="w-full"
                  :tabIndex="11"
                  v-model:modelValue.trim()="newEmployee.identityPlace"
                ></MInput>
              </div>
            </div>
          </div>
          <div class="form__content-bottom">
            <div id="" class="row">
              <MInput
                :label="this.textLabelAddress"
                :tabIndex="12"
                v-model:modelValue.trim()="newEmployee.address"
              ></MInput>
            </div>
            <div class="row form-popup-container-top">
              <div class="w-full flex col-gap">
                <div class="w-full flex col-gap">
                    <MInput
                    inputType="text"
                    :label="this.textLabelPhone"
                    :tabIndex="13"
                    v-model:modelValue.trim()="newEmployee.phoneNumber"
                    tooltip= "true"
                    tooltipMessage = "Số điện thoại di động"
                    nameRef ="PhoneNumber"
                    ref="PhoneNumber"
                  ></MInput>
                  <MInput
                  inputType="text"
                    :label="this.textLabelTelephone"
                    :tabIndex="14"
                    v-model:modelValue.trim()="newEmployee.telephoneNumber"
                    tooltip= "true"
                    tooltipMessage = "Số điện thoại cố định"
                    ref="PhoneNumber"
                    nameRef ="PhoneNumber"
                  ></MInput>
                </div>
                <div class="w-full">
                  <MInput
                    :label="this.textLabelEmail"
                    style="width: 260px"
                    :tabIndex="15"
                    @inputOutFocus="this.errorBorderCode = false"
                    v-model:modelValue.trim()="newEmployee.email"
                    :error = "this.errorBorderEmail"
                    ref="Email"
                    nameRef ="Email"
                    :tooltipError = "this.errorBorderEmail"
                    tooltipContent = "Email không đúng định dạng"
                  ></MInput>
                </div>
              </div>
            </div>
            <div class="row form-popup-container-bottom gap-32">
              <div class="w-full flex col-gap">
                <div class="w-full flex col-gap">
                  <MInput
                    :label="this.textLabelBankAccountNumber"
                    :tabIndex="16"
                    v-model:modelValue.trim()="newEmployee.bankAccountNumber"
                    tooltip = "true"
                    tooltipContent = "Tài khoản ngân hàng"
                  ></MInput>
                  <MInput
                    :label="this.textLabelBankName"
                    :tabIndex="17"
                    v-model:modelValue.trim()="newEmployee.bankName"
                  ></MInput>
                </div>
                <div class="w-full">
                  <MInput
                    :label="this.textLabelBankBranch"
                    style="width: 260px"
                    :tabIndex="18"
                    v-model:modelValue.trim()="newEmployee.bankBranch"
                  ></MInput>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Footer -->
        <div class="flex form__footer">
          <div class="">
            <MButton
              class="btn btn--secondary"
              @click="btnClose"
              :text="this.textButtonCancel"
              :tabIndex="21"
              @keydown.shift.tab.prevent="onFocusBtn()"
              @keydown.tab.prevent="tabOrder()"
              refName="Cancel"
              ref ="Cancel"
            >
            </MButton>
          </div>
          <div class="flex form__footer-right">
            <div class="tooltip">
              <MButton
                id="btn--save"
                class="btn btn--secondary"
                :tabIndex="19"
                @click="btnSaveOnClick(false)"
                :text="this.textButtonSave"
              >
              </MButton>
              <div class="tooltip-text">{{this.textTooltipSave}}</div>
            </div>
            <div class="tooltip">
              <MButton
                class="btn btn--primary btn-save-add btnClass"
                :text="this.textButtonSaveAndAdd"
                :tabIndex="20"
                @click="btnSaveOnClick(true)"
                refName="SaveAndAdd"
                ref ="SaveAndAdd"
              >
              </MButton>
              <div class="tooltip-text tooltip-save">
                {{this.textTooltipSaveAndAdd}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <MDialog v-if="isShowDialog" @btnCloseDialog="closeDialog" style= "z-index: 999">
    <template v-slot:title>Dữ liệu không hợp lệ</template>
    <template v-slot:message>
      <li class="flex dialog-mgs">
        <div
          class="icon w-h-24 btn-dialog--close dialog__error-icon"
        ></div>
        {{ this.dialogMessage }}
      </li>
    </template>
    <template v-slot:footer>
      <button class="btn btn--primary dialog__btn--acept" @click="closeDialogError">
        Đóng
      </button>
    </template>
  </MDialog>
  <MDialog v-if="isShowDialogWarning" @btnCloseDialog="closeDialog">
    <template v-slot:title>{{this.textDialogTitle}}</template>
    <template v-slot:message
      >
      <li class="flex dialog-mgs">
        <div
          class="icon w-h-36 btn-dialog--close dialog__confirm-icon"
        ></div>
        {{this.textDialogMessage}}
      </li>
      </template
    >
    <template v-slot:footer>
      <div class="flex w-full" style="justify-content: space-between">
        <MButton
          class="btn--secondary dialog__btn--acept"
          @click="this.isShowDialogWarning = false"
          :text="this.textButtonCancel"
        >
        </MButton>
        <div class="flex col-gap">
          <MButton
            class="btn--secondary dialog__btn--acept"
            @click="hideDialogWarning"
            :text="this.textDialogButtonNo"
          >
          </MButton>
          <MButton
            class="btn--primary dialog__btn--acept"
            @click="btnWarningClickYes"
            :text="this.textDialogButtonYes"
          >
          </MButton>
        </div>
      </div>
    </template>
  </MDialog>
  <MLoading v-if="isShowLoading"></MLoading>
</template>
<script>
import resource from "@/lib/resource"
import MDialog from "../../../components/bases/Dialog/MDialog.vue";
import MInput from "@/components/bases/input/MInput.vue";
import MCombobox from "@/components/bases/combobox/MCombobox.vue";
import MLoading from "@/components/bases/Loading/MLoading";
import MDatePicker from "@/components/bases/DatePicker/MDatePicker.vue";
import { HTTPAccounts, HTTPEmployees } from "@/script/api.js"; 
import MISAEnum from "@/lib/enum.js"

export default {
  name: "EmployeeDetail",
  components: {
    MDialog,
    MInput,
    MCombobox,
    MLoading,
    MDatePicker,
    // MToast,
  },
  props: ["employee", "employeeId", "isDuplicate","isShow"],
  emits: [
    "btnCloseForm",
    "showSuccessToast",
    "inputFocusDetail",
    "changeToastMsg",
    "onshowToast",
  ],
  watch: {
    isDuplicate: {
      async handler(newValue){
        if (newValue == true){
          const newCode = await this.getNewEmployeeCode();
          this.newEmployee.employeeCode = newCode;
        }
      },
      immediate:true
    }
  },
  computed: {
    //Tính toán nếu mà không tồn tại id thì là thêm ngược lại là sửa
    isAdd: function () {
      if (this.valueIsEmpty(this.employeeId)) {
        return true;
      }
      return false;
    },
      
    //set giá trị cho class primary
    btnClass: function () {
      return { "btn--primary": true };
    },
    //Set giá trị cho class error
    isClassError: function () {
      return {
        "input--error": true,
        "field--error": true,
      };
    },
  },
  data() {
    return {
      tabIndex: 1,
      //Khai báo các trường hợp mã lỗi
      errorBorderCode: false,
      errorBorderName: false,
      errorBorderDepartment: false,
      errorBorderEmail: false,
      errorBorderDateOfBirth:false,
      errorBorderIdentityDate:false,
      tooltipContentName: null,
      tooltipContentCode: null,
      tooltipContentDepartment: null,
      isDuplicateResponse: false,
      // errorBorder: false,
    
      isValid: false,
      isSaveAndAdd: false,
      newEmployee: {},
      errorMessage: [],
      id: null,
      isShowDialog: false,
      isShowDialogWarning: false,
      isShowLoading: false,
      dialogMessage: null,
      //Toast
      isShowOnToast: false,
      isErrorToast: false,
      isTitleToast: null,
      isMessageToast: null,
      // khai báo message cho toast
      toastSuccessAdd: null,
      toastSuccessUpdate: null,
      errorToastMessage: null,
      //Các ô input required
      isEmployeeCodeError: false,
      isFullNameError: false,
      isDepartmentError: false,
      isEmailError: false,
      isDateOfBirthError: false,
      nameInput: "",
      //resource 
      //#region 
      DetailTile:resource.TextVi.Detail.DetailTitle,
      textLabelCode:resource.TextVi.Detail.EmployeeCode,
      textLabelName:resource.TextVi.Detail.EmployeeName,
      textLabelDepartment:resource.TextVi.Detail.DepartmentName,
      textLabelPositionName:resource.TextVi.Detail.PositionName,
      textLabelIdentityPlace:resource.TextVi.Detail.IdentityPlace,
      textLabelAddress:resource.TextVi.Detail.Address,
      textLabelPhone:resource.TextVi.Detail.Phone,
      textLabelTelephone:resource.TextVi.Detail.Telephone,
      textLabelEmail:resource.TextVi.Detail.Email,
      textLabelBankAccountNumber:resource.TextVi.Detail.BankAccountNumber,
      textLabelBankName:resource.TextVi.Detail.BankName,
      textLabelBankBranch:resource.TextVi.Detail.BankBranch,
      //text button 
      textButtonSave:resource.TextVi.Detail.Save,
      textButtonCancel:resource.TextVi.Detail.Cancel,
      textButtonSaveAndAdd:resource.TextVi.Detail.SaveAndAdd,
      //Dialog
      textDialogTitle:resource.TextVi.Dialog.Title.Warning,
      textDialogMessage:resource.TextVi.Dialog.Title.Change,
      textDialogButtonYes:resource.TextVi.Dialog.Yes,
      textDialogButtonNo:resource.TextVi.Dialog.No,
      textDialogButtonCancel:resource.TextVi.Dialog.Cancel,
      //ToolTip
      textTooltipHelp:resource.TextVi.ToolTip.Help,
      textTooltipClose:resource.TextVi.ToolTip.Close,
      textTooltipSave:resource.TextVi.ToolTip.Save,
      textTooltipSaveAndAdd:resource.TextVi.ToolTip.SaveAndAdd,
    //#endregion
    };
  },
  async created() {
    if (this.employeeId || this.isDuplicate) {
      this.getEmployeeId(this.employeeId);
    } 
    
    if(this.isAdd || this.isDuplicate) {
      this.getNewEmployeeCode();
    }
  },
  methods: {
    /*
    * Hãm xử lý focus vao button Cất và thêm
    Author: Văn Anh (3/3/2023)
    */
    onFocusBtn(){
      try {
        this.$refs.SaveAndAdd.buttonFocus()
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm xử lý Shift tab focus lại btn hủy
     * Author: Văn Anh (3/3/2023)
     */
    onFocusCancelButton(){
      try {
        this.$refs.Cancel.buttonFocus()
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm hiển thị nhân viên theo Id
     * Author: Văn Anh (06/02/2023)
     * @param {*} id 
     */
    async getEmployeeId(id) {
      try {
         await HTTPEmployees.get(`/${id}`)
         .then(response => {
            this.newEmployee = response.data;
         })
        this.$nextTick(function () {
              this.$refs.EmployeeCode.inputFocus();
            });
      } catch (error) {
        this.handleException(error)
      }
    },
    /**
     * Hàm lấy mã nhân viên mới nhất
     * Author: Văn Anh (6/1/2023)
     */
    async getNewEmployeeCode() {
      try {
        const res = await HTTPEmployees.get(`/newEmployeeCode`);
        this.newEmployee.employeeCode = res.data;
        this.$refs.EmployeeCode.inputFocus();
      } catch (error) {
        this.handleException(error)
      }
    },
    /**
     * Hàm xử lý lỗi trả về
     * @param {Mã lỗi} error 
     * Author: Văn ANh(3/2/2023)
     */
    handleException(error) {
      console.log(error);
      if (error.response.status == resource.STATUSCODE.BadRequest) {
        switch (error.response.data.errorCode) {
          case MISAEnum.ERRORCODE.DuplicateCode:
            this.isShowLoading = false;
            //Trả về lỗi 400 thì hiển thị thông báo mã đã bị trùng
            this.dialogMessage = error.response.data.userMsg;
            this.isShowDialog = true;
            this.$refs.EmployeeCode.inputFocus();
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
        this.dialogMessage = error.response.data.userMsg;
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
    
    //#region Sự kiện liên quan đến button
    /**
     * Hàm ẩn hiện dialog
     * Author: Văn Anh (1/1/2023)
     */
    hideDialogWarning() {
      try {
        this.$emit("btnCloseForm");
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Bắt sự kiện click cho nút close
     * Author: Văn Anh (16/12/2022)
     */
    btnClose() {
      try {
        this.isShowDialogWarning = true;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Sự kiện đóng toast
     * Author: Văn Anh (16/12/2022)
     */
    closeToast(){
      try {
        this.isShowOnToast = false;
        console.log("toat close");
      } catch (error) {
        console.log(error);
      }
    },
   
    /**
     * Hàm xử lý khi thêm hoặc sửa
     * Author: Văn Anh 5/1/2023
     */
    async handleOnSave(isSaveAndAdd, isAdd ,  toastMessage){
      try {
         const response = isAdd || this.isDuplicate
          ? await HTTPAccounts.post("", this.newEmployee)
          : await HTTPAccounts.put(`/${this.newEmployee.employeeId}`,this.newEmployee);
          console.log(response);
          this.$emit("changeToastMsg",toastMessage,false,true, resource.NOTIFICATION_TITLE.SUCCESS);
          this.$emit("onshowToast");
          await this.$parent.listEmployees();
          if (isSaveAndAdd) {
          this.newEmployee ={};
          this.getNewEmployeeCode();
          }
          else {
            this.$emit("btnCloseForm");
          }
      } catch (error) {
        this.handleException(error)
      }
    },
    /**
     * Khi người dùng bấm nút cất hoặc cất và thêm mới
     * Author: Văn Anh (19/12/2022)
     */
    async btnSaveOnClick(isSaveAndAdd) {
      try {
        //Hiển thị loading
        var valid = this.validateData();
        //Validate dữ liệu
        if (valid) {
          this.isShowDialogWarning = false;
          this.dialogMessage = this.errorMessage[0];
          this.isShowDialog = true;
        } else {
          this.isShowLoading = true;
          this.newEmployee.gender = parseInt(this.newEmployee.gender);
          if (this.isAdd) {
            this.handleOnSave(isSaveAndAdd, true, resource.FORM_MODE.ADD)
          }
          else if (this.isDuplicate) {
            this.handleOnSave(isSaveAndAdd, false, resource.FORM_MODE.ADD)
          }
          else {
            this.handleOnSave(isSaveAndAdd, false, resource.FORM_MODE.EDIT)
          }
          this.isShowLoading = false;
          this.isShowDialogWarning = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm xử lý khi nhân có ở dialogwarning
     * Author: Văn Anh (6/3/2023)
     */
    btnWarningClickYes(){
      this.btnSaveOnClick(false);
    },
    /**
     * Hàm ẩn dialog
     * Author: Văn Anh (6/1/2023)
     */
    closeDialog() {
      try {
        this.isShowDialog = false;
      } catch (error) {
        console.log(error);
      }
    },
    
    //#endregion
    //#region Sự kiện liên quan đến xử lý dữ liệu
    /**
     * Định dạng ngày tháng Trước khi biding dữ liệu lên ô input
     * Author: Văn Anh (19/12/2022)
     */
    bidingDate(date) {
      try {
        if (date) {
          date = new Date(date);
          //Khai báo biến year gán year hiện tại
          let year = date.getFullYear();
          //Khai báo biến month gán month vì month bắt đầu từ 0 nên ta + thêm 1
          let month = date.getMonth() + 1;
          //Dùng toán tử 3 ngôi để thêm 0 đằng trước ngày nhỏ hơn 10
          if (month < 10) {
            month = "0" + month;
          } else {
            month = "" + month;
          }
          //Khai báo biến day và gán day bằng ngày hiện tại
          let day = date.getDate();
          //Dùng toán tử 3 ngôi để thêm 0 đằng trước ngày nhỏ hơn 10
          // day < 10 ? `0${day}` : `${day}`;
          if (day < 10) {
            day = "0" + day;
          } else {
            day = "" + day;
          }
          return `${year}-${month}-${day}`;
        } else {
          ("");
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm xử lý khi người dùng tab đến button hủy tab lần nữa quay lại ô input đầu tiên
     * Author: Văn Anh(26/12/2022)
     * TODO:
     */
    tabOrder() {
      try {
        this.$refs.EmployeeCode.inputFocus();
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm đóng input và focus vào input lỗi đầu tiên
     * Athor: Văn Anh (6/2/2023)
     */
    closeDialogError(){
      this.isShowDialog = false;
      this.inputErrorFocus();
    },
    /**
     * Hàm focus khi có lỗi xảy ra
     */
    inputErrorFocus() {
      try {
        if (this.errorBorderCode){
          this.$refs.EmployeeCode.inputFocus();
        }
        else if (this.errorBorderName){
          this.$refs.FullName.inputFocus();
        }
        else if (this.errorBorderDepartment){
          this.$refs.DepartmentName.comboboxFocus();
        }
        else if (this.errorBorderDateOfBirth){
          this.$refs.DateOfBirth.inputFocus();
        }
        else if (this.errorBorderIdentityDate){
          this.$refs.IdentityDate.inputFocus();
        }
        else if (this.errorBorderEmail){
          this.$refs.Email.inputFocus();
        }

      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Xử lý sự kiện khi người dùng bấm nút cất
     * Author: Văn Anh (19/12/2022)
     * TODO:
     */
    validateData() {
      try {
        //reset lại mã lõi
        this.errorMessage = [];

        //Mã nhân viên trống
        if (this.valueIsEmpty(this.newEmployee.employeeCode)){
          this.errorMessage.push(resource.IsEmpty.Code);
          this.errorBorderCode = true;
          this.tooltipContentCode = resource.IsEmpty.Code
        } else if (this.outLengthValid(this.newEmployee.employeeCode, 20)){
          //Check độ dài nhập quá độ dài
          this.errorMessage.push(resource.IsOutLength.Code);
          this.errorBorderCode = true;
          this.tooltipContentCode = resource.IsOutLength.Code
        }
        
        //Tên nhân viên trống
        if (this.valueIsEmpty(this.newEmployee.fullName)){
          this.errorMessage.push(resource.IsEmpty.Name);
          this.errorBorderName = true;
          this.tooltipContentName = resource.IsEmpty.Name
        } else if (this.outLengthValid(this.newEmployee.fullName, 100)){
          //Check độ dài nhập quá độ dài
          this.errorMessage.push(resource.IsOutLength.Name);
          this.errorBorderName = true;
          this.tooltipContentName = resource.IsOutLength.Name
        }
        
        //Phòng ban trống
        if (this.valueIsEmpty(this.newEmployee.departmentId)){
          this.errorMessage.push(resource.IsEmpty.DepartmentName);
          this.errorBorderDepartment = true;
          this.tooltipContentDepartment = resource.IsEmpty.DepartmentName
        }

        //Ngày không được lớn hơn ngày hiện tại
        if(this.validateDate(this.newEmployee.dateOfBirth)){
          this.errorBorderDateOfBirth = true;
        }
        else {
            this.errorBorderDateOfBirth = false ;

          }
          
        if (this.validateDate(this.newEmployee.identityDate)){
          this.errorBorderDateOfBirth = true;
        }else {
            this.errorBorderDateOfBirth = false ;

          }
        //Email Khồng đúng định dạng 
        if(!this.valueIsEmpty(this.newEmployee.email)){
          if (!this.validateEmail(this.newEmployee.email)){
            this.errorMessage.push(resource.IsErrorFormat.Email);
            this.errorBorderEmail = true;
          }
          else {
            this.errorBorderEmail = false ;

          }

        }
        //Kiểm tra nêu errors mà tồn tại lỗi
        if (this.errorMessage.length > 0){
          return true;
        }
        return false;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm xử lý lỗi ngày tháng
     * @param {Ngày nhập} date 
     */
    validateDate(date){
      if (!this.valueIsEmpty(date)){
          let dateInput = new Date(date);
          let dataEx = new Date("2020-01-01 00:00:00")
          const today = new Date();
          if (dateInput.getTime() >= today.getTime()){
            this.errorMessage.push(resource.IsErrorFormat.Date);
            return true;
          }
          if (dateInput.getTime() === dataEx.getTime()){
            this.errorMessage.push("Không được nhập ngày 01/01/2020");
            return true;
          }
        }
        return false
    },
    /**
     * Hàm check value
     * Author: Văn Anh (20/12/2022)
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
    //Hàm dùng chung xử lý lỗi nhập vượt quá độ dài
    outLengthValid (value, number){
      try {
        if (value.length > number){
          return true;
        }
        return false;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm check định dạng email
     * @param {Giá trị của email} value 
     */
    validateEmail(value) {
      try {
          const email =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (value.match(email)) {
            return true;
          }
          return false;
      }
      catch (error){
        console.log(error);
      }
    },
    /**
     * author:Văn Anh(2/3/2023)
     * Hàm onKeyDown xử lí khi nhấn phím tắt
     */
    onKeyDown(event) {
        var me = this;
        if(this.isShow) {
          if(event.ctrlKey  &&  event.key === "s") {
          event.preventDefault();
          me.btnSaveOnClick(false);
        }
        else if (event.ctrlKey && event.key === "S") {
          event.preventDefault();
          me.btnSaveOnClick(true)
        }
        
        
      }
    }
    //#endregion
  },
  mounted() {
    document.addEventListener("keydown",this.onKeyDown);
  },
  unmounted() {
    document.removeEventListener("keydown",this.onKeyDown);

  }
};
</script>
<style scoped>
@import url(./EmployeeDetail.css);
</style>
