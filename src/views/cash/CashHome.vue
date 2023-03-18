<template lang="">
   <div class="main-wrapper">
        <div class="flex main-header">
            <router-link to="cash/" class="list-item list-item--active">Quy trình</router-link>
            <router-link to="cash/payList" class="list-item">Chi tiền</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.main-wrapper{
    background-color: #d9e1fb;
    height: calc(100vh - 56px);
    padding: 16px 24px;
    box-sizing: border-box;
}
.main-header{
 width: 100%;
 border-bottom: 1px solid #9eabd8;
}
.list-item{
    width: 100px;
    height: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    color: #212121;
}
.list-item:hover {
    color: var(--main-color);
}
.list-item--active{
    background-color: #f2ebbf;
    border-bottom: 5px solid var(--main-color);
    font-weight: 700;

}
</style>