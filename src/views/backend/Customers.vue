<template>
  <div class="pb-60">
    <div class="flex items-center justify-between my-8">
      <h2
        class="my-6 text-sm font-semibold text-gray-700 md:text-xl dark:text-gray-200"
      >
        Customers list ({{ users.total }})
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
              <th class="px-4 py-3">Telephone</th>
              <th class="px-4 py-3">Verified</th>
              <th class="px-4 py-3">Role</th>
              <th class="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody
            class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
          >
            <tr
              v-for="user in users.data"
              :key="user.id"
              class="text-gray-700 dark:text-gray-400 hover:bg-blue-100"
            >
              <td class="px-4 py-3 text-sm">{{ user.id }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center text-sm">
                  <div
                    class="relative hidden w-8 h-8 mr-3 rounded-full md:block"
                  >
                    <img
                      class="object-cover w-full h-full rounded-full"
                      :src="user.avatar"
                      alt=""
                      loading="lazy"
                    />
                    <div
                      class="absolute inset-0 rounded-full shadow-inner"
                      aria-hidden="true"
                    ></div>
                  </div>
                  <div>
                    <p class="font-semibold">{{ user.fullname }}</p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">
                      Email {{ user.email }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-sm">{{ user.tel }}</td>
              <td class="px-4 py-3 text-sm font-medium">
                <a
                  class="px-1 bg-green-100 text-green-800 rounded-full"
                  v-if="user.email_verified_at"
                >
                  enable
                </a>
                <button
                  v-else
                  @click="onChangeVerified(user.id)"
                  class="px-1 bg-red-100 text-red-700 rounded-full"
                >
                  unable
                </button>
              </td>
              <td class="px-4 py-3 text-sm">
                <a
                  class="px-1 bg-indigo-100 text-indigo-800 rounded"
                  v-if="user.role == '2'"
                >
                  user
                </a>
                <a class="px-1 bg-indigo-100 text-indigo-800 rounded" v-else>
                  admin
                </a>
              </td>
              <td class="px-4 py-3 text-sm">
                <button
                  @click="openModalEditUser(user.id)"
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
                  @click="onclickDelete(user.id)"
                  class="px-2 py-2 mx-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-purple"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
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
      v-if="showEditModal"
      id="editProductModal"
      class="fixed top-0 left-0 mt-7 flex items-center justify-center w-full h-full modal"
    >
      <div
        class="absolute w-full h-full bg-gray-900 opacity-70 modal-overlay"
      ></div>

      <div
        class="z-50 w-11/12 p-5 mx-auto overflow-y-auto bg-white rounded shadow-lg h-5/6 modal-container md:max-w-md"
      >
        <!-- Header -->
        <div class="flex items-center justify-center w-full h-auto">
          <div
            class="flex items-start justify-start w-full h-auto py-2 text-xl font-bold"
          >
            แก้ไขผู้ใช้
          </div>
          <div
            @click="closeEditModal"
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
              ชื่อ-นามสกุล
            </label>
            <input
              v-model="efullname"
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow"
              type="text"
              placeholder="Product name"
            />

            <label class="block my-3 text-gray-700 text-md" for="eslug">
              ชื่อผู้ใช้
            </label>
            <input
              v-model="eusername"
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow"
              type="text"
              placeholder="product-name"
            />

            <label class="block my-3 text-gray-700 text-md" for="eprice">
              เบอร์โทรศัพท์
            </label>
            <input
              v-model="etel"
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow"
              type="text"
              placeholder="0.00"
            />
            <label class="block my-3 text-gray-700 text-md w-1/6" for="eamount">
              สิทธิ์
            </label>

            <select
              v-model="erole"
              :value="erole"
              class="appearance-none w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow"
            >
              <option value="1">admin</option>
              <option value="2">user</option>
            </select>

            <div class="mt-4">
              <img v-if="eimgUrl" :src="eimgUrl" class="w-ful" />
            </div>
            <label class="block my-3 text-gray-700 text-md" for="image">
              ภาพผู้ใช้
            </label>
            <input
              @change="onFileChange"
              ref="fileupload"
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow"
              type="file"
            />

            <button
              @click="submitFormEdit(eid)"
              class="w-full px-4 py-2 mt-4 font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg text-md active:bg-purple-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-purple"
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
      users: [],
      currentPage: 0,
      perPage: 0,
      total: 0,
      /**
       * ตัวแปรรับค่า
       **/
      eid: '',
      efullname: '',
      eusername: '',
      etel: '',
      erole: '',
      eimgUrl: '',
      /**
       * ตัวแปรส่งค่า
       **/
      imgSrc: '',
      fileName: '',
      imgUrl: '',
      file: null,
      /**
       * ตัวแปรเปิดปิด
       **/
      showEditModal: false,
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
    async getUsers(pageNumber) {
      let res = await http.get(`users?page=${pageNumber}`)
      let resUsers = res.data
      this.users = resUsers
      this.currentPage = resUsers.current_page
      this.perPage = resUsers.per_page
      this.total = resUsers.total
      // console.log(this.users)
    },
    /***********************************************************************
     * ส่วนของการผู้ใช้
     ************************************************************************/
    // สร้างฟังก์ชันสำหรับลบผู้ใช้
    onclickDelete(id) {
      this.$swal
        .fire({
          title: 'คุณแน่ใจ?',
          text: 'คุณยืนยันใช่ไหมที่จะลบผู้ใช้นี้',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
        })
        .then((result) => {
          if (result.isConfirmed) {
            http.delete(`users/${id}`).then(() => {
              this.$swal.fire({
                position: 'center',
                icon: 'success',
                title: 'ลบเรียบร้อย',
                showConfirmButton: false,
                timer: 1500,
              })
              // เมื่อแก้ไขรายการเสร็จทำการ ดึงสินค้าล่าสุดมาแสดง
              this.getUsers(this.currentPage)
            })
          }
        })
    },
    /***********************************************************************
     * ส่วนของการแก้ไขข้อมูลผู้ใช้
     ************************************************************************/
    // สร้างฟังก์ชันสำหรับเปิด popup แก้ไขผู้ใช้
    openModalEditUser(id) {
      http.get(`users/${id}`).then((response) => {
        this.eid = response.data.id
        this.efullname = response.data.fullname
        this.eusername = response.data.username
        this.etel = response.data.tel
        this.erole = response.data.role
        this.eimgUrl = response.data.avatar
        this.showEditModal = true
      })
    },
    // สร้างฟังก์ชันเมื่อผู้ใช้มีการเลือกรูปภาพในช่องภาพสินค้า
    onFileChange(e) {
      const file = e.target.files[0]
      this.file = e.target.files[0]
      this.imgUrl = URL.createObjectURL(file)
      this.eimgUrl = URL.createObjectURL(file)
    },
    // สร้างฟังก์ชันสำหรับปิด popup แก้ไขสินค้า
    closeEditModal() {
      this.showEditModal = false
    },
    // สร้างฟังก์ขันสำหรับอัพเดทข้อมูล
    submitFormEdit(id) {
      // console.log(id)
      let data = new FormData()
      data.append('fullname', this.efullname)
      data.append('username', this.eusername)
      data.append('tel', this.etel)
      data.append('role', this.erole)
      data.append('file', this.file)
      // Send Patch request to laravel
      data.append('_method', 'PATCH')
      http
        .post(`users/${id}`, data)
        .then(() => {
          // console.log(response)
          // เมื่อแก้ไขรายการเสร็จทำการ ดึงสินค้าล่าสุดมาแสดง
          this.getUsers(this.currentPage)

          // เรียกใช้งาน popup ของ sweetalert2
          const Toast = this.$swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
          })
          Toast.fire({
            icon: 'success',
            title: 'อัพเดทข้อมูลเรียบร้อย',
          }).then(() => {
            this.showEditModal = false // ปิดหน้าต่าง popup modal แก้ไข
          })
        })
        .catch((error) => {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        })
    },
    /*************************
     การอนุณาตการเข้าใช้งาน
     ************************/
    onChangeVerified(id) {
      this.$swal
        .fire({
          title: 'คุณแน่ใจ?',
          text: 'คุณยืนยันใช่ไหมที่จะอนุญาตอีเมลนี้',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'อนุญาต',
          cancelButtonText: 'ยกเลิก',
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire({
              position: 'center',
              icon: 'success',
              title: 'อนุญาตเรียบร้อย',
              showConfirmButton: false,
              timer: 1500,
            })
            let data = new FormData()
            data.append('email_verified_at', this.currentDateTime())
            http
              .post(`users/verified/${id}`, data)
              .then(() => {
                this.getUsers(this.currentPage)
              })
              .catch((error) => {
                console.log(error.response.data)
                console.log(error.response.status)
                console.log(error.response.headers)
              })
          }
        })
    },
    // สร้างเวลา
    currentDateTime() {
      let current = new Date()
      let date =
        current.getFullYear() +
        '-' +
        (current.getMonth() + 1) +
        '-' +
        current.getDate()
      let time =
        current.getHours() +
        ':' +
        current.getMinutes() +
        ':' +
        current.getSeconds()
      let dateTime = date + ' ' + time
      return dateTime
    },
    // สร้างฟังก์ชันสำหรับการคลิ๊กเปลี่ยนหน้า
    onPageClick(event) {
      this.currentPage = event
      this.getUsers(this.currentPage)
    },
    // สร้างฟังก์ชันสำหรับจัดรูปแบบวันที่ด้วย moment.js
    format_date(value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY hh:mm a')
      }
    },
  },
  mounted() {
    this.currentPage = 1
    // อ่านสินค้าจาก API
    this.getUsers(this.currentPage)
  },
}
</script>
