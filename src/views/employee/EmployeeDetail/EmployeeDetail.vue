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
              <span>Là khách hàng</span>
            </span>
            <span class="flex col-gap">
              <MCheckbox></MCheckbox>
              <span>Là nhà cung cấp</span>
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
                  :name="this.nameInput"
                  :inputError="this.isEmployeeCodeError"
                  @inputFocus="this.isEmployeeCodeError = false"
                ></MInput>
                <MInput
                  :label="this.textLabelName"
                  v-model:modelValue="newEmployee.fullName"
                  :inputRequired="true"
                  :tabIndex="2"
                  :inputError="this.isEmployeeNameError"
                  @inputFocus="this.isEmployeeNameError = false"
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
                    api="https://localhost:7232/api/Departments"
                    v-model="newEmployee.departmentId"
                    :isShowError="false"
                    :tabIndex="3"
                    :inputErrorCombobox="this.isDepartmentError"
                    @inputFocus="this.isDepartmentError = false"
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
                      />
                      <label for="" style="padding-top: 2px">Khác</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row col-gap">
                <MInput label="CMND" class="" :tabIndex="9"></MInput>
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
                  
                  <MInput
                    :label="this.textLabelPhone"
                    :tabIndex="13"
                    v-model:modelValue="newEmployee.phoneNumber"
                  ></MInput>
                  <MInput
                    :label="this.textLabelTelephone"
                    :tabIndex="14"
                    v-model:modelValue="newEmployee.telephoneNumber"
                  ></MInput>
                </div>
                <div class="w-full">
                  <MInput
                    :label="this.textLabelEmail"
                    style="width: 260px"
                    :tabIndex="15"
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
                    v-model:modelValue="newEmployee.bankBranchName"
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
                :tabIndex="20"
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
                :tabIndex="19"
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
  <MLoading v-if="isShowLoading"></MLoading>
  <MToast
    v-if="(isShowOnToast = false)"
    :toastMessage="this.errorToastMessage"
  ></MToast>
