<template>
  <div class="sidebar">
    <div class="sidebar__header">
        <div class="icon w-h-24 m-16 sidebar__option"></div>
      <img
        src="../../../assets/img/Logo_Module_TiengViet_White.66947422.svg"
        class="sidebar__logo-wrapper"
      />
    </div>
    <div id="sidebar-wrapper">
      <div class="menu">
        <div class="menu-wrapper">
          <div class="menu__item">
            <router-link to="/" class="menu-item__link " 
            active-class="menu-item__link--active"
            exact-active-class="menu-item__link--active"
            >
              <div class="icon w-h-24 m-12 sidebar__dashboard"></div>
              <div class="menu-item__title">Tổng quan</div>
            </router-link>
        </div>
        <div class="menu__item">
            <router-link to="/cash/procedure" class="menu-item__link"
            active-class="menu-item__link--active"
            >
              <div class="icon w-h-24 m-12 sidebar__cash"></div>
              <div class="menu-item__title">Tiền mặt</div>
            </router-link>
        </div>
        <div class="menu__item">
            <a class="menu-item__link" href="#">
              <div class="icon w-h-24 m-12 sidebar__bank"></div>
              <div class="menu-item__title">Tiền gửi</div>
            </a>
        </div>
        <div class="menu__item">
            <a class="menu-item__link" href="#">
              <div class="icon w-h-24 m-12 sidebar__purchase"></div>
              <div class="menu-item__title">Mua hàng</div>
            </a>
        </div>
        <div class="menu__item">
          <div class="tooltip">
            <a class="menu-item__link" href="#">
              <div class="icon w-h-24 m-12 sidebar__sale"></div>
              <div class="menu-item__title">Bán hàng</div>
            </a>
            <div class="tooltip-text">Tính năng đang phát triển</div>
          </div>
        </div>
        <div class="menu__item">
          <div class="tooltip">
            <a class="menu-item__link" href="#" data-c-tooltip="">
              <div class="icon w-h-24 m-12 sidebar__invoice"></div>
              <div class="menu-item__title">Quản lý hóa đơn</div>
            </a>
            <div class="tooltip-text">Tính năng đang phát triển</div>
          </div>
        </div>
        <div class="menu__item">
          <div class="tooltip">
            <a class="menu-item__link" href="#">
              <div class="icon w-h-24 m-12 sidebar__stock"></div>
              <div class="menu-item__title">Kho</div>
            </a>
            <div class="tooltip-text">Tính năng đang phát triển</div>
          </div>
        </div>
        <div class="menu__item">
          <div class="tooltip">
            <a class="menu-item__link" href="#">
              <div class="icon w-h-24 m-12 sidebar__tools"></div>
              <div class="menu-item__title">Công cụ dụng cụ</div>
            </a>
            <div class="tooltip-text">Tính năng đang phát triển</div>
          </div>
        </div>
        <div class="menu__item">
          <div class="tooltip">
            <a class="menu-item__link" href="#">
              <div class="icon w-h-24 m-12 sidebar__fixed-assets"></div>
              <div class="menu-item__title">Tài sản cố định</div>
            </a>
            <div class="tooltip-text">Tính năng đang phát triển</div>
          </div>
        </div>
        </div>
        <div class="menu__item" style="margin-bottom: 8px; ">
          <hr/>
            <router-link to="/category" class="menu-item__link">
              <div class=" w-h-24 m-12 sidebar__category"></div>
              <div class="menu-item__title">Danh mục</div>
            </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "TheSidebar",
  data(){
    return {
      number: 1,
    }
  },
 
};
</script>
<style scoped>
@import url(./sidebar.css);
</style>
