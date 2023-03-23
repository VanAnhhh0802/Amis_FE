<template >
    <div class="payment">
        <div class="payment-header"> 
            <div class="payment-header__left">
                <div class="m-icon">
                    <div class="payment-header__icon"></div>
                </div>
                <div class="payment-title">Phiếu chi PC001</div>
                <div class="checkbox-wrapper">
                    <MDropCombobox
                    :total="listPayDetail"
                    :default="this.listPayDetail[6].value"
                    styleData="top: 30px!important"
                    name="true"
                    ></MDropCombobox>
                </div>
            </div>
            <div class="payment-header__right">
                <div class="m-icon">
                    <div class="instruct-icon"></div>
                </div>
                <router-link to="/" class="instruct-link">Hướng dẫn</router-link>
                <div class="m-icon m-icon__second">
                    <div class="setting-icon"></div>
                </div>
                <div class="m-icon m-icon__second">
                    <div class="help-icon"></div>
                </div>
                <div class="m-icon m-icon__second">
                    <router-link to="/cash/procedure" class="close-icon"></router-link>
                </div>
            </div>
        </div>
         <div class="payment-content">
            <div style="display: flex; background-color: #eceef1;margin: 0 -24px; padding: 6px 24px 12px; justify-content: flex-start;">
                <div class="container-left">
                    <div class="row col-gap-12">
                        <div style="width: 363px;">
                            <label for="">Mã đối tượng  </label>
                            <MCombobox
                            style="width: 363px"
                            ></MCombobox>
                        </div>
                        <MInput label="Tên đối tượng" style="width: 500px" bottom="8px" />
                    </div>
                    <div class="row col-gap-12">
                        <MInput label="Người nhận" style="width: 363px;"/>
                        <MInput label="Địa chỉ" style="width: 500px"  />
                    </div>
                    <div class="row">
                        <MInput label="Lý do chi"  style="width: 100%" bottom="8px"  />
                    </div>
                    <div class="row col-gap-12">
                        <MInput label="Nhân viên" style="width: 363px;" bottom="8px" />
                            <MInput label="Kèm theo" style="width: 150px;" bottom="8px" />
                        <div class="row-text" style="margin-top: 17px;">chứng từ gốc</div>
                    </div>
                    <div class="flex m-t-8">Tham chiếu
                        <div style="cursor: pointer; margin-left: 16px;">...</div>
                    </div>
                </div>
                <div class="container-center">
                    <div>
                        <label for="">Ngày hạch toán</label>
                        <MDatePicker  style="width: 166px;" 
                            dateName="AccountingDate"
                        />
                    </div>
                    <div style="margin: 16px 0; width: 166px">
                        <label for="">Ngày phiếu chi</label>
                        <MDatePicker 
                            style="width: 166px;" 
                            dateName="VoucherDay"
                        />
                    </div>
                    <MInput label="Số phiếu chi" width="166px" value="PC001" />
                </div>
                <div class="container-right">
                    Tổng tiền
                    <div class="payment-total">0</div>
                </div>
            </div>
            <div class="payment-detail">
                <label class="payment-detail-title">Hạch toán</label>
                <MTableDetail
                    :entities="[1, 2]"
                    :columnsTh="this.listThDetail"
                    hasColumnDelete="true"
                />
                <div class="payment-action">
                    <MButton text="Thêm dòng" class="btn btn--secondary" style="font-weight: 600; height: 24px; margin-right: 8px;border-color:#8d9096 ; "></MButton>
                    <MButton text="Xóa hết dòng" class="btn btn--secondary" style="font-weight: 600; height: 24px;border-color:#8d9096 ;"></MButton>
                </div>
            </div>
        </div>
        <div class="import-footer">
            <router-link to="/cash/procedure"
              class="btn btn--secondary"
              text="Hủy"
              style="height: 28px;background-color: #38393d; color: #fff; text-decoration: none;box-sizing: border-box; "
            >
            </router-link>
            <div class="flex col-gap-12 form__footer-right">
                <div class="tooltip">
                <MButton
                    id="btn--save"
                    class="btn btn--secondary"
                    text="Cất"
              style="height: 28px; background-color: #38393d; color: #fff"

                >
                </MButton>
                <div class="tooltip-text">Ctrl + S</div>
                </div>
                <div class="tooltip">
                <MButton
                    class="btn btn--primary btn-save-add btnClass"
                    text="Cất và Thêm"
                 style="height: 28px; "

                >
                </MButton>
                <div class="tooltip-text tooltip-save">
                    Ctrl + Shift + S
                </div>
                </div>
          </div>
        </div> 
    </div>
</template>
<script>
import resource from "@/lib/resource";
import MInput from "@/components/bases/input/MInput.vue";
import MTableDetail from "@/components/bases/Table/MTableDetail.vue";
import MDropCombobox from "@/components/bases/combobox/MDropCombobox.vue";
import MCombobox from "@/components/bases/combobox/MCombobox.vue";
import MDatePicker from "@/components/bases/DatePicker/MDatePicker.vue";
import MButton from "@/components/bases/Button/MButton.vue";

export default {
    name : "PayDetail",
    components: {
    MInput,
    MDropCombobox,
    MCombobox,
    MTableDetail,
    MDatePicker,
    MButton,
},
    data(){
      return {
        //#region 
        //Text resources
        listPayDetail: resource.Vi.Combobox,
        textTitle: resource.Vi.Detail.TitleDetail,
        listThDetail: resource.Vi.ColumnsTablePayDetail,
        //#endregion
      }
    }
}
</script>
<style scoped>
@import url(./pay.css);
.payment-btn-save {
    margin: 0 8px;
    color: #fff;
    background-color: transparent;
    border: 1px solid #8d9096;
}

.payment-btn-save:hover {
    background-color: #2f3034;
}

.payment-btn-save::after {
    content: "Cất (Ctrl + S)";
    position: absolute;
    background-color: #434242;
    color: #fff;
    top: -30px;
    width: max-content;
    padding: 4px 8px;
    border-radius: 4px;
    display: none;
    line-height: 18px;
    animation: identifier 0.3s ease-in;
}

.payment-btn-save:hover::after {
    display: block;
}

.pay-cancel-btn {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    color: #fff !important;
    align-items: center;
}
.import-footer{
    box-sizing: border-box;
    height: 42px;
    background-color: #38393d;
    padding: 8px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

</style>