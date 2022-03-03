<template>
  <div
    class="flex items-center min-h-screen p-6 pt-32 bg-gray-50 dark:bg-gray-900"
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
          <img
            aria-hidden="true"
            class="hidden object-cover w-full h-full dark:block"
            src="https://source.unsplash.com/random"
            alt="Office"
          />
          <!-- src="@/assets/img/login-office.jpeg" -->
          <!-- src="@/assets/img/login-office-dark.jpeg" -->
        </div>

        <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
          <div class="w-full">
            <h1
              class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200"
            >
              เข้าสู่ระบบ
            </h1>

            <form @submit.prevent="onSubmit">
              <label class="block mt-3 mb-2 text-sm text-gray-700" for="email">
                อีเมล์
              </label>
              <input
                v-model="email"
                class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none"
                type="text"
              />
              <div v-if="v$.email.$error" class="mt-2 text-sm text-red-500">
                {{ v$.email.$errors[0].$message }}
              </div>

              <label
                class="block mt-3 mb-2 text-sm text-gray-700"
                for="password"
              >
                รหัสผ่าน
              </label>
              <input
                v-model="password"
                class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none"
                type="password"
              />
              <div v-if="v$.password.$error" class="mt-2 text-sm text-red-500">
                {{ v$.password.$errors[0].$message }}
              </div>

              <p class="my-4"></p>

              <button
                @click="submitForm"
                class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-green-600 border border-transparent rounded-lg cursor-pointer active:bg-green-600 hover:bg-green-700"
              >
                เข้าสู่ระบบ
              </button>
            </form>
            <p class="mt-10">
              <router-link
                to="/register"
                class="text-sm font-medium text-green-600 dark:text-green-400 hover:underline"
              >
                สมัครสมาชิกใหม่
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import http from '@/services/AuthService'
export default {
  data() {
    return {
      v$: useValidate(),
      email: '',
      password: '',
    }
  },

  methods: {
    submitForm() {
      // alert(id)
      this.v$.$validate() // checks all input
      if (!this.v$.$error) {
        // ถ้า validate ผ่านแล้ว
        // alert('Form validate Success')
        // เรียกใช้งาน API Login จาก Laravel
        http
          .post('/login', {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            // console.log(response.data)
            // เก็บข้อมูล user ลง localStorage
            localStorage.setItem('user', JSON.stringify(response.data))
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
              title: 'กำลังเข้าสู่ระบบ...',
            }).then(() => {
              // เมื่อล็อกอินผ่านส่งไปหน้า dashboard
              // window.location.assign('Login')
              this.$router.push({ name: 'Home' })
              // window.location.href = "backend"
              // เปลี่ยนสเตรเพื่อเปลี่ยนปุ่ม loginlogout
              this.$store.commit('onClickLog')
            })
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data)
              console.log(error.response.status)
              console.log(error.response.headers)
              if (error.response.status == 401) {
                // เรียกใช้งาน popup ของ sweetalert2
                const Toast = this.$swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1000,
                  timerProgressBar: true,
                })
                Toast.fire({
                  icon: 'error',
                  title: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
                })
                // this.$swal({
                //   position: 'top-end',
                //   icon: 'error',
                //   title: 'ข้อมูลเข้าระบบไม่ถูกต้อง',
                //   showConfirmButton: false,
                //   timer: 1500
                // });
              } else if (error.response.status == 400) {
                // เรียกใช้งาน popup ของ sweetalert2
                const Toast = this.$swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1000,
                  timerProgressBar: true,
                })
                Toast.fire({
                  icon: 'error',
                  title: 'อีเมลนี้ยังไม่ได้อนุญาต',
                })
              }
            }
          })
      } else {
        // alert('Form validate fail!')
      }
    },
  },

  validations() {
    return {
      email: {
        required: helpers.withMessage('ป้อนอีเมล์ก่อน', required),
        email: helpers.withMessage('รูปแบบอีเมล์ที่ป้อนไม่ถูกต้อง', email),
      },
      password: {
        required: helpers.withMessage('ป้อนรหัสผ่านก่อน', required),
        minLength: helpers.withMessage(
          ({ $params }) => `รหัสผ่านต้องไม่น้อยกว่า ${$params.min} ตัวอักษร`,
          minLength(6),
        ),
      },
    }
  },
}
</script>
