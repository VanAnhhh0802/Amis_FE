<template>
    <div class="content">
    <!-- Toolbar -->
    <div class="content__toolbar" >
      <div class="content__title" >
        Danh mục
      </div>
    </div>
    <div class="content__list" style="height: calc(100% - 66px);">
      <h1>Tài khoản</h1>
      <router-link to ="/account"  class="category-item">Hệ thống tài khoản</router-link>
      <router-link to ="" class="category-item">Tài khoản kết chuyển</router-link>
      <router-link to ="" class="category-item">Tài khoản ngầm định</router-link>
    </div>
    
    
  </div>
</template>
<script>
export default {
    name: "CategoryHome",
}
</script>
<style scoped>
    .category-item {
      text-decoration: none;
      color: #0075C0;
      margin-bottom: 8px;
    }
    .content {
      justify-content: flex-start;
    }
    
</style>