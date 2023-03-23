<template>
    <div class="wrapper-table">     
        <table class="table table-cbo">
            <tbody class="tbd" ref="refList">
                <tr class="table-row">
                    <th
                        v-for="(col, index) in columns"
                        :key="index"
                        :style="{ width: col.width, textAlign: col.align }"
                        style="text-transform: inherit;"
                    >
                        {{ col.columnName }}
                    </th>
                </tr>
                <tr
                    ref="refItem"
                    class="table-cbo-row"
                    v-for="(option, index) in options"
                    :key="index"
                    @click="this.$emit('select', { option: option, index: index });"
                >
                    <td
                        :class="{ 'table-cbo-text': col.isWrap }"
                        v-for="(col, index) in columns"
                        :key="index"
                    >
                        {{ option[col.identityOption] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    name: "MTableCombobox",
    props: {
        options: { 
            type: Array,
        },
        columns: { 
            type: Array, 
        },
    },
    data(){
        return{
            
        }
    },
    emits: ["select",],
    methods:{
        /**
         * Hàm chọn item trong table
         * Author: văn Anh (23/3/2023)
         */
        // btnItemSelect(){
        //     try {
        //         // this.$emit('select', { option: option, index: index });
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }
    }
}
</script>
<style scoped>
    .row--active {
    background-color: var(--main-color);

}
tr{
    height: 28px !important;
    border-bottom: none;
    cursor: pointer;
    
}
tr:hover>td{
    background-color: var(--main-color);
    color: #fff;
    font-weight: 600;
    cursor: pointer!important;
}
td, th{
    border: none !important;
}
.wrapper-table {
    border: 1px solid #babec5;
    border-radius: 2px;
    position: absolute;
    z-index: 9;
    top: 30px;
}

.table-cbo {
    background-color: #fff;
    border: 1px solid #babec5;
    border-radius: 2px;
    overflow: auto;
    box-shadow: 0 -8px 34px 0 rgb(0 0 0 / 5%);
    width: max-content !important;
    overflow: hidden;
    font-weight: 400;
}

.tbd {
    display: block;
    overflow: auto;
    max-height: 200px !important;
    width: max-content !important;
    position: relative;
}

.table-cbo th,
.table-cbo td {
    padding: 0 10px;
    height: 28px;
}
.table-cbo th:last-child {
    background: #f5f5f5;
    border: none!important;
}
.table-cbo td:last-child{
    border: none !important;
}
.table-cbo-text {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    overflow: hidden;
    line-height: 28px;
}.wrapper-cbo-table {
    border: 1px solid #babec5;
    border-radius: 2px;
}

.table-cbo {
    background-color: #fff;
    border: 1px solid #babec5;
    border-radius: 2px;
    overflow: auto;
    box-shadow: 0 -8px 34px 0 rgb(0 0 0 / 5%);
    width: max-content !important;
    overflow: hidden;
    font-weight: 400;
}

.tbd {
    display: block;
    overflow: auto;
    max-height: 200px !important;
    width: max-content !important;
    position: relative;
}

.table-cbo th,
.table-cbo td {
    padding: 0 10px;
    height: 28px;
}

.table-cbo-text {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    overflow: hidden;
    line-height: 28px;
}
</style>