<script setup lang="ts">
import SideMenu from "@/pages/layouts/SideMenu.vue";
import Navbar from "@/pages/layouts/Navbar.vue";
</script>

<template>
<div class="flex flex-col lg:flex-row">
  <SideMenu />
  <div class="bg-gray-100 lg:w-full h-screen overflow-y-auto">
    <Navbar />
    <RouterView />
  </div>
</div>
</template>

<style scoped>

</style>