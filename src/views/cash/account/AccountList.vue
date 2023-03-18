<template>
    <div class="content">
    <!-- Toolbar -->
    <div class="content__toolbar">
      <div class="content__title">
        Hệ thống tài khoản
      </div>
    </div>
    <div class="content__list" >
        <div class="flex list__header" style="justify-content: space-between;">
          <div
            style="width: 260px"
            class="flex input__wrapper list__toolbar"
          >
            <MInput
            class="icon btn--search"
            style="min-width: 250px; box-sizing: border-box;"
            border="none"
            :borderSearch="true"
            v-model.trim="this.textSearch"
            @inputFocus="inputSearchFocus"
            placeholder="Tìm kiếm theo số, tên tài khoản"
            ></MInput>
          </div>
          <div class=" list-toolbar-wrapper">
              <div style="color: #0075C0; cursor: pointer; height: 100%;">Mở rộng</div>
              <div class="tooltip">
                  <div
                  class="icon w-h-24 btn btn--small"
                  id="btn__reload"
                  @click="btnReload"
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
                      @click="showHideDetail"
                  ></MButton>
                  <!-- <div class="icon w-h-24 btn-dropdown-toolbar"
                  style="background-position: -840px -353px;"
                  ></div> -->
              </div>
          </div>
    </div>
      <div class="list__table">
        <DxTreeList
            id="tasks"
            :data-source="accounts"
            :column-auto-width="true"
            :word-wrap-enabled="true"
            :sorting="false"
            :expanded-row-keys="!isExpandAll ? expandedRowKeys : newExpandedRowKeys"
            key-expr="AccountId"
            parent-id-expr="ParentId"
            no-data-text="Không có dữ liệu"
        >
            <DxScrolling mode="standard" />
            <DxPaging :enabled="false" :page-size="10" />
            <DxPager
                :show-page-size-selector="true"
                :allowed-page-sizes="allowedPageSizes"
                :show-info="true"
            />
            <DxColumn :width="130" :height="36" style="display: flex; align-items: center;" data-field="AccountNumber" caption="Số tài khoản" />
            <DxColumn :width="250" :height="36" data-field="AccountName" caption="Tên tài khoản" />
            <DxColumn :width="150" :height="36" data-field="Type" caption="Tính chất" />
            <DxColumn :width="200" data-field="EnglishName" caption="Tên tiếng anh" />
            <DxColumn :width="316" data-field="Description" caption="Diễn giải" />
            <DxColumn :width="120" data-field="ÍsActive" caption="Trạng thái" />
            <DxColumn :width="0" data-field="IsParent" caption="cha" style="display: none" />
            <DxColumn :width="120" caption="Chức năng" cell-template="functionTemplate" />
            <template #functionTemplate="{ data: options }">
              <MFeatureDetail :data="options.data"></MFeatureDetail>
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
  @closeDetail="btnClose"
  ></AccountDetail>
  <MLoading
  v-if="isShowLoading"
  ></MLoading>

</template>
<script>
import MButton from '@/components/bases/Button/MButton.vue';
import resource from '@/lib/resource';
import MFeatureDetail from '@/components/bases/Table/MFeatureDetail.vue';
import {HTTPAccounts} from "@/script/api"
import { DxTreeList, DxColumn, DxPaging, DxPager, DxScrolling } from "devextreme-vue/tree-list";
import AccountDetail from './AccountDetail.vue';
import MLoading from '@/components/bases/Loading/MLoading.vue';

export default {
    name: "AccountList",
    components: {
        MButton,
        MFeatureDetail,
        AccountDetail,
        MLoading,
        DxTreeList, 
        DxColumn, 
        DxPaging, 
        DxPager, 
        DxScrolling
    },
    data(){
        return {
          accounts: [],
          childrenAccounts: [],
          totalPage:0,
          totalRecord: 0,
          isShowDetail: false,
          isShowLoading: false,
          pageSize: 20,
          pageNumber: 1,
          keyword: "",
          allowedPageSizes : [10, 20, 30, 50, 100],
          isExpandAll: false,
          expandedRowKeys:[],
          newExpandedRowKeys:[],
          columnTable:  resource.Vi.ColumsTableAccount,
        }
    },
    created(){
      this.listAccounts(this.keyword, this.pageSize, this.pageNumber);
      console.log(this.accounts);
    },
    methods: {
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
      //#region GỌi api
      async listAccounts(filter, size, number){
        try {
          let me = this;
          // me.isShowLoading = true;
          await HTTPAccounts.get(`/filter?keyword=${filter}&pageSize=${size}&pageNumber=${number}`)
          .then(function (response) {
            console.log(response);
            me.accounts = response.data.Data;
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
                if(accountIds.includes(children.AccountId)){
                  this.accounts.push(children);
                  accountIds = me.accounts.map((account) => account.AccountId);
                  countChildren++;
                }
              } catch (error) {
                console.log(error);
              }
            })
            console.log(me.accounts)
            me.totalRecord +=  countChildren;
            me.isShowLoading = false
          })
          .catch(error => console.log(error))

        } catch (error) {
          console.log(error)
        }
      },

      async listAccountChildrens(){
        try {
          const response = await HTTPAccounts.get("/AccountChildren")
          this.childrenAccounts = response.data.Data
        } catch (error) {
          console.log(error);
        }
      }

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
  
</style>