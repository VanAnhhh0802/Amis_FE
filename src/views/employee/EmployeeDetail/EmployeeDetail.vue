<template lang="">
  <div id="form__add" class="form">
    <div class="flex" style="justify-content: center; height: 100%">
      <div class="form__wrapper">
        <div class="flex form__header">
          <div class="flex form__header--left">
            <h1 id="form__title" class="heading form__title">
              Thông tin nhân viên
            </h1>
            <span class="flex">
              <input class="form-input-client" type="checkbox" name="" id="" />
              Là khách hàng
            </span>
            <span class="flex">
              <input
                class="form-input-supplier"
                type="checkbox"
                name=""
                id=""
              />
              Là nhà cung cấp
            </span>
          </div>
          <div class="flex form-icon">
            <div class="icon w-h-24 tooltip form-icon--help">
              <div class="tooltip-text">Giúp(F1)</div>
            </div>
            <div
              class="icon w-h-24 tooltip form-icon--close btn--close"
              @click="btnClose"
            >
              <div class="tooltip-text">Đóng(ESC)</div>
            </div>
          </div>
        </div>
        <div class="form__content">
          <div class="flex form__content-top">
            <div class="form-content--left">
              <div class="row col-gap">
                <MInput
                  label="Mã"
                  width="150px"
                  style="width: 150px"
                  v-model:modelValue="newEmployee.EmployeeCode"
                  inputRequired="true"
                  :ref="txtEmployeeCode"
                  :tabIndex="1"
                ></MInput>
                <MInput
                  label="Tên nhân viên"
                  v-model:modelValue="newEmployee.EmployeeName"
                  inputRequired="true"
                  :tabIndex="2"
                ></MInput>
              </div>
              <div class="row">
                <div class="form__unit">
                  <MCombobox
                    id="cbxDepartment"
                    label="Đơn vị"
                    :isRequired="true"
                    propName="DepartmentName"
                    propValue="DepartmentId"
                    api="https://amis.manhnv.net/api/v1/Departments"
                    v-model="newEmployee.DepartmentId"
                    isShowError="true"
                    :tabIndex="3"
                  ></MCombobox>
                </div>
              </div>
              <div class="row">
                <MInput
                  label="Chức danh"
                  class="w-full"
                  classInputValue="min-w"
                  :tabIndex="4"
                ></MInput>
              </div>
            </div>
            <div class="form-content--right">
              <div class="row col-gap">
                <MInput
                  label="Ngày sinh"
                  style="width: 150px"
                  classInputValue="w-150"
                  inputType="date"
                  :tabIndex="5"
                ></MInput>
                <div class="form__sex-wrapper input-wrapper">
                  <label for="" class="form__sex">Giới tính</label>
                  <div class="flex form__male-wrapper">
                    <div class="flex">
                      <input
                        type="radio"
                        checked
                        property-name="employeeGender"
                        id="gender-male"
                        tabindex="6"
                        value="0"
                        name=" gender"
                        class="input__form-sex-male"
                      />
                      <span class="radio-checkbox">
                        <span class="radio-checkbox-border"></span>
                        <span class="radio-checkbox-checked"></span>
                      </span>
                      <label for="" style="padding-top: 2px">Nam</label>
                    </div>
                    <div class="flex">
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
                    <div class="flex">
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
                <MInput
                  label="CMND"
                  class=""
                  classInputValue="min-w"
                  :tabIndex="7"
                ></MInput>
                <MInput
                  width="150px"
                  style="width: 150px"
                  classInputValue="w-150"
                  inputType="date"
                  :tabIndex="8"
                ></MInput>
              </div>
              <div class="row">
                <MInput
                  label="Nơi cấp"
                  class="w-full"
                  classInputValue="min-w"
                  :tabIndex="9"
                ></MInput>
              </div>
            </div>
          </div>
          <div class="form__content-bottom">
            <div id="" class="row">
              <MInput
                label="Địa chỉ"
                classInputValue="min-w"
                :tabIndex="10"
              ></MInput>
            </div>
            <div class="row form-popup-container-top">
              <div class="w-full flex col-gap">
                <div class="w-full flex col-gap">
                  <MInput label="ĐT di động" :tabIndex="11"></MInput>
                  <MInput label="ĐT cố định" :tabIndex="12"></MInput>
                </div>
                <div class="w-full">
                  <MInput
                    label="Email"
                    style="width: 260px"
                    :tabIndex="13"
                  ></MInput>
                </div>
              </div>
            </div>
            <div class="row form-popup-container-bottom gap-32">
              <div class="w-full flex col-gap">
                <div class="w-full flex col-gap">
                  <MInput label="TK ngân hàng" :tabIndex="14"></MInput>
                  <MInput label="Tên ngân hàng" :tabIndex="15"></MInput>
                </div>
                <div class="w-full">
                  <MInput
                    label="Chi nhánh"
                    style="width: 260px"
                    :tabIndex="16"
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
              text="Hủy"
              :tabIndex="19"
              @keydown.tab="tabOrder"
            >
            </MButton>
          </div>

          <div class="flex form__footer-right">
            <div class="tooltip">
              <MButton
                id="btn--save"
                class="btn btn--secondary"
                :tabIndex="18"
                @click="btnSaveOnClick"
                text="Cất"
              >
              </MButton>
              <div class="tooltip-text">Cất(Ctrl + S)</div>
            </div>
            <div class="tooltip">
              <MButton
                class="btn btn--primary btn-save-add btnClass"
                text="Cất và Thêm"
                :tabIndex="17"
              >
              </MButton>
              <div class="tooltip-text tooltip-save">
                Cất và Thêm(Ctrl + Shift + S)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <MDialog v-if="isShowDialog" @btnCloseDialog="closeDialog">
    <template v-slot:title>Dữ liệu không hợp lệ</template>
    <template v-slot:message>{{ this.errorMessage[0] }}</template>
    <template v-slot:footer>
      <button class="btn btn--primary dialog__btn--acept" @click="closeDialog">
        Đóng
      </button>
    </template>
  </MDialog>
