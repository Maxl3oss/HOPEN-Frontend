<template>
  <section class="text-gray-700 body-font overflow-hidden bg-white">
    <div
      v-if="this.$store.state.PID"
      class="container px-5 pb-24 pt-36 mx-auto"
    >
      <div class="lg:w-4/5 mx-auto flex flex-wrap">
        <img
          alt="ecommerce"
          class="lg:w-2/5 w-full object-cover object-center rounded border border-gray-200"
          v-if="limgUrl"
          :src="limgUrl"
        />
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <!-- <p class="text-4xl title-font text-gray-500 tracking-widest">
            BRAND NAME
          </p> -->
          <p class="text-gray-900 text-3xl title-font font-medium mb-1">
            {{ this.lname }}
          </p>
          <p class="leading-relaxed">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
              ldescription
            }}
          </p>

          <div
            class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5"
          >
            <p class="">จำนวน</p>
            <div class="flex ml-4 items-center">
              <div class="flex flex-wrap w-auto">
                <button @click="subQTY">
                  <svg
                    class="fill-current text-gray-600 w-4"
                    viewBox="0 0 448 512"
                  >
                    <path
                      d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                    />
                  </svg>
                </button>
                <input
                  v-model="qty"
                  class="mx-2 border text-sm text-center w-8"
                  type="text"
                  min="1"
                  readonly
                />
                <button @click="addQTY">
                  <svg
                    class="fill-current text-gray-600 w-4"
                    viewBox="0 0 448 512"
                  >
                    <path
                      d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div class="text-xs ml-auto">
              <p class="">มีสินค้าทั้งหมด {{ this.amount }} ชิ้น</p>
            </div>
          </div>
          <div class="flex">
            <span
              class="title-font font-medium text-xl lg:text-2xl text-gray-900"
            >
              ฿ {{ formatPrice(this.lprice * this.qty) }}
            </span>
            <button
              @click="addItemToCart(data, qty)"
              class="flex flex-end ml-auto text-white bg-green-500 border-0 py-2 px-2 lg:px-6 focus:outline-none hover:bg-green-600 rounded"
            >
              เพิ่มไปยังรถเข็น
            </button>

            <router-link
              to="/"
              class="flex ml-2 text-gray-500 bg-gray-100 border-0 py-2 px-3 lg:px-6 focus:outline-none hover:bg-gray-200 rounded"
            >
              กลับ
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- ท่าไม่มีส่งมา -->
    <div v-else class="pt-52 pb-32 text-center mt-5">
      <p class="text-xl text-red-500">
        ไม่มีสินค้าที่เลือก
      </p>
      <router-link
        to="/"
        class="text-green-600 font-medium hover:text-green-500"
      >
        เลือกสินค้าเลย ->
      </router-link>
    </div>
  </section>
</template>

<script>
import http from '@/services/AuthService'
import '@ocrv/vue-tailwind-pagination/dist/style.css'
export default {
  data() {
    return {
      /** ตัวแปรสำหรับเก็บข้อมูลสินค้าที่อ่านจาก API */
      qty: 1,
      lname: '',
      ldescription: '',
      lprice: '',
      limgUrl: '',
      data: '',
      amount: '',
    }
  },
  methods: {
    // เพิ่ม QTY
    addQTY() {
      if (this.qty >= this.amount) {
        return
      }
      this.qty++
    },
    subQTY() {
      if (this.qty == 1) {
        return
      }
      this.qty--
    },
    /***********************************************************************
     * ส่งสินค้าไปหน้า ตะกร้า
     ************************************************************************/
    addItemToCart(item, qty) {
      if (this.amount < this.qty) {
        // แสดงแจ้งเตือน จำนวนไม่พอ
        const Toast = this.$swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })
        Toast.fire({
          icon: 'warning',
          title: 'สินค้าไม่พอ',
        })
        // เช็คว่า login รึยัง
      } else if (localStorage.getItem('user')) {
        // รับค่าจากการกดปุ่ม
        let cart = { item, qty: qty }
        this.$store.commit('addCart', cart)
        // console.log(this.$store.getters.Displaycart)
        // แสดงแจ้งเตือนการเพิ่มสินค้า
        const Toast = this.$swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
        })
        Toast.fire({
          icon: 'success',
          title: 'เพิ่มสินค้าเรียบร้อย',
        })
      } else {
        this.$router.push({ name: 'Login' })
      }
    },
    /***********************************************************************
     * ส่วนของการแก้ไขข้อมูลสินค้า
     ************************************************************************/
    // สร้างฟังก์ชันสำหรับเปิด popup แก้ไขสินค้า
    GetProduct(id) {
      http.get(`productsFind/${id}`).then((response) => {
        this.data = response.data
        this.lname = response.data.name
        this.ldescription = response.data.description
        this.lprice = response.data.price
        this.limgUrl = response.data.image
        this.amount = response.data.amount
        // console.log(response.data)
      })
    },
    // สร้างฟังก์ชันแปลงยอดเงินให้เป็นรูปแบบสกุลเงิน (10,000.50)
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(',', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    // เช็คสินค้าที่เข้ามาว่ามีมั้ย
    checkProduct() {
      if (!this.$store.state.PID) {
        this.$router.push({ name: 'Home' })
      }
    },
  },
  mounted() {
    this.GetProduct(this.$store.state.PID)
    window.scrollTo(0, 0)
    this.checkProduct()
  },
}
</script>
<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
