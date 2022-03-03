<template>
  <div class="container pt-20 pb-20 mx-auto text-center lg:w-4/5">
    <div class="flex items-center justify-between my-8">
      <h2
        class="my-6 text-base font-semibold text-gray-700 md:text-2xl dark:text-gray-200"
      >
        Order ID {{ this.order_key }}
      </h2>
      <div class="text-xs md:text-sm flex justify-between text-gray-500">
        <p>Order placed</p>
        <p class="ml-2 text-black lg:text-base text-xs font-semibold">
          {{ format_date(this.order_created_at) }}
        </p>
      </div>
    </div>
    <!-- product -->
    <div class="flow-root w-full">
      <ul role="list" class="-my-6 divide-y divide-gray-200 rounded">
        <li
          v-for="item in carts"
          :key="item.id"
          class="mt-3 py-5 flex lg:px-10 px-auto rounded shadow-sm border bg-white border-gray-200"
        >
          <div
            class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md"
          >
            <img
              :src="item.orders_cart.image"
              alt=""
              class="w-full h-full object-center rounded object-cover"
            />
          </div>

          <div class="ml-4 lg:ml-4 flex-1 flex flex-col">
            <div>
              <div
                class="flex justify-between text-xs lg:text-base font-medium text-gray-900"
              >
                <h3>
                  <p>
                    {{ item.orders_cart.name }}
                  </p>
                </h3>
                <p class="ml-4">
                  ฿ {{ formatPrice(item.product_price / item.product_qty) }}
                </p>
              </div>
            </div>
            <div
              class="flex-1 flex items-end justify-between lg:text-base text-xs"
            >
              <div class="flex flex-wrap w-10/12">
                จำนวน {{ item.product_qty }}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- จำนวนราคา -->
    <div class="bg-white mt-9 border rounded">
      <main class="my-8">
        <div class="container mx-auto px-6">
          <div class="flex flex-col lg:flex-row mt-8 lg:white">
            <div class="w-full lg:w-full order-2">
              <div class="max-w-full w-full px-4 py-3">
                <div>
                  <div v-for="item in address" :key="item.id" class="">
                    <h3 class="text-gray-700 font-medium">
                      ที่อยู่ในการจัดส่ง
                    </h3>
                    <div
                      class="text-sm mt-5 flex justify-between text-gray-500"
                    >
                      <p>ขื่อ-นามสกุล</p>
                      <p class="ml-4">
                        {{ item.fullname }}
                      </p>
                    </div>
                    <div class="text-sm flex justify-between text-gray-500">
                      <p>ที่อยู่</p>
                      <p class="ml-4">
                        {{ item.address }}
                      </p>
                    </div>
                    <div class="text-sm flex justify-between text-gray-500">
                      <p>เบอร์</p>
                      <p class="ml-4">
                        {{ item.tel }}
                      </p>
                    </div>
                    <div class="text-sm flex justify-between text-gray-500">
                      <p>อีเมล์</p>
                      <p class="ml-4">
                        {{ item.user_customers.email }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="mt-6">
                  <h3 class="text-gray-700 font-medium">
                    วิธีการชำระ
                  </h3>
                  <div class="text-sm mt-5 flex justify-between text-gray-500">
                    <p>การชำระ</p>
                    <p
                      v-if="this.order_paytype == 'cash on delivery'"
                      class="ml-4"
                    >
                      ปลายทาง
                    </p>
                    <p
                      v-else-if="this.order_paytype == 'pay credit card'"
                      class="ml-4"
                    >
                      โอนเงิน
                      <button
                        @click="openSlip"
                        class="text-green-500 text-base"
                      >
                        view
                      </button>
                    </p>
                  </div>
                  <div
                    v-if="showSlip"
                    class="text-sm mt-5 flex justify-between text-gray-500"
                  >
                    <img :src="this.order_image" class="w-full" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div
              class="w-full mb-8 flex-shrink-0 order-1 lg:w-1/2 lg:mb-0 lg:order-2"
            >
              <div class="flex justify-center lg:justify-end">
                <div class="max-w-full w-full px-4 py-3">
                  <div class="items-center justify-between">
                    <h3 class="text-gray-700 text-center font-medium">
                      สินค้าทั้งหมด ({{ this.order_qty }})
                    </h3>
                  </div>
                  <div class="text-sm mt-5 flex justify-between text-gray-500">
                    <p>รวมค่าสินค้า</p>
                    <p
                      v-if="this.order_paytype == 'pay credit card'"
                      class="ml-4"
                    >
                      ฿ {{ formatPrice(this.order_total - 45) }}
                    </p>
                    <p v-else class="ml-4">
                      ฿ {{ formatPrice(this.order_total - 65) }}
                    </p>
                  </div>
                  <div class="text-sm flex justify-between text-gray-500">
                    <p>ค่าจัดส่ง</p>
                    <p
                      v-if="this.order_paytype == 'pay credit card'"
                      class="ml-4"
                    >
                      ฿ 45
                    </p>
                    <p v-else class="ml-4">
                      ฿ 65
                    </p>
                  </div>
                  <div class="mt-1 flex justify-between">
                    <p>รวมการสั่งซื้อ</p>
                    <p class="ml-4">
                      ฿
                      {{ formatPrice(this.order_total) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import http from '@/services/BackendService'
import '@ocrv/vue-tailwind-pagination/dist/style.css'
import useValidate from '@vuelidate/core'
import moment from 'moment'
export default {
  data() {
    return {
      /** ตัวแปรสำหรับเรียกใช้งาน Validation */
      v$: useValidate(),
      /** ตัวแปรสำหรับเก็บข้อมูลสินค้าที่อ่านจาก API */
      carts: [],
      address: [],
      currentPage: 0,
      perPage: 0,
      total: 0,
      /** ตัวแปรส่งค่า**/
      user_id: '',
      /** ตัวแปรเปิดปิด **/
      showSlip: false,
      /** ตัวแปร orders **/
      uid: '',
      order_image: '',
      order_status: '',
      order_paytype: '',
      order_qty: '',
      order_total: '',
      order_key: '',
      order_created_at: '',
      order_updated_at: '',
    }
  },
  methods: {
    /*************************************************
     * ส่วนของการอ่านข้อมูลจาก API และแสดงผลในตาราง
     *************************************************/
    // ฟังก์ชันสำหรับดึงรายการสินค้าจาก api ทั้งหมด
    async getCarts(id) {
      let res = await http.get(`carts/search/${id}`)
      let resCarts = res.data
      this.carts = resCarts
      // console.log('carts', this.carts)
    },
    async getOrder(id) {
      http.get(`orders/${id}`).then((response) => {
        this.uid = response.data.id
        this.order_image = response.data.order_image
        this.order_status = response.data.order_status
        this.order_paytype = response.data.order_paytype
        this.order_qty = response.data.order_qty
        this.order_total = response.data.order_total
        this.order_key = response.data.order_key
        this.order_created_at = response.data.created_at
        this.order_updated_at = response.data.updated_at
        // console.log('order', response.data)
      })
    },
    async getAddress(id) {
      let res = await http.get(`customers/search/${id}`)
      let resAddress = res.data
      this.address = resAddress
      // console.log('customers', this.address)
    },
    // เปิดปิด เพื่อดูสลิป
    openSlip() {
      this.showSlip = !this.showSlip
    },

    // สร้างฟังก์ชันสำหรับจัดรูปแบบวันที่ด้วย moment.js
    format_date(value) {
      if (value) {
        return moment(String(value)).format('MMM Do YYYY')
      }
    },
    // สร้างฟังก์ชันแปลงยอดเงินให้เป็นรูปแบบสกุลเงิน (10,000.50)
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(',', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    checkData() {
      if (!this.$store.state.OID) {
        this.$router.push({ name: 'Purchase' })
      }
    },
  },
  mounted() {
    // checkdata
    this.checkData()
    // this.currentPage = 1
    // อ่านสินค้าจาก API
    this.getCarts(this.$store.state.OID)
    this.getOrder(this.$store.state.OID)
    this.getAddress(this.$store.state.UID)
  },
}
</script>
