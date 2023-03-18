<template lang="">
    <td class="tbl-col tbl-col__last" style="border-bottom: unset">
        <div class="tbl-col__action">
            <label class="tbl-col__action-edit" @click="handleOpenEditForm(data.AccountId)"
                >Sửa</label
            >
            <label
                class="sidebar-item__icon btn-dropdown"
                :class="isShowList ? 'btn-dropdown--active' : ''"
                style="display: flex; justify-content: center; align-items: center"
                @click="handleDisplayHideListAction"
                v-click-outside-element="handleClickOutside"
            >
                <div
                    :style="{
                        background:
                            'url(@/src/assets/img/Sprites.64af8f61.svg) no-repeat -900px -365px',
                        width: '8px',
                        height: '5px',
                    }"
                ></div>
            </label>
        </div>
    </td>
</template>
<script>
export default {
    name: "MFeatureDetail",
    props:{
        data: Object,
    },
    created(){
        console.log(this.data);
    }

}
</script>
<style lang="">
    
</style>