<template>
    <div class="dropdown">
        <input 
        v-model="textSelectTed" 
        disabled
        :id="id" 
        class="dropdown__input" 
        type="text">
        <div class="dropdown__button iconBtndropdown" @click="onShowHideData"></div>
        <div v-show="isShowData" class="dropdown__data">
            <div class="dropdown-item"
            v-for="(item,index) in NumberRecord" 
            :key="index"
            :class="{'item-select': index == indexItemSelect}"
            @click="itemOnSelect(item,index)"
            >   
            {{item.value}}
            </div>
        </div>
   </div>
</template>
<script>
export default {
    name:"MDropdown",
    emits:["update:modelValue"],
    props:["id","pageNumberRecord"],
    updated(){
        // Nhận giá trị tổng bản ghi
        this.NumberRecord = this.pageNumberRecord;
    },
    methods:{
        /**
         * Hàm hiển thị Comboboxdata
         * CreatedBy: 
         */
        onShowHideData(){
            this.isShowData = !this.isShowData;
            console.log("click");
        },
        /**
         * Hàm gắn giá trị khi chọn kích thước
         * CreatedBy: 
         */
        itemOnSelect(item,index){
            this.textSelectTed = item.value;
            this.isShowData = false;
            this.indexItemSelect = index;
            this.$emit('pageSize', item.key);
        },
    },
    data(){
        return{
            // Khai báo biến showData
            isShowData: false,
            // Khai báo biến nhận giá trị
            entities : [],
            // Khai báo biến chứa entity bị thay đổi
            entitySearch: [],
            // Khai báo biến cho input
            textSelectTed : "20 bản ghi trên 1 trang",
            // Khai báo biến index trong comboxbox__data
            indexItemSelect: 1,
            // Khai báo biến giá trị cho func
            NumberRecord: [],
        }
    },
    watch: {
        /**
         * Theo dõi sự thay đổi biến number record
         * @param {*} newValue 
         */
        NumberRecord: function(newValue){
            this.$emit('update:pageSize',newValue[this.indexItemSelect].key)
            console.log("watch:NumberRecord", newValue[this.indexItemSelect].key);
        },
        /**
         * THeo dõi sự thay đổi biến pageNumber record
         * @param {} newValue 
         */
        pageNumberRecord: function(newValue){
            console.log("pageNumberRecord", newValue);
            this.$parent.listEmployees();
        }

    }
    
}
</script>

<style scoped>
    @import url(./combobox.css);
</style>
