<script setup lang="ts">
import dateFormat from "dateformat";
import { ChevronDownIcon} from "@heroicons/vue/24/outline";
import {ref} from "vue";

const detailOpen =  ref<boolean>(false)

</script>

<template>
  <div class="grid grid-cols-1 gap-2 text-sm w-full">
    <div class="grid grid-cols-3 lg:grid-cols-7 gap-2 font-bold text-md text-primary border-b border-primary-950 mt-6 px-2 pb-3  " id="headers">
      <span>Reg. No</span>
      <span>Full Name</span>
      <span class="hidden lg:block">Registered On</span>
      <span class="hidden lg:block">Created By</span>
      <span class="hidden lg:block">Status</span>
      <span class="hidden lg:block">Created On</span>
      <span> </span>
    </div>
<!--    <div class="grid grid-cols-7 p-2 " :class="(businesses[businesses.length -1].id !== business.id)?'border-b':''" id="row">-->
    <div class="grid grid-cols-3 lg:grid-cols-7 p-2 border-b border-gray-400  px-2 pb-3   " id="row">
      <div class="col-span-2 lg:col-span-6">
        <div class="grid grid-cols-2 lg:grid-cols-6 mx-2 gap-2 p-2 py-5 text-gray-600">
          <span>2134432</span>
          <span class="capitalize">Sewalu Mukasa Steven</span>
          <span class="hidden lg:block">{{dateFormat("12-12-2023", "d mmmm , yyyy")}}</span>
          <span class="hidden lg:block">smstoroc </span>
          <span class="text-green-600 hidden lg:block">Active</span>
          <span class="hidden lg:block">{{ dateFormat("12-11-2022", "d mmmm , yyyy")}} </span>
        </div>

      </div>
      <div class="col-span-1 text-end mr-4 relative">

        <button  @click="detailOpen =  !detailOpen" :class="`rounded-lg bg-primary-900 text-white duration-300 ${detailOpen && 'rotate-180'}`"><ChevronDownIcon  class=" w-9 h-9 p-2" /></button>

        <div v-if="detailOpen" @mouseleave="detailOpen = false" class="absolute right-0 top-8 z-10 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
          <div class="py-1" role="none">
            <div class="text-left cursor-pointer text-gray-700 block w-full px-4 py-2 text-sm hover:bg-primary-100" role="menuitem" tabindex="-1" id="menu-item-0">Overview</div>
            <div class="text-left cursor-pointer text-gray-700 block w-full px-4 py-2 text-sm hover:bg-primary-100" role="menuitem" tabindex="-1" id="menu-item-0">Edit</div>

          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-3 lg:grid-cols-7 p-2  px-2 pb-3   " id="row">
      <div class="col-span-2 lg:col-span-6">
        <div class="grid grid-cols-2 lg:grid-cols-6 mx-2 gap-2 p-2 py-5 text-gray-600">
          <span>2134432</span>
          <span class="capitalize">Sewalu Mukasa Steven</span>
          <span class="hidden lg:block">{{dateFormat("12-12-2023", "d mmmm , yyyy")}}</span>
          <span class="hidden lg:block">smstoroc </span>
          <span class="text-green-600 hidden lg:block">Active</span>
          <span class="hidden lg:block">{{ dateFormat("12-11-2022", "d mmmm , yyyy")}} </span>
        </div>

      </div>
      <div class="col-span-1 text-end mr-4 relative">

        <button  @click="detailOpen =  !detailOpen" :class="`rounded-lg bg-primary-900 text-white duration-300 ${detailOpen && 'rotate-180'}`"><ChevronDownIcon  class=" w-9 h-9 p-2" /></button>

        <div v-if="detailOpen" @mouseleave="detailOpen = false" class="absolute right-0 top-8 z-10 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
          <div class="py-1" role="none">
            <div class="text-left cursor-pointer text-gray-700 block w-full px-4 py-2 text-sm hover:bg-primary-100" role="menuitem" tabindex="-1" id="menu-item-0">Overview</div>
            <div class="text-left cursor-pointer text-gray-700 block w-full px-4 py-2 text-sm hover:bg-primary-100" role="menuitem" tabindex="-1" id="menu-item-0">Edit</div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>