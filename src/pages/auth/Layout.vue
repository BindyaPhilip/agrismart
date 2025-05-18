<script setup lang="ts">
import {EnvelopeIcon, MagnifyingGlassIcon} from "@heroicons/vue/24/outline";
import {ref} from "vue";
const trackingInput =  ref<String>("")
</script>
<template>
  <div class="w-full h-full bg-green-800 bg-gradient-to-tr container-full min-h-screen p-8 from-green-500 to-green-950">
    <div class="flex flex-col lg:flex-row gap-2 lg:gap-5 lg:mt-36">
      <div :class="`lg:w-3/4 gap-2 p-5 flex-col flex ${trackingInput === '' && 'justify-center transition duration-1000 ease-in-out'}`">
         <!-- Stylish AgriSmart Title -->
      <div class="text-center lg:text-left">
        <h1 :class="`text-5xl font-extrabold tracking-wide text-green-100 drop-shadow-md duration-500 ${trackingInput === '' && 'animate-pulse'}`">
          Agri<span class="text-lime-300">Smart</span>
        </h1>
      </div>
        <p class="text-green-100 font-bold p-1 text-xl">Detect Early . Act Fast . Grow Smart</p>
        <div class="capitalize mx-auto w-full lg:mx-0 mt-3">
          <div class="w-full lg:w-1/2 py-2 px-6 border-green-300 bg-green-50 border-2 rounded-full shadow-lg items-center flex gap-2">
            <!-- <input type="text" v-model="trackingInput"  class="w-full bg-inherit text-lg p-2 focus:outline-none text-green-900"> -->
           
          </div>
        </div>
        <!-- <label class="text-xs text-green-100 p-1">Tracking your mail here in real-time</label> -->
      </div>
      <div class="bg-green-100 xl:w-2/6 rounded-xl p-5 shadow-md shadow-green-900 flex flex-col">
        <RouterView />
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>