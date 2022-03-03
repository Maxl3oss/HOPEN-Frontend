<template>
  <section class="pt-32 pb-20 bg-gray-100 bg-opacity-50">
    <div class="mx-auto container max-w-2xl md:w-3/4 shadow-md">
      <div
        class="bg-gray-100 p-4 border-t-2 bg-opacity-5 border-green-400 rounded-t"
      >
        <div class="flex max-w-auto mx-auto md:w-full md:mx-0">
          <div class="inline-flex items-center space-x-4">
            <img
              class="w-10 h-10 object-cover rounded-full"
              alt="User avatar"
              :src="this.avatar"
            />
            <h1 class="text-gray-600">{{ this.fullname }}</h1>
          </div>
          <button
            @click="onClickChangeProfile"
            class="ml-auto inline-flex items-center text-gray-400 text-sm hover:text-green-500"
          >
            เปลี่ยนโปรไฟล์
          </button>
        </div>
      </div>
      <div class="bg-white space-y-6">
        <div
          class="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center"
        >
          <h2 class="md:w-1/3 max-w-sm mx-auto">บัญชี</h2>
          <div class="md:w-2/3 max-w-sm mx-auto">
            <label class="text-sm text-gray-400">Email</label>
            <div class="w-full inline-flex border">
              <div class="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
                <svg
                  fill="none"
                  class="w-6 text-gray-400 mx-auto"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                type="email"
                class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                v-model="this.email"
                disabled
              />
            </div>
          </div>
        </div>

        <hr />
        <div
          v-show="this.changeProfile"
          class="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center"
        >
          <h2 class="md:w-1/3 mx-auto max-w-sm">โปรไฟล์</h2>
          <div class="md:w-2/3 mx-auto max-w-sm space-y-5">
            <div>
              <div class="w-full flex justify-center">
                <img class="h-64 w-64 rounded-full" :src="this.avatar" alt="" />
              </div>
              <div class="mt-10 flex justify-center">
                <label
                  class="flex flex-col items-center px-2 py-2 text-gray-500 bg-white hover:bg-gray-200 text-blue rounded-lg shadow-sm tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-green-800"
                >
                  <span class="text-base">
                    เลือกรูป
                  </span>
                  <input @change="onFileChange" type="file" class="hidden" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <hr v-show="this.changeProfile" />
        <div
          class="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center"
        >
          <h2 class="md:w-1/3 mx-auto max-w-sm">ข้อมูลทั่วไป</h2>
          <div class="md:w-2/3 mx-auto max-w-sm space-y-5">
            <div>
              <label class="text-sm text-gray-400">Fullname</label>
              <div class="w-full inline-flex border">
                <div class="w-1/12 pt-2 bg-gray-100">
                  <svg
                    fill="none"
                    class="w-6 text-gray-400 mx-auto"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                  v-model="fullname"
                />
              </div>
              <div v-if="v$.fullname.$error" class="mt-2 text-sm text-red-500">
                {{ v$.fullname.$errors[0].$message }}
              </div>
            </div>
            <div>
              <label class="text-sm text-gray-400">Username</label>
              <div class="w-full inline-flex border">
                <div class="w-1/12 pt-2 bg-gray-100">
                  <svg
                    fill="none"
                    class="w-6 text-gray-400 mx-auto"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                  v-model="this.username"
                />
              </div>
              <div v-if="v$.username.$error" class="mt-2 text-sm text-red-500">
                {{ v$.username.$errors[0].$message }}
              </div>
            </div>
            <div>
              <label class="text-sm text-gray-400">Tel</label>
              <div class="w-full inline-flex border">
                <div class="pt-2 w-1/12 bg-gray-100">
                  <svg
                    fill="none"
                    class="w-6 text-gray-400 mx-auto"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                  v-model="this.tel"
                />
              </div>
              <div v-if="v$.tel.$error" class="mt-2 text-sm text-red-500">
                {{ v$.tel.$errors[0].$message }}
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div
          class="md:inline-flex w-full space-y-4 md:space-y-0 p-8 text-gray-500 items-center"
        >
          <h2 class="md:w-4/12 max-w-sm mx-auto">ใส่รหัสเพื่อยืนยัน</h2>

          <div
            class="md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-5 md:inline-flex pl-2"
          >
            <div class="w-full inline-flex border-b">
              <div class="w-1/12 pt-2">
                <svg
                  fill="none"
                  class="w-6 text-gray-400 mx-auto"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                v-model="this.password"
                type="password"
                class="w-11/12 focus:outline-none focus:text-gray-600 p-2 ml-4"
              />
            </div>
            <div v-if="v$.password.$error" class="mt-2 text-sm text-red-500">
              {{ v$.password.$errors[0].$message }}
            </div>
          </div>

          <div class="md:w-3/12 text-center md:pl-6">
            <button
              @click="submitFormEdit(this.userID)"
              class="text-white w-full mx-auto max-w-sm rounded-md text-center bg-green-400 py-2 px-4 inline-flex items-center focus:outline-none md:float-right"
            >
              <svg
                fill="none"
                class="w-4 text-white mr-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import http from '@/services/BackendService'
