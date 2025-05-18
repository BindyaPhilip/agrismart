<script setup lang="ts">
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import MazSpinner from 'maz-ui/components/MazSpinner'
import { reactive, computed, watch, ref } from "vue";
import MailDropDownSelect from "@/components/MailDropDownSelect.vue";
import { useRouter } from "vue-router";
import type {
    RegisterExpertInput,
    UserProfileResponse
} from "@/types/services/user-mgt.types";
import { useAuthStore } from '@/stores/user-mgt.store';
import { useHelperStore } from "@/stores/helper.store";
import { useUtilities } from "@/composables/useUtilities";


const isLoading = ref<boolean>(false)
const customerTypesStore = useHelperStore();
const authStore = useAuthStore();
const router = useRouter();
const data = ref<RegisterExpertInput>({
    email: "",
    username: "",
    password: "",
    phone_number: "",
    areas_of_expertise: "",
    certifications: "",
    bio: "",
    experience_years: 0,
    institution: "",
    languages_spoken: "",
    social_links: ""
});

const submitSignUp = (): void => {
  authStore.RegisterExpert(data.value);
};


const farmerRegisterResponse = computed<UserProfileResponse | null>(()=>authStore.FarmerProfile);

watch(farmerRegisterResponse, (val)=>{
  if(val){
    router.push("/auth")
  }
})


</script>

<template>
    <div class="flex flex-col col-span-8 gap-2 capitalize">
      <img src="../../images/agrismart.png" class="w-35 h-20 mx-auto" alt="logo" />
  
      <div class="p-2 flex flex-col gap-4 mb-6">
        <input 
          type="email" 
          v-model="data.email" 
          placeholder="Email"
          class="w-full py-3 px-2 border rounded-md shadow-sm focus:outline-none"
        />
  
        <input 
          type="text" 
          v-model="data.username" 
          placeholder="Username"
          class="w-full py-3 px-2 border rounded-md shadow-sm focus:outline-none"
        />
  
        <input 
          type="password" 
          v-model="data.password" 
          placeholder="Password"
          class="w-full py-3 px-2 border rounded-md shadow-sm focus:outline-none"
        />
  
        <MazPhoneNumberInput
          v-model="data.phone_number"
          show-code-on-list
          color="info"
          :preferred-countries="['UG', 'KE']"
          :default-country-code="'UG'"
        />
  
        <input 
          type="text" 
          v-model="data.areas_of_expertise" 
          placeholder="Areas of Expertise"
          class="w-full py-3 px-2 border rounded-md shadow-sm focus:outline-none"
        />
  
        <input 
          type="text" 
          v-model="data.certifications" 
          placeholder="Certifications"
          class="w-full py-3 px-2 border rounded-md shadow-sm focus:outline-none"
        />
  
        <textarea 
          v-model="data.bio" 
          placeholder="Short Bio"
          class="w-full py-3 px-2 border rounded-md shadow-sm focus:outline-none resize-none"
        ></textarea>
  
        <input 
          type="number" 
          v-model="data.experience_years" 
          placeholder="Years of Experience"
          class="w-full py-3 px-2 border rounded-md shadow-sm focus:outline-none"
        />
  
        <input 
          type="text" 
          v-model="data.institution" 
          placeholder="Institution"
          class="w-full py-3 px-2 border rounded-md shadow-sm focus:outline-none"
        />
  
        <input 
          type="text" 
          v-model="data.languages_spoken" 
          placeholder="Languages Spoken"
          class="w-full py-3 px-2 border rounded-md shadow-sm focus:outline-none"
        />
  
        <input 
          type="text" 
          v-model="data.social_links" 
          placeholder="Social Media Links"
          class="w-full py-3 px-2 border rounded-md shadow-sm focus:outline-none"
        />
  
        <button 
          @click="submitSignUp" 
          class="bg-green-800 text-white w-full py-3 rounded-md shadow-md flex justify-center items-center font-bold gap-2"
        >
          <MazSpinner v-if="isLoading" size="1.5em" color="white" />
          <span class="uppercase">Sign Up</span>
        </button>
      </div>
  
      <span class="text-center text-gray-500">
        Already have an account?
        <router-link to="/" class="ml-2 text-primary cursor-pointer">Sign In</router-link>
      </span>
    </div>
  </template>
  


<style scoped></style>
