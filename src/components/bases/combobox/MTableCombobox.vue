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
                        :class="{ 'combobox-item--active': col.isWrap }"
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
    
</style>