<template lang="">
  <div class="content__footer">
    <div class="content--left">
      <div class="total-record">
        Tổng số :
        <b>13</b>
        bản ghi
      </div>
    </div>
    <div class="content--right">
      <div class="flex pagination">
        <select class="flex combobox record-in-page">
          <option>20 bản ghi trên trang</option>
          <option>30 bản ghi trên trang</option>
          <option>40 bản ghi trên trang</option>
          <div class="icon w-h-24 pagination-icon"></div>
        </select>
        <div class="flex">
          <div class="page__next page__prev--selected">Trước</div>
          <div
            class="flex w-h-24 pagination__number pagination__number--selected"
          >
            1
          </div>
          <div class="flex w-h-24 pagination__number">2</div>
          <div class="flex w-h-24 pagination__number">...</div>
          <div class="flex w-h-24 pagination__number">54</div>
          <div class="page__prev">Sau</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MPaging",
};
</script>
<style>
@import url(../combobox/combobox.css);
@import url(./paging.css);
</style>
