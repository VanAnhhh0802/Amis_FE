<template>
    <div class="content">
    <!-- Toolbar -->
    <div class="content__toolbar">
      <div class="content__title">
        Hệ thống tài khoản
      </div>
    </div>
    <div class="content__list "  style="height: calc(100% - 88px)">
        <div class="flex list__header" style="justify-content: space-between;">
          <div
            style="width: 260px"
            class="flex input__wrapper list__toolbar"
          >
            <MInput
            :class="{ 'border-focus': this.inputSearchFocused }"
            class="icon btn--search"
            style="min-width: 250px; box-sizing: border-box;"
            border="none"
            v-model.trim="this.keyword"
            @inputFocus="inputSearchFocus"
            @inputOutFocus="this.inputSearchFocused = false"
            placeholder="Tìm kiếm theo số, tên tài khoản"
            ></MInput>
          </div>
          <div class=" list-toolbar-wrapper">
              <div 
              style="color: #0075C0; cursor: pointer; height: 100%;"
              @click="btnToggleAccount"
              >{{ !this.isExpandList ? "Mở rộng" : "Thu gọn" }}</div>
              <div class="tooltip">
                  <div
                  class="icon w-h-24 btn btn--small"
                  id="btn__reload"
                  @click="reloadData"
                  style="background-position: -1097px -83px;"
                  ></div>
                  <div class="tooltip-text tooltip-reload">Lấy lại dữ liệu</div>
              </div>
              <div class="flex toolbar-right-wrapper">
                  <MButton
                  class="btn btn-add-account"
                      :class="{ 'btn--primary': true }"
                      text="Thêm"
                      style=""
                      @click="btnAddOnClick"
                  ></MButton>
                  
              </div>
          </div>
    </div>
      <div class="list__table">
        <DxTreeList
            id="tasks"
            :data-source="accounts"
            :column-auto-width="true"
            :word-wrap-enabled="true"
            :expanded-row-keys="!this.isExpandList ? expandedRowKeys : newExpandedRowKeys"
            key-expr="AccountId"
            parent-id-expr="ParentId"
            no-data-text=""
            @cellDblClick="btnDbClick"
            :sorting="false"
        >
          <DxScrolling mode="standard" />
          <DxPaging :enabled="false" :page-size="10" />expandedRowKeys
          <DxPager
            :show-page-size-selector="true"
            :allowed-page-sizes="allowedPageSizes"
            :show-info="true"
          />
          <DxColumn :width="130" data-field="AccountNumber" caption="Số tài khoản" />
          <DxColumn :width="250" data-field="AccountName" caption="Tên tài khoản" />
          <DxColumn :width="100" data-field="Type" caption="Tính chất" />
          <DxColumn :width="200" data-field="EnglishName" caption="Tên tiếng anh" />
          <DxColumn :width="316" data-field="Description" caption="Diễn giải" />
          <DxColumn :width="120" data-field="IsActive" caption="Trạng thái" style="display: none"/>
          <DxColumn :width="0" data-field="IsParent" caption="" style="display: none"/>
          <DxColumn :width="150"  caption="Chức năng" cell-template="functionTemplate" />
          <template #functionTemplate="{ data: options }">
            <MFeatureDetail :data="options.data"
            @reloadData="reloadData"
            @showFormEdit="handleClickEdit($event)"
            @showDuplicate="handleClickDuplicate($event)"
            @activeResponse="reloadData()"
            ></MFeatureDetail>
          </template>
        </DxTreeList>
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
        v-model="this.pageSize"
        :total="this.paging"
        :default="this.paging[1].value"
        style="min-width:200px"
        styleData="top: -143px!important"
        @pageSize="setPageSize"
        ></MDropCombobox>
        <Paginate
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
  <AccountDetail
    v-if="isShowDetail"
    :accountId="this.accountIdSelected"
    @closeDetail="btnClose"
    @reloadData="reloadData"
    :isDuplicate="this.isDuplicate" 
    @onshowToast="onshowToast"
    @changeToastMsg="changeToastMsg"   
  ></AccountDetail>
  <MLoading
  v-if="isShowLoading"
  ></MLoading>
  <MToast
  v-if="isShowToast "
    @closeToast="closeToast"
    @onHideToast="onHideToast"
    :toastType="toastContent"
    :toastTitle="toastTitle"
    :isSuccessToast="isSuccessToast"
    :isErrorToast="isErrorToast"
  ></MToast>
</template>
<script>
import Paginate from "vuejs-paginate-next";
import MButton from '@/components/bases/Button/MButton.vue';
import MToast from '@/components/bases/Toast/MToast.vue';
import resource from '@/lib/resource';

