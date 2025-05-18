<script setup lang="ts">
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import { useRoute } from "vue-router";
import { useRouter} from "vue-router";
import { computed, onMounted, ref, watch } from "vue";
import MazTable from "maz-ui/components/MazTable";
import { PencilIcon, TrashIcon, XMarkIcon,EyeIcon } from "@heroicons/vue/24/outline";
import MazSpinner from "maz-ui/components/MazSpinner";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import { useUtilities } from "@/composables/useUtilities";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";
import type { ExpertAvailability, Report } from "@/types/services/user-mgt.types";
import type { Item } from "@/types/components/helper-types";
import MailDropDownSelect from "@/components/MailDropDownSelect.vue";
import { useAuthStore } from "@/stores/user-mgt.store";


const router = useRouter();
const route = useRoute();
const { showNotification } = useUtilities();
const store = useAuthStore();

const bookingResponse = computed<any | null>(()=>store.bookingResponse)
const rejectBookingResponse = computed<any | null>(()=>store.rejectBookingResponse)
const approveBookingResponse = computed<any | null>(()=>store.approveBookingResponse)
watch(bookingResponse, (val)=>{
    if(val.status === 201 || val.status === 200){
        showNotification('Success',"Slot booking submitted for approval","success");
    
    
    }
})
watch(rejectBookingResponse, (val)=>{
    if(val.status === 201 || val.status === 200){
        showNotification('Success',"Booking rejected","success");
         isCancelLoading.value = false
    
    
    }
})

watch(approveBookingResponse, (val)=>{
    if(val.status === 201 || val.status === 200){
    showNotification('Success',"Booking approved","success");
    updateDialogOpen.value = false
     isApproveLoading.value = false
    
    }
})



const bookings = computed<any[]>(()=>store.farmerBookings)
const isCancelLoading = ref<boolean>(false)
const selectedDate = ref<string>("")
const isApproveLoading =  ref<boolean>(false)
const cancelBooking= (id:string)=> {
    isCancelLoading.value = true
    const payload = {
        booking_id: id,
        action: "reject",
        selected_date: selectedDate.value
    }
    store.rejectBooking(payload)

}

const selectedBooking = ref<any | undefined>(undefined)
const updateDialogOpen = ref<boolean>(false)

const openDialog = (id:string):void => {
    updateDialogOpen.value = true
    selectedBooking.value = bookings.value.find((booking)=>booking.id === id)
}
const approveBooking = ()=> {
    if(!selectedBooking.value?.id){
        return;
    }
   isApproveLoading.value = true
    const payload = {
        booking_id: selectedBooking.value?.id,
        action: "approve",
        selected_date: selectedDate.value ? `${selectedDate.value.replace('T', ' ')}:00` : ""
    }
    store.approveBooking(payload)
}


















onMounted(()=>{

    store.getFarmerBookingSlots()
})

</script>

