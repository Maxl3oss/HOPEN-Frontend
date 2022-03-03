<template>
  <div class="container pt-40 pb-20 mx-auto text-center lg:w-4/5">
    <p class="text-5xl">ตะกร้า</p>
    <div v-if="!this.$store.getters.Displaycart.length" class="mt-2 pb-7">
      <p class="text-xl text-red-500">ไม่มีสินค้าอยู่ในตะกร้า</p>
    </div>
    <div
      v-if="this.$store.getters.Displaycart.length"
      class="flex flex-col lg:flex-row mt-8"
    >
      <div class="flow-root w-full">
        <ul role="list" class="-my-6 divide-y divide-gray-200 rounded">
          <li
            v-for="product in this.$store.getters.Displaycart"
            :key="product.item.id"
            class="mt-3 py-5 flex px-10 shadow-lg border w-full border-gray-200"
          >
            <div
              class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md"
            >
              <img
                :src="product.item.image"
                alt=""
                class="w-full h-full object-center object-cover"
              />
            </div>

            <div class="ml-auto flex-1 flex flex-col">
              <div>
                <div
                  class="flex justify-between lg:text-base text-xs font-medium text-gray-900"
                >
                  <h3>
                    <p>
                      {{ product.item.name }}
                    </p>
                  </h3>
                  <input v-model="name" type="hidden" />
                  <p class="ml-4">
                    ฿ {{ formatPrice(product.item.price * product.qty) }}
                  </p>
                </div>
                <!-- <p class="mt-1 text-sm text-gray-500">
                  ฿ {{ formatPrice() }}
                </p> -->
              </div>
              <div class="flex-1 flex items-end justify-between text-sm">
                <div class="flex flex-wrap w-auto">
                  <button @click="subQty(product.item)">
                    <svg
                      class="fill-current text-gray-600 w-3"
                      viewBox="0 0 448 512"
                    >
                      <path
                        d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                      />
                    </svg>
                  </button>
                  <p class="mx-2 border text-xs text-center w-8">
                    {{ product.qty }}
                  </p>
                  <button @click="addQty(product.item)">
                    <svg
                      class="fill-current text-gray-600 w-3"
                      viewBox="0 0 448 512"
                    >
                      <path
                        d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                      />
                    </svg>
                  </button>
                </div>

                <!-- <div class="flex flex-wrap">
                  <p class="text-gray-500">Qty</p>
                  <input
                    v-model="product.qty"
                    class="text-gray-500"
                    type="number"
                    min="1"
                  />
                </div> -->
                <div class="flex">
                  <button
                    @click="deleteCart(product)"
                    type="button"
                    class="font-medium text-red-500 hover:text-red-600"
                  >
                    ลบออก
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <!-- <div v-if="this.$store.getters.Displaycart.length" class="mt-2">
          <p class="text-xl text-gray-500">Total</p>
        </div> -->
      </div>
      <div class="pb-6 px-4 sm:px-6 lg:w-1/2 w-full max-h-40 lg:mt-0 mt-11">
        <div class="flex justify-between text-base font-medium text-gray-900">
          <p>สินค้า</p>
          <p>{{ this.$store.getters.DisplayQtyCart }} ชิ้น</p>
        </div>
        <div class="flex justify-between text-base font-medium text-gray-900">
          <p>ราคารวม</p>
          <p>฿ {{ formatPrice(this.$store.getters.totalCart) }}</p>
        </div>
        <div class="mt-6">
          <a
            @click="onclickadd"
            class="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-500 hover:bg-green-600"
            href="#"
          >
            สั่งสินค้า
          </a>
        </div>
        <div class="mt-6 flex justify-center text-sm text-center text-gray-500">
          <p>
            or
            <button
              type="button"
              class="text-green-800 font-medium hover:text-green-500"
              @click="onShopping"
            >
              เลือกซื้อสินค้าต่อ
              <span aria-hidden="true">&rarr;</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>

  <div></div>
</template>
<script>
export default {
  data() {
    return {
      // ค่า Api
      amount: 0,
      product: [],
      // แสดงเพิ่มที่อยู่
      showAddress: false,
      // ตัวแปร
      name: '',
    }
  },
  methods: {
    /***********
     * เพิ่มลบจำนวน
     ************/
    addQty(item) {
      let cart = { item, qty: 1 }
      this.$store.commit('addCart', cart)
    },
    subQty(item) {
      let cart = { item, qty: -1 }
      this.$store.commit('subCart', cart)
    },
    // ไปหน้า chackout
    onclickadd() {
      this.$router.push({ name: 'Checkout' })
    },
    // ลบของใน cart
    deleteCart(id) {
      this.$store.commit('delCart', id)
      console.log(this.$store.getters.totalCart)
    },
    // จัดเรียง ตัวเลข
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(',', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    // shopping ต่อ
    onShopping() {
      this.$router.push({ name: 'Home' })
    },
    // เช็ค user ใน localStorage
    async getUserID() {
      let getUID = JSON.parse(localStorage.getItem('user'))
      if (getUID) {
        this.uid = getUID.user.id
      } else {
        this.$router.push({ name: 'Login' })
      }
    },
  },
  mounted() {
    this.getUserID()
  },
}
</script>
