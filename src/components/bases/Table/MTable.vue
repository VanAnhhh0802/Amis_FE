<template lang="">
    <div class="list__table">
    <table>
    <thead>
        <tr>
            <th class="width-table-checkbox list-checkbox text-align-left " >
            <MCheckbox 
            id ="check-all"
            :checked ="this.checkAll"
            @checkbox-selected="selectEmployeeCheck"
            ></MCheckbox>
            </th>
            <th class="text-align-center w-200" >{{ this.textAccountingDate }}</th>
            <th class="text-align-center w-200" >{{ this.textVouchersDate}}</th>
            <th class="text-align-left w-150" >{{ this.textNumberOfVouchers }}</th>
            <th class="text-align-left " style="min-width: 200px;">{{ this.textExplain }}</th>
            <th class="text-align-right w-150">{{ this.textMoney }}</th>
            <th class="text-align-left w-150">{{ this.textSubjectId }}</th>
            <th class="text-align-left w-150">{{ this.textSubjectName }}</th>
            <th class="text-align-left " style="min-width: 200px;">{{ this.textBranch}}</th>
            <th
            class="text-align-center w-100 tb-function"
            style="background-color: #f5f5f5; min-width: 130px;"
            >
            {{ this.textFunction }}
            </th>
        </tr>
        </thead>
        <tbody>
            <MRow
                v-for="(item , index) in entities"
                :key = "index"
                :item="item"
            ></MRow>
        </tbody>
        <tfoot style="position: sticky;bottom: 0;z-index: 99;">
            <tr style="border-top: 1px solid #f5f5f5; border-bottom: 1px solid #f5f5f5;">
            <th class="text-align-center no-border" ></th>
            <th class="text-align-center w-200 no-border" style="text-transform: inherit">Tổng</th>
            <th class="text-align-left w-150 no-border" ></th>
            <th class="text-align-left no-border" style="min-width: 200px;"></th>
            <th class="text-align-left w-150 no-border"></th>
            <th class="text-align-right w-150 no-border">{{this.formatMoney(12132)}}</th>
            <th class="text-align-left w-150 no-border"></th>
            <th class="text-align-left no-border" style="min-width: 200px; background-color:#f5f5f5"></th>
            <th class="text-align-left no-border" style="min-width: 200px; background-color:#f5f5f5"></th>
            <th class="text-align-left no-border tb-function" style="min-width: 200px; background-color:#f5f5f5"></th>
            </tr>
        </tfoot>
    </table>
    </div>
</template>
<script>
import resource from "@/lib/resource"
import MRow from "./MRow.vue"
import commonJs from '@/script/common'
export default {
    name: 'MTable',
    components: {
        MRow,
    },
    watch: {
        entities: function() {
            console.log(this.entities);        
        },
        item : function() {
            console.log("item table",this.item);    
        }
    },  
    props:{
        isCheckbox: Boolean,
        entities: { 
            type: Array, 
        },
    },
    data(){
        return {
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
    methods: {
        /**
     * Hàm định dạng tiền tệ
     * @param {String} money
     * Author: Văn Anh (15/3/2023) 
     */
    formatMoney(money){
        return commonJs.formatMoney(money);
    },
    }
}
</script>
<style scoped>
    .list__header{
        background: #f5f5f5;
        height: 26px;
    }
    @import url(./table.css);
</style>