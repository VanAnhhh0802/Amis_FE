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
        text="Thêm mới nhân viên"
      ></MButton>
    </div>
    <div class="content__list">
      <div class="flex list__header" style="justify-content: space-between;">
        <div 
        class="flex list-toolbar-left toolbar-no-active"
        :class="{'toolbar-active': this.employeeSelected.length >=2}"
        @click = "ShowOnSubToolbar()"
        >
          <span class="list-toolbar-left-text">Thực hiện hàng loạt</span>
          <div class="icon toolbar-left-icon toolbar-icon-no-active"
          :class="{'toolbar-icon-active': this.employeeSelected.length >=2}"
          ></div>
        </div>
        <div class="toolbar-sub"
        v-show="this.isShowSubToolbar"
        @click="DeleteManyOnEmployee"
        >Xóa</div>
        <div class=" list-toolbar-wrapper">
          <div
            :class="{ 'border-focus': this.inputSearchFocused }"
            style="width: 260px"
            class="flex input__wrapper list__toolbar"
          >
            <MInput
              border="none"
              v-model.trim="this.filter.keyword"
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
          <div class="icon export"
            @click="exportFile(this.filter.keyword)"
          ></div>
        </div>
      </div>
      <div class="list__table">
        <table>
          <thead>
            <tr>
              <th class="width-table-checkbox list-checkbox">
                <MCheckbox 
                id ="check-all"
                @checkboxSelected="selectEmployeeCheck"
                @checked ="checkAll"
                ></MCheckbox>
              </th>
              <th class="text-align-left">{{ this.textEmployeeCode }}</th>
              <th class="text-align-left w-200">{{ this.textEmployeeName }}</th>
              <th class="text-align-left w-150">{{ this.textGender }}</th>
              <th class="text-align-center">{{ this.textDateOfBirth }}</th>
              <th class="text-align-left">{{ this.textPositionName }}</th>
              <th class="text-align-left">{{ this.textDepartmentName }}</th>
              <th class="text-align-left">{{ this.textBankNumber }}</th>
              <th class="text-align-left">{{ this.textBankName }}</th>
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
              :class="{employee__active: this.employeeSelected.includes(item.employeeId)}"
            >
              <td class="width-table-checkbox list-checkbox body-checkbox" :class="{employee__active: this.employeeSelected.includes(item.employeeId)}">
                <MCheckbox
                :id ="item.employeeId" 
                :checked ="this.employeeSelected.includes(item.employeeId)"
                @checkboxSelected="selectEmployeeCheck"
                ></MCheckbox>
              </td>
              <td class="w-150 text-align-left employee-code">
                {{ item.employeeCode }}
              </td>
              <td class="text-align-left">{{ item.fullName }}</td>
              <td class="text-align-left w-150">
                {{ this.formatGender(item.gender) }}
              </td>
              <td class="text-align-center w-150">
                {{ this.formatDate(item.dateOfBirth) }}
              </td>
              <td class="text-align-left w-150">{{ item.positionName }}</td>
              <td class="text-align-left min-w-200">
                {{ item.departmentName }}
              </td>
              <td class="text-align-left w-150">
                {{ item.bankAccountNumber }}
              </td>
              <td class="text-align-left w-150">{{ item.bankName }}</td>
              <td class="text-align-center w-150 tb-function" :class="{employee__active: this.employeeSelected.includes(item.employeeId)}">
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
        :pageNumberRecord="this.pagination"
        @pageSize="setPageSize"
        ></MDropCombobox>
        <MPaging
        :total="this.totalRecord"
        :totalInPage="this.totalPage"
        v-model:pageNumber="this.filter.pageNumber"
        :pageSizeNumber = "this.filter.pageSize"
    ></MPaging>
      </div>
    </div>
  </div>
    
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
    v-if="isShowOnToast"
    @btnCloseToast ="CloseToast"
  >
    <template v-slot:icon><div class="icon w-h-24 toast-icon--success"></div></template>
    <template v-slot:message>
      <span class="toast__desc--status toast__desc--success">Thành công</span>
      <span>Thêm nhân viên thành công</span>
    </template>
  </MToast>
</template>
<script>
//Import Thư viện
import axios from "axios";
import resource from "../../../lib/resource.js";
import _ from "lodash";
import EmployeeDetail from "../EmployeeDetail/EmployeeDetail.vue";
// import commonJs from "@/script/common.js"
//Base
import MLoading from "../../../components/bases/Loading/MLoading.vue";
// import MDropMenu from "../DropMenu/MDropMenu.vue";
import MPaging from "../../../components/bases/Paging/MPaging.vue";
import MDialog from "@/components/bases/Dialog/MDialog.vue";
import MToast from "../../../components/bases/Toast/MToast.vue";
import MDropCombobox from "@/components/bases/combobox/MDropCombobox.vue";


