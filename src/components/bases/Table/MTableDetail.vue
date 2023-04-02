<template lang="">
    <div class="list__table" style="height: 100% ;box-sizing: border-box;">
        <table>
            <thead>
                <tr>
                    <th
                    v-for="(column, index) in columnsTh"
                    :key="index"
                    >
                    {{column.columnName}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    class="employee-infor"
                    v-for="(entity, index) in entities"
                    :key="index"
                    :entity="entity"
                >
                    <td class="width-table-checkbox" style="text-align: center" >{{ index || "" }}</td>
                    <td class=" text-align-left"> {{ entity.Description || "" }}</td>
                    <td class="text-align-left">
                        <MCombobox
                        :columns = "this.comboboxAccount"
                        api="https://localhost:7232/api/v1/Accounts/All"
                        isTable="true"
                        tabIndex="11"

                        propValue="AccountId"
                        propName="AccountNumber"
                        ></MCombobox> 
                    </td>
                    <td class="text-align-left">
                        <MCombobox
                        :columns = "this.comboboxAccount"
                        api="https://localhost:7232/api/v1/Accounts/All"
                        isTable="true"
                        tabIndex="12"

                        propValue="AccountId"
                        propName="AccountNumber"
                        ></MCombobox>    
                    </td>
                    <td class="text-align-right ">
                        <MInputMoney
                        tabIndex="13"
                        
                        v-model="entity.Amount"
                        ></MInputMoney>
                    </td>
                    <td class="text-align-left ">
                        <MCombobox
                            v-model="entity.ObjectCode"
                            style="width: 363px"
                            tabIndex="14"
                            isTable="true"
                            propName="ObjectCode"
                            propValue="ObjectId"
                            api="https://localhost:7232/api/v1/Objects/GetAll"
                            :columns = "this.comboboxObject"
                            ref="PaymentObject"
                            nameRef="PaymentObject"
                        ></MCombobox>
                    </td>
                    <td class="text-align-left " style=" min-width: 300px" >{{ entity.ObjectName || ""}}</td>
                    <td
                        v-if="hasColumnDelete"  
                        class="tbl-col tbl-col-delete tbl-col__last sticky"
                        style="width: 34px; min-width: 34px"
                    >
                        <div class="delete-icon"></div>
                    </td>
                </tr>
            </tbody>
            <tfoot style="position: sticky;bottom: 0;z-index: 1;">
            <tr style="border-top: 1px solid #f5f5f5; border-bottom: 1px solid #f5f5f5;">
                <th class="text-align-center no-border" ></th>            
                <th class="text-align-center w-200 no-border" style="text-transform: inherit">Tổng</th>
                <th class="text-align-left w-150 no-border" ></th>
                <th class="text-align-left no-border" style="min-width: 200px;"></th>
                <th class="text-align-right w-150 no-border">{{this.formatMoney(123123)}}</th>
                <th class="text-align-left w-150 no-border"></th>
                <th class="text-align-left no-border" style="min-width: 200px; background-color:#f5f5f5"></th>
                <th v-if="hasColumnDelete" class="text-align-left no-border" style="min-width: 34px; background-color:#f5f5f5"></th>
            </tr>
        </tfoot>
        </table>
    </div>
</template>
<script>
import MISAEnum from '@/lib/enum';
import resource from '@/lib/resource';
import CommonJs from '@/script/common';
import MCombobox from '../combobox/MCombobox.vue';
import MInputMoney from '../input/MInputMoney.vue';
export default {
    name: "MTableDetail",
    components: {
        MCombobox,
        MInputMoney
    },
    props: {
        entities: { 
            type: Array, 
        },
        columnsTh:{
            type: Array
        },
        hasColumnDelete:Boolean,
    },
    watch: {
        entities: function(){
            console.log("entities: " + this.entities);
        }
    }  ,
    data(){
        return {
            heightDetail: MISAEnum.HEIGHT.HEIGHT_PAY_MASTER,
            //resource
            comboboxObject: resource. COLUMNS_NAME_COMBOBOX_OBJECT,
            comboboxAccount:resource.COLUMNS_NAME_COMBOBOX_ACCOUNT,
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
    methods: {
        /**
     * Hàm định dạng tiền tệ
     * @param {String} money
     * Author: Văn Anh (15/3/2023) 
     */
    formatMoney(money){
        return CommonJs.formatMoney(money);
    },
    }
}
</script>
<style scoped>
    @import url(./table.css);
</style>