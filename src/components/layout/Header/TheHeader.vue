<template>
  <div class="header">
    <div class="header--left">
      <div class="icon w-h-24 header__icon"></div>
      <div class="tooltip">
        <div class="header__branch">CÔNG TY TNHH SONG VIỆT - Misatest</div>
        <div class="tooltip-text">CÔNG TY TNHH SONG VIỆT - Misatest</div>
      </div>
      <div class="icon w-h-24 header__branch-drop-down"></div>
    </div>
    <div class="header--right">
      <div class="icon w-h-24 header__notify"></div>
      <button class="header__user">
        <div class="icon user__avt"></div>
        <div class="user__name">Hồ Văn Anh</div>
        <div class="icon user__icon-drop-down"></div>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheHeader",
};
</script>
<style scoped>
@import url(./header.css);
</style>
