<script setup lang="ts">
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {useRoute} from "vue-router";
import {TrashIcon, PhoneIcon, PencilIcon, XMarkIcon} from "@heroicons/vue/24/outline"
import MazSpinner from "maz-ui/components/MazSpinner";
import MazTable from "maz-ui/components/MazTable";
import {computed, onMounted, ref, watch} from "vue";
import dateFormat from "dateformat";
import {useUtilities} from "@/composables/useUtilities";
import {Dialog, DialogPanel, DialogTitle} from "@headlessui/vue";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import { useAuthStore } from "@/stores/user-mgt.store";
import MazPagination, {type Props} from "maz-ui/components/MazPagination";
import type { ExpertAvailability } from "@/types/services/user-mgt.types";

const store = useAuthStore();
const route = useRoute()
const {showNotification} =  useUtilities()
const page = ref<number>(1)
const pageSize = ref<number>(10)
const response = computed<any | null>(()=>store.createAvailabilitySlotResponse)
const deactivateResponse = computed<any | null>(()=>store.deactivateResponse)
watch(response, (val)=>{
    if(val.status === 200 || val.status ===201){
        isLoading.value = false
            showNotification("Success", "Availability slot has been created", "success");
                store.getAvailabilitySlots(page.value, pageSize.value)
            
    }
})

watch(deactivateResponse, (val)=>{
    if(val.status === 200 || val.status ===201){
        isDeactivating.value = false
            showNotification("Success", "Availability slot has been deactivated", "success");
             store.getAvailabilitySlots(page.value, pageSize.value)
    }
})


const startTime = ref<string>("");
const endTime = ref<string>("");
const isDeactivating = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const submit = () => {
    isLoading.value = true;

    // Clone the payload and adjust scheduledDateTime
    const formattedPayload = {
        start_time: startTime.value ? `${startTime.value.replace('T', ' ')}:00` // Replace T with space and append seconds
 : "",
     end_time: endTime.value ? `${endTime.value.replace('T', ' ')}:00` // Replace T with space and append seconds
 : ""

    };
    store.createAvailabilitySlot(formattedPayload);
};


const availableSlots = computed<ExpertAvailability[]>(()=>store.availableslots)




const update= (id:string)=>{
isDeactivating.value = true
store.deactivateSlot(id)
}





onMounted(() => {
 store.getAvailabilitySlots(page.value, pageSize.value)
})











</script>

<template>
  <div class="p-2 container-md mx-auto flex flex-col gap-5">

    <div class="flex justify-end items-center gap-2 w-full p-2">
      <Breadcrumbs/>
    </div>
    <div class="w-full flex flex-col bg-white rounded-sm shadow ">
      <span class=" font-medium p-4 uppercase">{{ route.name }}</span>
      <div class="border "></div>
      <div class="w-full">
        <div class=" mx-auto w-full p-3 flex flex-col gap-3">
          <div class="grid lg:grid-cols-12 gap-2">
             <div  class="p-2 mt-4 w-full lg:col-span-4 flex flex-col gap-2">
              <div class="mb-4 flex flex-col gap-1">
                  <span class="font-medium capitalize">Start Date</span>
                  <input type="datetime-local" v-model="startTime" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">
                </div>
              <div class="mb-4 flex flex-col gap-1">
                  <span class="font-medium capitalize">End Date</span>
                  <input type="datetime-local" v-model="endTime"  class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">
                </div>

              <button  @click="submit"   class="bg-green-500 text-white px-2 w-full  py-3 rounded-md shadow-md focus:outline-none capitalize justify-center items-center flex gap-2 "><MazSpinner v-if="isLoading" size="1.5em"  color="white" /> <span class="text-white font-bold">Submit</span></button>
            </div>
            <div   class="w-full lg:col-span-8 p-2 border-l flex flex-col gap-1">
              <MazTable
                        size="sm"
                        color="primary"
                        hoverable
                        background-even
                        :rows="availableSlots"
                        
                        :headers="[
                { label:'Start Time', key:'start_time' },
                { label:'End Time', key:'end_time' },
                { label:'Availability Status', key:'is_active' },
                { label:'Booking Status', key:'is_booked' },
                ]">
                <template #cell-start_time="{value}">
                <span > {{ dateFormat(value) }}</span>
              </template>
               <template #cell-end_time="{value}">
                <span > {{ dateFormat(value) }}</span>
              </template>
              <template #cell-is_active="{value}">
                <span > {{ value ? 'Active': 'Inactive' }}</span>
              </template>
               <template #cell-is_booked="{value}">
                <span > {{ value ? 'Booked': 'Not Booked' }}</span>
              </template>
                <template #actions="{ row }" >


                  <div class="flex flex-row gap-1">
                    <button  @click="update(row.id)" class="bg-green-500 p-2 text-white rounded-md flex items-center hover:bg-green-700 space-x-1" title="stop">
                      <TrashIcon class="w-4 h-4 " /> <MazSpinner v-if="isDeactivating" size="1.5em"  color="white" /> <span>Deactivate</span>
                    </button>
                   
                  </div>

                </template>
              </MazTable>
              <div class="flex flex-row justify-between">
          <div  class="flex flex-row gap-2 text-xs">
            <span class="font-medium"></span>
          </div>
          
        </div>

            </div>
           

          </div>


        </div>

      </div>
    </div>
  </div>
  

 
</template>

<style scoped>

</style>