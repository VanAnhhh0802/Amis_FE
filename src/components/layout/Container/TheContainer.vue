<template>
  <div class="container">
    <TheSidebar></TheSidebar>
    <div class="main">
      <TheHeader></TheHeader>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import TheSidebar from "../SideBar/TheSidebar.vue";
import TheHeader from "../Header/TheHeader.vue";
export default {
  name: "TheContainer",
  components: {
    TheSidebar,
    TheHeader
  },
};
</script>
<style scoped>
.container {
  display: flex;
  width: 100%;
  height: 100vh;
}
.main {
  width: calc(100% - 200px);
  height: 100vh;
}
</style>
