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
                <MRowDetail 
                v-for="(entity, index) in entities"
                :key="index"
                :entity="entity"
                :hasColumnDelete="hasColumnDelete"
                />
            </tbody>
            <tfoot style="position: sticky;bottom: 0;z-index: 99;">
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
import MRowDetail from './MRowDetail.vue';
import CommonJs from '@/script/common';
export default {
    name: "MTableDetail",
    components: {
        MRowDetail,
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
<style lang="">
    
</style>