<script setup lang="ts">

import {
  ArrowLeftIcon, Bars3Icon,
  CogIcon, ListBulletIcon, FolderIcon,
  TruckIcon,
    HomeIcon,
  EnvelopeIcon,
  BanknotesIcon,
  PowerIcon,
  UserIcon, XMarkIcon,ChevronDownIcon,
  ChatBubbleLeftEllipsisIcon,
  ClockIcon,
  CurrencyDollarIcon
  
} from "@heroicons/vue/24/outline";
import type {SessionUser} from "@/types/services/auth.types";
import {computed, onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useAuthStore} from "@/stores/auth";
import type { User } from "@/types/services/user-mgt.types";

const isOpen = ref<boolean>(true)
const isPhoneOpen = ref<boolean>(true)
const activeTab = ref<String>('home')
const isContractCustomerOpen = ref<boolean>(false) // For toggling child visibility
const isAddressOpen = ref<boolean>(false) // For toggling child visibility
const isMessagingOpen = ref<boolean>(false) // for toggling child visibility 
const isMailProcessigOpen = ref<boolean>(false)
const route = useRoute();
const accessToken =  localStorage.getItem('accessToken')
const authStore = useAuthStore();

const parseSessionUser = (): User | null => {
  const user = localStorage.getItem('user');

  // Make sure it's not null, undefined, or the string "undefined"
  if (!user || user === 'undefined' || user === 'null') {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (error) {
    console.error('Failed to parse user from localStorage:', error);
    return null;
  }
};

const user = computed<null | User>(parseSessionUser);

const getActiveTab = (): void => {
  let path: String = route.path;
  if (route.fullPath === '/account') {
    activeTab.value = 'dashboard'
  }

  if (path.includes('image-analysis')) {
    activeTab.value = 'addresses'
  }
  // if (path.includes('contract-customer')) {
  //   activeTab.value = 'Contract Customer'
  // }
  
  //handle tab for messaging
  if (path.includes('messagingOperations')){
    activeTab.value = 'messaging'
  }

  //handle tracking
  if (path.includes('tracking')){
    activeTab.value = 'tracking'
  }
  if (path.includes('tax-payment')){
    activeTab.value = 'Tax Payment'
  }
  if (path.includes('request-delivery')){
    activeTab.value = 'Request Delivery'
  }
  if (path.includes('manage-address')) {
  activeTab.value = 'manage';
}
   if (path.includes("applications")) {
      activeTab.value = "applications";
    }
  if (path.includes('payments')) {
    activeTab.value = 'payments'
  }
  if (path.includes('slots')) {
    activeTab.value = 'eservices'
  }
  if (path.includes('settings')) {
    activeTab.value = 'settings'
  }
  if (path.includes('system-guide')) {
    activeTab.value = 'profile'
  }
  if (path.includes('model-training')) {
    activeTab.value = 'operations'
  }
  if (path.includes('community-posts')) {
    activeTab.value = 'deliveries'
  }
  if (path.includes('all-posts')) {
    activeTab.value = 'allposts'
  }
  if (path.includes('availability-slots')) {
    activeTab.value = 'Payments'
  }
   if (path.includes('bookings')) {
    activeTab.value = 'bookings'
  }
}

const toggleContractCustomer = (): void => {
  isContractCustomerOpen.value = !isContractCustomerOpen.value;
  if (isContractCustomerOpen.value) {
    isAddressOpen.value = false;
    isMessagingOpen.value = false;
    isMailProcessigOpen.value = false;
  }
};

const toggleAddress = (): void => {
  isAddressOpen.value = !isAddressOpen.value;
  if (isAddressOpen.value) {
    isContractCustomerOpen.value = false;
    isMessagingOpen.value = false;
    isMailProcessigOpen.value = false;
  }
};

const toggleMessaging = (): void => {
  isMessagingOpen.value = !isMessagingOpen.value;
  if (isMessagingOpen.value) {
    isContractCustomerOpen.value = false;
    isAddressOpen.value = false;
    isMailProcessigOpen.value = false;
  }
};

const toggleMailProcessing = (): void => {
  isMailProcessigOpen.value = !isMailProcessigOpen.value;
  if (isMailProcessigOpen.value) {
    isContractCustomerOpen.value = false;
    isAddressOpen.value = false;
    isMessagingOpen.value = false;
  }
};


const logout = (): void => {
  authStore.logout()
}

watch(route, () => {
  getActiveTab();
})

onMounted(() => {
  getActiveTab();
  // authStore.validateToken(accessToken || '')
})

  const error = computed<any | null>(() => {
    return authStore.validationError ? authStore.validationError : null;
  })
  watch(error,(val)=>{
 
    if(val?.error){

     authStore.logout()
     
    }
  })

</script>

<template>
  <div
    class="bg-green-800 bg-gradient-to-t to-green-900 lg:min-h-screen h-full p-5 pt-8 shadow-black relative duration-300 w-full"
    :class="(isOpen)? 'lg:w-80':'lg:w-20'">
    
    <ArrowLeftIcon
      class="bg-white invisible lg:visible font-bold text-green-900 text-3xl w-5 h-5 rounded-full absolute -right-2 top-10 z-50 cursor-pointer"
      :class="!isOpen && 'rotate-180'" @click="isOpen = !isOpen"/>

    <Bars3Icon v-if="isPhoneOpen"
      class="text-green-100 visible lg:invisible font-bold text-3xl w-8 h-8 absolute right-2 top-10 cursor-pointer"
      :class="!isPhoneOpen && 'rotate-180'" @click="isPhoneOpen = !isPhoneOpen"/>

    <XMarkIcon v-if="!isPhoneOpen"
      class="text-green-100 visible lg:invisible font-bold text-3xl w-8 h-8 absolute right-2 top-10 cursor-pointer"
      :class="!isPhoneOpen && 'rotate-180'" @click="isPhoneOpen = !isPhoneOpen"/>

    <div :class="`pt-2 duration-300 ${!isPhoneOpen && 'hidden lg:block'}`">
      <RouterLink to="/account"
        :class="`text-green-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2 ${activeTab === 'dashboard' && 'font-bold text-white bg-green-600'}`">
        <span class="text-2xl block float-left">
          <HomeIcon class="w-5 h-5"/>
        </span>
        <span :class="`text-base font-medium flex-1 duration-200 ${!isOpen && 'hidden'}`">Dashboard</span>
      </RouterLink>
      

      <div @click="toggleAddress"
        class="text-green-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2">
        <span class="text-2xl block float-left">
          <TruckIcon class="w-5 h-5"/>
        </span>
        <span :class="`text-base font-medium flex-1 duration-200 ${!isOpen && 'hidden'}`">Image Analysis</span>
        <ChevronDownIcon class="w-5 h-5" :class="isAddressOpen ? 'rotate-180' : ''"/>
      </div>
      <div v-if="isAddressOpen " class="pl-6">
        <RouterLink v-if="user?.role ==='farmer'" to="/account/addresses/image-analysis"
          :class="`text-green-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2 ${activeTab === 'addresses' && 'font-bold text-white bg-green-600'}`">
          <span class="text-2xl block float-left">
            <EnvelopeIcon class="w-5 h-5"/>
          </span>
          <span :class="`text-base font-medium flex-1 duration-200 ${!isOpen && 'hidden'}`">Upload Image</span>
        </RouterLink>
        <RouterLink   v-if="user?.role ==='expert'"  to="/account/addresses/model-training"
          :class="`text-green-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2 ${activeTab === 'operations' && 'font-bold text-white bg-green-600'}`">
          <span class="text-2xl block float-left">
            <FolderIcon class="w-5 h-5"/>
          </span>
          <span :class="`text-base font-medium flex-1 duration-200 ${!isOpen && 'hidden'}`">Model Training</span>
        </RouterLink>
      </div>
      <div @click="toggleMessaging"
        class="text-green-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2">
        <span class="text-2xl block float-left">
          <TruckIcon class="w-5 h-5"/>
        </span>
        <span :class="`text-base font-medium flex-1 duration-200 ${!isOpen && 'hidden'}`">Community Posts</span>
        <ChevronDownIcon class="w-5 h-5" :class="isMessagingOpen ? 'rotate-180' : ''"/>
      </div>
      <div v-if="isMessagingOpen" class="pl-6">
        <RouterLink  v-if="user?.role ==='farmer'"  to="/account/addresses/community-posts"
            :class="`text-green-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2 ${activeTab === 'deliveries' && 'font-bold text-white bg-green-600'}`">
            <span class="text-2xl block float-left">
              <FolderIcon class="w-5 h-5"/>
            </span>
            <span :class="`text-base font-medium flex-1 duration-200 ${!isOpen && 'hidden'}`">Make Post</span>
          </RouterLink>
          <RouterLink v-if="user?.role ==='expert'"  to="/account/addresses/all-posts"
            :class="`text-green-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2 ${activeTab === 'allposts' && 'font-bold text-white bg-green-600'}`">
            <span class="text-2xl block float-left">
              <FolderIcon class="w-5 h-5"/>
            </span>
            <span :class="`text-base font-medium flex-1 duration-200 ${!isOpen && 'hidden'}`">All Posts</span>
          </RouterLink>
      </div>
      </div>
      <div @click="toggleMailProcessing"
        class="text-green-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2">
        <span class="text-2xl block float-left">
          <TruckIcon class="w-5 h-5"/>
        </span>
        <span :class="`text-base font-medium flex-1 duration-200 ${!isOpen && 'hidden'}`">Expert Slots</span>
        <ChevronDownIcon class="w-5 h-5" :class="isMailProcessigOpen ? 'rotate-180' : ''"/>
      </div>
      <div v-if="isMailProcessigOpen" class="pl-6">
        <RouterLink v-if="user?.role ==='expert'" to="/account/addresses/availability-slots"
            :class="`text-green-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2 ${activeTab === 'Payments' && 'font-bold text-white bg-green-600'}`">
            <span class="text-2xl block float-left">
              <FolderIcon class="w-5 h-5"/>
            </span>
            <span :class="`text-base font-medium flex-1 duration-200 ${!isOpen && 'hidden'}`">Create Slot</span>
          </RouterLink>
          <RouterLink v-if="user?.role ==='farmer'" to="/account/addresses/slots"
            :class="`text-green-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2 ${activeTab === 'eservices' && 'font-bold text-white bg-green-600'}`">
            <span class="text-2xl block float-left">
              <FolderIcon class="w-5 h-5"/>
            </span>
            <span :class="`text-base font-medium flex-1 duration-200 ${!isOpen && 'hidden'}`">Available Slots</span>
          </RouterLink>
           <RouterLink v-if="user?.role ==='expert'"  to="/account/addresses/bookings"
            :class="`text-green-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2 ${activeTab === 'bookings' && 'font-bold text-white bg-green-600'}`">
            <span class="text-2xl block float-left">
              <FolderIcon class="w-5 h-5"/>
            </span>
            <span :class="`text-base font-medium flex-1 duration-200 ${!isOpen && 'hidden'}`">Bookings</span>
          </RouterLink>
      </div>

    

  


      <!-- Mail Processing -->
      <!-- <div @click="toggleMailProcessing"
        class="text-green-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2">
        <span class="text-2xl block float-left">
          <EnvelopeIcon class="w-5 h-5"/>
        </span>
        <span :class="`text-base font-medium flex-1 duration-200 ${!isOpen && 'hidden'}`">Mail Processing</span>
        <ChevronDownIcon class="w-5 h-5" :class="isMailProcessigOpen ? 'rotate-180' : ''"/>
      </div> -->

      <!-- <div v-if="isMailProcessigOpen" class="pl-6">
        <RouterLink to="/account/tracking"
          :class="`text-green-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2 ${activeTab === 'tracking' && 'font-bold text-white bg-green-600'}`">
          <span class="text-2xl block float-left">
            <ClockIcon class="w-5 h-5"/>
          </span>
          <span :class="`text-base font-medium flex-1 duration-200 ${!isOpen && 'hidden'}`">Tracking</span>
        </RouterLink>

        <RouterLink to="/account/request-delivery"
          :class="`text-green-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2`">
          <span class="text-2xl block float-left">
            <CurrencyDollarIcon class="w-5 h-5"/>
          </span>
          <span :class="`text-base font-medium flex-1 duration-200 ${!isOpen && 'hidden'}`">Request Delivery</span>
        </RouterLink>

        <RouterLink to="/account/payments"
          :class="`text-green-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2`">
          <span class="text-2xl block float-left">
            <CurrencyDollarIcon class="w-5 h-5"/>
          </span>
          <span :class="`text-base font-medium flex-1 duration-200 ${!isOpen && 'hidden'}`">Payments</span>
        </RouterLink>
      </div> -->

      <RouterLink to="/account/system-guide"
        :class="`text-green-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-9 ${activeTab === 'profile' && 'font-bold text-white bg-green-600'}`">
        <span class="text-2xl block float-left">
          <UserIcon class="w-5 h-5"/>
        </span>
        <span :class="`text-base font-medium flex-1 duration-200 ${!isOpen && 'hidden'}`">User Guide</span>
      </RouterLink>
      <div @click="logout"
           class="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2">
        <span class="text-2xl block float-left">
         <PowerIcon class="w-5 h-5  "/>
        </span>
        <span :class="`text-base font-medium flex-1 duration-200 ${!isOpen && 'hidden'}`">Logout</span>
      </div>
    </div>
</template>


<style scoped>

</style>