<template>
  <div class="p-2 container-md mx-auto flex flex-col gap-5">
    <div class="flex justify-end items-center gap-2 w-full p-2">
      <Breadcrumbs />
    </div>

    <div class="bg-white rounded-lg shadow-lg p-6">
      <span class="font-semibold uppercase text-gray-800 block mb-4">{{ route.name }}</span>
      <div class="border-b border-gray-200 mb-6"></div>

      <!-- Updated bookings grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 scrollable-y max-h-[70vh]">
        <div
          v-for="booking in bookings"
          :key="booking.id"
          class="relative p-6 bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[340px] group"
        >
          <!-- Status Tag -->
          <span
            class="absolute top-4 right-4 text-xs px-3 py-1 rounded-full font-medium shadow-sm animate-pulse"
            :class="{
              'bg-yellow-100 text-yellow-700': booking.status === 'pending',
              'bg-green-100 text-green-700': booking.status === 'approved',
              'bg-red-100 text-red-700': booking.status === 'rejected'
            }"
          >
            {{ booking.status.charAt(0).toUpperCase() + booking.status.slice(1) }}
          </span>

          <!-- Farmer Info Section -->
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center text-green-800 font-bold text-sm shadow-sm"
              >
                {{ booking.farmer.username[0] }}
              </div>
              <h3 class="text-xl font-bold text-gray-900 truncate">
                {{ booking.farmer.username }}
              </h3>
            </div>
            <p class="text-gray-600 text-sm leading-relaxed line-clamp-2">
              <span class="font-medium">Email:</span> {{ booking.farmer.email }}
            </p>
          </div>

          <!-- Booking Period Section -->
          <div class="mt-5 pt-5 border-t border-gray-100">
            <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z" />
              </svg>
              Booking Period
            </h4>
            <div class="text-xs text-gray-600 flex flex-wrap gap-2">
              <span class="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700">
                📅 Start: {{ new Date(booking.slot.start_time).toLocaleDateString() }}
              </span>
              <span class="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700">
                📅 End: {{ new Date(booking.slot.end_time).toLocaleDateString() }}
              </span>
              <span
                v-if="booking.selected_date"
                class="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700"
              >
                🕒 Selected: {{ new Date(booking.selected_date).toLocaleDateString() }}
              </span>
              <span
                v-else
                class="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-400"
              >
                🕒 Selected: Not set
              </span>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-6 flex items-center justify-between">
            <button
              v-if="booking.status === 'pending'"
              @click="cancelBooking(booking.id)"
              class="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 flex items-center gap-2 transition-colors duration-200 shadow-sm"
            >
              <MazSpinner v-if="isCancelLoading" size="1.2em" color="white" />
              <span>Cancel Booking</span>
            </button>
            <button
              v-if="booking.status === 'pending'"
              @click="openDialog(booking.id)"
              class="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 flex items-center gap-2 transition-colors duration-200 shadow-sm"
            >
            
              <span>Approve Booking</span>
            </button>
            <!-- <EyeIcon
              class="w-6 h-6 text-blue-500 hover:text-blue-700 cursor-pointer transition-colors duration-200 group-hover:scale-110"
              @click="viewBookingDetails(booking.id)"
            /> -->
          </div>
        </div>
        <!-- Empty State -->
        <div
          v-if="!bookings.length"
          class="col-span-1 md:col-span-2 lg:col-span-3 text-center text-gray-500 py-8"
        >
          <div class="flex flex-col items-center gap-2">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p class="text-lg font-medium text-gray-600">No bookings available</p>
            <p class="text-sm text-gray-400">Check back later or create a new booking.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Dialog :open="updateDialogOpen" @close="updateDialogOpen = false" class="relative z-50">
  <div class="fixed inset-0 bg-black/50 flex w-screen items-center justify-center p-4">
    <DialogPanel class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
      <!-- Title -->
      <DialogTitle class="pb-4 border-b flex items-center justify-between">
        <span class="font-semibold text-lg text-gray-800">Approve Booking</span>
        <XMarkIcon class="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-700 transition" @click="updateDialogOpen = false" />
      </DialogTitle>

      <!-- Form -->
      <div class="mt-4 space-y-4">
       
        <div class="flex flex-col">
          <span class="font-medium capitalize">Scheduled Date and Time</span>
          <input type="datetime-local" v-model="selectedDate" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">
        </div>
       
      
      </div>

      <!-- Button -->
      <button @click="approveBooking()" class="mt-6 w-full bg-green-500 text-white py-3 rounded-md shadow-md flex items-center justify-center gap-2 text-lg font-semibold transition hover:bg-opacity-90 focus:ring-2 focus:ring-green-400 focus:outline-none">
        <MazSpinner v-if="isApproveLoading" size="1.5em" color="white" />
        <span>Schedule</span>
      </button>
    </DialogPanel>
  </div>
</Dialog>
</template>

<style scoped>
/* Hide scrollbar while keeping y-axis scrollable */
.scrollable-y {
  max-height: 70vh;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.scrollable-y::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}
</style>