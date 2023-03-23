<template>
  <div class="content">
    <!-- Toolbar -->
    <div class="content__toolbar">
      <div class="content__title">
        Nhân viên
      </div>
      <MButton
        @click="(updateFunction = false), btnAddEmployee()"
        :class="{ 'btn--primary': true }"
        text="Thêm nhân viên"
      ></MButton>
    </div>
    <div class="content__list" >
      <div class="flex list__header" style="justify-content: space-between;">
        <!-- Toolbar left -->
        <div class="flex toolbar__left" v-if="isShowToolbarLeft">
          <div class="toolbar__left--count">Đã chọn: <b>{{ this.employeeSelected.length }}</b></div>
          <div class="toolbar__btn-uncheck"
          @click="resetCheckAllEmployee"
          >Bỏ chọn</div>
          <div class="toolbar__btn-delete-many"
          @click ="confirmDeleteMany(), (this.deleteMany = true)"
          >
            Xóa
          </div>
        </div>
        <!-- End toolbar left -->
        <div 
        class=" list-toolbar-wrapper" 
        
        >
          <div
            :class="{ 'border-focus': this.inputSearchFocused }"
            style="width: 260px"
            class="flex input__wrapper list__toolbar"
          >
            <MInput
              border="none"
              v-model.trim="this.textSearch"
              @inputFocus="inputSearchFocus"
              @inputOutFocus="this.inputSearchFocused = false"
              placeholder="Tìm kiếm theo mã, tên nhân viên"
              
            ></MInput>
            
          </div>
          <div class="tooltip">
            <div
              class="icon btn btn--small"
              id="btn__reload"
              @click="btnReload"
            style="background-position: -1097px -83px;"

            ></div>
            <div class="tooltip-text tooltip-reload"
            >Lấy lại dữ liệu</div>
          </div>
          <div class="tooltip">
            <div class="icon export" style="background-position: -705px -258px;"
            @click="exportFile(this.textSearch)"
          ></div>
            <div class="tooltip-text tooltip-reload">Xuất khẩu</div>
          </div>
        </div>
      </div>
      <div class="list__table">
        <table>
          <thead>
            <tr>
              <th class="width-table-checkbox list-checkbox text-align-left" >
                <MCheckbox 
                id ="check-all"
                :checked ="this.checkAll"
                @checkbox-selected="selectEmployeeCheck"
                ></MCheckbox>
              </th>
              <th class="text-align-left">{{ this.textEmployeeCode }}</th>
              <th class="text-align-left " style="min-width: 250px;"
              >{{ this.textEmployeeName }}</th>
              <th class="text-align-left w-150">{{ this.textGender }}</th>
              <th class="text-align-center">{{ this.textDateOfBirth }}</th>
              <th class="text-align-left">{{ this.textPositionName }}</th>
              <th class="text-align-left">{{ this.textDepartmentName }}</th>
              <th class="text-align-left">{{ this.textBankNumber }}</th>
              <th class="text-align-left">{{ this.textBankName }}</th>
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
              a-employee-id="3c53b211-7c45-11ed-9263-00163e06abee"
              class="employee-infor"
              v-for="(item, index) in employees"
              :key="index"
              @dblclick="rowOnDbClick(item), (updateFunction = true)"
              :class="{employee__active: this.employeeSelected.includes(item.EmployeeId) }"
            >
              <td class="width-table-checkbox list-checkbox body-checkbox" :class="{employee__active: this.employeeSelected.includes(item.employeeId)}">
                <MCheckbox
                :id ="item.EmployeeId" 
                :checked ="this.employeeSelected.includes(item.EmployeeId)"
                @checkboxSelected="selectEmployeeCheck"
                ></MCheckbox>
              </td>
              <td class="w-150 text-align-left employee-code">
                {{ item.EmployeeCode || "" }}
              </td>
              <td class="text-align-left">{{ item.FullName || "" }}</td>
              <td class="text-align-left w-150">
                {{ this.formatGender(item.Gender) || "" }}
              </td>
              <td class="text-align-center w-150">
                {{ this.formatDate(item.DateOfBirth) || ""}}
              </td>
              <td class="text-align-left w-150">{{ item.PositionName || ""}}</td>
              <td class="text-align-left min-w-200">
                {{ item.DepartmentName || ""}}
              </td>
              <td class="text-align-left w-150">
                {{ item.BankAccountNumber || ""}}
              </td>
              <td class="text-align-left w-150">{{ item.BankName || ""}}</td>
              <td class="text-align-center w-100 tb-function" :class="{employee__active: this.employeeSelected.includes(item.EmployeeId)}">
                <div class="flex table__function" >
                  <button
                    class="btn-function-fix"
                    @click="rowOnDbClick(item), (updateFunction = true)"
                  >
                    Sửa
                  </button>
                  <button
                    class="btn-function__dropdown"
                    @click="
                      showOnDropMenu($event, item.EmployeeId, item.EmployeeCode), (this.deleteMany = false)
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
    <!-- Footer -->
    <div class="content__footer">
    <div class="content--left">
      <div class="total-record">
        Tổng số :
        <b>{{ this.totalRecord }}</b>
        bản ghi
      </div>
    </div>
    <div class="content--right">
      <div class="flex pagination">
        <MDropCombobox
        :total="this.pagination"
        styleData="top: -143px"
        :default="this.pagination[1].value"
        style="width:200px"
        @pageSize="setPageSize"
        ></MDropCombobox>
        <Paginate
          v-model="this.filter.pageNumber"
          :page-count="totalPage"
          :page-range="2"
          :margin-pages="1"
          :click-handler="clickCallback"
          :prev-text="'Trước'"
          :next-text="'Sau'"
          :container-class="'pagination'"
          :page-class="'page-item'"
        />
      </div>
    </div>
  </div>
    
  </div>
  <!-- Dialog nhân viên -->
  <EmployeeDetail
    v-if="isShowForm"
    :isShow="isShowForm"
    @btnCloseForm="closeForm"
    :employeeId="employeeIdSelected"
    @inputFocusDetail="isShowForm"
    @onshowToast="onshowToast"
    @changeToastMsg="changeToastMsg"
    :isDuplicate="isDuplicateEmployee"
  ></EmployeeDetail>
  <!-- Loading -->
  <MLoading v-if="isShowLoading"></MLoading>
  <!-- DropMenu -->
  <teleport to="body" @blur="hideOnDropMenu">
    <div
      id="btn-dropdown-menu"
      class="dropdown-menu"
      v-if="isShowOnDropMenu"
      :style="[isDropdown ? dropdownPosition : dropdownPositionReverse]"
    >
      <ul class="dropdown-list">
        <li class="dropdown_list-item"
        @click="btnReplicationOnDetail()"
        >Nhân bản</li>
        <li id="btn-delete" class="dropdown_list-item" @click="showOnDialogDelete">
          Xóa
        </li>
        <div class="tooltip">
            <li class="dropdown_list-item">Ngừng sử dụng</li>
            <div class="tooltip-text tooltip-reload">Đang phát triển</div>
          </div>
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
  <!--  -->
  <MDialog v-if="isShowDialogError" @btnCloseDialog="closeDialog">
    <template v-slot:title>Cảnh báo</template>
    <template v-slot:message>
      <li class="flex dialog-mgs">
        <div
          class="icon w-h-24 btn-dialog--close dialog__warning-icon"
        ></div>
        {{ this.warningMessage }}
      </li>
    </template>
    <template v-slot:footer>
      <MButton
        class="btn btn--primary dialog__btn--acept"
        @click="closeDialog"
        text="Đóng"
      >
      </MButton>
    </template>
  </MDialog>
  <!-- Toast Success -->
  <MToast
    v-if="isShowToast "
    @closeToast="closeToast"
    @onHideToast="onHideToast"
    :toastType="toastContent"
    :toastTitle="toastTitle"
    :isSuccessToast="isSuccessToast"
    :isErrorToast="isErrorToast"
  />
  
