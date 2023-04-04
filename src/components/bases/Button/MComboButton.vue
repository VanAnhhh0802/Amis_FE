<template >
    <div class="footer-right-btn">
        <div class="tooltip">
            <button
                class="btn btn--primary btn-save-add btnClass"
                :tabIndex="tabIndex"
                style="height: 28px; border-top-right-radius: 0; border-bottom-right-radius: 0;"
                @click="btnBtnClick"
            >
            {{ this.textBtnSaveDefault }}
            </button>
            <div class="tooltip-text tooltip-save tooltip-text-payment">
                {{this.textTooltip}}
            </div>
        </div>
        <div class="btn-dropdown"
            @click="this.isShowDropDownBtn = !this.isShowDropDownBtn"
        >
            <div class="icon btn-dropdown-icon"></div>
            <div class="btn-dropdown-list"
                v-if="isShowDropDownBtn"
            >
                <div
                v-for ="(entity, index) in entities"
                :key="index"
                class="btn-dropdown-item"
                @click="handleActionBtn(entity.name, index, entity.action, entity.tooltipText)"
                >
                {{entity.name }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import MISAEnum from '@/lib/enum';

export default {
    name: 'MComboButton',
    props: {
        tabIndex: String,
        entities: {
            type: Array,
        },
        textDefault:String,
        editAction: Boolean,
        defaultTooltip: String,
    },
    emits:["clickBtn"],
    data(){
        return{
            isShowDropDownBtn: false,
            textBtnSaveDefault: null,
            textTooltip: null,
        }
    },
    
    created(){
        this.textBtnSaveDefault = this.textDefault;
        this.textTooltip = this.defaultTooltip;
    },
    methods: {
        /**
         * Xử lý click button
         * Author: văn Anh (4/3/2023)
         */
        btnBtnClick(){
            try {
                    //Nếu trạng thái khác trạng thái default thì lưu vào local, ngược lại gán với giá trị default  
                    const indexAction= localStorage.getItem("actionSelect") || MISAEnum.STATUS_PAYMENT_SAVE.SAVE_ADD;
                    console.log("action", indexAction);
                    console.log("action", this.$emit("clickBtn", this.entities[indexAction].action));
                    this.$emit("clickBtn", this.entities[indexAction].action)
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Xử  lý click chọn trạng thái của button
         * Author: Văn Anh (4/3/2023)
         */
        handleActionBtn(name, index, action, textTooltip){
            try {
                // if (!this.editAction){
                    this.isShowDropDownBtn = false;
                    console.log("isShowDropDownBtn", this.isShowDropDownBtn);
                    this.textBtnSaveDefault = name;
                    localStorage.setItem("actionSelect",index);
                    this.$emit("clickBtn",action);
                    console.log("action", this.$emit("clickBtn",action));
                    this.textTooltip = textTooltip;
                // }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Sự kiện click outside đống dropdown
         * Author: Văn Anh (4/3/2023)
         */
        clickOutside(){
            this.isShowDropDownBtn = false;
        }
    }
}
</script>
<style scoped>
.footer-right-btn{
    position: relative;
    display: flex;
    align-items: center;
}
.btn-dropdown{
    width: 30px;
    height: 28px;
    background-color: #2ca01c;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.btn-dropdown:focus{
    outline: 1px solid #fff;
}
.btn-dropdown:hover {
    background-color: var(--background-hover-color);
    transition: all 0.2s linear;
}
.btn-dropdown::after{
    content: "";
    position: absolute;
    width: 0.5px;
    height: 17px;
    background-color: #fff;
    right: 30px;
}
.btn-dropdown-icon{
width: 16px;
height: 16px;
background-position:-847px -359px;
}
  .btn-dropdown-list{
    position: absolute;
    background-color: #fff;
    top: -60px;
    right: 0;
    width: 100px;
    border: 1px solid #babec5;
    box-sizing: border-box;
  }
.btn-dropdown-item{
    cursor: pointer;
    width: 100%;
    height: 28px;
    padding: 5px 10px;
    box-sizing: border-box;
    
}
.btn-dropdown-item:hover{
    color: #2ca01c;
}
.tooltip-text-payment{
    top: -29px;
}
</style>