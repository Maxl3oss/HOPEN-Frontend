<template>
  <header class="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
    <div
      class="container flex items-center justify-between h-full px-6 mx-auto text-gray-500 dark:text-purple-300"
    >
      <!-- Mobile hamburger -->
      <button
        @click="onclickMobileMenu"
        class="p-1 mr-5 -ml-1 rounded-md xl:hidden focus:outline-none focus:shadow-outline-purple"
      >
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          ></path>
        </svg>
      </button>
      <!-- Search input -->
      <div class="flex justify-center flex-1 lg:mr-32"></div>
      <ul class="flex items-center flex-shrink-0 space-x-6">
        <!-- Notifications menu -->
        <li class="relative">
          <button
            @click="onClickHome"
            class="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
            aria-label="Notifications"
            aria-haspopup="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span
              aria-hidden="true"
              class="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
            ></span>
          </button>
        </li>

        <!-- Profile menu -->
        <li class="relative">
          <div
            v-on:mouseover="mouseover"
            v-on:mouseleave="mouseleave"
            class="inline-block text-center pr-4 py-2"
          >
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
                <li class="lock">
                  <a
                    @click="onClickLogout"
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
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      ></path>
                    </svg>
                    <span>ออกจากระบบ</span>
                  </a>
                </li>
              </ul>
            </template>
          </div>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import http from '@/services/BackendService'
export default {
  data() {
    return {
      // ตัวแปร user
      userAvatar: '',
      userUsername: '',
      userEmail: '',
      // ตัวแปร เปิดปิดเมนู
      showProfileMenu: false,
      showNotificationMenu: false,
    }
  },
  methods: {
    // เปิดปุ่ม profile
    mouseover() {
      this.showProfileMenu = true
    },
    mouseleave() {
      this.showProfileMenu = false
    },
    // ดึงรูป
    async getUserAvatar() {
      let getAvatar = JSON.parse(localStorage.getItem('user'))
      let res = getAvatar.user
      this.role = res.role
      this.userAvatar = res.avatar
      this.userUsername = res.username
      this.userEmail = res.email
      this.getAvatar = getAvatar
    },
    onclickMobileMenu() {
      this.$store.commit('toggleSideMenu')
    },
    onClickShowProfile() {
      this.showProfileMenu = !this.showProfileMenu
      this.showNotificationMenu = false
    },
    onClickHome() {
      this.$router.push({ name: 'Home' })
    },
    onClickLogout() {
      // เรียก API Logout
      http
        .post('logout')
        .then(() => {
          localStorage.removeItem('user')
          // กลับไปหน้า login
          this.$router.push({ name: 'Login' })
          // console.log('Logout')
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
      if (to.path) {
        this.$store.commit('toggleSideMenu')
      }
    },
  },
  mounted() {
    // อ่านสินค้าจาก API
    this.getUserAvatar()
  },
}
</script>
