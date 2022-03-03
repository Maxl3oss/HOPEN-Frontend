<template>
  <div class="container pt-36 pb-20 mx-auto text-center">
    <div class="flex justify-end flex-1 lg:mr-6">
      <div class="w-full max-w-xl ml-6 mr-6 focus-within:text-gray-500">
        <form @submit.prevent="onSubmit">
          <div class="container flex justify-end">
            <input
              v-model="keyword"
              type="text"
              class="border-2 border-gray-300 bg-white h-10 w-1/2 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              placeholder="Search..."
            />
            <button
              @click="submitSearchForm"
              class="ml-2 flex items-center justify-center"
            >
              <svg
                class="h-6 text-gray-600"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                ></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
    <input v-model="eid" />
    <div
      class="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 pt-2 content-center"
    >
      <div
        v-on:click="sendDetailProduct(item.id)"
        class="flex w-full p-4 justify-center"
        v-for="item in products.data"
        :key="item.id"
      >
        <!-- <a @click="openDetailProduct(item.id)" href=""> -->
        <div
          class="flex flex-col group max-w-xs rounded-md overflow-hidden shadow-lg hover:scale-105 transition duration-500 cursor-pointer"
        >
          <div class="w-full mx-auto">
            <img :src="item.image" alt="" />
          </div>
          <div class="py-4 px-4 bg-white group-hover:text-green-500">
            <h3
              class="text-lg font-semibold text-gray-600 group-hover:text-black"
            >
              {{ item.name }}
            </h3>
          </div>
          <p class="mt-auto mb-2 text-lg font-thin group-hover:text-green-500">
            ฿ {{ formatPrice(item.price) }}
          </p>
          <!-- <button @click="addItemToCart(item)"
          type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg class="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
            Buy now
          </button> -->
        </div>
        <!-- <button
          @click="openDetailProduct(item.id)"
          class="bg-blue-500 text-white text-sm py-2 px-3 center rounded"
        >
          Add to cart
        </button> -->
        <!-- </a> -->
      </div>
    </div>
    <!-- แสดงผลตัวแบ่งหน้าเพจ-->
    <VueTailwindPagination
      :current="currentPage"
      :total="total"
      :per-page="perPage"
      @page-changed="onPageClick($event)"
    />
  </div>

  <div></div>
</template>

<script>
import http from '@/services/AuthService'
import '@ocrv/vue-tailwind-pagination/dist/style.css'
import VueTailwindPagination from '@ocrv/vue-tailwind-pagination'
import useValidate from '@vuelidate/core'
import moment from 'moment'
export default {
  data() {
    return {
      /** ตัวแปรสำหรับเรียกใช้งาน Validation */
      v$: useValidate(),
      /** ตัวแปรสำหรับเก็บข้อมูลสินค้าที่อ่านจาก API */
      products: [],
      currentPage: 0,
      perPage: 0,
      total: 0,
      // ตัวแปร
      eid: '',
      // ตัวแปรไว้ค้นหา
      keyword: '',
    }
  },

  components: {
    VueTailwindPagination,
  },
  methods: {
    /***********************************************************************
     * ส่วนของการอ่านข้อมูลจาก API และแสดงผลในตาราง
     ***********************************************************************/
    // ฟังก์ชันสำหรับดึงรายการสินค้าจาก api ทั้งหมด
    async getProducts(pageNumber) {
      let response = await http.get(`productsList?page=${pageNumber}`)
      let responseProduct = response.data
      this.products = responseProduct
      this.currentPage = responseProduct.current_page
      this.perPage = responseProduct.per_page
      this.total = responseProduct.total
      // console.log(response.data)
    },
    // เปลี่ยนหน้า VueTailwindPagination
    onPageClick(event) {
      this.currentPage = event
      // เช็คว่ามีการค้นหาสินค้าอยู่หรือไม่
      if (this.keyword == '') {
        // ไม่ได้ค้นหา
        this.getProducts(this.currentPage)
      } else {
        this.getProductsSearch(this.currentPage)
      }
    },
    // สร้างฟังก์ชันสำหรับจัดรูปแบบวันที่ด้วย moment.js
    format_date(value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY hh:mm:ss')
      }
    },
    // สร้างฟังก์ชันแปลงยอดเงินให้เป็นรูปแบบสกุลเงิน (10,000.50)
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(',', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    /***********************************************************************
     * ส่วนของการค้นหาสินค้า
     ************************************************************************/
    // สร้างฟังก์ชันค้นหาสินค้า
    submitSearchForm() {
      if (this.keyword != '') {
        // เรียกค้นไปยัง api ของ laravel
        http.get(`products/search/${this.keyword}`).then((response) => {
          let responseProduct = response.data
          this.products = responseProduct
          this.currentPage = responseProduct.current_page
          this.perPage = responseProduct.per_page
          this.total = responseProduct.total
        })
      } else {
        this.getProducts()
      }
    },
    // สร้างฟังก์ชันสำหรับเคลียร์ข้อมูลการค้นหา
    resetSearchForm() {
      this.currentPage = 1
      this.getProducts(this.currentPage)
      this.keyword = ''
    },
    /**********************************************************************
     *ส่งข้อมูลหน้า detail products
     **********************************************************************/
    sendDetailProduct(id) {
      this.$store.commit('onClickProductID', id)
      this.$router.push({ name: 'ProductDetails' })
      // console.log(this.$store.state.PID)
    },
  },
  mounted() {
    this.currentPage = 1
    // อ่านสินค้าจาก API
    this.getProducts(this.currentPage)
  },
}
</script>
