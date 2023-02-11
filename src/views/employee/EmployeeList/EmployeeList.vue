<template>
  <div class="content">
    <!-- Toolbar -->
    <div class="content__toolbar">
      <div class="content__title">
        Nhân viên
        <!-- <p>{{ $t("message") }}</p> -->
      </div>
      <MButton
        @click="(updateFunction = false), btnAddEmployee()"
        :class="{ 'btn--primary': true }"
        text="Thêm mới nhân viên"
      ></MButton>
    </div>
    <div class="content__list">
      <div class="flex list__header">
        <div class="list-toolbar-wrapper">
          <div
            :class="{ 'border-focus': this.inputSearchFocused }"
            style="width: 260px"
            class="flex input__wrapper list__toolbar"
          >
            <MInput
              border="none"
              v-model.trim="this.filter.employeeFilter"
              @inputFocus="inputSearchFocus"
              @inputOutFocus="this.inputSearchFocused = false"
              placeholder="Tìm kiếm theo mã, tên nhân viên"
              
            ></MInput>
            <MButton
              class="icon btn--small btn__search"
              v-on:keyup.enter="listEmployees()"
              @click="this.listEmployees()"
            ></MButton>
          </div>
          <div class="tooltip">
            <div
              class="icon btn btn--small"
              id="btn__reload"
              @click="listEmployees()"
            ></div>
            <div class="tooltip-text tooltip-reload">Lấy lại dữ liệu</div>
          </div>
        </div>
      </div>
      <div class="list__table">
        <table>
          <thead>
            <tr>
              <th class="width-table-checkbox list-checkbox">
                <MCheckbox @btnCheck="this.checkAllEmployees()"></MCheckbox>
              </th>
              <th class="text-align-left">{{ this.textEmployeeCode }}</th>
              <th class="text-align-left w-200">{{ this.textEmployeeName }}</th>
              <th class="text-align-left w-150">{{ this.textGender }}</th>
              <th class="text-align-center">{{ this.textDateOfBirth }}</th>
              <th class="text-align-left">
                <div class="tooltip">
                  {{ this.textIdentity }}
                  <div class="tooltip-text tooltip-indentity">
                    Số chứng minh nhân dân
                  </div>
                </div>
              </th>
              <th class="text-align-left">{{ this.textPositionName }}</th>
              <th class="text-align-left">{{ this.textDepartmentName }}</th>
              <th class="text-align-left">{{ this.textBankNumber }}</th>
              <th class="text-align-left">{{ this.textBankName }}</th>
              <th class="text-align-left w-200">{{ this.textBankBranch }}</th>
              <th
                class="text-align-center w-150 tb-function"
                style="background-color: #f5f5f5"
              >
                {{ this.textFunction }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              a-employee-id="3c53b211-7c45-11ed-9263-00163e06abee"
              class="employee-infor"
              v-for="(item, index) in employees"
              :key="index"
              @dblclick="rowOnDbClick(item), (updateFunction = true)"
            >
              <td class="width-table-checkbox list-checkbox body-checkbox">
                <MCheckbox
                  @btnCheck="this.selectEmployeeCheck(item)"
                  @checkedEmployee="this.employeeSelected.includes(item)"
                ></MCheckbox>
              </td>
              <td class="w-150 text-align-left employee-code">
                {{ item.employeeCode }}
              </td>
              <td class="text-align-left">{{ item.fullName }}</td>
              <td class="text-align-left w-150">
                {{ item.gender }}
              </td>
              <td class="text-align-center w-150">
                {{ this.commonJs.formatDate(item.dateOfBirth) }}
              </td>
              <td class="text-align-left w-150">
                {{ item.identityNumber }}
              </td>
              <td class="text-align-left w-150">
                {{ item.departmnetName }}
              </td>
              <td class="text-align-left w-150">{{ item.positionName }}</td>
              <td class="text-align-left w-150">
                {{ item.bankAccountNumber }}
              </td>
              <td class="text-align-left w-150">{{ item.bankName }}</td>
              <td class="text-align-left w-200">{{ item.bankBranchName }}</td>
              <!--  -->
              <!-- <td class="w-150 text-align-left employee-code">
                {{ item.EmployeeCode }}
              </td>
              <td class="text-align-left">{{ item.EmployeeName }}</td>
              <td class="text-align-left w-150">
                {{ item.GenderName }}
              </td>
              <td class="text-align-center w-150">
                {{ this.commonJs.formatDate(item.DateOfBirth) }}
              </td>
              <td class="text-align-left w-150">
                {{ item.IdentityNumber }}
              </td>
              <td class="text-align-left w-150">
                {{ item.DepartmentName }}
              </td>
              <td class="text-align-left w-150">{{ item.PositionName }}</td>
              <td class="text-align-left w-150">
                {{ item.BankAccountNumber }}
              </td>
              <td class="text-align-left w-150">{{ item.BankName }}</td>
              <td class="text-align-left w-200">{{ item.BankBranchName }}</td> -->
              <td class="text-align-center w-150 tb-function">
                <div class="flex table__function">
                  <button
                    class="btn-function-fix"
                    @click="rowOnDbClick(item), (updateFunction = true)"
                  >
                    Sửa
                  </button>
                  <button
                    class="btn-function__dropdown"
                    @click="
                      showOnDropMenu($event, item.employeeId, item.employeeCode)
                    "
                  >
                    <div class="icon w-h-24 function-dropdown-icon"></div>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Pagination -->
    <MPaging
      :total="this.totalRecord"
      :totalInPage="totalPage"
      v-model:pageNumber="currentPage"
    ></MPaging>
  </div>
  <!-- Dialog nhân viên -->
  <EmployeeDetail
    v-if="isShowForm"
    @btnCloseForm="closeForm"
    :employeeId="employeeIdSelected"
    @showSuccessToast="showSuccessToast()"
    @inputFocusDetail="isShowForm"
  ></EmployeeDetail>
  <!-- Loading -->
  <MLoading v-if="isShowLoading"></MLoading>
  <!-- DropMenu -->
  <teleport to="body" @blur="hideOnDropMenu">
    <div
      id="btn-dropdown-menu"
      class="dropdown-menu"
      v-if="isShowOnDropMenu"
      :style="dropdownPosition"
    >
      <ul class="dropdown-list">
        <li class="dropdown-item">Nhân bản</li>
        <li id="btn-delete" class="dropdown-item" @click="showOnDialogDelete">
          Xóa
        </li>
        <li class="dropdown-item">Ngừng sử dụng</li>
      </ul>
    </div>
  </teleport>
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
  <!-- Toast Success -->
  <MToast
    v-if="(isShowOnToast = false)"
    @btnCloseToast="isShowOnToast"
    :success="this.success"
  >
  </MToast>
</template>
<script>
//Import Thư viện
import axios from "axios";
import resource from "../../../lib/resource.js";
import _ from "lodash";
import EmployeeDetail from "../EmployeeDetail/EmployeeDetail.vue";
import commonJs from "@/script/common.js"
//Base
import MLoading from "../../../components/bases/Loading/MLoading.vue";
// import MDropMenu from "../DropMenu/MDropMenu.vue";
import MPaging from "../../../components/bases/Paging/MPaging.vue";
import MDialog from "@/components/bases/Dialog/MDialog.vue";
import MToast from "../../../components/bases/Toast/MToast.vue";

export default {
  name: "EmployeeList",
  components: {
    EmployeeDetail,
    MLoading,
    // MDropMenu,
    MPaging,
    MDialog,
    MToast,
  },
  data() {
    return {
      //#region Xử lý data liên quan đến sự kiện
      isShowForm: false,
      isShowLoading: false,
      dropdownPositionX: 0,
      dropdownPositionY: 0,
      isShowOnDropMenu: false,
      warningDeleteMessage: "",
      deleteEmployeeId: "",
      updateFunction: false,
      isShowDialog: false,
      inputSearchFocused: false,
      success: true,
      //Toast

      isShowOnToast: false,
      //Khai báo thời gian delay search
      //#endregion
      text: "Thêm nhân viên ",
      employeeIdSelected: null,
      employees: [],

      employeeSelected: [],

      isPrimary: true,

      commonJs: commonJs,

      contentAdd: resource.TextVi.Content.Add,
      contentTitle: resource.TextVi.Content.Title,
      //#region Text data Table
      textSearchPlaceholder: resource.TextVi.Table.Search,
      textEmployeeCode: resource.TextVi.Table.EmployeeCode,
      textEmployeeName: resource.TextVi.Table.EmployeeName,
      textGender: resource.TextVi.Table.Gender,
      textDateOfBirth: resource.TextVi.Table.DateOfBirth,
      textIdentity: resource.TextVi.Table.Identity,
      textDepartmentName: resource.TextVi.Table.DepartmentName,
      textPositionName: resource.TextVi.Table.PositionName,
      textBankNumber: resource.TextVi.Table.BankNumber,
      textBankName: resource.TextVi.Table.BankName,
      textBankBranch: resource.TextVi.Table.BankBranch,
      textFunction: resource.TextVi.Table.Function,

      textEdit: resource.TextVi.Table.Edit,
      textReplication: resource.TextVi.Table.Replication,
      textDelete: resource.TextVi.Table.Delete,
      textStop: resource.TextVi.Table.Stop,
      textRecordPerPage: resource.TextVi.Table.RecordPerPage,
      //#endregion
      TextToastMsg: {
        success: {
          title: resource.TextVi.ToastMessage.Success.Title,
          insert: resource.TextVi.ToastMessage.Success.Insert,
          update: resource.TextVi.ToastMessage.Success.Update,
        },
      },
      //Sử dụng ở tìm kiếm phân trang
      totalRecord: 0,
      totalPage: 0,
      currentPage: 1,
      filter: {
        employeeFilter: "",
        pageSize: 10,
        pageNumber: 3,
        keyword: "",
      },
    };
  },

  watch: {
    filter: {
      handler: function (newValue) {
        console.log(newValue);
        this.searchEmployee();
      },
      deep: true,
    },
    currentPage: function (newValue) {
      this.pageNumber = newValue;
      this.listEmployees();
      console.log("current Employee: ", newValue);
      console.log("pageNumber: ", this.pageNumber);
    },
  },
  created() {
    this.listEmployees();
  },
  methods: {
    //#region Các hàm liên quan đến xử lý sự kiện
    /**
     * Hiển thị form nhân viên
     * Author: Văn Anh (16/12/2022)
     */
    btnAddEmployee() {
      try {
        this.isShowForm = true;
        this.employeeIdSelected = null;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Đóng form
     * Author: Văn Anh (16/12/2022)
     */
    closeForm() {
      try {
        //Đóng dialog
        this.isShowForm = false;
        //Load lại dữ liệu
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Thực hiện double click vào 1 nhân viên thì hiển thị form nhân viên
     * Author: Văn Anh (18/12/2022)
     */
    rowOnDbClick(item) {
      try {
        //Hiển thị dialog
        this.isShowForm = true;
        this.employeeIdSelected = item.employeeId;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hiển thị drop menu
     * Athor: Văn Anh(21/12/2022)
     */
    showOnDropMenu(e, deleteEmployeeId, deleteEmployeeCode) {
      try {
        //Xét vị trí cho dropdown
        if (e.clientY > 575){
          this.dropdownPositionY = 510;
          this.dropdownPositionX = e.clientX;
        }
        else {
          this.dropdownPositionX = e.clientX;
          this.dropdownPositionY = e.clientY;

        }
        //Hiển thị drop menu
        this.isShowOnDropMenu = !this.isShowOnDropMenu;
        this.warningDeleteMessage = `Bạn có thực sự muốn xóa ${deleteEmployeeCode} không?`;
        this.deleteEmployeeId = deleteEmployeeId;
      } catch (error) {
        console.log(error);
      }
    },
    hideOnDropMenu() {
      try {
        this.isShowOnDropMenu = false;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hiển thị toast success
     * Author: Văn ANh (10/1/2023)
     */
    showSuccessToast() {
      try {
        this.isShowOnToast = !this.isShowOnToast;
        setTimeout(() => (this.isShowOnToast = false), 5000);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Sự kiện nhấn vào nút xóa trên dropmenu thì show cảnh báo
     * Author: Văn Anh (10/1/2023)
     */
    showOnDialogDelete() {
      try {
        this.isShowDialog = true;
        this.isShowOnDropMenu = false;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm ẩn dialog và drop menu
     * Author: Văn Anh (10/1/2023)
     */
    closeDialog() {
      try {
        this.isShowDialog = false;
        this.isShowOnDropMenu = false;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm xóa nhân viên
     * Author: Văn anh (10/1/2023)
     */
    btnOnDelete(deleteId) {
      try {
        axios
          .delete(
            // `https://amis.manhnv.net/api/v1/Employees/${deleteId}`
            `https://localhost:7232/api/Employees/${deleteId}`
            )
          .then((response) => {
            console.log("res", response);
            this.isShowDialog = false;
            this.listEmployees();
            this.deleteEmployeeId = "";
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     *Hàm khi người dùng focus thì show border xanh
     *Author: Văn Anh (11/1/2023)
     */
    inputSearchFocus() {
      try {
        this.inputSearchFocused = true;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Check  nhân viên
     * Author: Văn Anh (12/10/2023)
     */
    selectEmployeeCheck(selectedId) {
      try {
        if (this.employeeSelected.includes(selectedId)) {
          this.employeeSelected = this.employeeSelected.filter(
            (value) => value != selectedId
          );
        } else {
          this.employeeSelected.push(selectedId);
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Check all nhân viên
     * Author: Văn Anh (12/10/2023)
     */
    checkAllEmployees() {
      try {
        if (this.employeeSelected.length == this.employees.length) {
          this.employeeSelected = [];
        } else {
          for (const employee of this.employees) {
            if (!this.employeeSelected.includes(employee.employeeId)) {
              this.employeeSelected.push(employee.employeeId);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    //#endregion Các hàm liên quan đến xử lý sự kiện
    //#region Hàm xử lý dữ liệu từ API
    /**
     * Hiển thị danh sách nhân viên
     * Author: Văn Anh (17/12/2022)
     */
    async listEmployees() {
      try {
        this.isShowLoading = true;
        await axios
          .get(
            `https://localhost:7232/api/v1/Employees/filter?pageSize=20&pageNumber=1`
          )
          .then((response) => {
            // this.employees = response.data;
            // this.employeesLength = this.employees.length;
            console.log(response.data);
            // this.employees = response.data.Data;
            // this.totalRecord = response.data.TotalRecord;
            // this.totalPage = response.data.TotalPage;
            this.employees = response.data.data;
            this.totalRecord = response.data.data.length;
            this.totalPage = response.data.total;
            this.isShowLoading = false;
            console.log("currentPage: " + this.currentPage);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm xử lý tìm kiếm
     * Author: Văn Anh (11/1/2023)
     */
    searchEmployee: _.debounce(function () {
      try {
        this.listEmployees();
      } catch (error) {
        console.log(error);
      }
    }, 500),
    //#endregion
    
  },
  computed: {
    dropdownPosition() {
      return {
        top: `calc(${this.dropdownPositionY}px + 10px)`,
        left: `calc(${this.dropdownPositionX}px - 55px)`,
      };
    },
  },
};
</script>
<style scoped>
@import url(./employeeList.css);
#btn-delete {
  cursor: pointer;
}
</style>
