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
        <div class="menu__item">
          <a class="menu-item__link menu-item__link--active" href="#">
            <div class="icon w-h-24 m-12 sidebar__dashboard"></div>
            <div class="menu-item__title">Tổng quan</div>
          </a>
        </div>
        <div class="menu__item">
          <a class="menu-item__link" href="#">
            <div class="icon w-h-24 m-12 sidebar__cash"></div>
            <div class="menu-item__title">Tiền mặt</div>
          </a>
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
          <a class="menu-item__link" href="#">
            <div class="icon w-h-24 m-12 sidebar__sale"></div>
            <div class="menu-item__title">Bán hàng</div>
          </a>
        </div>
        <div class="menu__item">
          <a class="menu-item__link" href="#" data-c-tooltip="">
            <div class="icon w-h-24 m-12 sidebar__invoice"></div>
            <div class="menu-item__title">Quản lý hóa đơn</div>
          </a>
        </div>
        <div class="menu__item">
          <a class="menu-item__link" href="#">
            <div class="icon w-h-24 m-12 sidebar__stock"></div>
            <div class="menu-item__title">Kho</div>
          </a>
        </div>
        <div class="menu__item">
          <a class="menu-item__link" href="#">
            <div class="icon w-h-24 m-12 sidebar__tools"></div>
            <div class="menu-item__title">Công cụ dụng cụ</div>
          </a>
        </div>
        <div class="menu__item">
          <a class="menu-item__link" href="#">
            <div class="icon w-h-24 m-12 sidebar__fixed-assets"></div>
            <div class="menu-item__title">Tài sản cố định</div>
          </a>
        </div>
        <div class="menu__item">
          <a class="menu-item__link" href="#">
            <div class="icon w-h-24 m-12 sidebar__tax"></div>
            <div class="menu-item__title">Thuế</div>
          </a>
        </div>
        <div class="menu__item">
          <a class="menu-item__link" href="#">
            <div class="icon w-h-24 m-12 sidebar__price"></div>
            <div class="menu-item__title">Giá thành</div>
          </a>
        </div>
        <div class="menu__item">
          <a class="menu-item__link" href="#">
            <div class="icon w-h-24 m-12 sidebar__general"></div>
            <div class="menu-item__title">Tổng hợp</div>
          </a>
        </div>
        <div class="menu__item">
          <a class="menu-item__link" href="#">
            <div class="icon w-h-24 m-12 sidebar__budget"></div>
            <div class="menu-item__title">Ngân sách</div>
          </a>
        </div>
        <div class="menu__item">
          <a class="menu-item__link" href="#">
            <div class="icon w-h-24 m-12 sidebar__report"></div>
            <div class="menu-item__title">Báo cáo</div>
          </a>
        </div>
        <div class="menu__item">
          <a class="menu-item__link" href="#">
            <div class="icon w-h-24 m-12 sidebar__finance"></div>
            <div class="menu-item__title">Phân tích tài chính</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheSidebar",
};
</script>
<style scoped>
@import url(./sidebar.css);
</style>
