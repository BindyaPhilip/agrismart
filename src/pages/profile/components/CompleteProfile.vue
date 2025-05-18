
<script setup lang="ts">
import { ref, computed, watch,onMounted } from 'vue'
import type {Item, PhoneResult} from "@/types/components/helper-types";
import MailDropDownSelect from "@/components/MailDropDownSelect.vue";
import MazSpinner from "maz-ui/components/MazSpinner";
import type {AuthResponse, ProfileForm} from "@/types/services/auth.types";
import {useAuthStore} from "@/stores/auth";

import {useUtilities} from "@/composables/useUtilities";


const store = useAuthStore()
const {showNotification} = useUtilities()

const isLoading = ref<boolean>(false)
    const response =  computed<String|null>(() => store.response)
const error =  computed<AuthResponse|null>(() => store.errResponse)
const completeResponse = computed<any|null>(() => store.completeResponse)
watch(response, (val) => {
  isLoading.value =  false;
  if(val){
    showNotification("Success", JSON.stringify(val), "success")
    store.reset()
    form.value = {
  customerTypeId: '',
  idType: '',
  idNumber: '',
  organisationName: '',
  firstName: '',
  lastName: '',
  middleName: '',
  gender: 'MALE',
  physicalAddress: '',
  nationality: '',
  dob: '',
  occupation: ''
}
  }
})
watch(completeResponse,(val)=>{
    if(val){
    
        // localStorage.setItem('allUserData',val)
        window.location.reload()

    }
})


watch(error, (val) => {
  isLoading.value =  false;
  if(val && val.message){
    showNotification("Error", JSON.stringify(val.message), "error")
  }
  store.reset()
})
const form = ref<ProfileForm>({
  customerTypeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  idType: '',
  idNumber: '',
  organisationName: '',
  firstName: '',
  lastName: '',
  middleName: '',
  gender: 'MALE',
  physicalAddress: '',
  nationality: '',
  dob: '',
  occupation: ''
})

const idTypes =  ref<Array<Item>>([
{
  value: '',
  label: "Select ID Type"
},
{
  value: 'NATIONAL_ID',
  label: "National ID"
},
{
  value: "PASSPORT",
  label: "Passport"
},

])
const genders =  ref<Array<Item>>([
{
  value: '',
  label: "Select Gender"
},
{
  value: 'MALE',
  label: "MALE"
},
{
  value: "FEMALE",
  label: "FEMALE"
},

])

const submitProfile = async () => {
    isLoading.value = true
    store.completeProfile(form.value)
}
</script>



<template>
    <form @submit.prevent="submitProfile" class="max-w-5xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Complete Your Profile</h2>
  
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
       
        <!-- First Name -->
        <div>
          <label class="label">First Name</label>
          <input v-model="form.firstName" type="text" class="input" required />
        </div>
  
        <!-- Middle Name -->
        <div>
          <label class="label">Middle Name</label>
          <input v-model="form.middleName" type="text" class="input" />
        </div>
  
        <!-- Last Name -->
        <div>
          <label class="label">Last Name</label>
          <input v-model="form.lastName" type="text" class="input" required />
        </div>
  
        <!-- ID Type -->
        <div>
          <label class="label">ID Type</label>
          <MailDropDownSelect default-type="Is Type" :default-value="form.idType" :items="idTypes" @chosenItem="(value) => { form.idType = value }" />

        </div>
  
        <!-- ID Number -->
        <div>
          <label class="label">ID Number</label>
          <input v-model="form.idNumber" type="text" class="input" required />
        </div>
  
        <!-- Organisation Name -->
        <div>
          <label class="label">Organisation Name</label>
          <input v-model="form.organisationName" type="text" class="input" required />
        </div>
  
        <!-- Gender -->
        <div>
          <label class="label">Gender</label>
          <MailDropDownSelect default-type="Gender" :default-value="form.gender" :items="genders" @chosenItem="(value) => { form.gender = value }" />

          <!-- <select v-model="form.gender" class="input" required>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select> -->
        </div>
  
        <!-- Physical Address -->
        <div>
          <label class="label">Physical Address</label>
          <input v-model="form.physicalAddress" type="text" class="input" required />
        </div>
  
        <!-- Nationality -->
        <div>
          <label class="label">Nationality</label>
          <input v-model="form.nationality" type="text" class="input" required />
        </div>
  
        <!-- Date of Birth -->
        <div>
          <label class="label">Date of Birth</label>
          <input v-model="form.dob" type="date" class="input" required />
        </div>
  
        <!-- Occupation -->
        <div>
          <label class="label">Occupation</label>
          <input v-model="form.occupation" type="text" class="input" required />
        </div>
      </div>
  
      <!-- Submit -->
      <div class="pt-6">
        <button type="submit" class="flex items-center bg-primary text-white px-6 py-2 rounded-md shadow hover:bg-primary-700 transition-all ">
            <MazSpinner color="white" v-show="isLoading" />

          Submit Profile
        </button>
      </div>
    </form>
  </template>
  
  <style scoped>
  .input {
    @apply mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary;
  }
  .label {
    @apply block text-sm font-medium text-gray-700;
  }
  </style>
  