</template>
<script>
import axios from "axios";
import resource from "@/lib/resource"
import MDialog from "../../../components/bases/Dialog/MDialog.vue";
import MInput from "@/components/bases/input/MInput.vue";
import MCombobox from "@/components/bases/combobox/MCombobox.vue";
import MLoading from "@/components/bases/Loading/MLoading";
import MToast from "@/components/bases/Toast/MToast.vue";
// import vn from '@/language/i18n'

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
    "showSuccessToast",
    "inputFocusDetail",
  ],
  computed: {
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
      errorToastMessage: null,
      //Các ô input required
      isEmployeeCodeError: false,
      isEmployeeNameError: false,
      isDepartmentError: false,
      nameInput: "",
      //resource 
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
    };
  },
  watch: {
    // newEmployee: {
    //   handler: function (newValue) {
    //     console.log("newEmployee thay doi: ", newValue);
    //     console.log("newEmployeeCode thay doi: ", newValue.EmployeeCode);
    //     console.log("newEmployeeName thay doi: ", newValue.EmployeeName);
    //     console.log("department thay doi: ", newValue.DepartmentId);
    //   },
    //   deep: true,
    // },
    
    
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
          .get(`https://localhost:7232/api/Employees/${id}`)
          .then((response) => {
            this.newEmployee = response.data;
            this.newEmployee.dateOfBirth = this.bidingDate(
              response.data.dateOfBirth
            );
            this.newEmployee.identityDate = this.bidingDate(
              response.data.identityDate
            );
            //Focus vào ô nhập liệu khác ô mã nhân viên
            // this.$nextTick(function () {
            //   // this.$refs.txtEmployeeName.focus();
            // });
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
    // async getNewEmployeeCode() {
    //   try {
    //     await axios
    //       .get("https://localhost:7232/api/Employees/NewEmployeeCode")
    //       .then((response) => {
    //         this.newEmployee.EmployeeCode = response.data;

    //         //Focus vào ô nhập đầu tiên
    //         // this.$nextTick(function () {
    //         //   this.$refs.txtEmployeeCode.focus();
    //         // });
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    /**
     * Hàm gọi api thêm nhân viên
     * Author: Văn Anh (6/1/2023)
     */
    async addEmployee() {
      try {
        await axios
          .post("https://localhost:7232/api/Employees", {
            EmployeeCode: this.newEmployee.employeeCode,
            EmployeeName: this.newEmployee.employeeName,
            DepartmentId: this.newEmployee.departmentId,
            Gender: this.newEmployee.gender,
            DateOfBirth: this.newEmployee.dateOfBirth,
            PhoneNumber: this.newEmployee.phoneNumber,
            Email: this.newEmployee.email,
            IdentityNumber: this.newEmployee.identityNumber,
            IdentityDate: this.newEmployee.identityDate,
            IdentityPlace: this.newEmployee.identityPlace,
            TelephoneNumber: this.newEmployee.telephoneNumber,
            BankAccountNumber: this.newEmployee.bankAccountNumber,
            BankName: this.newEmployee.bankName,
            BankBranchName: this.newEmployee.bankBranchName,
            PositionName: this.newEmployee.positionName,
          })
          .then((res) => {
            console.log(res);
            //Ẩn load ding
            this.isShowLoading = false;
            //Ẩn form và load lại dữ liệu
            this.$emit("btnCloseForm");
            this.$emit("showSuccessToast");
            this.$parent.listEmployees();
            this.showSuccessToast();
            this.errorToastMessage = "Thêm nhân viên thành công";

            console.log("newEmployeeSave: " + this.newEmployee);
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
                this.isShowOnToast = true;
                //Trả về lỗi 400 thì hiển thị thông báo mã đã bị trùng
                var errMsg = err.response.data.userMsg;
                this.errorMessageToast = errMsg;
                break;
              case 500:
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
    async editEmployee(id) {
      try {
        await axios
          .put(`https://localhost:7232/api/Employees/${id}`, {
            EmployeeCode: this.newEmployee.employeeCode,
            EmployeeName: this.newEmployee.employeeName,
            DepartmentId: this.newEmployee.departmentId,
            Gender: this.newEmployee.gender,
            DateOfBirth: this.newEmployee.dateOfBirth,
            PhoneNumber: this.newEmployee.phoneNumber,
            Email: this.newEmployee.email,
            IdentityNumber: this.newEmployee.identityNumber,
            IdentityDate: this.newEmployee.identityDate,
            IdentityPlace: this.newEmployee.identityPlace,
            TelephoneNumber: this.newEmployee.telephoneNumber,
            BankAccountNumber: this.newEmployee.bankAccountNumber,
            BankName: this.newEmployee.bankName,
            BankBranchName: this.newEmployee.bankBranchName,
            PositionName: this.newEmployee.positionName,
          })
          .then((res) => {
            //Ẩn load ding
            this.isShowLoading = false;
            this.newEmployee.DateOfBirth = this.bidingDate(res.DateOfBirth);
            console.log("Sửa", res);
            this.$emit("showSuccessToast");
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
     * Khi người dùng bấm nút cất
     * Author: Văn Anh (19/12/2022)
     */
    btnSaveOnClick() {
      try {
        //Hiển thị loading
        //Validate dữ liệu
        let isValid = this.validateData();
        if (!isValid) {
          this.isShowDialog = true;
        } else {
          this.isShowLoading = true;
          //Gọi Api: Chú ý là cất khi thêm hoặc khi sửa
          if (this.isAdd) {
            //Thêm nhân viên mới
            this.addEmployee();
            this.newEmployee = {};
          } else {
            //Sửa nhân viên
            this.editEmployee(this.employeeId);
            console.log("this", this);
            this.newEmployee = {};
          }
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
    inputFocusOnDetail() {
      try {
        console.log("focus in detail");
        this.$emit("inputFocusDetail");
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
     */
    tabOrder(e) {
      try {
        console.log("taborder: ", e);
        this.$nextTick(function () {
          this.$refs.EmployeeCode.focus();
        });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Xử lý sự kiện khi người dùng bấm nút cất
     * Author: Văn Anh (19/12/2022)
     */
    validateData() {
      try {
        this.errorMessage = [];
        //Mã nhân viên không được phép để trống

        if (this.valueIsEmpty(this.newEmployee.EmployeeCode)) {
          this.isEmployeeCodeError = true;
          this.errorMessage.push("Mã nhân viên không được để trống");
          // this.$nextTick(function () {
          //   this.$refs.txtEmployeeCode.focus();
          // });
        }

        //Tên nhân viên không được phép để trống
        if (this.valueIsEmpty(this.newEmployee.EmployeeName)) {
          this.isEmployeeNameError = true;
          this.errorMessage.push("Tên nhân viên không được để trống");
          // this.$nextTick(function () {
          //   this.$refs.txtEmployeeName.focus();
          // });
        }
        //Tên đơn vị không được để trống
        if (this.valueIsEmpty(this.newEmployee.DepartmentId)) {
          this.isDepartmentError = true;
          this.errorMessage.push("Tên đơn vị không được để trống");
          // this.$nextTick(function () {
          //   this.$refs.txtDepartmentId.focus();
          // });
        }
        //Email phải đúng định dạng

        //Ngày không được lớn hơn ngày hiện tại

        if (this.errorMessage.length > 0) {
          return false;
        }
        return true;
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
    //#endregion
    
    //#region Các hàm liên quan đến hiển thị toast, dialog

    //#endregion
  },
};
</script>
<style scoped>
@import url(./EmployeeDetail.css);
</style>