import '@ocrv/vue-tailwind-pagination/dist/style.css'
import useValidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import moment from 'moment'
export default {
  data() {
    return {
      /** ตัวแปรสำหรับเรียกใช้งาน Validation */
      v$: useValidate(),
      /* ตัวแปรรับค่า */
      getID: '',
      userID: '',
      avatar: '',
      email: '',
      fullname: '',
      tel: '',
      username: '',
      gmail: '',
      password: '',
      changeProfile: false,
      /* ตัวแปรส่งค่า */
      imgSrc: '',
      fileName: '',
      imgUrl: '',
      file: null,
    }
  },
  methods: {
    // รับ user id จาก localStorage
    getUserID() {
      let getID = JSON.parse(localStorage.getItem('user'))
      if (getID) {
        this.userID = getID.user.id
      } else {
        this.$router.push({ name: 'Login' })
      }
    },
    /***********************************************************************
     * ส่วนของการแก้ไขข้อมูล
     ************************************************************************/
    // สร้างฟังก์ชันสำหรับเปิด popup แก้ไข
    getModelCustomer(id) {
      http.get(`users/${id}`).then((response) => {
        // console.log(response.data)
        this.avatar = response.data.avatar
        this.username = response.data.username
        this.fullname = response.data.fullname
        this.tel = response.data.tel
        this.email = response.data.email
        this.role = response.data.role
      })
    },
    // เปิดปิดการเปลี่ยนรูปโปรไฟล์
    onClickChangeProfile() {
      this.changeProfile = !this.changeProfile
    },
    // สร้างฟังก์ชันเมื่อผู้ใช้มีการเลือกรูปภาพในช่องภาพ
    onFileChange(e) {
      const file = e.target.files[0]
      this.file = e.target.files[0]
      this.avatar = URL.createObjectURL(file)
    },
    // สร้างฟังก์ขันสำหรับอัพเดทข้อมูล
    submitFormEdit(id) {
      this.v$.$validate()
      // ถ้าไม่มี error ในฟอร์ม
      if (!this.v$.$error) {
        // console.log(id)
        let data = new FormData()
        data.append('fullname', this.fullname)
        data.append('username', this.username)
        data.append('tel', this.tel)
        data.append('email', this.email)
        data.append('password', this.password)
        data.append('file', this.file)
        http
          .post(`users/updateProfile/${id}`, data)
          .then(() => {
            // console.log(response)
            // เมื่อแก้ไขรายการเสร็จทำการ ล่าสุดมาแสดง
            this.getModelCustomer(this.userID)
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
            })
          })
          .catch((error) => {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
            if (error.response.status == 401) {
              // เรียกใช้งาน popup ของ sweetalert2
              const Toast = this.$swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', this.$swal.stopTimer)
                  toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                },
              })
              Toast.fire({
                icon: 'error',
                title: 'รหัสยืนยันไม่ถูกต้อง',
              })
            }
          })
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
  validations() {
    return {
      fullname: {
        required: helpers.withMessage('กรุณาป้อนชื่อ-นามสกุล', required),
      },
      username: {
        required: helpers.withMessage('กรุณาป้อนชื่อผู้ใช้', required),
      },
      tel: {
        required: helpers.withMessage('กรุณาป้อนเบอร์โทร', required),
      },
      password: {
        required: helpers.withMessage('กรุณาป้อนรหัสผ่านเพื่อยืนยัน', required),
      },
    }
  },
  mounted() {
    this.getUserID()
    this.getModelCustomer(this.userID)
  },
}
</script>