</template>
<script>
//Import Thư viện
import axios from "axios";
import resource from "../../../lib/resource.js";
import _ from "lodash";
import EmployeeDetail from "../EmployeeDetail/EmployeeDetail.vue";
import MLoading from "../../../components/bases/Loading/MLoading.vue";
import MDialog from "@/components/bases/Dialog/MDialog.vue";
import MToast from "../../../components/bases/Toast/MToast.vue";
import MDropCombobox from "@/components/bases/combobox/MDropCombobox.vue";
import Paginate from "vuejs-paginate-next";
export default {
  name: "EmployeeList",
  components: {
    EmployeeDetail,
    MLoading,
    // MPaging,
    MDialog,
    MToast,
    MDropCombobox,
    Paginate,
  },
  data() {
    return {
    //#region Xử lý data liên quan đến sự kiện
      isShowForm: false,
      isShowLoading: false,
      dropdownPositionX: 0,
      dropdownPositionY: 0,
      isDropdown: true,
      isShowOnDropMenu: false,
      warningDeleteMessage: "",
      deleteEmployeeId: "",
      updateFunction: false,
      isDuplicateEmployee: false,
      isShowToast: false,
      //Dialog
      isShowDialog: false,
      isShowDialogError : false,
      inputSearchFocused: false,
      success: true,
      deleteMany: false,
      backgroundColor: false,
      isShowToolbarLeft: false,
      //Toast
      isTitleToast: null,
      isMessageToast: null,
      isShowOnToast: false,
      //Khai báo thời gian delay search
      //#endregion
      text: "Thêm nhân viên ",
      employeeIdSelected: null,
      employees: [],
      checkAll : false,
      employeeSelected: [],
      
      isPrimary: true,
      //Khai báo biến ở thực hiện hàng loạt
      isShowSubToolbar: false,
      //Paing 
      totalRecord : null,
      totalPage : 0,
      pagination : [
        {
          key: 10,
          value: "10 nhân viên trên 1 trang",
        },
        {
          key: 20,
          value: "20 nhân viên trên 1 trang",
        },
        {
          key: 30,
          value: "30 nhân viên trên 1 trang",
        },
        {
          key: 50,
          value: "50 nhân viên trên 1 trang",
        },
        {
          key: 100,
          value: "100 nhân viên trên 1 trang",
        },
      ],
      //RESOURCE
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
      
      //Sử dụng ở tìm kiếm phân trang
      textSearch: "",
      filter: {
        pageSize: 20,
        pageNumber: 1,
      },
    };
  },

  watch: {
    /**
     * Hàm theo dõi keyword mà thay đổi gọi hàm search
     */
    textSearch: function () { 
      this.filter.pageNumber = 1;
      this.searchEmployee();
      this.testCheckAll();
    }
  },
  created() {
    this.listEmployees();
  },
  methods: {
    //#region Các hàm liên quan đến xử lý sự kiện
    async clickCallback(pageNum){
      try {
        this.filter.pageNumber = pageNum;
      await this.listEmployees();
      this.testCheckAll();
      } catch (error) {
        console.log(error);
      }
    },
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
    changeToastMsg(text, error, success, title) {
      this.toastContent = text;
      this.isErrorToast = error;
      this.isSuccessToast = success;
      this.toastTitle = title;
    },
    /**
     * Đóng form
     * Author: Văn Anh (16/12/2022)
     */
    closeForm() {
      try {
        this.isDuplicateEmployee = false;
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
        // this.isDuplicate = false;
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
        if (e.clientY > 560){
          this.isDropdown = false;
          console.log("chay");
        }
        else {
          this.isDropdown = true;
        }
        this.dropdownPositionX = e.clientX;
        this.dropdownPositionY = e.clientY;
        //Hiển thị drop menu
        this.isShowOnDropMenu = !this.isShowOnDropMenu;
        this.warningDeleteMessage = `Bạn có thực sự muốn xóa <${deleteEmployeeCode}> không?`;
        this.deleteEmployeeId = deleteEmployeeId;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm ẩn drop menu
     * Author: Văn ANh (21/12/2023)
     */
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
     isShowHideToast(){
      try {
        this.isTitleToast = "Thành Công!"
        if(this.updateFunction == false){
          this.isMessageToast = "Thêm nhân viên thành công "
        }
        else{
          this.isMessageToast = "Sửa nhân viên thành công "
        }
        this.isShowOnToast = true

        setTimeout(() => (this.isShowOnToast = false), 5000);
      } catch (error) {
        console.log(error);
      }
     },

     
    /**
     * Hàm đóng toast 
     * Author: Văn anh(18/12/2022)
     */
     closeToast(){
      try {
        this.isShowOnToast = false
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
        this.isShowDialogError = false;
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
        if (this.deleteMany){
          this.deleteManyOnEmployee();
        }
        else {
          this.deleteOneEmployee(deleteId);
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Gọi Api xóa 1 nhân viên
     * Author: Văn Anh (1/2/2023)
     */
    async deleteOneEmployee(deleteId){
      try {
        this.isShowLoading = true;
        await axios
          .delete(
            `https://localhost:7232/api/v1/Employees/${deleteId}`
            )
          .then((response) => {
            
            console.log("res", response);
            this.isShowDialog = false;
            this.listEmployees();
            this.deleteEmployeeId = "";
          })
          .catch((error) => {
            console.log(error);
            //Lấy ra mã bị lỗi
            var statusCode = error.response.status;
            console.log(statusCode);
            switch (statusCode) {
              case 500:
                this.isShowOnToast = false;
                this.warningMessage = error.response.data.userMsg;
                this.isShowDialogError = true;
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
    selectEmployeeCheck(isChecked, id) {
      try {
        //checl all 
         if (id === "check-all"){
          if (!isChecked) {
            //Kiểm tra khi bỏ check all
            this.employees.map(x => x.employeeId).forEach(e => {
              this.employeeSelected = this.employeeSelected.filter(x => x != e)
            });
            this.checkAll = false;
            this.isShowToolbarLeft = false;
          }
          else{
            //Kiểm tra khi check all
            this.employeeSelected = this.employeeSelected.concat(
              this.employees.filter(
                x => !this.employeeSelected.includes(x.employeeId)
                ).map(x => x.employeeId));
            this.checkAll = true;
            this.isShowToolbarLeft = true;
          }
        }
        else {
          //Kiểm tra các item check
          if (!isChecked) {
            this.employeeSelected = this.employeeSelected.filter(x => x != id);
          }
          else {
            this.employeeSelected.push(id);
            if (this.employeeSelected.length > 0) {
              this.isShowToolbarLeft = true;
            }
            else {
              this.isShowToolbarLeft = false
            }
          }
          this.testCheckAll();
        }
        this.isShowHideToolbarLeft();
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
      this.employees
        .map(x => x.employeeId)
        .forEach(e => {
          if(this.employeeSelected.filter(x => x === e).length > 0) {
            count++;
          }
        });
        //Kiểm tra để check
        if (this.employees.length > 0 && count == this.employees.length) {
          this.checkAll = true;
        }
        else if (count < this.employees.length) {
          this.checkAll = false;
        }
      } catch (error) {
        console.log(error);
      }
      
    },
    /**
     * Kiểm tra ẩn hiển tool bả left
     */
    isShowHideToolbarLeft() {
      try {
        if (this.employeeSelected.length > 0) {
          this.isShowToolbarLeft = true;
        }
        else {
          this.isShowToolbarLeft = false

        }
      } catch (error) {
        console.log(error);
      }
     },
     /**
      * Hàm set lại check all
      * Author: Văn ạnh (28/2/2023)
      */
     resetCheckAllEmployee(){
      try {
        this.employeeSelected = [];
        this.isShowToolbarLeft = false
        
        //Tính toán lại check all
        this.testCheckAll();
      } catch (error) {
        console.log(error);
      }
     },
    /**
     * Hàm set lại giá trị cho page size
     * Author: Văn ANh (20/2/2023)
     */
    setPageSize(size){
      try {
        this.filter.pageSize = size;
        this.filter.pageNumber = 1;
        this.listEmployees();
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm ẩn hiện sub toolbar
     * Author: Văn ANh (20/2/2023)
     */
     showOnSubToolbar(){
      try {
        if (this.employeeSelected.length >= 2){
          this.isShowSubToolbar = !this.isShowSubToolbar;
        }
        else {
          this.isShowSubToolbar = false;
        }
      } catch (error) {
        console.log(error);
      }
    }
    ,
    /**
     * Hàm xử lý sự kiện nhân bản
     * Author: Văn Anh (20/2/2023)
     */
    btnReplicationOnDetail(){
      try {
        
        this.isDuplicateEmployee = true;
        this.isShowOnDropMenu = false;
        this.isShowForm = true;
        this.employeeIdSelected = this.deleteEmployeeId;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm reload lại dữ liệu
     */
    async btnReload(){
      try {
        this.isShowLoading = true;
        this.filter.pageNumber = 1;
        this.textSearch = "";
        setTimeout(async () => {
          await this.listEmployees()
        }, 500);
        
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hiển thị cảnh báo xóa nhiềuf
     * Author: Văn Anh (20/2/2023)
     */
    confirmDeleteMany(){
      try {
        if (this.employeeSelected.length >= 2){
          this.warningDeleteMessage = resource.TextVi.Dialog.Title.DeleteMany
          this.isShowDialog = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Thực hiện xóa nhiều nhân viên
     * Author: Văn ANh (20/2/2023)
     */
    async deleteManyOnEmployee(){
      try {
        this.isShowLoading = true;
        //Gọi APi Xóa nhiều nhân viên
        await axios.delete("https://localhost:7232/api/v1/Employees/DeleteMany", {data: this.employeeSelected},
        {
            headers: {
              "access-control-allow-origin": "https://localhost:7232 ",
              "content-type": "application/json; charset=utf-8"
            }
          })
        .then(response => {
          console.log(response);
        this.isShowLoading = false;
          this.employeeSelected = [];
          this.isShowDialog = false;
          this.isShowToolbarLeft = false;
          this.listEmployees();
        })
        .catch(error => {
          var statusCode = error.response.status;
            console.log(statusCode);
            switch (statusCode) {
              case 400:
                this.isShowLoading = false;
                this.warningMessage = error.response.data.userMsg;
                this.isShowDialogError = true;
                break;
              case 500:
                this.isShowLoading = false;
                this.warningMessage = error.response.data.userMsg;
                this.isShowDialogError = true;
                break;
              default:
                break;
            }
        })
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
            `https://localhost:7232/api/v1/Employees/filter?keyword=${this.textSearch}&pageSize=${this.filter.pageSize}&pageNumber=${this.filter.pageNumber}`
          )
          .then((response) => {
            console.log(response);
            this.employees = response.data.Data;
            this.totalRecord = response.data.totalRecord;
            this.totalPage = response.data.totalPage;
            this.isShowLoading = false;
          })
          .catch((error) => {
            console.log(error);
            this.isShowLoading = false;
            this.warningMessage = resource.ExceptionMsg.NTERNALSERVERERROR,
            this.isShowDialogError = true;
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
    /**
     * Hàm format giới tính 
     * Author: Văn Anh (11/1/2023)  
     */
    formatGender(gender){
      try {
        switch (gender) {
        case 0:
          return "Nam";
        case 1:
          return "Nữ";
        case 2:
          return "Khác";
        default:
          return ''

      } 
    }
    catch (error) {
      console.log(error);
    }
    },
    /**
     * Hàm format ngày tháng năm
     * @param {*} date 
     * Author: Văn ANh (21/12/2023)
     */
    formatDate(date) {
        try {
          if (date) {
            //Tạo đối tượng date
            date = new Date(date);
            //Khai báo biến year gán year hiện tại
            let year = date.getFullYear();
            //Khai báo biến month gán month vì month bắt đầu từ 0 nên ta + thêm 1
            let month = date.getMonth() + 1;
            //Dùng toán tử 3 ngôi để thêm 0 đằng trước ngày nhỏ hơn 10
            // month < 10 ? `0${month}` : `${month}`;
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
            return `${day}/${month}/${year}`;
          } else {
            ("");
          }
        } catch (error) {
          console.log(error);
        }
    },
    /**
     * Hàm export thành danh sách nhân viên
     * Author: Văn ANh (17/2/2023)
     */
    async exportFile(keyword){
      try {
        this.isShowLoading = true;
        await axios.post("https://localhost:7232/api/v1/Employees/export", keyword, {
          headers: {
              "Access-Control-Allow-Origin": "*",
            "accept": "*/*",
            "Content-Type": "application/json;charset=UTF-8"
            },
            responseType : 'blob'
          }
        ) 
        .then(response => {
          this.isShowLoading = false;
          //Tạo 1 chuỗi ulr cho data trả về
          const url = window.URL.createObjectURL(new Blob([response.data]));
          //Khởi tạo 1 element mới
          const link = document.createElement('a');

          link.href = url;
          link.setAttribute('download', "Danh_sách_nhân_viên.xlsx");
          document.body.appendChild(link);
          link.click();
        
        })
        .catch(error => {
          console.log(error);
        });
      } 
      catch (error) {
        console.log(error);
      }
    }
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
  },
};
</script>
<style scoped>
@import url(./employeeList.css);
#btn-delete {
  cursor: pointer;
}

</style>
