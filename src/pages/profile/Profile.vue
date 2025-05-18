<script setup lang="ts">
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {useRoute} from "vue-router";
import {ref, computed, onMounted} from "vue";
import Summary from "@/pages/profile/components/Summary.vue";
import ChangePassword from "@/pages/profile/components/ChangePassword.vue";
import CompleteProfile from "@/pages/profile/components/CompleteProfile.vue";
import type {SessionUser} from "@/types/services/auth.types";



  const userStore = localStorage.getItem('allUserData') || "";
  const  user = JSON.parse(userStore);
  console.log('user from profile', user)
  onMounted(()=>{
  
  if(user?.accountComplete === true){
    select('home')
  }else{
    activeTab.value = "complete-profile"
    select('complete-profile')
  }
})



const activeTab = ref<string>("home")

const route = useRoute()
const  selectedComponent =  ref(Summary)

function select(name: string) {
  activeTab.value = name
  switch (name) {
    case "home":
      selectedComponent.value = Summary
      break;
    case "password":
      selectedComponent.value = ChangePassword
      break;
      case "complete-profile":
      selectedComponent.value = CompleteProfile
      break;

  }
}

</script>

<template>
  <div class="p-2 container-md mx-auto flex flex-col gap-5">

    <div class="flex justify-end items-center gap-2 w-full p-2">
      <Breadcrumbs/>
    </div>
    <div class="w-full flex flex-col bg-white rounded-sm shadow ">
      <span class=" font-medium p-4 uppercase">{{ route.name }}</span>
      <div class="border "></div>
      <div class="w-full p-4">
        <div class="grid lg:grid-cols-4 gap-2 w-full mx-auto scrollbar-thin scrollbar-thumb-primary-700 scrollbar-track-primary-100 border-b border-gray-200">
          <div v-if="user?.accountComplete === false" :class="activeTab === 'complete-profile' ? 'tab-active' : 'tab'" @click="select('complete-profile')">
            Complete Profile
          </div>
          <div :class="activeTab === 'home' ? 'tab-active' : 'tab'" @click="select('home')">
            Account Summary
          </div>
          <div :class="activeTab === 'password' ? 'tab-active' : 'tab'" @click="select('password')">
            Change Password
          </div>
        </div>
      </div>
      <div class="w-full">
        <Component  :is="selectedComponent" />
      </div>
    </div>
  </div>
</template>

<style scoped>

.tab {
  @apply text-sm bg-gray-50 rounded-t cursor-pointer text-gray-800 w-full text-center py-2 px-4 gap-3 border-b-2 border-gray-200;
}

.tab:hover {
  @apply bg-primary-50 text-primary-700 border-b-2 border-primary-400 rounded-t;
}

.tab-active {
  @apply text-sm bg-primary-50 rounded-t cursor-pointer font-bold text-primary-700 text-center w-full py-2 px-4 gap-3 border-b-4 border-primary-700;
}

</style>