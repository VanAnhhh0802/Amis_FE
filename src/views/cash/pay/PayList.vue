<template >
    <div class=" content-wrapper-payment" style="margin-top: 10px;height: 100% ;">
        <vue-resizable
            ref="vueResizeRef"
            :active="['b']"
            :maxHeight="660"
            :height="heightMaster"
            @resize:move="handleChangeHeight($event)"
        >
            <div class="content__list" style="height: 383px;box-sizing: border-box;">
                <div class="flex list__header" style="justify-content: space-between;">
                    <div class="flex toolbar__left" v-if="isShowToolbarLeft= true">
                        <div class="icon-new w-h-24 toolbar__left-icon" style="margin-left: 15px;"></div> 
                        <div class="flex toolbar__left-btn  toolbar__left-btn--disable" :class="{'toolbar__left-btn--active': false}">Thực hiện hàng loạt 
                            <div class="icon-new w-h-24 toolbar__left-btn-icon"></div>
                        </div> 
                    </div>
                    <div 
                    class=" list-toolbar-wrapper" 
                    
                    >
                        <div
                            :class="{ 'border-focus': this.inputSearchFocused }"
                            style="width: 260px"
                            class="flex input__wrapper list__toolbar"
                        >
                            <MInput
                            class="icon btn--search"
                            border="none"
                            v-model.trim="this.textSearch"
                            @inputFocus="inputSearchFocus"
                            @inputOutFocus="this.inputSearchFocused = false"
                            placeholder="Tìm kiếm theo mã, tên nhân viên"
                            ></MInput>
                        </div>
                        <div class="tooltip">
                            <div
                            class="icon w-h-24 btn btn--small"
                            id="btn__reload"
                            @click="btnReload"
                            ></div>
                            <div class="tooltip-text tooltip-reload">Lấy lại dữ liệu</div>
                        </div>
                        <div class="tooltip">
                            <div class="icon export" style="background-position: -705px -258px;"
                            @click="exportFile(this.textSearch)"
                            ></div>
                            <div class="tooltip-text tooltip-reload">Xuất khẩu</div>
                        </div>
                        <div class="tooltip">
                            <div class="icon w-h-24 btn--small setting" style="background-position: -88px -200px; margin: 8px; cursor: pointer;"
                            ></div>
                            <div class="tooltip-text  tooltip-reload">Cài đặt</div>
                        </div>
                        <div class="flex toolbar-right-wrapper">
                            <router-link to="/pay/pay-detail"
                            class="btn"
                                :class="{ 'btn--primary': true }"
                                text="Chi tiền"
                                style="order: 0; border-top-left-radius: 40px;box-sizing: border-box ;border-bottom-left-radius: 40px; height: 28px; text-decoration: none;"
                            ></router-link>
                            <div class="icon w-h-24 btn-dropdown-toolbar"></div>
                        </div>
                    </div>
                </div>
                <MTable
                :entities = "fakeDataList"
                ></MTable>
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
                            <paginate
                            :page-count="2"
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
        
        </vue-resizable>
        <div class="detail-payment" :style="{ height: heightDetail + 'px' }">
            <div class="content__list" style="height: 100%;box-sizing: border-box;" >
                <div class="flex list__header" style="justify-content: space-between; margin-bottom: 0; background-color:#eceef1;">
                    <!-- Toolbar left -->
                    <div class="toolbar__detail">Chi tiết</div>
                </div>
                <MTableDetail
                    :entities = "fakeDataDetail"
                ></MTableDetail>
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
                            <paginate
                            :page-count="2"
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
        </div>
    </div>
        
</template>
<script>
import MTable from '@/components/bases/Table/MTable.vue';
import MTableDetail from '@/components/bases/Table/MTableDetail.vue';
import paginate from 'vuejs-paginate-next';
import resource from '@/lib/resource';
import MDropCombobox from "@/components/bases/combobox/MDropCombobox.vue"
import MISAEnum from '@/lib/enum';

