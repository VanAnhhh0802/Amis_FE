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
            @click="showOnDropMenu($event, data.AccountId, data.AccountNumber, data.IsActive, data.ParentId, data.AccountId, data.IsParent)"
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
        @click="isShowActive ?  handleAccountActive(data.AccountId, data.IsParent, isShowActive) : data.IsParent ? confirmActive() : handleAccountActive(data.AccountId, data.IsParent, isShowActive, data.ParentId)"
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
      v-if="isShowDialogErr = true"
      :title="this.titleError"
      :message="this.messageError"
      @btnCloseDialog="closeDialog"
      ></MDialogError>
    </div>
    <MDialogWarning 
    v-if="isShowDialogWarning"
    :message="this.dialogMessage"
    @closeDialog="closeDialogWarning()"
    @btnClickYes="btnDialogWarningClickYes"
  />
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
import MDialogWarning from '../Dialog/MDialogWarning.vue';
export default {
    name: "MFeatureDetail",
    components:{
      MDialog,
      MDialogError,
      MDialogWarning,
      MLoading
    },
    props:{
      data: Object,
    },
    emits:["showFormEdit","reloadData","showDuplicate"],
    data(){
      return{
          accountId:  null,
          isParent: false,
          parentIdChildren: null,
          dialogMessage:null,
          isShowActive:false,
          isShowDialogWarning: false,
          isTrue: false,
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
      btnDialogWarningClickYes(){
        this.isShowDialogWarning = false;
        this.handleAccountActive(this.accountId, this.isParent, this.isShowActive);
      },
      closeDialogWarning(){
        this.isShowDialogWarning= false
      },
      confirmActive(){
        this.dialogMessage = resource.Vi.ACCOUNT.DIALOG.TITLE_ACCOUNT_PARENT_ACTIVE;
        this.isShowDialogWarning = true;
      },
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
                  if (accountIds.includes( account.ParentId) ) {
                    accountIds.push(account.AccountId) ;
                  }
                });
                //Gọi api sửa
                 await HTTPAccounts.put(`UpdateActive?isActive=${!isActive}`,[accountId, ...accountIds])
                .then(res => {
                  console.log(res);
                  // this.$emits("activeResponse");
              // this.$parent.reloadData();
                })
            } 
            else {
              await HTTPAccounts.put(`UpdateActive?isActive=${!isActive}`,[accountId])
              .then(res => {
                console.log(res);
                this.isTrue = true;
                // this.$emits("activeResponse")
              // this.$parent.reloadData();
              })
            }
            
          } 
          else {
            if(this.parentIdChildren && this.parentIdChildren != 0){
              //Check trạng thái tài khoản cha
              const response = await HTTPAccounts.get(`/${this.parentIdChildren}`);
              if(response){
                var parentActive = response.data.IsActive;
                //Nếu tài tài khoản cha Đang là Ngừng sử dụng thì show lỗi
                if (!parentActive){
                  this.isShowDialog = true;
                  this.dialogMessage = resource.Vi.ACCOUNT.DIALOG.TITLE_ACCOUNT_CHILDREN_ACTIVE;
                  this.isShowDialogWarning = true;
                }
                else{
                  await HTTPAccounts.put(`UpdateActive?isActive=${!isActive}`,[accountId])
                  .then(res => {
                    console.log(res);
                      // this.$emits("activeResponse");
                    this.isTrue = true;

                  })
                }
              }
            }
            else{
              //Ngươc lại thực hiện sửa
              await HTTPAccounts.put(`UpdateActive?isActive=${!isActive}`,[accountId])
              .then(res => {
                console.log(res);
                  // this.$emits("activeResponse");
                this.isTrue = true;
                
              })
            }
          }
          
          if(this.isTrue){
          console.log("this", this.$emit);
            this.$emit("activeResponse");
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
        showOnDropMenu(e, id, code, active, parentId, accountId, isParent) {
        try {
            //Check trạng thái của active
            this.checkActive(active);
            this.parentIdChildren = parentId;
            this.accountId  = accountId;
            this.isParent = isParent;
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