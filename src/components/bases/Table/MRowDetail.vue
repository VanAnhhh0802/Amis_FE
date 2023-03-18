<template>
    <tr
        class="employee-infor"
        
    >
        <td class="width-table-checkbox" style="text-align: center" >{{ entity.PayId || "" }}</td>
        <td class=" text-align-left"> {{ entity.Explain || "" }}</td>
        <td class="text-align-left">{{ entity.AccountingData || "" }}</td>
        <td class="text-align-left">{{ entity.NumberOfVouchers || "" }}</td>
        <td class="text-align-right ">{{ this.formatMoney(entity.Money) || "" }}</td>
        <td class="text-align-left ">{{ entity.SubjectId || ""}}</td>
        <td class="text-align-left " style=" min-width: 300px" >{{ entity.SubjectName || ""}}</td>
        <td
            v-if="hasColumnDelete"  
            class="tbl-col tbl-col-delete tbl-col__last sticky"
            style="width: 34px; min-width: 34px"
        >
            <div class="delete-icon"></div>
        </td>
    </tr>
</template>
<script>
import CommonJs from "@/script/common"

export default {
    name: "MRowDetail",
    props: {
        entity: Object,
        hasColumnDelete: Boolean,
    },
    watch:{
        entity: function(newValue){
            console.log("entity", newValue);
        }
    },
    methods:{
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
<style >
    @import url(./table.css);
</style>