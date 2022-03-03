<template>
  <div class="container pt-40 pb-20 mx-auto text-center lg:w-4/5">
    <p class="text-5xl">
      ทำการสั่งซื้อ
    </p>
    <div class="bg-white">
      <main class="my-8">
        <div class="container mx-auto px-6">
          <div class="flex flex-col lg:flex-row mt-8">
            <div class="w-full lg:w-1/2 order-2">
              <form @submit.prevent="onSubmit" class="lg:w-3/4">
                <div v-if="this.customers.length == '0'">
                  <div class="">
                    <h4 class="text-sm text-gray-500 font-medium">
                      ที่อยู่ในการจัดส่ง
                    </h4>
                    <h4
                      class="ml-3 text-left mt-5 text-sm text-gray-700 font-medium"
                    >
                      ชื่อ-นามสกุล
                    </h4>
                    <input
                      v-model="fullname"
                      type="text"
                      class="text-sm text-gray-700 focus:outline-none px-3 w-full border-2 rounded h-12"
                      placeholder="xxxxxx xxxx"
                    />
                    <h4
                      class="ml-3 text-left mt-5 text-sm text-gray-700 font-medium"
                    >
                      เบอร์โทรศัพท์
                    </h4>
                    <input
                      v-model="tel"
                      type="tel"
                      pattern="[0-9]*"
                      class="text-sm text-gray-700 focus:outline-none px-3 w-full border-2 rounded h-12"
                      placeholder="xxx-xxxx-xxx"
                    />
                    <h4
                      class="ml-3 text-left mt-5 text-sm text-gray-700 font-medium"
                    >
                      จังหวัด, ตำบล, อำเภอ, รหัสไปรษณีย์, บ้านเลขที่, ซอย
                    </h4>
                    <input
                      v-model="address"
                      type="text"
                      class="text-sm text-gray-700 focus:outline-none px-3 w-full border-2 rounded h-12"
                      placeholder="xxx, xxx, xxx"
                    />
                  </div>
                  <div
                    class="text-sm text-gray-700 flex items-center justify-between mt-8"
                  >
                    <button
                      @click="ChangOpenAddress"
                      class="flex items-center text-gray-700 text-sm font-medium rounded hover:underline focus:outline-none"
                    >
                      <svg
                        class="h-5 w-5"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
                      </svg>
                      <span class="mx-2">Back</span>
                    </button>
                    <button
                      @click="onClickAddress"
                      class="flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                    >
                      <span>บันทึกที่อยู่</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 mx-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <!-- /////////////////////////////////////////////// -->
                <!-- แก้ไขที่อยู่ -->
                <!-- /////////////////////////////////////////////// -->
                <div v-else-if="this.showModelChangAddresses">
                  <h4 class="text-sm text-gray-500 font-medium">
                    วิธีการชำระ
                  </h4>
                  <div class="mt-6">
                    <div
                      class="flex items-center justify-between w-full bg-white rounded-md border-2 hover:border-blue-500 p-4 focus:outline-none"
                    >
                      <label class="flex items-center">
                        <input
                          v-model="order_paytype"
                          value="cash on delivery"
                          type="radio"
                          class="form-radio h-5 w-5 text-blue-600"
                        />
                        <span class="ml-2 text-sm text-gray-700">
                          เก็บเงินปลายทาง
                        </span>
                      </label>
                      <span class="text-gray-600 text-sm">฿ 65</span>
                    </div>
                    <div
                      class="mt-5 flex items-center justify-between w-full bg-white rounded-md border-2 hover:border-blue-500 p-4 focus:outline-none"
                    >
                      <label class="flex items-center">
                        <input
                          v-model="order_paytype"
                          value="pay credit card"
                          type="radio"
                          class="form-radio h-5 w-5 text-blue-600"
                        />
                        <span class="ml-2 text-sm text-gray-700">
                          บัตรเครดิต/บัตรเดบิต
                        </span>
                      </label>

                      <span class="text-gray-600 text-sm">฿ 45</span>
                    </div>
                  </div>

                  <div class="mt-8">
                    <h4 class="text-sm text-gray-500 font-medium">
                      ที่อยู่ในการจัดส่ง
                    </h4>
                    <h4
                      class="ml-3 text-left mt-5 text-sm text-gray-700 font-medium"
                    >
                      ชื่อ-นามสกุล
                    </h4>
                    <input
                      v-model="cfullname"
                      type="text"
                      class="text-sm text-gray-700 focus:outline-none px-3 w-full border-2 rounded h-12"
                      placeholder="xxxxxx xxxx"
                    />
                    <h4
                      class="ml-3 text-left mt-5 text-sm text-gray-700 font-medium"
                    >
                      เบอร์โทรศัพท์
                    </h4>
                    <input
                      v-model="ctel"
                      type="tel"
                      pattern="[0-9]*"
                      class="text-sm text-gray-700 focus:outline-none px-3 w-full border-2 rounded h-12"
                      placeholder="xxx-xxxx-xxx"
                    />
                    <h4
                      class="ml-3 text-left mt-5 text-sm text-gray-700 font-medium"
                    >
                      จังหวัด, เขต/อำเภอ, รหัสไปรษณีย์
                    </h4>
                    <input
                      v-model="caddress"
                      type="text"
                      class="text-sm text-gray-700 focus:outline-none px-3 w-full border-2 rounded h-12"
                      placeholder="xxx, xxx, xxx"
                    />
                  </div>

                  <div
                    class="text-sm text-gray-700 flex items-center justify-between mt-8"
                  >
                    <button
                      @click="ChangOpenAddress"
                      class="flex items-center text-gray-700 text-sm font-medium rounded hover:underline focus:outline-none"
                    >
                      <svg
                        class="h-5 w-5"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
                      </svg>
                      <span class="mx-2">Back step</span>
                    </button>

                    <button
                      @click="submitFormEdit(cid)"
                      class="flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                    >
                      <span>บันทึกการเปลี่ยนแปลง</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 mx-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <!-- ///////////////////////////////////////////////////////////////////////// -->
                <!-- เมื่แไม่ตรงกันเงื่อนไขไหนเลย -->
                <!-- ///////////////////////////////////////////////////////////////////////// -->
                <div v-else>
                  <h4 class="text-sm text-gray-500 font-medium">
                    วิธีการชำระ
                  </h4>
                  <div class="mt-6">
                    <div
                      class="flex items-center justify-between w-full bg-white rounded-md border-2 hover:border-blue-500 p-4 focus:outline-none"
                    >
                      <label class="flex items-center">
                        <input
                          @click="onClickCloseSlip"
                          v-model="order_paytype"
                          value="cash on delivery"
                          type="radio"
                          class="form-radio h-5 w-5 text-blue-600"
                        />
                        <span class="ml-2 text-sm text-gray-700">
                          เก็บเงินปลายทาง
                        </span>
                      </label>
                      <span class="text-gray-600 text-sm">฿ 65</span>
                    </div>
                    <div
                      class="mt-5 flex items-center justify-between w-full bg-white rounded-md border-2 hover:border-blue-500 p-4 focus:outline-none"
                    >
                      <label for="order_paytype" class="flex items-center">
                        <input
                          @click="onClickOpenSlip"
                          v-model="order_paytype"
                          value="pay credit card"
                          type="radio"
                          class="form-radio h-5 w-5 text-blue-600"
                        />
                        <span class="ml-2 text-sm text-gray-700">
                          บัตรเครดิต/บัตรเดบิต
                        </span>
                      </label>
                      <span class="text-gray-600 text-sm">฿ 45</span>
                    </div>
                    <!-- ///////////////////////////
                    //slip
                    //////////////////////   -->
                    <div v-if="showModelSilp" class="mt-5">
                      <label
                        class="text-sm text-gray-500 font-medium"
                        for="image"
                      >
                        รูปภาพสลิป
                      </label>
                      <p>กรุงไทย xxx-xxx-xxxxx</p>
                      <div class="mt-4">
                        <img v-if="imgUrl" :src="imgUrl" class="w-ful" />
                      </div>
                      <input
                        ref="fileupload"
                        @change="onFileChange"
                        class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow"
                        type="file"
                      />
                      <!-- แจ้งเตือน -->
                    </div>
                    <!-- แจ้งเตือน -->
                    <div
                      v-if="v$.order_paytype.$error"
                      class="mt-2 text-sm text-red-500"
                    >
                      {{ v$.order_paytype.$errors[0].$message }}
                    </div>
                    <!-- end -->
                  </div>

                  <div v-for="item in customers" :key="item.id">
                    <div class="mt-8">
                      <div class="">
                        <h4 class="text-sm text-gray-500 font-medium">
                          ที่อยู่ในการจัดส่ง
                        </h4>
                      </div>
                      <div class="text-sm text-gray-500 font-medium">
                        <h4 class="text-left mt-3 text-sm text-gray-700">
                          {{ item.fullname }} {{ item.tel }} {{ item.address }}
                        </h4>
                        <button
                          class="text-sm underline text-gray-500 font-medium hover:text-red-500"
                          @click="getAddresses(item.id)"
                          href=""
                        >
                          เปลี่ยน
                        </button>
                      </div>
                    </div>
                    <div
                      class="text-sm text-gray-700 flex items-center justify-between mt-8"
                    >
                      <button
                        @click="ChangOpenAddress"
                        class="flex items-center text-gray-700 text-sm font-medium rounded hover:underline focus:outline-none"
                      >
                        <svg
                          class="h-5 w-5"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
                        </svg>
                        <span class="mx-2">Back</span>
                      </button>
                      <button
                        @click="Checkout(item.id)"
                        class="flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                      >
                        <span>สั่งซื้อ</span>
                        <svg
                          class="h-5 w-5 mx-2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <!-- end loop customers -->
                </div>
              </form>
            </div>
            <div
              class="w-full mb-8 flex-shrink-0 order-1 lg:w-1/2 lg:mb-0 lg:order-2"
            >
              <div class="flex justify-center lg:justify-end">
                <div
                  class="shadow-sm border border-gray-200 rounded-md max-w-md w-full px-4 py-3"
                >
                  <div class="flex items-center justify-between">
                    <h3 class="text-gray-700 font-medium">
                      สินค้าทั้งหมด ({{ this.$store.getters.DisplayQtyCart }})
                    </h3>
                  </div>
                  <div
                    v-for="product in this.$store.getters.Displaycart"
                    :key="product.item.id"
                    class="flex justify-between mt-6"
                  >
                    <div class="flex">
                      <img
                        class="h-20 w-20 object-cover rounded"
                        :src="product.item.image"
                        alt=""
                      />
                      <div class="mx-3">
                        <h3 class="text-left text-sm text-gray-600">
                          {{ product.item.name }}
                        </h3>
                        <div class="flex items-center mt-2">
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
                          <span class="text-gray-700 mx-2">
                            {{ product.qty }}
                          </span>
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
                      </div>
                    </div>
                    <span class="text-gray-600">
                      ฿ {{ formatPrice(product.item.price * product.qty) }}
                    </span>
                  </div>
                  <div class="text-xs mt-5 flex justify-between text-gray-500">
                    <p>รวมค่าสินค้า</p>
                    <p class="ml-4">
                      ฿ {{ formatPrice(this.$store.getters.totalCart) }}
                    </p>
                  </div>
                  <div class="text-xs flex justify-between text-gray-500">
                    <p>ค่าจัดส่ง</p>
                    <p class="ml-4">฿ {{ this.charge }}</p>
                  </div>
                  <div class="mt-1 flex justify-between">
                    <p>รวมการสั่งซื้อ</p>
                    <p class="ml-4">
                      ฿
                      {{
                        formatPrice(this.$store.getters.totalCart + this.charge)
                      }}
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

  <div></div>
