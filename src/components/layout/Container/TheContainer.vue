<template>
  <div class="container">
    <TheSidebar></TheSidebar>
    <TheMain></TheMain>
  </div>
</template>
<script>
import TheSidebar from "../SideBar/TheSidebar.vue";
import TheMain from "../Main/TheMain.vue";
export default {
  name: "TheContainer",
  components: {
    TheSidebar,
    TheMain,
  },
};
</script>
<style scoped>
.container {
  display: flex;
  width: 100%;
  height: 100vh;
}
</style>
