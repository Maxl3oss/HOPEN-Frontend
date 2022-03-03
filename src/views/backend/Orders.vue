<template>
  <div class="pb-60">
    <div class="flex items-center justify-between my-8">
      <h2
        class="my-6 text-sm font-semibold text-gray-700 md:text-xl dark:text-gray-200"
      >
        Orders list ({{ orders.total }})
      </h2>

      <div class="flex justify-center flex-1 lg:mr-32"></div>
    </div>

    <!-- ตารางแสดงสินค้า -->
    <div class="w-full overflow-hidden rounded-lg shadow-xs">
      <div class="w-full overflow-x-auto">
        <table class="w-full whitespace-no-wrap">
          <thead>
            <tr
              class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
            >
              <th class="px-4 py-3">ID</th>
              <th class="px-4 py-3">Customer</th>
              <th class="px-4 py-3">Email</th>
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
              <td class="px-4 py-3 text-sm">{{ order.id }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center text-sm">
                  <div>
                    <p class="font-semibold">
                      {{ order.user_orders.fullname }}
                    </p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">
                      Ordered {{ format_date(order.created_at) }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-sm">{{ order.user_orders.email }}</td>
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

              <td class="px-4 py-3 text-sm">
                ฿ {{ formatPrice(order.order_total) }}
              </td>
              <td class="px-4 py-3 text-sm">
                <button
                  @click="openModalUpdateOrder(order.id)"
                  class="px-2 py-2 mx-1 text-sm font-medium hover:bg-indigo-200 leading-5 text-black transition-colors duration-150 border border-transparent rounded-lg active:bg-red-600 focus:outline-none focus:shadow-outline-purple"
                >
                  <svg
                    class="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
                <button
                  @click="openOrderDetail(order.id, order.user_id)"
                  class="px-4 py-2 mx-1 text-sm font-medium leading-5 bg-transparent hover:bg-blue-500 hover:text-white text-blue-700 border border-blue-500 hover:border-transparent rounded"
                >
                  Detail
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
    <!-- Popup สำหรับการแก้ไขผู้ใช้ -->
    <div
      v-if="showUpdateModal"
      id="editProductModal"
      class="fixed top-0 left-0 flex items-center justify-center w-full h-full modal"
    >
      <div
        class="absolute w-full h-full bg-gray-900 opacity-70 modal-overlay"
      ></div>

      <div
        class="z-50 w-11/12 p-5 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md"
      >
        <!-- Header -->
        <div class="flex items-center justify-center w-full h-auto">
          <div
            class="flex items-start justify-start w-full h-auto py-2 text-xl font-bold"
          >
            อัพเดทสเตตัส
          </div>
          <div
            @click="closeUpdateModal"
            class="flex justify-center w-1/12 h-auto cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-x"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
          <!--Header End-->
        </div>
        <!-- Modal Content-->
        <div class="w-full h-auto mb-4">
          <form @submit.prevent="onSubmit" enctype="multipart/form-data">
            <label class="block my-3 text-gray-700 text-md" for="ename">
              STATUS
            </label>
            <select
              v-model="ustatus"
              :value="ustatus"
              class="appearance-none w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="complete">Complete</option>
              <option value="cancelled">Cancelled</option>
              <option value="declined">Declined</option>
            </select>
            <button
              @click="submitFormUpdate(uid)"
              class="w-full px-4 py-2 mt-10 font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg text-md active:bg-purple-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-purple"
            >
              อัพเดทข้อมูล
            </button>
          </form>
        </div>
        <!-- End of Modal Content-->
      </div>
    </div>
  </div>
  <div></div>
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
      /** ตัวแปรรับค่า **/
      ustatus: '',
      /** ตัวแปรส่งค่า **/
      imgSrc: '',
      fileName: '',
      imgUrl: '',
      file: null,
      /** ตัวแปรเปิดปิด **/
      showUpdateModal: false,
    }
  },
  components: {
    VueTailwindPagination,
  },
  methods: {
    /***********************************************************************
     * ส่วนของการอ่านข้อมูลจาก API และแสดงผลในตาราง
     ************************************************************************/
    // ฟังก์ชันสำหรับดึงรายการสินค้าจาก api ทั้งหมด
    async getOrders(pageNumber) {
      let res = await http.get(`orders?page=${pageNumber}`)
      let resOrders = res.data
      this.orders = resOrders
      this.currentPage = resOrders.current_page
      this.perPage = resOrders.per_page
      this.total = resOrders.total
      // console.log(this.orders)
    },
    /***********************************************************************
     * ส่วนของการแก้ไขข้อมูล
     ************************************************************************/
    // สร้างฟังก์ชันสำหรับเปิด popup แก้ไข
    openModalUpdateOrder(id) {
      http.get(`orders/${id}`).then((response) => {
        this.uid = response.data.id
        this.ustatus = response.data.order_status
        this.showUpdateModal = true
        // console.log(response.data)
      })
    },
    // สร้างฟังก์ชันสำหรับปิด popup แก้ไขสินค้า
    closeUpdateModal() {
      this.showUpdateModal = false
    },
    // สร้างฟังก์ขันสำหรับอัพเดทข้อมูล
    submitFormUpdate(id) {
      // console.log(id)
      let data = new FormData()
      data.append('order_status', this.ustatus)
      // Send Patch request to laravel
      data.append('_method', 'PATCH')
      http
        .post(`orders/${id}`, data)
        .then(() => {
          // เมื่อแก้ไขรายการเสร็จทำการ ดึงสินค้าล่าสุดมาแสดง
          this.getOrders(this.currentPage)
          // เรียกใช้งาน popup ของ sweetalert2
          const Toast = this.$swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', this.$swal.stopTimer)
              toast.addEventListener('mouseleave', this.$swal.resumeTimer)
            },
          })
          Toast.fire({
            icon: 'success',
            title: 'อัพเดทข้อมูลเรียบร้อย',
          }).then(() => {
            this.showUpdateModal = false // ปิดหน้าต่าง popup modal แก้ไข
          })
        })
        .catch((error) => {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        })
    },
    // รายละเอียดรายการสินค้า
    openOrderDetail(id, user_id) {
      this.$store.commit('onClickOrderID', id)
      this.$store.commit('onClickUserID', user_id)
      // console.log(this.$store.state.OID, this.$store.state.UID)
      this.$router.push({ name: 'OrderDetail' })
      // console.log(id)
    },
    // สร้างฟังก์ชันสำหรับการคลิ๊กเปลี่ยนหน้า
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
        return moment(String(value)).format('DD/MM/YYYY hh:mm a')
      }
    },
    // สร้างฟังก์ชันแปลงยอดเงินให้เป็นรูปแบบสกุลเงิน (10,000.50)
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(',', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
  },
  mounted() {
    this.currentPage = 1
    // อ่านสินค้าจาก API
    this.getOrders(this.currentPage)
  },
}
</script>
