<template>
  <div
    class="pt-32 flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900"
  >
    <div
      class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800"
    >
      <div class="flex flex-col overflow-y-auto md:flex-row">
        <div class="h-32 md:h-auto md:w-1/2">
          <img
            aria-hidden="true"
            class="object-cover w-full h-full dark:hidden"
            src="https://source.unsplash.com/random"
            alt="Office"
          />
          <!-- src="@/assets/img/create-account-office.jpeg" -->
          <img
            aria-hidden="true"
            class="hidden object-cover w-full h-full dark:block"
            src="https://source.unsplash.com/random"
            alt="Office"
          />
          <!-- src="@/assets/img/create-account-office-dark.jpeg" -->
        </div>

        <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
          <div class="w-full">
            <h1
              class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200"
            >
              สมัครสมาชิกใหม่
            </h1>

            <form @submit.prevent="onSubmit">
              <label class="block text-gray-700 text-sm mb-2" for="fullname">
                ชื่อ-สกุล
              </label>
              <input
                v-model="fullname"
                id="fullname"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                type="text"
              />
              <div v-if="v$.fullname.$error" class="mt-2 text-sm text-red-500">
                {{ v$.fullname.$errors[0].$message }}
              </div>

              <label
                class="block text-gray-700 text-sm mt-3 mb-2"
                for="username"
              >
                ชื่อผู้ใช้
              </label>
              <input
                v-model="username"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                type="text"
              />
              <div v-if="v$.username.$error" class="mt-2 text-sm text-red-500">
                {{ v$.username.$errors[0].$message }}
              </div>

              <label class="block text-gray-700 text-sm mt-3 mb-2" for="tel">
                เบอร์โทรศัพท์
              </label>
              <input
                v-model="tel"
                id="tel"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                type="text"
              />
              <div v-if="v$.tel.$error" class="mt-2 text-sm text-red-500">
                {{ v$.tel.$errors[0].$message }}
              </div>

              <label class="block text-gray-700 text-sm mt-3 mb-2" for="email">
                อีเมล์
              </label>
              <input
                v-model="email"
                tel="email"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                type="text"
                autocomplete="email"
              />
              <div v-if="v$.email.$error" class="mt-2 text-sm text-red-500">
                {{ v$.email.$errors[0].$message }}
              </div>

              <label
                class="block text-gray-700 text-sm mt-3 mb-2"
                for="password"
              >
                รหัสผ่าน
              </label>
              <input
                v-model="password"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                type="password"
                autocomplete="current-password"
              />
              <div v-if="v$.password.$error" class="mt-2 text-sm text-red-500">
                {{ v$.password.$errors[0].$message }}
              </div>

              <label
                class="block text-gray-700 text-sm mt-3 mb-2"
                for="confirm_password"
              >
                ยืนยันรหัสผ่าน
              </label>
              <input
                v-model="confirm_password"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                type="password"
                autocomplete="current-password"
              />
              <div
                v-if="v$.confirm_password.$error"
                class="mt-2 text-sm text-red-500"
              >
                {{ v$.confirm_password.$errors[0].$message }}
              </div>
              <p class="my-4"></p>

              <button
                @click="submitForm"
                class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-green-600 border border-transparent rounded-lg cursor-pointer active:bg-green-600 hover:bg-green-700"
              >
                สมัครสมาชิก
              </button>
            </form>
            <p class="mt-10">
              <router-link
                to="/login"
                class="text-sm font-medium text-green-600 dark:text-green-400 hover:underline"
              >
                ฉันเป็นสมาชิกอยู่แล้ว ? เข้าสู่ระบบ
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/services/BackendService'
import '@ocrv/vue-tailwind-pagination/dist/style.css'
import useValidate from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
export default {
  data() {
    return {
      /** ตัวแปรสำหรับเรียกใช้งาน Validation */
      v$: useValidate(),
      /** ตัวแปรสำหรับผูกกับฟอร์มเพิ่มสินค้า */
      fullname: '',
      username: '',
      tel: '',
      email: '',
      password: '',
      confirm_password: '',
      role: 2,
    }
  },
  components: {
    // VueTailwindPagination,
  },
  methods: {
    // สร้างฟังก์ชันสำหรับ submit form สินค้า
    submitForm() {
      this.v$.$validate()
      if (!this.v$.$error) {
        // ถ้าไม่มี error ในฟอร์ม
        // alert('succcess')
        // ใช้ FormData ของ HTML 5 API ในการรับค่าจากฟอร์มที่มีการแนบไฟล์
        let data = new FormData()
        data.append('fullname', this.fullname)
        data.append('username', this.username)
        data.append('tel', this.tel)
        data.append('email', this.email)
        data.append('password', this.password)
        data.append('password_confirmation', this.confirm_password)
        data.append('role', this.role)
        // console.log(data)
        // ส่งค่าไปยัง Laravel API Product Add
        http
          .post('register', data)
          .then((response) => {
            console.log(response)
            // เรียกใช้งาน popup ของ sweetalert 2
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
              title: 'ลงทะเบียนใหม่เรียบร้อย',
            })
          })
          .then(() => {
            this.$router.push({ name: 'Login' })
          })
      }
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
        required: helpers.withMessage('กรุณาป้อนเบอร์', required),
      },
      email: {
        required: helpers.withMessage('กรุณาป้อนอีเมล', required),
        email: helpers.withMessage('รูปแบบอีเมล์ที่ป้อนไม่ถูกต้อง', email),
      },
      password: {
        required: helpers.withMessage('กรุณาป้อนรหัสผ่าน', required),
        minLength: helpers.withMessage(
          ({ $params }) => `รหัสผ่านต้องไม่น้อยกว่า ${$params.min} ตัวอักษร`,
          minLength(6),
        ),
      },
      confirm_password: {
        required: helpers.withMessage('กรุณาป้อนการยืนยันรหัสผ่าน', required),
        sameAs: helpers.withMessage('กรุณาป้อนรหัสผ่านให้ตรง', required),
      },
    }
  },
}
</script>