import MFeatureDetail from '@/components/bases/Table/MFeatureDetail.vue';
import {HTTPAccounts} from "@/script/api"
import { DxTreeList, DxColumn,DxScrolling } from "devextreme-vue/tree-list";
import AccountDetail from './AccountDetail.vue';
import MLoading from '@/components/bases/Loading/MLoading.vue';
import MDropCombobox from "@/components/bases/combobox/MDropCombobox.vue"
import _ from "lodash";
import commonJs from '@/script/common';

export default {
    name: "AccountList",
    components: {
        MButton,
        MFeatureDetail,
        AccountDetail,
        MLoading,
        DxTreeList, 
        DxScrolling,
        DxColumn, 
        Paginate,
        MDropCombobox,
        MToast,

    },
    data(){
        return {
          isDuplicate: false,
          inputSearchFocused:false,
          isShowToast: false,
          isExpandList: false,
          expandedRowKeys: [],
          newExpandedRowKeys: [],
          accounts: [],
          accountIdSelected:null,
          childrenAccounts: [],
          totalPage:0,
          totalRecord: 0,
          isShowDetail: false,
          isShowLoading: false,
          pageSize: 20,
          pageNumber: 1, 
          keyword: "",
          columnTable:  resource.Vi.ColumsTableAccount,
          paging: resource.paging
        }
    },
    created(){
      this.listAccountChildrens();
      this.listAccounts(this.keyword, this.pageSize, this.pageNumber);
      
    },
    updated(){
      //Set các biển dùng cho nhân bản và sửa về mặc định
      this.accountIdSelected = "";
      this.isDuplicate = false
    },
    mounted() {
      document.addEventListener("keydown",this.onKeyDown);
    },
    unmounted() {
      // document.removeEventListener("keydown",this.onKeyDown);
    },
    
    watch: {
      onKeyDown: function(newValue){
            console.log(newValue);
        },
      /**
     * Hàm theo dõi keyword mà thay đổi gọi hàm search
     */
    keyword: function () { 
      let number =1
      this.searchAccount(number);
    }
    },

    methods: {
      /**
       * Hàm bắt sự kiện phím tắt
       * @param {*} event 
       * Author: Văn Anh(28/3/2023)
       */
    onKeyDown(event){
      var me = this;
      if (event.ctrlKey && event.key == "1") {
        event.preventDefault();
        me.isShowDetail = true;
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
     * Hàm show toast message
     */
    onshowToast(){
      this.isShowToast = true;
    },
      /**
     * author:Văn anh(3/1/2023)
     * Hàm onHideToast ẩn  Toast thông báo
     */
    onHideToast() {
      this.isShowToast = false;
    },
    /**
     * Set giá content cho toast message
     * @param {Text} text - Gàn message cho toast to
     * @param {*} error 
     * @param {*} success 
     * @param {*} title 
     * Author: Văn Anh(25/3/2023)
     */
    changeToastMsg(text, error, success, title) {
      this.toastContent = text;
      this.isErrorToast = error;
      this.isSuccessToast = success;
      this.toastTitle = title;
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
       * Hàm gọi lại dũ liệu
       */
      reloadData(event){
        console.log(event);
        this.isLoading = true;
        this.listAccountChildrens();
        this.listAccounts(this.keyword, this.pageSize, this.pageNumber);
        this.isLoading = false;
      },
      /**
       * Hàm set lại giá trị cho page size
       * Author: Văn ANh (24/3/2023)
       */
      async setPageSize(size){
        try {
          this.pageSize = size;
          this.pageNumber = 1;
          await this.listAccounts(this.keyword, this.pageSize, this.pageNumber);
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
          await this.listAccounts(this.keyword, this.pageSize, this.pageNumber);
          // this.testCheckAll();
        } catch (error) {
          console.log(error);
        }
      },
      /**
       * Hàm xử lý click btn thêm account
       */
      btnAddOnClick(){
        this.accountIdSelected = null,
        this.isShowDetail = true;
      },
      /**
       * Hàm xử lý nhân bản tài khoản
       */
      handleClickDuplicate(id){
        this.isDuplicate = true;
        this.isShowDetail = true;
        this.accountIdSelected = id;
      },

      /**
       * Hiển thi form detail
       * Author: Văn Anh (16/3/2023)
       */
      showHideDetail(){
        this.isShowDetail = true;
      },
      /**
       * Hiển thi form detail
       * Author: Văn Anh (16/3/2023)
       */
      btnClose(){
        this.isShowDetail = false;
      },
      /**
       * Hàm double click mở form detail
       * @param {String} id 
       * Author: Văn Anh (19/3/2023)
       */
      btnDbClick(e){
        this.handleClickEdit(e.data.AccountId)
      },
      /**
       * Click mở form edit
       * Author: Văn Anh (19/3/2023)
       */
      handleClickEdit(id){
        this.isDuplicate = false
        this.isShowDetail = true;
        this.accountIdSelected = id;
      },
      /**
       * Btn toggle thu gọn mở rộng list cây
       * Author: Văn Anh (22/3/2023)
       */
      btnToggleAccount(){
        try {
          this.isExpandList = !this.isExpandList;
          const newParentIdList = this.accounts.map((item) => {
            if(item.AccountId){
              return item.AccountId
            }
          });
          this.newExpandedRowKeys = [...newParentIdList];
        } catch (error) {
          console.log(error);
        }
      },
      //#region GỌi api
      async listAccounts(filter, size, number){
        
        try {

          let me = this;
          me.isShowLoading = true;
          await HTTPAccounts.get(`/filter?keyword=${filter}&pageSize=${size}&pageNumber=${number}`)
          .then(function (response) {
            me.accounts = response.data.Data;
            //Xử lý dữ liệu trả về
            me.accounts.forEach(account =>{
              account.IsActive = commonJs.formatActiveAccount(account.IsActive);
              account.Type = commonJs.formatTypeAccount(account.Type);
            });
            console.log(me.accounts);
            me.totalPage = response.data.totalPage;
            me.totalRecord = response.data.totalRecord;
          })
          .then(function(){
            //Xử lý những tài khoản không có tài khoản cha
            me.accounts.forEach((item) => (item.ParentId = "0"));

            //Lấy ra những id là tài khoản cha
            let accountIds = me.accounts.map((account) => account.AccountId);
            //Lấy ra số tài khoản con tương ứng với tài khoản cha
            let countChildren = 0;

            me.childrenAccounts.map((children) => {
              try {
                if(accountIds.includes(children.ParentId)){
                  me.accounts.push(children);
                  accountIds = me.accounts.map((account) => account.AccountId);
                  countChildren++;
                }
              } catch (error) {
                console.log(error);
              }
            })
            me.totalRecord +=  countChildren;
            me.isShowLoading = false
          })
          .catch(error => console.log(error))

        } catch (error) {
          console.log(error)
        }
      },
      /**
       * Hàm lấy ra tất cả tài khoản là con
       * Author: Văn ANh(19/3/2023) 
       */
      async listAccountChildrens(){
        try {
          const response = await HTTPAccounts.get("/AccountChildren")
          this.childrenAccounts = response.data
          this.childrenAccounts.forEach(children =>{
            children.IsActive = commonJs.formatActiveAccount(children.IsActive);
            children.Type = commonJs.formatTypeAccount(children.Type);
            });
        } catch (error) {
          console.log(error);
        }
      },
      /**
     * Hàm xử lý tìm kiếm
     * Author: Văn Anh (11/1/2023)
     */
     searchAccount : _.debounce(function (number) {
      try {
        let me = this;
        HTTPAccounts.get(`/filterAccount?keyword=${this.keyword}&pageSize=${this.pageSize}&pageNumber=${number}`)
        .then(function (response) {
            me.accounts = response.data.Data;
            //Xử lý dữ liệu trả về
            me.accounts.forEach(account =>{
              account.IsActive = commonJs.formatActiveAccount(account.IsActive);
              account.Type = commonJs.formatTypeAccount(account.Type);
            });
            console.log(me.accounts);
            me.totalPage = response.data.totalPage;
            me.totalRecord = response.data.totalRecord;
          })
          .then(function(){
            //Xử lý những tài khoản không có tài khoản cha
            me.accounts.forEach((item) => (item.ParentId = "0"));

            //Lấy ra những id là tài khoản cha
            let accountIds = me.accounts.map((account) => account.AccountId);
            //Lấy ra số tài khoản con tương ứng với tài khoản cha
            let countChildren = 0;

            me.childrenAccounts.map((children) => {
              try {
                if(accountIds.includes(children.ParentId)){
                  me.accounts.push(children);
                  accountIds = me.accounts.map((account) => account.AccountId);
                  countChildren++;
                }
              } catch (error) {
                console.log(error);
              }
            })
            me.totalRecord +=  countChildren;
            me.isShowLoading = false
          })
          .catch(error => console.log(error))

        // this.listAccounts(this.keyword,this.pageSize, number);
      } catch (error) {
        console.log(error);
      }
    }, 500),
      //#endregion


    }
}
</script>
<style scoped>
    @import url(./account.css);
  .btn--search {
  padding-right: 36px; 
  background-position: -765px -355px;
  }

  .dx-treelist .dx-column-lines > td:nth-child(7),
  .dx-treelist .dx-row > td:nth-child(7){
    display: none;
    padding: 0;
  }
  
</style>