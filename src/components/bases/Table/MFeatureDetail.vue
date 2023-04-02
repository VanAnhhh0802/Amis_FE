<template lang="">
    <td class="tbl-col tbl-col__last" style="border-bottom: unset">
        <div class="flex table__function" >
            <button
            class="btn-function-fix"
            @click="btnClickEdit(data.AccountId)"
            >
            Sửa
            </button>
            <button
            class="btn-function__dropdown"
            @click="showOnDropMenu($event, data.AccountId, data.AccountNumber, data.IsActive)"
            v-click-outside-element="hideDropMenu" 
            >
            <div class="icon w-h-24 function-dropdown-icon"></div>
            </button>
        </div>
        
    </td>
    <teleport to="body" >
    <div
      id="btn-dropdown-menu"
      class="dropdown-menu"
      v-if="isShowOnDropMenu"
      :style="[isDropdown ? dropdownPosition : dropdownPositionReverse]"

    >
      <ul class="dropdown-list">
        <li class="dropdown_list-item"
        @click="btnReplicationOnDetail(data.AccountId)"
        >Nhân bản</li>
        <li id="btn-delete" class="dropdown_list-item" @click="showOnDialogDelete(data.IsParent)">
          Xóa
        </li>
        <li class="dropdown_list-item"
        @click="handleAccountActive(data.AccountId, data.IsParent, isShowActive)"
        >
        {{isShowActive ? "Ngừng sử dụng" : "Sử dụng"}}
        </li>
      </ul>
    </div>
    </teleport>
  <div  v-if="isShowDialog">
      <MDialog v-if="!isShowDialogErr" @btnCloseDialog="closeDialog">
        <template v-slot:title>Cảnh báo</template>
        <template v-slot:message>
          <li class="flex dialog-mgs">
            <div
              class="icon w-h-24 btn-dialog--close dialog__warning-icon"
            ></div>
            {{ this.warningDeleteMessage  }}
          </li>
        </template>
        <template v-slot:footer>
          <MButton
            class="btn btn--primary dialog__btn--acept"
            @click="btnOnDelete(this.deleteId)"
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
      <MDialogError
      v-if="isShowDialogErr"
      :title="this.titleError"
      :message="this.messageError"
      @btnCloseDialog="closeDialog"
      ></MDialogError>
  </div>
  <MLoading
  v-if="isShowLoading"
  ></MLoading>
