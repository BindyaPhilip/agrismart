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

const slots = computed<ExpertAvailability[]>(()=>store.farmerSlots)
const bookingResponse = computed<any | null>(()=>store.bookingResponse)

watch(bookingResponse, (val)=>{
    if(val.status === 201 || val.status === 200){
        showNotification('Success',"Slot booking submitted for approval","success");
        isBookingLoading.value = false
        store.getSlotsForFarmers();
    }
})


const isBookingLoading = ref<boolean>(false);

const bookSlot = (id:string)=>{
isBookingLoading.value = true
const payload = {
    slot_id:id
}
store.bookSlot(payload)
}


























onMounted(()=>{
    store.getSlotsForFarmers();
})

</script>

<template>
  <div class="p-2 container-md mx-auto flex flex-col gap-5">
    <div class="flex justify-end items-center gap-2 w-full p-2">
      <Breadcrumbs />
    </div>

    <div class="bg-white rounded-sm shadow p-4">
      <span class="font-medium uppercase block mb-4">{{ route.name }}</span>
      <div class="border-b mb-4"></div> <!-- Restored horizontal border -->

      <!-- Updated slots grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 scrollable-y max-h-[70vh]">
        <div
          v-for="slot in slots"
          :key="slot.id"
          class="relative p-5 border border-gray-200 rounded-xl shadow-sm bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[320px]"
        >
          <!-- Status Tag -->
          <span
            class="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm"
            :class="{
              'bg-green-100 text-green-600': !slot.is_booked && slot.is_active,
              'bg-red-100 text-red-600': slot.is_booked,
              'bg-gray-100 text-gray-600': !slot.is_active
            }"
          >
            {{ slot.is_booked ? 'Booked' : slot.is_active ? 'Available' : 'Inactive' }}
          </span>

          <!-- Expert Info Section -->
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-2">
              <div
                class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm"
              >
                {{ slot.expert.user.username[0] }}
              </div>
              <h3 class="text-lg font-semibold text-gray-800">
                {{ slot.expert.user.username }}
              </h3>
            </div>
            <p class="text-gray-600 text-sm leading-relaxed line-clamp-2">
              {{ slot.expert.bio || 'No bio provided.' }}
            </p>
            <div class="text-xs text-gray-500 flex flex-wrap gap-2">
              <span class="bg-gray-100 px-2 py-1 rounded-md">
                🌾 Expertise: {{ slot.expert.areas_of_expertise }}
              </span>
              <span class="bg-gray-100 px-2 py-1 rounded-md">
                🎓 {{ slot.expert.certifications }}
              </span>
            </div>
          </div>

          <!-- Availability Period Section -->
          <div class="mt-4 pt-4 border-t border-gray-200">
            <h4 class="text-sm font-semibold text-gray-700 mb-2">Availability Period</h4>
            <div class="text-xs text-gray-500 flex flex-wrap gap-2">
              <span class="bg-gray-100 px-2 py-1 rounded-md">
                📅 Start: {{ new Date(slot.start_time).toLocaleDateString() }}
              </span>
              <span class="bg-gray-100 px-2 py-1 rounded-md">
                📅 End: {{ new Date(slot.end_time).toLocaleDateString() }}
              </span>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-4 flex items-center justify-between">
            <button
              v-if="!slot.is_booked && slot.is_active"
              @click="bookSlot(slot.id)"
              class="px-3 py-1.5 bg-green-100 text-green-600 text-xs font-semibold rounded-md hover:bg-green-200 flex items-center gap-2 transition-colors duration-200"
            >
              <MazSpinner v-if="isBookingLoading" size="1.2em" color="white" />
              <span>Book Slot</span>
            </button>
           
          </div>
        </div>
        <!-- Empty State -->
        <div
          v-if="!slots.length"
          class="col-span-1 md:col-span-2 lg:col-span-3 text-center text-gray-500 py-8"
        >
          No expert availability slots available.
        </div>
      </div>
    </div>
  </div>
</template>
  
  
<style scoped>
/* Hide scrollbar while keeping y-axis scrollable */
.scrollable-y {
  max-height: 70vh; /* Adjust as needed */
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

/* Chrome, Safari, Edge */
.scrollable-y::-webkit-scrollbar {
  display: none;
}
</style>