</template>
<script>
import axios from "axios";
import MButton from "../../../components/bases/Button/MButton.vue";
import MDialog from "../../../components/bases/Dialog/MDialog.vue";
import MInput from "@/components/bases/input/MInput.vue";
import MCombobox from "@/components/bases/combobox/MCombobox.vue";
// import vn from '@/language/i18n'

export default {
  name: "EmployeeDetail",
  components: {
    MDialog,
    MButton,
    MInput,
    MCombobox,
  },
  props: ["employee", "employeeId"],
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
      bankName: "",
      newEmployee: {
        EmployeeCode: "",
        EmployeeName: "",
        DepartmentId: "142cb08f-7c31-21fa-8e90-67245e8b283e",
      },
      errorMessage: [],
      isShowDialog: false,
      isShowSuccessToast: false,
      //Các ô input required
      // isDepartmentError: false,
      // isEmployeeNameError: false,
      // isEmployeeCodeError: false,
    };
  },
  watch: {
    newEmployee: {
      handler: function (newValue) {
        console.log("employee thay doi: ", newValue);
        console.log("department thay doi: ", newValue.DepartmentId);
      },
      deep: true,
    },
    employeeId: function (newValue) {
      console.log("aasdasd", newValue);
    },
  },
  async created() {
    console.log("employee:::", this.employeeId);
    if (!this.valueIsEmpty(this.employeeId)) {
      await axios
        .get(`https://amis.manhnv.net/api/v1/Employees/${this.employeeId}`)
        .then((response) => {
          this.newEmployee = response.data;
          console.log("newEmployee data----------------", this.newEmployee);
          this.newEmployee.DateOfBirth = this.bidingDate(
            this.newEmployee.DateOfBirth
          );
          //Focus vào ô nhập liệu khác ô mã nhân viên
          // this.$nextTick(function () {
          //   // this.$refs.txtEmployeeName.focus();
          // });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await axios
        .get("https://amis.manhnv.net/api/v1/Employees/NewEmployeeCode")
        .then((response) => {
          this.newEmployee.EmployeeCode = response.data;

          //Focus vào ô nhập đầu tiên
          // this.$nextTick(function () {
          //   this.$refs.txtEmployeeCode.focus();
          // });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  methods: {
    //#region Sự kiện liên quan đến button

    /**
     * Bắt sự kiện click cho nút close
     * Author: Văn Anh (16/12/2022)
     */
    btnClose() {
      try {
        this.$emit("btnCloseForm");
        this.clearData();
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
        //Validate dữ liệu
        let isValid = this.validateData();
        if (!isValid) {
          console.log("HIển thi dialog");
          this.isShowDialog = true;
        } else {
          console.log("save");
          //Gọi Api: Chú ý là cất khi thêm hoặc khi sửa
          if (this.isAdd) {
            //Thêm nhân viên mới
            axios
              .post(
                "https://amis.manhnv.net/api/v1/Employees",
                this.newEmployee
              )
              .then((res) => {
                console.log(res);
                //Ẩn form và load lại dữ liệu
                this.$emit("btnCloseForm");
                this.$emit("showSuccessToast");
                this.$parent.listEmployees();
                this.showSuccessToast();
                this.clearData();
              })
              .catch((err) => {
                console.log(err);
                //Lấy ra mã bị lỗi
                var statusCode = err.response.status;
                console.log(statusCode);
                switch (statusCode) {
                  case 400:
                    //Trả về lỗi 400 thì hiển thị thông báo mã đã bị trùng
                    var errMsg = err.response.data.userMsg;
                    alert(errMsg);
                    break;
                  case 500:
                    console.log(err);
                    break;
                  default:
                    break;
                }
              });
          } else {
            //Sửa nhân viên
            axios
              .put(
                `https://amis.manhnv.net/api/v1/Employees/${this.employeeId}`,
                this.newEmployee
              )
              .then((res) => {
                console.log(res);
                this.$emit("showSuccessToast");
                this.$emit("btnCloseForm");
                this.clearData();
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Xử lý input lỗi khi blur và không rỗng thì ẩn
     * Author: Văn Anh (30/12/2022)
     */
    inputEmployeeCodeErrorBlur() {
      try {
        if (!this.valueIsEmpty(this.EmployeeCode)) {
          this.isEmployeeError = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    inputEmployeeNameErrorBlur() {
      try {
        if (!this.valueIsEmpty(this.EmployeeName)) {
          this.isEmployeeError = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    inputDepartmentErrorBlur() {
      try {
        if (!this.valueIsEmpty(this.DepartmentId)) {
          this.isEmployeeError = false;
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
          //Tạo đối tượng date
          date = new Date(date);
          //Khai báo biến year gán year hiện tại
          let year = date.getFullYear();
          //Khai báo biến month gán month vì month bắt đầu từ 0 nên ta + thêm 1
          let month = date.getMonth() + 1;
          //Dùng toán tử 3 ngôi để thêm 0 đằng trước ngày nhỏ hơn 10
          month < 10 ? `0${month}` : `${month}`;
          //Khai báo biến day và gán day bằng ngày hiện tại
          let day = date.getDate();
          //Dùng toán tử 3 ngôi để thêm 0 đằng trước ngày nhỏ hơn 10
          day < 10 ? `0${day}` : `${day}`;
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
        e.preventDefault();
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
          console.log("Mã nhân viên trống");
          this.isEmployeeCodeError = true;
          this.errorMessage.push("Mã nhân viên không được để trống");
          this.$nextTick(function () {
            this.$refs.txtEmployeeCode.focus();
          });
        }
        //Tên nhân viên không được phép để trống
        if (this.valueIsEmpty(this.newEmployee.EmployeeName)) {
          console.log("Tên nhân viên trống");
          this.isEmployeeNameError = true;
          this.errorMessage.push("Tên nhân viên không được để trống");
          this.$nextTick(function () {
            this.$refs.txtEmployeeName.focus();
          });
        }
        //Tên đơn vị không được để trống
        if (this.valueIsEmpty(this.newEmployee.DepartmentId)) {
          this.isDepartmentError = true;
          console.log("Đơn vị nhân viên trống");
          this.errorMessage.push("Tên đơn vị không được để trống");
          this.$nextTick(function () {
            this.$refs.txtDepartmentId.focus();
          });
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
        if (value == "" || value == null || value == undefined) {
          return true;
        }
        return false;
      } catch (error) {
        console.log(error);
      }
    },
    //#endregion
    /**
     * Hàm reset lại data của đối tượng
     * Author: Văn Anh (20/12/2022)
     */
    clearData() {
      try {
        let me = this;
        me.newEmployee.employeeID = "";
        me.newEmployee.employeeName = "";
        me.newEmployee.departmentID = "";
        me.newEmployee.departmentCode = "";
        me.newEmployee.departmentName = "";
        me.newEmployee.positionName = "";
        me.newEmployee.dateOfBirth = "";
        me.newEmployee.gender = 0;
        me.newEmployee.identityNumber = "";
        me.newEmployee.identityDate = "";
        me.newEmployee.identityPlace = "";
        me.newEmployee.address = "";
        me.newEmployee.phoneNumber = "";
        me.newEmployee.telephoneNumber = "";
        me.newEmployee.email = "";
        me.newEmployee.bankAccountNumber = "";
        me.newEmployee.bankName = "";
        me.newEmployee.bankBranch = "";
        // console.log("new employee : " + this.newEmployee);
      } catch (error) {
        console.log(error);
      }
    },
    //#region Các hàm liên quan đến hiển thị toast, dialog
    /**
     * Hàm hiển thị toast
     * Author: Văn Anh (20/12/2022)
     */

    //#endregion
  },
};
</script>
<style scoped>
@import url(./EmployeeDetail.css);
</style>