</template>
<script>
import resource from '@/lib/resource';
import MDialog from '../Dialog/MDialog.vue';
import MDialogError from '../Dialog/MDialogError.vue';
import MLoading from "../../bases/Loading/MLoading.vue";
import { HTTPAccounts } from '@/script/api';
export default {
    name: "MFeatureDetail",
    components:{
      MDialog,
      MDialogError,
      MLoading
    },
    props:{
      data: Object,
    },
    emits:["showFormEdit","reloadData","showDuplicate"],
    data(){
      return{
          isShowActive:false,
          
            //Khai báo biến liên quan đến loading
            isShowLoading: false,
            //Khai biến liên quan đến drop menu
            toDropList: 0,
            isShowOnDropMenu: false,
            dropdownPositionX: 0,
            dropdownPositionY: 0,
            isDropdown: false,
            //Dialog
            isShowDialogErr: false,
            isShowDialog:false,
            warningDeleteMessage: null,
            deleteId: null,
            //Biến gán từ resource
            titleError: resource.Vi.ACCOUNT.DIALOG.TITLE_ERROR,
            messageError: resource.Vi.ACCOUNT.DIALOG.MESSAGE_ERROR,
            
      }
    },
    created(){

    },
    methods: {
      /**
       * Xét trạng thái của active cho tài khoản
       * @param {String} id - id của tài khoản
       * @param {String} parentId  - nếu là con thì có id tài khoản của tài khoản cha
       * @param {Boolean} active - trạng thái active tài khoản cha
       * @param {Boolean} childrenActive - trạng thái tài khoản của tài khoản con
       * Author: Văn Anh(26/3/2023)
       */
      async handleAccountActive(accountId, isParent, isActive, childrenActive){
        try {
          if(isActive){
            isActive = 0;
          }
          else {
            isActive = 1;
          }
          //Kiểm tra nếu là tài khoản cha
          if (isParent) {
            //Nếu không là con
            if (!childrenActive) {
              let accountIds = [accountId];
                //Lấy ra tất cả các tài khoản con
                const response = await HTTPAccounts.get("/AccountChildren");
                //Tạo biến accountIds là mảng các id tài khoản con  
                let childrens = [];
                childrens = response.data

                childrens.forEach((account) => {
                  console.log(this.accountIds);
                  if (accountIds.includes( account.ParentId) ) {
                    accountIds.push(account.AccountId) ;
                  }
                });
                //Gọi api sửa
                 await HTTPAccounts.put(`UpdateActive?${isActive}`,[accountId, ...accountIds])
                .then(res => {
                  console.log(res);
                  this.$emits("activeResponse");
                })
            } else {
              await HTTPAccounts.put(`UpdateActive?${isActive}`,[accountId])
              .then(res => {
                console.log(res);
                this.$emits("activeResponse");

              })
            }
          } else {
            await HTTPAccounts.put(`UpdateActive?${isActive}`,[accountId])
            .then(res => {
              console.log(res);
              this.$emits("activeResponse");

            })
          }
        } catch (error) {
          console.log(error);
        }
      },
      
      /**
       * Kiểm tra trạng thái của các trường
       * Author: Văn Anh (29/3/2023)
       * @param {*} active 
       */
      checkActive(active){
        if(active === "Đang sử dụng"){
          this.isShowActive = true;
        }
        else if(active === "Ngừng sử dụng"){
          this.isShowActive = false;
        }
      },
      /**
       * Hàm xử lý click nhân bản
       * @param {Guid} id 
       * Author: Văn Anh(25/3/2023)
       */
      btnReplicationOnDetail(id){
        this.$emit("showDuplicate", id);
        
      },
      /**
       * hàm xử lú click btn sửa
       * @param {Guid} id 
       * Author: Văn Anh(25/3/2023)
       */
      btnClickEdit(id){
        this.$emit("showFormEdit", id);
      },
        /**
         * Hiển thị drop menu
         * Athor: Văn Anh(21/12/2022)
         */
        showOnDropMenu(e, id, code, active) {
        try {
            //Check trạng thái của active
            this.checkActive(active);
            
            //Xét vị trí cho dropdown
            if (e.clientY > 560){
            this.isDropdown = false;
            }
            else {
            this.isDropdown = true;
            }
            this.dropdownPositionX = e.clientX;
            this.dropdownPositionY = e.clientY;
            //Hiển thị drop menu
            this.isShowOnDropMenu = !this.isShowOnDropMenu;
            this.warningDeleteMessage = `Bạn có thực sự muốn xóa Tài khoản <${code}> không?`;
            this.deleteId = id;
            
        } catch (error) {
          console.log(error);
        }
        },
        /**
         * Hàm click outside ẩn dropmenu
         */
        hideDropMenu(){
          this.isShowOnDropMenu = false;
        },
        /**
         * Hiểm dialog cảnh báo xóa
         * Author: Văn Anh (19/3/2023)
         */
        showOnDialogDelete(isParent){
          if(isParent){
            console.log(isParent);
            this.isShowDialogErr = true;
          }
          this.isShowDialog = true;
        },
        /**
         * Hàm ẩn dialog 
         * Author: Văn Anh (19/3/2023)
         */
        closeDialog(){
          this.isShowDialog = false;
          this.isShowDialogErr = false;
        },
        //#region Các sự kiện liên quan đến xóa
        /**
         * Hàm call api xóa
         * @param {String} id  Id trường cần xóa
         * Author: Văn anh (19/3/2023)
         */
        async btnOnDelete(id){
          try {
            this.isShowLoading = true;
            const response =await HTTPAccounts.delete(`${id}`);
            console.log(response);
            this.isShowDialog = false;
            this.isShowLoading = false;
            this.$emit("reloadData");
          } catch (error) {
            console.log(error);
          }
        }
        //#endregion
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
  

}
</script>
<style scoped>
    .tbl-col {
        height: 100%;
    }
    .tbl-col__last{
      border-right: none !important;
    }
     td:last-child {
    border-right: none;
}
</style>