<template>
  <div class="container pt-36 pb-20 mx-auto text-center lg:w-4/5">
    <div v-if="orders.total == 0" class="mt-2 pb-7">
      <p class="text-4xl lg:text-5xl">รายการสั่งซื้อ</p>
      <p class="text-xl text-red-500">ไม่มีรายการสั่งซื้อ</p>
    </div>
    <div v-else>
      <div class="lg:flex items-center justify-between my-8">
        <h2
          class="text-xl font-semibold text-gray-700 md:text-xl dark:text-gray-200"
        >
          รายการสั่งซื้อ ( {{ orders.total }} )
        </h2>
        <div class="flex justify-center flex-1 lg:mr-32"></div>
      </div>
      <!-- ตารางแสดงสินค้า -->
      <div class="w-full overflow-hidden rounded-lg shadow-xs">
        <div class="w-full overflow-x-auto">
          <table class="w-full whitespace-no-wrap table table-sm">
            <thead>
              <tr
                class="text-xs text-center font-semibold tracking-wide text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
              >
                <th class="px-4 py-3">Order</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3">Patment</th>
                <th class="px-4 py-3">Total</th>
                <th class="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody
              class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
            >
              <tr
                v-for="order in orders.data"
                :key="order.id"
                class="text-gray-700 dark:text-gray-400 hover:bg-blue-100"
              >
                <td class="px-4">
                  <div class="text-sm md:text-xs">
                    <div class="text-left">
                      <p class="font-semibold text-xs lg:text-sm">
                        {{ order.order_key }}
                      </p>
                      <p class="text-xs text-gray-600 dark:text-gray-400">
                        Ordered {{ format_date(order.created_at) }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm font-medium">
                  <!-- สีสเตตัส -->
                  <a
                    v-if="order.order_status == 'pending'"
                    class="px-1 bg-yellow-500 text-white rounded"
                  >
                    {{ order.order_status }}
                  </a>
                  <a
                    v-else-if="order.order_status == 'confirmed'"
                    class="px-1 bg-blue-500 text-white rounded"
                  >
                    {{ order.order_status }}
                  </a>
                  <a
                    v-else-if="order.order_status == 'shipped'"
                    class="px-1 bg-blue-500 text-white rounded"
                  >
                    {{ order.order_status }}
                  </a>
                  <a
                    v-else-if="order.order_status == 'complete'"
                    class="px-1 bg-green-500 text-white rounded"
                  >
                    {{ order.order_status }}
                  </a>
                  <a
                    v-else-if="
                      order.order_status == 'cancelled' ||
                      order.order_status == 'declined'
                    "
                    class="px-1 bg-red-500 text-white rounded"
                  >
                    {{ order.order_status }}
                  </a>
                </td>
                <td class="px-4 py-3 text-sm">
                  <p v-if="order.order_paytype == 'pay credit card'">
                    <a class="px-1 bg-indigo-100 text-indigo-800 rounded">
                      โอนเงิน
                    </a>
                  </p>
                  <p v-if="order.order_paytype == 'cash on delivery'">
                    <a class="px-1 bg-indigo-100 text-indigo-800 rounded">
                      ปลายทาง
                    </a>
                  </p>
                </td>
                <td class="px-auto py-3 lg:text-sm text-xs">
                  ฿ {{ formatPrice(order.order_total) }}
                </td>
                <td class="px-auto py-3 text-sm">
                  <button
                    v-if="
                      order.order_status == 'declined' ||
                      order.order_status == 'complete' ||
                      order.order_status == 'cancelled'
                    "
                    class="px-2 py-2 mx-1 text-sm font-medium leading-5 transition-colors duration-150 bg-gray-100 border border-transparent rounded-lg active:bg-red-600 focus:outline-none focus:shadow-outline-purple"
                  >
                    ยกเลิกคำสั่งซื้อ
                  </button>
                  <button
                    v-else
                    @click="submitFormUpdate(order.id)"
                    class="px-2 py-2 mx-1 lg:text-sm text-xs font-medium leading-5 text-red-800 transition-colors duration-150 bg-red-100 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-300 focus:outline-none focus:shadow-outline-purple"
                  >
                    ยกเลิกคำสั่งซื้อ
                  </button>
                  <button
                    @click="openOrderDetail(order.id, order.user_id)"
                    class="px-4 py-2 mx-1 lg:text-sm text-xs font-medium leading-5 bg-transparent hover:bg-green-500 hover:text-white text-green-700 border border-green-500 hover:border-transparent rounded"
                  >
                    รายละเอียด
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- แสดงผลตัวแบ่งหน้าเพจ-->
          <VueTailwindPagination
            :current="currentPage"
            :total="total"
            :per-page="perPage"
            @page-changed="onPageClick($event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/services/BackendService'
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
      orders: [],
      currentPage: 0,
      perPage: 0,
      total: 0,
      /** ตัวแปรส่งค่า **/
      imgSrc: '',
      fileName: '',
      imgUrl: '',
      file: null,
      /** ตัวแปร user id **/
      uid: '',
    }
  },
  components: {
    VueTailwindPagination,
  },
  methods: {
    /******************************************
     * ส่วนของการอ่านข้อมูลจาก API และแสดงผลในตาราง
     ******************************************/
    // ฟังก์ชันสำหรับดึงรายการสินค้าจาก api ทั้งหมด
    async getOrders(pageNumber) {
      let res = await http.get(`orders/search/${this.uid}?page=${pageNumber}`)
      let resOrders = res.data
      this.orders = resOrders
      this.currentPage = resOrders.current_page
      this.perPage = resOrders.per_page
      this.total = resOrders.total
      // console.log(this.orders, this.uid)
    },
    /******************************************
     * ส่วนของการเช็ค user
     ******************************************/
    async getUserID() {
      let getUID = JSON.parse(localStorage.getItem('user'))
      if (getUID) {
        this.uid = getUID.user.id
      } else {
        this.$router.push({ name: 'Login' })
      }
    },
    // สร้างฟังก์ขันสำหรับอัพเดทข้อมูล
    submitFormUpdate(id) {
      this.$swal
        .fire({
          title: 'คุณแน่ใจ?',
          text: 'คุณยืนยันใช่ไหมที่จะยกเลิกรายการนี้',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
        })
        .then((result) => {
          if (result.isConfirmed) {
            // console.log(id)
            let data = new FormData()
            data.append('order_status', 'cancelled')
            // Send Patch request to laravel
            data.append('_method', 'PATCH')
            http
              .post(`orders/${id}`, data)
              .then(() => {
                // console.log(response)
                // เมื่อแก้ไขรายการเสร็จทำการ ดึงสินค้าล่าสุดมาแสดง
                this.getOrders(this.currentPage)

                // เรียกใช้งาน popup ของ sweetalert2
                const Toast = this.$swal.mixin({})
                Toast.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'ยกเลิกเรียบร้อย',
                  showConfirmButton: false,
                  timer: 1500,
                }).then(() => {
                  this.showUpdateModal = false // ปิดหน้าต่าง popup modal แก้ไข
                })
              })
              .catch((error) => {
                console.log(error.response.data)
                console.log(error.response.status)
                console.log(error.response.headers)
              })
          }
        })
    },
    // รายละเอียดรายการสินค้า
    openOrderDetail(id, user_id) {
      this.$store.commit('onClickOrderID', id)
      this.$store.commit('onClickUserID', user_id)
      // console.log(this.$store.state.OID, this.$store.state.UID)
      this.$router.push({ name: 'PurchaseDetail' })
      // console.log(id)
    },
    // สร้างฟังก์ชันสำหรับจัดรูปแบบวันที่ด้วย moment.js
    format_date(value) {
      if (value) {
        return moment(String(value)).format('MMM Do YY')
      }
    },
    // สร้างฟังก์ชันแปลงยอดเงินให้เป็นรูปแบบสกุลเงิน (10,000.50)
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(',', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
  },
  mounted() {
    // อ่านค่าจาก localstorge
    this.getUserID()
    this.currentPage = 1
    // อ่านสินค้าจาก API
    this.getOrders(this.currentPage)
  },
}
</script>
