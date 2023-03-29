<template >
    <div class=" content-wrapper-payment" style="margin-top: 10px;height: 100% ;">
        <vue-resizable
            ref="vueResizeRef"
            :active="['b']"
            :maxHeight="660"
            :height="heightMaster"
            @resize:move="handleChangeHeight($event)"
        >
            <div class="content__list" style="height: 385px;box-sizing: border-box;">
                <div class="flex list__header" style="justify-content: space-between;">
                    <div class="flex toolbar__left">
                        <div class="icon-new w-h-24 toolbar__left-icon" style="margin-left: 15px;"></div> 
                        <div class="flex toolbar__left-btn  toolbar__left-btn--disable" 
                        @click="isDelete = true"
                        v-click-outside-element="clickOutside"
                        :class="{'toolbar__left-btn--active': isShowToolbar}">Thực hiện hàng loạt 
                            <div class="icon-new w-h-24 toolbar__left-btn-icon"

                            ></div>
                            <div class="btn-delete-toolbar"
                                v-if="isDelete"
                                @click="confirmDeleteMany()"
                            >Xóa</div>
                        </div> 
                    </div>
                    <div 
                    class="col-gap list-toolbar-wrapper" 
                    >
                    <MInput
                    class="btn--search btn--search-new"
                    :class="{ 'border-focus': this.inputSearchFocused }"
                    style="border: 1px solid #babec5;width: 250px; box-sizing: border-box;"
                    border="none"
                    v-model.trim="this.keyword"
                    @inputFocus="inputSearchFocus"
                    @inputOutFocus="this.inputSearchFocused = false"
                    placeholder="Tìm kiếm theo mã, tên nhân viên"
                    ></MInput>
                    <div class="tooltip">
                        <div
                        class="icon w-h-24 btn btn--small"
                        id="btn__reload"
                        style="background-position: -1097px -83px;"
                        @click="btnReload"
                        ></div>
                        <div class="tooltip-text tooltip-reload">Lấy lại dữ liệu</div>
                    </div>
                    <div class="tooltip">
                        <div class="icon export" style="background-position: -705px -258px;"
                        @click="exportFile(this.keyword)"
                        ></div>
                        <div class="tooltip-text tooltip-reload">Xuất khẩu</div>
                    </div>
                    <div class="flex toolbar-right-wrapper">
                        <router-link to="/pay/pay-detail"
                        class="btn"
                            :class="{ 'btn--primary': true }"
                            text="Chi tiền"
                            style="order: 0; border-radius: 40px;box-sizing: border-box ; height: 28px; text-decoration: none;"
                        ></router-link>
                    </div>
                    </div>
                </div>
                <MTable
                @deleteResponse="reloadData"
                :entities = "this.payments"
                @showToolbar="showToolbar($event)"
                @listId="this.listPaymentIdDelete = $event"
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
                            v-model="this.pageSize"
                            @pageSize="setPageSize"
                            :total="this.paging"
                            :default="this.paging[1].value"
                            style="min-width:200px"
                            styleData="top: -143px!important"
                            ></MDropCombobox>
                            <paginate
                            :page-count="this.totalPage"
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
                    <div class="toolbar__detail">Chi tiết</div>
                </div>
                <MTableDetail
                    :entities = "this.payments"
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
                            v-model="this.pageSize"
                            @pageSize="setPageSize"
                            :total="this.paging"
                            :default="this.paging[1].value"
                            style="min-width:200px"
                            styleData="top: -143px!important"
                            ></MDropCombobox>
                            <paginate
                            :page-count="this.totalPage"
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
    <MLoading
    v-if="isShowLoading"
    ></MLoading>
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
        @click="btnDelete"
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
</template>
<script>
import MTable from '@/components/bases/Table/MTable.vue';
import MLoading from '@/components/bases/Loading/MLoading.vue';
import MTableDetail from '@/components/bases/Table/MTableDetail.vue';
import paginate from 'vuejs-paginate-next';
import resource from '@/lib/resource';
import MDialog from '@/components/bases/Dialog/MDialog.vue';
import MDropCombobox from "@/components/bases/combobox/MDropCombobox.vue"
import MISAEnum from '@/lib/enum';

import { HTTPPayments } from '@/script/api';
import _ from "lodash";

