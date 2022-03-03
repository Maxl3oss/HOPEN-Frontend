import { createStore } from "vuex";

export default createStore({
  // State คือพื้นที่สำหรับเก็บตัวแปร object หรือค่าต่างๆ ชองแอพเราไว้
  state: {
    cart: [],
    totalCart: [],
    oders: [],
    // จำนวน
    qty: "",
    // ตัวแปรคิดเงิน
    TotalPrice: "",
    // เปลี่ยนค่าเพื่อเช็ค
    showSideMenu: true,
    loginlogout: true,
    // เก็บ id ของ product เพื่อนำ id ไปหา ใน detail
    PID: "",
    // เก็บ id ของ order เพื่อนำ id ไปหา cart
    OID: "",
    // เก็บ id ของ user เพื่อนำ id ไปหา customers
    UID: "",
  },

  // ฟังก์ชันการทำงานบางอย่าง ที่ต้องการไปสั่งเปลี่ยนแปลงค่าใน state
  mutations: {
    /*******************
     * ฟังก์ชันรับค่า Cart
     * ********************/
    // เพิ่มจำนวนสินค้า
    addCart(state, cart) {
      let productInCart = state.cart.find((product) => {
        // product.item.id คือสิ่งที่จะหา
        // cart.item.id คือของข้างในที่จะหา
        return product.item.id == cart.item.id;
      });
      // ถ้า productInCart เป็นจริง
      if (productInCart) {
        productInCart.qty += cart.qty;
        return;
      }
      // console.log(productInCart);
      state.cart.push(cart);
    },
    // ลบจำนวนสินค้า
    subCart(state, cart) {
      let productInCart = state.cart.find((product) => {
        // product.item.id คือสิ่งที่จะหา
        // cart.item.id คือของข้างในที่จะหา
        return product.item.id == cart.item.id;
      });
      // ถ้า productInCart เป็นจริง
      if (productInCart) {
        if (productInCart.qty == 1) {
          return;
        }
        productInCart.qty += cart.qty;
        return;
      }
      // console.log(productInCart);
      state.cart.push(cart);
    },
    // ฟังก์ชันซ่อนแสดงเมนูด้านข้าง
    toggleSideMenu(state) {
      state.showSideMenu = !state.showSideMenu;
    },
    // ฟังก์เช็คว่า login รึยัง
    onClickLog(state) {
      if (localStorage.getItem("user")) {
        state.loginlogout = false;
      } else {
        state.loginlogout = true;
      }
    },
    // เก็บค่า Product id
    onClickProductID(state, id) {
      state.PID = id;
    },
    // เก็บค่า Order id
    onClickOrderID(state, id) {
      state.OID = id;
    },
    // เก็บค่า user id
    onClickUserID(state, id) {
      state.UID = id;
    },
    /*******************
     * ฟังก์ชันลบ cart
     ********************/
    delCart(state, cart) {
      // console.log(cart);
      state.cart.splice(state.cart.indexOf(cart), 1);
    },
    /*******************
     * ฟังก์ชันเพิ่มลบจำนวน
     ******************/
    addQTY(state, cart) {
      // เพิ่มจำนวนสินค้า
      let productInCart = state.cart.find((product) => {
        // product.item.id คือสิ่งที่จะหา
        // cart.item.id คือของข้างในที่จะหา
        return product.item.id == cart.item.id;
      });
      // ถ้า productInCart เป็นจริง
      if (productInCart) {
        productInCart.qty += cart.qty;
        return;
      }
    },
    /*********************************
     * ฟังก์ชันรีเซ็ตค่าเริ่มต้นของ state carts
     *********************************/
    resetStateCarts(state) {
      // Object.assign(state, getDefaultState());
      state.cart = state.cart = [];
      state.totalCart = state.totalCart = [];
      state.oders = state.oders = [];
      state.qty = state.qty = "";
      state.TotalPrice = state.TotalPrice = "";
    },
  },
  getters: {
    // เก็บค่าเข้าใน array cart
    Displaycart: (state) => {
      return state.cart.map((cart) => cart);
    },
    // จำนวนสินค้าทั้งหมด
    DisplayQtyCart: (state) => {
      return state.cart.reduce((acc, cart) => acc + cart.qty, 0);
    },
    // คิดราคาใน cart ทั้งหมด ราคา * จำนวน
    totalCart: (state) => {
      return state.cart.reduce(
        (acc, cart) => acc + cart.item.price * cart.qty,
        0
      );
    },
  },
  actions: {},

  modules: {},
});
