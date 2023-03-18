<template>
    <div class="container">
    <TheSidebar></TheSidebar>
    <div class="main">
      <TheHeader></TheHeader>
      <div class="main-wrapper">
          <div class="flex main-header">
              <router-link
              class="list-item"
              :to="tab.tabLink"
              v-for = "(tab, index) in Tabs"
              :class=" `${indexTab == index ? 'list-item--active': ''}`"
              :key="index"
              @click = "indexTab = index"
              >
              {{tab.tabName }}
              </router-link>
          </div>
          <router-view></router-view>
      </div>
    </div>
  </div>
  </template>
  <script>
import resource from '@/lib/resource';
import TheSidebar from '@/components/layout/SideBar/TheSidebar.vue';
import TheHeader from "@/components/layout/Header/TheHeader.vue";
  export default {
    name: "TheContainer",
    components: {
        TheHeader,
        TheSidebar,
    },
    data(){
        return{
            Tabs: resource.Vi.Tab,
            indexTab: 0,
        }
    }
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
  .main-wrapper{
    background-color: #eceef1;
    height: calc(100vh - 56px);
    padding: 16px 24px;
    box-sizing: border-box;
}
.main-header{
 width: 100%;
 height: 32px;
box-sizing: border-box;
 border-bottom: 1px solid #d4d7dc;
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
  