export default {
    name: "PayList",
    components: {
    paginate,
    MTableDetail,
    MDialog,
    MLoading,
    MTable,
    MDropCombobox
    },
    created(){
        this.listPayments(this.keyword, this.pageSize, this.pageNumber);
    },
    data(){
        return{
            payments: [],
            keyword: "",
            pageSize: 20,
            pageNumber: 1,
            totalRecord: null,
            totalPage: null,
            isDelete: false,
            listPaymentIdDelete: [],
            isShowDialog:false,
            warningDeleteMessage: null,
            isFocus: false,
            isShowToolbar: false,
            inputSearchFocused: false,
            isShowLoading: false,
            pagination: resource.pagination,
            heightMaster: MISAEnum.HEIGHT.HEIGHT_PAY_MASTER,
            heightContent: MISAEnum.HEIGHT.HEIGHT_PAY_CONTENT,
            heightDetail: MISAEnum.HEIGHT.HEIGHT_PAY_DETAIL,

            paging: resource.paging,
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
    watch: {
         /**
         * Hàm theo dõi keyword mà thay đổi gọi hàm search
         */
        keyword: function () { 
            let number =1
            console.log("keyword",this.keyword);
            this.searchPayment(number);
        }
    },
    methods: {
        /**
         * Hàm đóng dialog 
         * Author: Văn ANh(29/3/2023)
         */
        closeDialog(){
            this.isShowDialog = false;
        },
        /**
         * Hàm khi click out side thì ẩn các button
         * Author: Văn ANh(28/3/2023)
         */
        clickOutside(){
            this.isDelete = false;
        },
        /**
         * Show toolbar khi check nhiều chứng từ
         * @param {*} event 
         * Author: Văn Anh(28/3/2023)
         */
        showToolbar(event){
            this.isShowToolbar = event;
        },
        /**
         * Hàm gọi lại dữ liệu
         * Author: Văn Anh(28/3/2023)
         */
        reloadData(){
            console.log("filter",this.keyword, this.pageSize);
            this.listPayments(this.keyword,this.pageSize,1);
        },
    /**
     * Hàm xử lý tìm kiếm
     * Author: Văn Anh (11/1/2023)
     */
    searchPayment : _.debounce(function (number) {
        try {
        this.listPayments(this.keyword,this.pageSize, number);
        } catch (error) {
        console.log(error);
        }
    }, 500),
    /**
     * Hàm reset lại trang
     */
    async btnReload(){
        let keyword = "";
        let size = 20;
        let number = 1;
        await this.listPayments(keyword,size,number);
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
     * Hàm thực hiện thay đổi chiều cao phần detail khi resize
     * @param {*} event
     * 
     */
    handleChangeHeight(event) {
        try {
            this.heightDetail = MISAEnum.HEIGHT.HEIGHT_PAY_CONTENT - event.height;
            this.heightMaster = event.height;
        } catch (error) {
            console.log(error);
        }
    },
    /**
     * Hàm set lại giá trị cho page size
     * Author: Văn ANh (20/2/2023)
     */
    async setPageSize(size){
        try {
        this.pageSize = size;
        this.pageNumber = 1;
        await this.listPayments(this.keyword, this.pageSize, this.pageNumber);
        } catch (error) {
        console.log(error);
        }
    },
    /**
     * Hàm xử lý click chuyển trâng
     * Author: Văn Anh (24/2/2023)
     */
    async clickCallback(pageNum){
        try {
            this.pageNumber = pageNum;
            await this.listPayments(this.keyword, this.pageSize, this.pageNumber);
        } catch (error) {
            console.log(error);
        }
    },
    /**
     * Show dialog hỏi trước khi xóa
     * Author: Văn Anh (29/3/2023)
     */
    confirmDeleteMany(){
        this.warningDeleteMessage = "Bạn có muốn xóa những chứng từ này không?"
        this.isShowDialog = true;
    },
    //#region Sự kiện liên quan đến API
    async listPayments(filter, size, number){
        try {
            this.isShowLoading = true;
            const response = await HTTPPayments.get(`/filter?keyword=${filter}&pageSize=${size}&pageNumber=${number}`)
            this.payments= response.data.Data;
            this.totalPage = response.data.totalPage;
            console.log("entities", this.payments);
            this.totalRecord = response.data.totalRecord;
            if(response){
                this.isShowLoading = false
            }
        } catch (error) {
            this.isShowLoading = false;
            console.log(error);
        }
    },
    /**
     * Hàm export thành danh sách Chứng từ
     * Author: Văn ANh (28/3/2023)
     */
     async exportFile(keyword){
      try {
        this.isShowLoading = true;
        await HTTPPayments.post("/export",keyword, {
          headers: {
              "Access-Control-Allow-Origin": "*",
            "accept": "*/*",
            "Content-Type": "application/json;charset=UTF-8"
            },
            responseType : 'blob'
          } ) 
        .then(response => {
          this.isShowLoading = false;
          //Tạo 1 chuỗi ulr cho data trả về
          const url = window.URL.createObjectURL(new Blob([response.data]));
          //Khởi tạo 1 element mới
          const link = document.createElement('a');

          link.href = url;
          link.setAttribute('download', "Danh sách chứng từ.xlsx");
          document.body.appendChild(link);
          link.click();
        })
        .catch(error => {
            this.isShowLoading = false;
          console.log(error);
        });
      } 
      catch (error) {
        console.log(error);
      }
    },
    
    /**
     * Xóa nhiều chứng từ
     * Author: Văn ANh(28/3/2023)
     */
    async btnDelete(){
        try {
            this.isShowDialog = false;
            this.isShowLoading = true;
            const response = await HTTPPayments.delete("/DeleteMany", {data: this.listPaymentIdDelete},
        {
            headers: {
              "access-control-allow-origin": "https://localhost:7232 ",
              "content-type": "application/json; charset=utf-8"
            }
          });
            if(response){
                this.isShowLoading = false;
                await this.listPayments(this.keyword, this.pageSize, this.pageNumber);
            }

        } catch (error) {
            this.isShowLoading = false;
            console.log(error);
        }
    },
    //#endregion
    }
}
</script>
<style scoped>
    @import url(./pay.css);
    .input-wrapper{
    border-radius: 2px;
  }
  .btn--search-new{
    background: url(../../../assets/img/Sprites.svg) no-repeat -91px -143px;
  };
</style>