</template>
<script>
import http from '@/services/BackendService'
import useValidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
export default {
  data() {
    return {
      /** ตัวแปรสำหรับเรียกใช้งาน Validation */
      v$: useValidate(),
      // ค่า Api
      amount: 0,
      product: [],
      customers: [],
      // แสดงเพิ่มที่อยู่
      showAddress: false,
      showModelChangAddresses: false,
      // ตัวแปร
      order_paytype: '',
      fullname: '',
      tel: '',
      address: '',
      // ตัวแปรเปลี่ยนที่อยู่
      cid: '',
      cfullname: '',
      ctel: '',
      caddress: '',
      // ตัวแปรรับใบสลิป
      showModelSilp: false,
      charge: 0,
      imgSrc: '',
      fileName: '',
      imgUrl: '',
      file: null,
      // ตัวแปรแจ้งเตือน
    }
  },
  methods: {
    // เช็คว่ามีของมูลอยู่แล้วรึป่าว
    async getCustomers() {
      let resdata = JSON.parse(localStorage.getItem('user'))
      let keyword = resdata.user.id
      let res = await http.get(`customers/search/${keyword}`)
      let resCTM = res.data
      this.customers = resCTM
      // console.log('customers', this.customers)
    },
    ///////////////////////
    // เปิดปิดการเปลี่ยนที่อยู่
    /////////////////////
    getAddresses(id) {
      http.get(`customers/${id}`).then((response) => {
        this.cid = response.data.id
        this.cfullname = response.data.fullname
        this.ctel = response.data.tel
        this.caddress = response.data.address
        this.ChangOpenAddress()
      })
    },
    ChangOpenAddress() {
      this.showModelChangAddresses = !this.showModelChangAddresses
    },
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
    //////////////////
    // บันทึกที่อยู่
    ///////////////////
    onClickAddress() {
      let data = new FormData()
      data.append('fullname', this.fullname)
      data.append('tel', this.tel)
      data.append('address', this.address)
      http.post('customers', data).then(() => {
        this.getCustomers()
        window.scrollTo(0, 0)
        // เรียกใช้งาน popup ของ sweetalert 2
        const Toast = this.$swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', this.$swal.stopTimer)
            toast.addEventListener('mouseleave', this.$swal.resumeTimer)
          },
        })
        Toast.fire({
          icon: 'success',
          title: 'บันทีกที่อยู่เรียบร้อย',
        })
      })
    },
    //////////////////
    // อัพเดทที่อยู่
    /////////////////
    // สร้างฟังก์ขันสำหรับอัพเดทข้อมูล
    submitFormEdit(id) {
      // console.log(id)
      let data = new FormData()
      data.append('fullname', this.cfullname)
      data.append('tel', this.ctel)
      data.append('address', this.caddress)
      // Send Patch request to laravel
      data.append('_method', 'PATCH')
      http
        .post(`customers/${id}`, data)
        .then(() => {
          // console.log.hidden(response.data)
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
            this.getCustomers()
            this.showModelChangAddresses = false // ปิดหน้าต่าง popup modal แก้ไข
          })
        })
        .catch((error) => {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        })
    },
    /***********************************************************************
     * ส่วนของการสั่งสินค้า
     ************************************************************************/
    // สร้างฟังก์ชันสำหรับเปิด popup เพิ่มสินค้า
    Checkout(id) {
      ///////////////////////
      // เปิดปิดการเก็บ
      /////////////////////
      this.getAddresses(id)
      // เช็ค error
      this.v$.$validate()

      let orderedItemsID = []
      let orderedItemsQty = []
      // let productDetails = []
      let productPrice = []
      let products = this.$store.getters.Displaycart
      products.forEach((product) => {
        productPrice.push(product.item.price * product.qty)
      })
      // for ดึงค่า id Product
      products.forEach((product) => {
        orderedItemsID.push(product.item.id)
      })
      // for ดึงค่า id Product
      products.forEach((product) => {
        orderedItemsQty.push(product.qty)
      })
      let data = new FormData()
      data.append('product_id', JSON.stringify(orderedItemsID))
      data.append('product_qty', JSON.stringify(orderedItemsQty))
      data.append('product_price', JSON.stringify(productPrice))
      data.append('order_qty', this.$store.getters.DisplayQtyCart)
      data.append('order_total', this.$store.getters.totalCart + this.charge)
      data.append('order_paytype', this.order_paytype)
      data.append('file', this.file)

      http.post('orders', data).then((response) => {
        // console.log(response.data)
        // เช็คจำนวนของสินค้าสินค้า
        if (response.data.status == 'จำนวนไม่พอ') {
          // console.log(response.data.status)
          const Toast = this.$swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
          })
          Toast.fire({
            icon: 'warning',
            title: 'จำนวนสินค้าทางร้านเราไม่เพียงพอ',
          })
        } else {
          const Toast = this.$swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
          })
          Toast.fire({
            icon: 'success',
            title: 'สั่งสินค้าเรียบร้อย',
          }).then(() => {
            // ลบข้อมูลในรถเข็น
            this.$store.commit('resetStateCarts')
            this.$router.push({ name: 'Purchase' })

            // console.log(response)
            // this.$router.push({ name: 'Home' })
          })
        }
      })
    },
    ///////////////////
    // อัพรูปใบสลิป
    //////////////////
    onClickOpenSlip() {
      this.showModelSilp = true
      this.charge = 45
      this.imgUrl = ''
    },
    onClickCloseSlip() {
      this.showModelSilp = false
      this.charge = 65
    },
    // สร้างฟังก์ชันเมื่อผู้ใช้มีการเลือกรูปภาพในช่องภาพสลิป
    onFileChange(e) {
      const file = e.target.files[0]
      this.file = e.target.files[0]
      this.imgUrl = URL.createObjectURL(file)
      this.eimgUrl = URL.createObjectURL(file)
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(',', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    // เช็คว่ามีสินค้ามั้ย
    checkProduct() {
      if (!this.$store.getters.DisplayQtyCart) {
        // console.log('ไม่มีสินค้า')
        this.$router.push({ name: 'Home' })
      }
    },
  },
  mounted() {
    this.getCustomers()
    this.checkProduct()
  },
  validations() {
    return {
      order_paytype: {
        required: helpers.withMessage('กรุณาเลือกวิธีการชำระเงิน', required),
      },
    }
  },
}
</script>
