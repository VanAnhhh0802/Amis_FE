<template>
  <div class="main">
    <TheHeader></TheHeader>
    <EmployeeList></EmployeeList>
  </div>
</template>
<script>
import TheHeader from "../Header/TheHeader.vue";
import EmployeeList from "../../../views/employee/EmployeeList/EmployeeList.vue";
export default {
  name: "TheMain",
  components: {
    TheHeader,
    EmployeeList,
  },
};
</script>
<style scoped>
.main {
  width: calc(100% - 200px);
  height: 100vh;
}
</style>
