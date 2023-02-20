<template lang="">
  <div id="form__add" class="form">
    <div class="flex" style="justify-content: center; height: 100%">
      <div class="form__wrapper">
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
                  v-model:modelValue="newEmployee.employeeCode"
                  :inputRequired="true"
                  :tabIndex="1"
                  ref="EmployeeCode"
                  nameRef ="EmployeeCode"
                  :name="this.nameInput"
                  :inputError="this.isEmployeeCodeError"
                  @inputFocus="this.isEmployeeCodeError = false"
                ></MInput>
                <MInput
                  :label="this.textLabelName"
                  v-model:modelValue="newEmployee.fullName"
                  :inputRequired="true"
                  :tabIndex="2"
                  ref="FullName"
                  nameRef ="FullName"
                  :inputError="this.isFullNameError"
                  @inputFocus="this.isFullNameError = false"
                ></MInput>
              </div>
              <div class="row">
                <div class="form__unit">
                  <MCombobox
                    id="cbxDepartment"
                    :label="this.textLabelDepartment"
                    :isRequired="true"
                    propName="departmentName"
                    propValue="departmentId"
                    api="https://localhost:7232/api/v1/Departments/filter?pageSize=10&pageNumber=1"
                    v-model="newEmployee.departmentId"
                    :isShowError="false"
                    :tabIndex="3"
                    :inputErrorCombobox="this.isDepartmentError"
                    @inputFocus="this.isDepartmentError = false"
                    ref="DepartmentName"
                    nameRef="DepartmentName"
                  ></MCombobox>
                </div>
              </div>
              <div class="row">
                <MInput
                  :label="this.textLabelPositionName"
                  type="text"
                  :tabIndex="4"
                  v-model:modelValue="newEmployee.positionName"
                ></MInput>
              </div>
            </div>
            <div class="form-content--right">
              <div class="row col-gap">
                <MInput
                  :label="this.textLabelDateOfBirth"
                  style="width: 150px"
                  inputType="date"
                  :tabIndex="5"
                  v-model:modelValue="newEmployee.dateOfBirth"
                ></MInput>
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
                        v-model="newEmployee.Gender"
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
                        v-model="newEmployee.Gender"

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
                        v-model="newEmployee.Gender"
                      />
                      <label for="" style="padding-top: 2px">Khác</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row col-gap">
                <div class="tooltip" style="width: 100%">
                  <MInput 
                  label="Số CMND" 
                  :tabIndex="9"
                  v-model:modelValue = "newEmployee.identityNumber"
                  ></MInput>
                  <div class="tooltip-text tooltip-reload">Số chứng minh nhân dân</div>
                </div>
                <MInput
                  :label="this.textLabelIdentityDate"
                  type="date"
                  width="150px"
                  style="width: 150px"
                  inputType="date"
                  :tabIndex="10"
                  v-model:modelValue="newEmployee.identityDate"
                ></MInput>
              </div>
              <div class="row">
                <MInput
                  :label="this.textLabelIdentityPlace"
                  class="w-full"
                  :tabIndex="11"
                  v-model:modelValue="newEmployee.identityPlace"
                ></MInput>
              </div>
            </div>
          </div>
          <div class="form__content-bottom">
            <div id="" class="row">
              <MInput
                :label="this.textLabelAddress"
                :tabIndex="12"
                v-model:modelValue="newEmployee.address"
              ></MInput>
            </div>
            <div class="row form-popup-container-top">
              <div class="w-full flex col-gap">
                <div class="w-full flex col-gap">
                  <div class="tooltip" style="width: 100%">
                    <MInput
                    :label="this.textLabelPhone"
                    :tabIndex="13"
                    v-model:modelValue="newEmployee.phoneNumber"
                  ></MInput>
                  <div class="tooltip-text tooltip-reload">Điện thoại di động</div>
                </div><div class="tooltip" style="width: 100%">
                  <MInput
                    :label="this.textLabelTelephone"
                    :tabIndex="14"
                    v-model:modelValue="newEmployee.telephoneNumber"
                  ></MInput>
                  <div class="tooltip-text tooltip-reload">Điện thoại cố định</div>
                </div>
                </div>
                <div class="w-full">
                  <MInput
                    :label="this.textLabelEmail"
                    style="width: 260px"
                    :tabIndex="15"
                    :inputError="this.isEmailError"
                  @inputFocus="this.isEmailError = false"
                    v-model:modelValue="newEmployee.email"
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
                    v-model:modelValue="newEmployee.bankAccountNumber"
                  ></MInput>
                  <MInput
                    :label="this.textLabelBankName"
                    :tabIndex="17"
                    v-model:modelValue="newEmployee.bankName"
                  ></MInput>
                </div>
                <div class="w-full">
                  <MInput
                    :label="this.textLabelBankBranch"
                    style="width: 260px"
                    :tabIndex="18"
                    v-model:modelValue="newEmployee.bankBranch"
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
              class="btn btn--secondary btn--close"
              @click="btnClose"
              :text="this.textButtonCancel"
              :tabIndex="21"
              @keydown.tab="tabOrder"
            >
            </MButton>
          </div>

          <div class="flex form__footer-right">
            <div class="tooltip">
              <MButton
                id="btn--save"
                class="btn btn--secondary"
                :tabIndex="19"
                @click="btnSaveOnClick"
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
                @click="btnSaveAndAddOnClick"
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
  <MDialog v-if="isShowDialog" @btnCloseDialog="closeDialog">
    <template v-slot:title>Dữ liệu không hợp lệ</template>
    <template v-slot:message>
      <li class="flex dialog-mgs">
        <div
          class="icon w-h-24 btn-dialog--close dialog__error-icon"
        ></div>
        {{ this.errorMessage[0] }}
      </li>
    
    </template>
    <template v-slot:footer>
      <button class="btn btn--primary dialog__btn--acept" @click="closeDialog">
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
            @click="btnOnDelete(this.deleteEmployeeId)"
            :text="this.textDialogButtonYes"
          >
          </MButton>
        </div>
      </div>
    </template>
  </MDialog>
  <MLoading v-if="isShowLoading"></MLoading>newEmployee
  <MToast
    v-if="isShowOnToast"
    @btnCloseToast="closeToast"
  >
  <template v-slot:icon><div class="icon w-h-24 toast-icon--error"></div></template>
  <template v-slot:message>
    <span class="toast__desc--status toast__desc--error">Lỗi</span>
    <span>{{this.errorMessageToast}}</span>
  </template>
  </MToast>
