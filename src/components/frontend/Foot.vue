<template>
  <footer class="text-white bg-gray-900">
    <div class="container pt-20 mx-auto">
      <div class="flex flex-wrap">
        <div class="w-full p-4 xl:mr-auto xl:w-4/12">
          <img
            src="@/assets/img/hopen.png"
            alt="logo"
            class="h-20"
            width=""
            height=""
          />
          <h4 class="text-2xl font-bold text-gray-400">HOPEN</h4>
        </div>
        <div class="w-full p-4 xl:w-2/12 sm:w-4/12">
          <h4 class="mb-8 text-lg font-medium text-gray-400 uppercase">
            Equipment
          </h4>
          <ul>
            <li class="mb-4">
              <a href="https://vuejs.org/" class="hover:text-indigo-200">
                Vue.js
              </a>
            </li>
            <li class="mb-4">
              <a href="https://laravel.com/" class="hover:text-indigo-200">
                Laravel
              </a>
            </li>
            <li class="mb-4">
              <a
                href="https://www.npmjs.com/package/axios"
                class="hover:text-indigo-200"
              >
                Axios
              </a>
            </li>
            <li class="mb-4">
              <a
                href="https://laravel.com/docs/9.x/sanctum"
                class="hover:text-indigo-200"
              >
                Sanctum
              </a>
            </li>
          </ul>
        </div>
        <div class="w-full p-4 xl:w-2/12 sm:w-4/12">
          <h4 class="mb-8 text-lg font-medium text-gray-400 uppercase">
            Created By
          </h4>
          <ul>
            <li class="mb-4 flex">
              <img
                class="w-6 h-6"
                src="https://cdn.icon-icons.com/icons2/2415/PNG/512/facebook_original_logo_icon_146526.png"
                alt=""
              />
              <a
                href="https://web.facebook.com/PoundNarongrid/"
                class="hover:text-indigo-200 ml-1"
              >
                Narongrid Naorkham
              </a>
            </li>
            <li class="mb-4 flex">
              <img
                class="w-6 h-6"
                src="https://cdn.icon-icons.com/icons2/2415/PNG/512/facebook_original_logo_icon_146526.png"
                alt=""
              />
              <a
                href="https://web.facebook.com/wisit.dangkona"
                class="hover:text-indigo-200 ml-1"
              >
                Wisit dangkona
              </a>
            </li>
            <li class="mb-4 flex">
              <img
                class="w-6 h-6"
                src="https://cdn.icon-icons.com/icons2/2415/PNG/512/facebook_original_logo_icon_146526.png"
                alt=""
              />
              <a
                href="https://web.facebook.com/kangdarn.boonkue"
                class="hover:text-indigo-200 ml-1"
              >
                Kangsadan Bunkea
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="p-4 mt-5 text-center">
        <hr class="mb-4 opacity-25" />
        <p class="text-sm"></p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>
