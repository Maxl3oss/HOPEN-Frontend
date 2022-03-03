<template>
  <!-- Header -->
  <header class="fixed w-full flex py-4 bg-white shadow-md">
    <nav class="container flex flex-wrap items-center px-4 mx-auto">
      <router-link to="/" class="items-center flex">
        <img
          src="@/assets/img/logo-main2.png"
          alt="logo"
          class="h-20"
          width=""
          height=""
        />
      </router-link>
      <button
        @click="onClickMenu"
        class="px-3 py-2 ml-auto text-green-500 border-2 border-gray-100 rounded-md hover:bg-gray-300 hover:text-gray-600 lg:hidden"
      >
        <span class="block w-6 my-1 border-b-2 border-current"></span>
        <span class="block w-6 my-1 border-b-2 border-current"></span>
        <span class="block w-6 my-1 border-b-2 border-current"></span>
      </button>
      <div class="hidden w-full ml-auto lg:block lg:w-auto">
        <router-link
          v-if="!this.$store.state.loginlogout"
          to="/cart"
          class="relative align-middle inline-block rounded-full font-medium hover:text-green-900 lg:inline-block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span
            v-if="!this.$store.getters.DisplayQtyCart == '0'"
            class="absolute align-top right-0 inline-block top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm leading-tight text-center"
          >
            {{ this.$store.getters.DisplayQtyCart }}
          </span>
        </router-link>
        <router-link
          v-if="this.role == 1 && !this.$store.state.loginlogout"
          to="/backend"
          class="relative align-middle inline-block rounded-full font-medium hover:text-green-900 lg:inline-block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 ml-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </router-link>
        <div
          v-if="this.$store.state.loginlogout"
          class="inline-block px-4 py-2"
        >
          <router-link
            to="/register"
            class="block pl-4 py-2 font-medium hover:text-green-600 lg:inline-block"
          >
            สมัครสมาชิก
          </router-link>
          <p
            class="block px-2 py-2 font-medium hover:text-green-600 lg:inline-block"
          >
            |
          </p>
          <router-link
            to="/login"
            class="block pr-4 py-2 font-medium hover:text-green-600 lg:inline-block"
          >
            เข้าสู่ระบบ
          </router-link>
        </div>
        <div
          v-on:mouseover="mouseover"
          v-on:mouseleave="mouseleave"
          v-else
          class="inline-block text-center px-4 py-2"
        >
          <!-- Profile menu -->
          <button
            class="align-middle border-4 rounded-full focus:shadow-outline-purple focus:outline-none"
            aria-label="Account"
            aria-haspopup="true"
          >
            <img
              class="object-cover w-8 h-8 rounded-full"
              :src="this.userAvatar"
              alt=""
              aria-hidden="true"
            />
          </button>
          <a class="text-sm text-gray-600 ml-1">{{ this.userUsername }}</a>
          <template
            v-on:mouseover="mouseover"
            v-on:mouseleave="mouseleave"
            :class="{ block: showProfileMenu }"
          >
            <ul
              class="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
              aria-label="submenu"
            >
              <li class="flex">
                <a
                  @click="test"
                  class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                  href="#"
                >
                  <svg
                    class="w-4 h-4 mr-3"
                    aria-hidden="true"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                  <router-link to="/account">
                    จัดการบัญชี
                  </router-link>
                </a>
              </li>
              <li class="flex">
                <a
                  @click="test"
                  class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <router-link to="/purchase">
                    รายการสั่งซื้อ
                  </router-link>
                </a>
              </li>
              <li class="block">
                <router-link
                  @click="onClickLogout"
                  to="/login"
                  class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                >
                  <svg
                    class="w-4 h-4 mr-3"
                    aria-hidden="true"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    ></path>
                  </svg>
                  <span>ออกจากระบบ</span>
                </router-link>
              </li>
            </ul>
          </template>
        </div>
      </div>
    </nav>
    <!-- Mobile Menu -->
    <div
      v-show="showModelMenu"
      class="absolute inset-x-0 top-0 p-2 transition origin-top transform"
    >
      <div
        class="bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5"
      >
        <div class="flex items-center justify-between px-5 pt-4">
          <div>
            <router-link
              to="/"
              class="block text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
            >
              หน้าแรก
            </router-link>
          </div>
          <div class="-mr-2">
            <button
              @click="onClickMenu"
              type="button"
              class="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600"
            >
              <span class="sr-only">Close menu</span>
              <svg
                class="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          class="pb-6"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="main-menu"
        >
          <div class="px-2 pt-2 pb-3 space-y-1">
            <router-link
              @click="onClickMenu"
              v-if="!this.$store.state.loginlogout"
              to="/cart"
              class="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
            >
              รถเข็น
            </router-link>
            <router-link
              v-if="!this.$store.state.loginlogout"
              to="/purchase"
              class="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
            >
              รายการสั่งซื้อ
            </router-link>
            <router-link
              v-if="!this.$store.state.loginlogout"
              to="/account"
              class="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
            >
              บัญชีของฉัน
            </router-link>
            <router-link
              v-if="!this.$store.state.loginlogout"
              @click="onClickLogout"
              to="/login"
              class="block px-3 pt-2 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
            >
              ออกจากระบบ
            </router-link>
            <router-link
              v-if="this.$store.state.loginlogout"
              to="/register"
              class="block px-3 py-4 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
            >
              สมัครสมาชิก
            </router-link>
            <router-link
              v-if="this.$store.state.loginlogout"
              to="/login"
              class="block px-3 pt-4 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
            >
              เข้าสู่ระบบ
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import http from '@/services/BackendService'
export default {
  data() {
    return {
      name: 'Navbar',
      login: true,
      // ตัวแปร user
      uid: '',
      role: '',
      userAvatar: '',
      userUsername: '',
      userEmail: '',
      // ตัวแปร เปิดปิดเมนู
      showProfileMenu: false,
      showModelMenu: false,
    }
  },
  methods: {
    // เมื่อล็อคอินจะมี profile ออกมา
    async getUserAvatar() {
      let getAvatar = JSON.parse(localStorage.getItem('user'))
      let res = getAvatar.user
      this.uid = res.id
      this.role = res.role
    },
    getModelUser(id) {
      http
        .get(`users/${id}`)
        .then((response) => {
          this.userAvatar = response.data.avatar
          this.userUsername = response.data.username
          this.userEmail = response.data.email
        })
        .catch(function (error) {
          console.error(error)
        })
    },
    // เรียกใช้ ฟังชัน
    callFunction() {
      if (!this.$store.state.loginlogout || localStorage.getItem('user')) {
        this.getUserAvatar()
        this.getModelUser(this.uid)
      }
    },
    // เปิดปิด menu
    onClickMenu() {
      this.showModelMenu = !this.showModelMenu
    },
    // เปิดปุ่ม profile
    mouseover() {
      this.showProfileMenu = true
    },
    mouseleave() {
      this.showProfileMenu = false
    },
    // ปุ่มล็อคเอา
    onClickLogout() {
      // เรียก API Logout
      http
        .post('logout')
        .then(() => {
          localStorage.removeItem('user')
          // กลับไปหน้า login
          this.$router.push({ name: 'Login' })
          // window.location.assign('Login')
          // console.log('Logout')
          this.$store.commit('onClickLog')
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
          }
        })
    },
  },
  watch: {
    $route(to) {
      if (
        to.path === '/' ||
        (!this.$store.state.loginlogout && localStorage.getItem('user'))
      ) {
        this.callFunction()
      }
      if (to.path) {
        this.showModelMenu = false
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
    },
  },
  mounted() {
    this.callFunction()
    this.$store.commit('onClickLog')
  },
}
</script>
<style lang="css">
.router-link-active,
.router-link-exact-active {
  color: green;
}
</style>