export default {
  name: "EmployeeList",
  components: {
    EmployeeDetail,
    MLoading,
    MPaging,
    MDialog,
    MToast,
    MDropCombobox,
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
      checkAll : false,
      employeeSelected: [],

      isPrimary: true,
      //Khai báo biến ở thực hiện hàng loạt
      isShowSubToolbar: false,
      //Paing 
      pagination : [
        {
          key: 10,
          value: "10 sản phẩm trên 1 trang",
        },
        {
          key: 20,
          value: "20 sản phẩm trên 1 trang",
        },
        {
          key: 30,
          value: "30 sản phẩm trên 1 trang",
        },
        {
          key: 50,
          value: "50 sản phẩm trên 1 trang",
        },
        {
          key: 100,
          value: "100 sản phẩm trên 1 trang",
        },
      ],
      //RESOURCE
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
      filter: {
        pageSize: 20,
        pageNumber: 1,
        keyword: "",
      },
    };
  },

  watch: {
    /**
     * Hàm theo dõi keyword mà thay đổi gọi hàm search
     */
    filter: {
      handler: function (newValue) {
        console.log(newValue);
        this.searchEmployee();
      },
      deep: true,
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
    // showSuccessToast() {
    //   try {
    //     console.log("click");
    //     // this.isShowOnToast = true;
    //     // setTimeout(() => (this.isShowOnToast = false), 5000);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    /**
     * Hàm đóng toast 
     * Author: Văn anh(18/12/2022)
     */
     CloseToast(){
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
         if (id == "check-all"){
          if (!isChecked) {
            //Kiểm tra khi bỏ check all
            this.employees.map(x => x.employeeId).forEach(e => {
              this.employeeSelected = this.employeeSelected.filter(x => x != e)
            });
            this.checkAll = false;
            this.isActiveToolbar = false;
          }
          else{
            //Kiểm tra khi check all
            this.employeeSelected = this.employeeSelected.concat(
              this.employees.filter(
                x => !this.employeeSelected.includes(x.employeeId)
                ).map(x => x.employeeId));
            this.checkAll = true;
            this.isActiveToolbar = true;
          }
        }
        else {
          //Kiểm tra các item check
          if (!isChecked) {
            this.employeeSelected = this.employeeSelected.filter(x => x != id);
          }
          else {
            this.employeeSelected.push(id);
            if (this.employeeSelected.length >= 2) {
              this.isActiveToolbar = true;
            }
          }
          this.testCheckAll();
        }
        console.log(JSON.stringify(this.employeeSelected));
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
        var count = 0;
      this.employees
        .map(x => x.employeeId)
        .forEach(e => {
          if(this.employeeSelected.filter(x => x == e).length > 0) {
            count++;
          }
        });
        //Kiểm tra để check
        if (count == this.employees.length) {
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
    ShowOnSubToolbar(){
      try {
          this.isShowSubToolbar = !this.isShowSubToolbar;
          console.log("click");
      } catch (error) {
        console.log(error);
      }
    }
    ,
    /**
     * Thực hiện xóa nhiều nhân viên
     * Author: Văn ANh (20/2/2023)
     */
    async DeleteManyOnEmployee(){
      try {
        await axios.post("https://localhost:7232/api/v1/Employees/DeleteMany", this.employeeIdSelected)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
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
            `https://localhost:7232/api/v1/Employees/filter?keyword=${this.filter.keyword}&pageSize=${this.filter.pageSize}&pageNumber=${this.filter.pageNumber}`
          )
          .then((response) => {
            console.log(response.data);
            this.employees = response.data.data;
            this.totalRecord = response.data.totalRecord;
            this.totalPage = response.data.totalPage;
            this.isShowLoading = false;
            console.log("loading");
            console.log("currentPage: " + this.filter.keyword);

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
        if (this.filter.keyword != "") {
          this.filter.pageNumber = 1;
        }
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
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');

          link.href = url;
          link.setAttribute('download', "Danh_sách_nhân_viên.xlsx");
          document.body.appendChild(link);
          link.click();
          console.log(response.data);
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
  },
};
</script>
<style scoped>
@import url(./employeeList.css);
#btn-delete {
  cursor: pointer;
}
</style>
