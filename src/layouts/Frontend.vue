<template>
  <Navbar />
  <main>
    <router-view />
  </main>
  <Footer />
</template>

<script>
import Navbar from "@/components/frontend/Nav.vue";
import Footer from "@/components/frontend/Foot.vue";
export default {
  name: "FrontendLayout",
  components: {
    Navbar,
    Footer,
  },
};
</script>