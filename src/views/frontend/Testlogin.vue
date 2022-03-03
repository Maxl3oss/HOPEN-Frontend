<template>
  <div class="pt-32 pb-20 bg-gray-100 bg-opacity-50">
    <div class="text-center">
      <button
        @click="onClick"
        class="bg-indigo-100 text-indigo-700 p-3 rounded"
      >
        login
      </button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {}
  },
  methods: {
    onClick() {
      axios
      axios
        .post(
          'https://hopenapi.000webhostapp.com/api/login',
          {
            email: 'hom@gmail.com',
            password: '123456',
          },
          { useCredentails: true },
        )
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
  },
}
</script>
