<template lang="">
  <div class="content__footer">
    <div class="content--left">
      <div class="total-record">
        Tổng số :
        <b>{{ this.totalRecord }}</b>
        bản ghi
      </div>
    </div>
    <div class="content--right">
      <div class="flex pagination">
        <!-- <select class="flex combobox record-in-page">
          <option>20 bản ghi trên trang</option>
          <option>30 bản ghi trên trang</option>
          <option>40 bản ghi trên trang</option>
          <div class="icon w-h-24 pagination-icon"></div>
        </select> -->
        <MCombobox></MCombobox>
        <div class="flex">
          <div
            class="page__next page__prev--selected"
            @click="previousPage()"
            :class="{
              'page__button--disable': this.currentPage == 1,
            }"
          >
            Trước
          </div>
          <div
            class="flex w-h-24 pagination__number"
            v-show="this.totalPage > 1"
            @click="firstPage()"
            :class="{
              'pagination__number--selected': this.currentPage == 1,
            }"
          >
            1
          </div>
          <div
            class="flex w-h-24 pagination__number"
            v-show="this.currentPage > 3 && this.totalPage > 3"
          >
            ...
          </div>
          <div
            class="flex w-h-24 pagination__number"
            v-show="
              (this.currentPage < 3 || this.totalPage == 3) &&
              this.totalPage > 2
            "
            :class="{ 'pagination__number--selected': this.currentPage == 2 }"
            @click="(this.currentPage = 2), this.loadApi()"
          >
            2
          </div>
          <div
            class="flex w-h-24 pagination__number"
            v-show="this.currentPage < 3 && this.totalPage > 3"
            @click="(this.currentPage = 3), this.loadApi()"
          >
            3
          </div>
          <div
            class="flex w-h-24 pagination__number"
            v-show="
              this.currentPage > 2 &&
              this.currentPage < this.totalPage - 1 &&
              this.totalPage > 3
            "
            @click="this.currentPage--, this.loadApi()"
          >
            {{ this.currentPage - 1 }}
          </div>
          <div
            class="flex w-h-24 pagination__number"
            v-show="
              this.currentPage > 2 &&
              this.currentPage < this.totalPage - 1 &&
              this.totalPage > 3
            "
            :class="{ 'pagination__number--selected': this.currentPage }"
          >
            {{ this.currentPage }}
          </div>
          <div
            class="flex w-h-24 pagination__number"
            v-show="
              this.currentPage > 2 &&
              this.currentPage < this.totalPage - 1 &&
              this.totalPage > 3
            "
            @click="this.currentPage++, this.loadApi()"
          >
            {{ this.currentPage + 1 }}
          </div>
          <div
            class="flex w-h-24 pagination__number"
            v-show="this.currentPage < this.totalPage - 2 && this.totalPage > 3"
          >
            ...
          </div>
          <div
            class="flex w-h-24 pagination__number"
            v-show="this.currentPage > this.totalPage - 2 && this.totalPage > 3"
            @click="(this.currentPage = this.totalPage - 2), this.loadApi()"
          >
            {{ this.totalPage - 2 }}
          </div>
          <div
            class="flex w-h-24 pagination__number"
            v-show="this.currentPage > this.totalPage - 2 && this.totalPage > 3"
            @click="(this.currentPage = this.totalPage - 1), this.loadApi()"
            :class="{
              'pagination__number--selected':
                this.currentPage == this.totalPage - 1,
            }"
          >
            {{ this.totalPage - 1 }}
          </div>
          <div
            class="flex w-h-24 pagination__number"
            @click="lastPage()"
            :class="{
              'pagination__number--selected':
                this.currentPage == this.totalPage,
            }"
          >
            {{ this.totalPage }}
          </div>
          <div
            class="page__prev"
            @click="nextPage()"
            :class="{
              'page__button--disable': this.currentPage == this.totalPage,
            }"
          >
            Sau
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MPaging",
  props: ["total", "totalInPage", "pageNumber"],
  computed: {},
  data() {
    return {
      pageSize: 20, //Số lượng bản ghi/ trang
      totalRecord: null, //Tổng số bản ghi
      currentPage: null, // trang hiện tại đang chọn
      totalPage: null, //Tổng số trang
    };
  },
  updated() {
    this.currentPage = this.pageNumber;
  },
  methods: {
    /**
     * Hàm gọi lại api
     * Author: Văn Anh (12/2/2023)
     */
    loadApi() {
      try {
        this.$parent.listEmployees();
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm lùi trang
     * Author: Văn Anh (12/1/2023)
     */
    previousPage() {
      try {
        if (this.currentPage != 1) {
          //lùi xuống trang tiếp theo
          this.currentPage--;
          console.log("currentPage-- : ", this.currentPage);
          //Gọi lại API
          this.loadApi();
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm chuyển tiếp trang tiếp theo
     * Author: Văn ANh (12/1/2023)
     */
    nextPage() {
      try {
        if (this.currentPage != this.totalPage) {
          this.currentPage++;
          //GỌi lại api
          this.loadApi();
          console.log("next page");
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Về trang đầu tiên
     * Author: văn anh (23/1/2023)
     */
    firstPage() {
      try {
        if (this.currentPage != 1) {
          this.currentPage = 1;
          console.log(this.currentPage);
          //Gọi lại api
          this.loadApi();
          console.log("trang dau");
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Tiến tới trang cuối cùng
     * Author: văn anh (23/1/2023)
     */
    lastPage() {
      try {
        if (this.currentPage != this.totalPage) {
          this.currentPage = this.totalPage;
          //Gọi lại api
          this.loadApi();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    currentPage: function (newValue) {
      console.log("currentnewValue: " + newValue);
      this.$emit("update:pageNumber", newValue);
    },
    total(newValue) {
      this.totalRecord = newValue;
    },
    totalInPage(newValue) {
      this.totalPage = newValue;
    },
    pageNumber(newValue) {
      this.currentPage = newValue;
      console.log("new value currentPage", this.currentPage);
    },
  },
  //
};
</script>
<style>
@import url(../combobox/combobox.css);
@import url(./paging.css);
</style>