export default {
    name: "PayList",
    components: {
    paginate,
    MTableDetail,
    MTable,
    MDropCombobox
},
    data(){
        return{
            isFocus: false,
            isShowToolbarLeft: false,
            inputSearchFocused: false,
            pagination: resource.pagination,
            heightMaster: MISAEnum.HEIGHT.HEIGHT_PAY_MASTER,
            heightContent: MISAEnum.HEIGHT.HEIGHT_PAY_CONTENT,
            heightDetail: MISAEnum.HEIGHT.HEIGHT_PAY_DETAIL,

            fakeDataList: [
            {
                PayId: "PC001",
                AccountingDate: "12/02/2022",
                VouchersDate: "12/02/2022",
                VoucherNumber: "PC001",
                Explain: "Chi tiền cho Hồ Văn Anh",
                Money: "1000000",
                SubjectId: "KH0001",
                SubjectName: "Công ty cổ phần MISA",
                Address: "Khu ngoại giao đoàn",
            },
            {
                PayId: "PC002",
                AccountingDate: "12/02/2022",
                VouchersDate: "12/02/2022",
                VoucherNumber: "PC001",
                Explain: "Chi tiền cho Hồ Văn Anh",
                Money: "1000000",
                SubjectId: "KH0001",
                SubjectName: "Công ty cổ phần MISA",
                Address: "Khu ngoại giao đoàn",
            },
            {
                PayId: "PC003",
                AccountingDate: "12/02/2022",
                VouchersDate: "12/02/2022",
                VoucherNumber: "PC001",
                Explain: "Chi tiền cho Hồ Văn Anh",
                Money: "1000000",
                SubjectId: "KH0001",
                SubjectName: "Công ty cổ phần MISA",
                Address: "Khu ngoại giao đoàn",
            },
            {
                PayId: "PC004",
                AccountingDate: "12/02/2022",
                VouchersDate: "12/02/2022",
                VoucherNumber: "PC001",
                Explain: "Chi tiền cho Hồ Văn Anh",
                Money: "1000000",
                SubjectId: "KH0001",
                SubjectName: "Công ty cổ phần MISA",
                Address: "Khu ngoại giao đoàn",
            },
            {
                PayId: "PC005",
                AccountingDate: "12/02/2022",
                VouchersDate: "12/02/2022",
                VoucherNumber: "PC001",
                Explain: "Chi tiền cho Hồ Văn Anh",
                Money: "1000000",
                SubjectId: "KH0001",
                SubjectName: "Công ty cổ phần MISA",
                Address: "Khu ngoại giao đoàn",
            },
            {
                PayId: "PC006",
                AccountingDate: "12/02/2022",
                VouchersDate: "12/02/2022",
                VoucherNumber: "PC001",
                Explain: "Chi tiền cho Hồ Văn Anh",
                Money: "1000000",
                SubjectId: "KH0001",
                SubjectName: "Công ty cổ phần MISA",
                Address: "Khu ngoại giao đoàn",
            },
            ],
            fakeDataDetail : [
                {
                    PayId: 1,
                    Explain: "Chi tiền cho Hồ Văn Anh",
                    AccountingData: "111",
                    NumberOfVouchers: "111",
                    Money: 1000000,
                    SubjectId: "KH001",
                    SubjectName: "Công ty cổ phần văn phòng phẩm Hồng Hà tại Hà Nội",
                },
                {
                    PayId: 2,
                    Explain: "Chi tiền cho Hồ Văn Anh",
                    AccountingData: "111",
                    NumberOfVouchers: "111",
                    Money: 1000000,
                    SubjectId: "KH001",
                    SubjectName: "Công ty cổ phần văn phòng phẩm Hồng Hà tại Hà Nội",
                }
            ],
             //Text tiêu đề bảng
            textAccountingDate: resource.Vi.ColumsTablePay.AccountingDate,
            textVouchersDate: resource.Vi.ColumsTablePay.VouchersDate,
            textNumberOfVouchers: resource.Vi.ColumsTablePay.NumberOfVouchers,
            textExplain: resource.Vi.ColumsTablePay.Explain,
            textMoney: resource.Vi.ColumsTablePay.Money,
            textSubjectId: resource.Vi.ColumsTablePay.SubjectId,
            textSubject: resource.Vi.ColumsTablePay.Subject,
            textSubjectName: resource.Vi.ColumsTablePay.SubjectName,
            textBranch: resource.Vi.ColumsTablePay.Branch,
            textFunction: resource.Vi.ColumsTablePay.Function,
            textAccountDebt: resource.Vi.ColumsTablePay.AccountDebt,
            textAccountHas: resource.Vi.ColumsTablePay.AccountHas,
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
    methods: {
    
    /**
     * Hàm thực hiện thay đổi chiều cao phần detail khi resize
     * @param {*} event
     * 
     */
    handleChangeHeight(event) {
        try {
            this.heightDetail.value = MISAEnum.HEIGHT.HEIGHT_PAY_CONTENT - event.height;
            this.heightMaster.value = event.height;
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
        console.log(size);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm click chuyển trang
     * @param {Number} pageNum 
     */
    async clickCallback(pageNum){
      try {
        console.log(pageNum);
      this.testCheckAll();
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
    }
}
</script>
<style scoped>
    @import url(./pay.css);
</style>