</template>
<script>
import axios from "axios";
import resource from "@/lib/resource"
import MDialog from "../../../components/bases/Dialog/MDialog.vue";
import MInput from "@/components/bases/input/MInput.vue";
import MCombobox from "@/components/bases/combobox/MCombobox.vue";
import MLoading from "@/components/bases/Loading/MLoading";
import MToast from "@/components/bases/Toast/MToast.vue";

export default {
  name: "EmployeeDetail",
  components: {
    MDialog,
    MInput,
    MCombobox,
    MLoading,
    MToast,
  },
  props: ["employee", "employeeId"],
  emits: [
    "btnCloseForm",
    "showSuccessToast",
    "inputFocusDetail",
  ],
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
      newEmployee: {},
      errorMessage: [],
      id: null,
      isShowDialog: false,
      isShowDialogWarning: false,
      isShowLoading: false,
      //Toast
      isShowOnToast: false,

      // khai báo message cho toast
      CodeDuplicate: null,
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
      textLabelDateOfBirth:resource.TextVi.Detail.DateOfBirth,
      textLabelGender:resource.TextVi.Detail.Gender,
      textLabelIdentityNumber:resource.TextVi.Detail.IdentityNumber,
      textLabelIdentityDate:resource.TextVi.Detail.IdentityDate,
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
      textTooltipIdentityNumber:resource.TextVi.ToolTip.IdentityNumber,
      textTooltipPhone:resource.TextVi.ToolTip.Phone,
      textTooltipTelePhone:resource.TextVi.ToolTip.TelePhone,
      textTooltipSave:resource.TextVi.ToolTip.Save,
      textTooltipSaveAndAdd:resource.TextVi.ToolTip.SaveAndAdd,
    //#endregion
    };
  },
  async created() {
    if (!this.valueIsEmpty(this.employeeId)) {
      this.getEmployeeId(this.employeeId);
    } else {
      this.getNewEmployeeCode();
    }
  },
  methods: {
    /**
     * Hàm hiển thị nhân viên theo Id
     * Author: Văn Anh (06/02/2023)
     * @param {*} id 
     */
    async getEmployeeId(id) {
      try {
        await axios
          .get(`https://localhost:7232/api/v1/Employees/${id}`)
          .then((response) => {
            this.newEmployee = response.data;
            this.newEmployee.dateOfBirth = this.bidingDate(
              response.data.dateOfBirth
            );
            this.newEmployee.identityDate = this.bidingDate(
              response.data.identityDate
            );
            //Focus vào ô nhập liệu khác ô mã nhân viên
            this.$nextTick(function () {
              this.$refs.EmployeeCode.inputFocus();
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm lấy mã nhân viên mới nhất
     * Author: Văn Anh (6/1/2023)
     */
    async getNewEmployeeCode() {
      try {
        await axios
          .get("https://localhost:7232/api/v1/Employees/newEmployeeCode")
          .then((response) => {
            this.newEmployee.employeeCode = response.data;
            // Focus vào ô nhập đầu tiên
            this.$nextTick(function () {
              this.$refs.EmployeeCode.inputFocus();
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm gọi api thêm nhân viên
     * Author: Văn Anh (6/1/2023)
     */
    async addEmployee(employee) {
      try {
        await axios
          .post("https://localhost:7232/api/v1/Employees", 
          employee)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
            //Lấy ra mã bị lỗi
            var statusCode = err.response.status;
            console.log(statusCode);
            switch (statusCode) {
              case 400:
                this.isShowLoading = false;
                //Hiển thị toast message thông báo mã bị trùng
                //Trả về lỗi 400 thì hiển thị thông báo mã đã bị trùng
                this.errorMessageToast = err.response.data.data.toString();
                this.isShowOnToast = true;
                this.CodeDuplicate = employee.EmployeeCode;
                console.log(this.CodeDuplicate);
                break;
              case 500:
                this.isShowOnToast = true;
                this.errorMessageToast = err.response.data.data.userMsg;
                console.log(err);
                break;
              default:
                break;
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm gọi API sửa nhân  viên
     * Author: Văn Anh (21/12/2023)
     */
    async editEmployee(id) {
      try {
        await axios
          .put(`https://localhost:7232/api/v1/Employees/${id}`, {
            employeeCode: this.newEmployee.employeeCode,
            fullName: this.newEmployee.fullName,
            departmentId: this.newEmployee.departmentId,
            gender: this.newEmployee.gender,
            dateOfBirth: this.newEmployee.dateOfBirth,
            phoneNumber: this.newEmployee.phoneNumber,
            email: this.newEmployee.email,
            identityNumber: this.newEmployee.identityNumber,
            identityDate: this.newEmployee.identityDate,
            identityPlace: this.newEmployee.identityPlace,
            telephoneNumber: this.newEmployee.telephoneNumber,
            bankAccountNumber: this.newEmployee.bankAccountNumber,
            bankName: this.newEmployee.bankName,
            bankBranchName: this.newEmployee.bankBranchName,
            positionName: this.newEmployee.positionName,
          })
          .then((res) => {
            //Ẩn load ding
            this.isShowLoading = false;
            this.newEmployee.DateOfBirth = this.bidingDate(res.DateOfBirth);
            console.log("Sửa", res);
            //Gán message cho toast
            this.errorToastMessage = "Thông tin nhân viên đã được thay đổi";

            this.$emit("btnCloseForm");
            this.$parent.listEmployees();
            console.log("newEmployeeSave: " + this.newEmployee);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
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
     * Sự kiện nút cất và thêm
     * Author: Văn ANh 16/12/2022
     */
    async btnSaveAndAddOnClick(){
      try {
        //Validate dữ liệu
        let isValid = this.validateData();
        if (isValid) {
          this.isShowDialog = true;
        } else {
          //Gọi Api: Chú ý là cất khi thêm hoặc khi sửa
          this.isShowLoading = true;
          if (this.isAdd) {
            //Thêm nhân viên mới
            await this.addEmployee(this.newEmployee);
            this.newEmployee = {}
            
          } else {
            //Sửa nhân viên
            await this.editEmployee(this.employeeId);
            this.newEmployee = {}
          }
          this.isShowLoading = false;
          this.getNewEmployeeCode();
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Khi người dùng bấm nút cất
     * Author: Văn Anh (19/12/2022)
     */
    async btnSaveOnClick() {
      try {
        //Hiển thị loading
        //Validate dữ liệu
        let isValid = this.validateData();
        if (isValid) {
          this.isShowDialog = true;
        } else {
          //Gọi Api: Chú ý là cất khi thêm hoặc khi sửa
          this.isShowLoading = true;
          if (this.isAdd) {
            //Thêm nhân viên mới
            await this.addEmployee(this.newEmployee);
            this.newEmployee = {}
            this.$parent.listEmployees();
            this.toastSuccessAdd = "Thêm nhân viên thành công";
            this.$emit("btnCloseForm");
          } else {
            //Sửa nhân viên
            this.editEmployee(this.employeeId);
            this.newEmployee = {}
          }
          this.isShowLoading = false;
        }
      } catch (error) {
        console.log(error);
      }
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
    tabOrder(e) {
      try {
        console.log("taborder: ", e);
        this.$refs.EmployeeCode.inputFocus();
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
        this.errorMessage = [];

        //Mã nhân viên không được phép để trống
        let errorMessageCode = "Mã nhân viên không được để trống";
        if (this.checkvalidateEmpty(this.newEmployee.employeeCode,this.isEmployeeCodeError, errorMessageCode)){
            this.$refs.EmployeeCode.inputFocus();
        }
        
        //Tên nhân viên không được phép để trống
        let errorMessageFullName = "Tên nhân viên không được để trống";
        if (this.checkvalidateEmpty(this.newEmployee.fullName,this.isFullNameError, errorMessageFullName)){
            this.$refs.FullName.inputFocus();
        }
        //Tên đơn vị không được để trống
        let errorMessageDepartment = "Đơn vị không được để trống";
        if (this.checkvalidateEmpty(this.newEmployee.departmentId,this.isDepartmentError, errorMessageDepartment) && !this.checkvalidateEmpty(this.newEmployee.fullName,this.isFullNameError, errorMessageFullName)){
            this.$refs.DepartmentName.comboboxFocus();
        }
        else {
          this.checkvalidateEmpty(this.newEmployee.departmentId,this.isDepartmentError, errorMessageDepartment)
        }
        //Email phải đúng định dạng
        if (this.validateEmail(this.newEmployee.email)){
          this.isEmailError = true;
          this.errorMessage.push("Email không đúng định dạng");
          
        }
        //Ngày không được lớn hơn ngày hiện tại
        if (this.valueIsEmpty(this.newEmployee.dateOfBirth)){
          const dateOfBirth = new Date(this.newEmployee.DateOfBirth);
          const today = new Date();
          if (dateOfBirth > today){
            this.isDateOfBirthError = true;
            this.errorMessage.push("Ngày không được lớn hơn ngày hiện tại");
          }
        }
        if (this.errorMessage.length > 0) {
          return true;
        }
        return false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm dùng chung checkvalidateEmpty
     */
    checkvalidateEmpty(value, errorName, message){
      try {
        if (this.valueIsEmpty(value)){
          errorName = true;
          this.errorMessage.push(message);
          return true;
        }
        return false;
      } catch (error) {
        console.log(error);
      }
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
    /**
     * Hàm check định dạng email
     * @param {Giá trị của email} value 
     */
    validateEmail(value) {
      try {
        var email =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (value.isMatch(email)) {
          return true;
        }
        return false;
      }
      catch (error){
        console.log(error);
      }
    },
    //#endregion
  },
};
</script>
<style scoped>
@import url(./EmployeeDetail.css);
</style>
