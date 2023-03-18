<template>
    <div class="dropdown" :class="{'dropdown--active': this.active}">
        <div class="flex w-full">
            <input 
            v-model="textSelectTed" 
            disabled
            :id="id" 
            class="dropdown__input" 
            :class="{'drop-combobox-input': name}"
            type="text">
            <div class="dropdown__button iconBtndropdown" @click="onShowHideData"></div>
        </div>
        <div v-show="isShowData" class="dropdown__data" :class="{'drop-combobox-data': name}">
            <div class="dropdown-item"
            v-for="(item,index) in listRecords" 
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
    emits:["update:modelValue", "size"],
    props:{
        id : String,
        total: Array,
        name: Boolean,
    },
    updated(){
        // Nhận giá trị tổng bản ghi
        this.listRecords = this.total;
    },
    
    methods:{
        /**
         * Hàm hiển thị Comboboxdata
         * CreatedBy: 
         */
        onShowHideData(){
            this.active = !this.active
            this.isShowData = !this.isShowData;
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
            textSelectTed : null,
            // Khai báo biến index trong comboxbox__data
            indexItemSelect: 1,
            // Khai báo biến giá trị cho func
            listRecords: [],
            active: false,
        }
    },
    watch: {
        /**
         * Theo dõi sự thay đổi biến number record
         * @param {*} newValue 
         */
        listRecords: function(newValue){
            this.$emit('update:size',newValue[this.indexItemSelect].key)
            console.log("watch:NumberRecord", newValue[this.indexItemSelect].key);
        },
        /**
         * THeo dõi sự thay đổi biến pageNumber record
         * @param {} newValue 
         */
        total: function(newValue){
            console.log("pageNumberRecord", newValue);
            this.$parent.listEmployees();
        }

    }
    
}
</script>

<style scoped>
    @import url(./combobox.css);
</style>
