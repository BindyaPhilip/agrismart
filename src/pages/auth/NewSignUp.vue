<script setup lang="ts">
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import MazSpinner from 'maz-ui/components/MazSpinner'
import { reactive, computed, watch, ref } from "vue";
import MailDropDownSelect from "@/components/MailDropDownSelect.vue";
import { useRouter } from "vue-router";
import type {
    LoginInput,
    AuthResponse,
    RegisterFarmerInput,
    UserProfileResponse
} from "@/types/services/user-mgt.types";
import { useAuthStore } from '@/stores/user-mgt.store';
import { useHelperStore } from "@/stores/helper.store";
import { useUtilities } from "@/composables/useUtilities";


const isLoading = ref<boolean>(false)
const customerTypesStore = useHelperStore();
const authStore = useAuthStore();
const router = useRouter();
const data = ref<RegisterFarmerInput>({
    email: "",
    username: "",
    password: "",
    confirm_password: "",
    phone_number: "",
    farm_location: "",
    farm_size: "",
    crop_types: []
});

const submitSignUp = (): void => {
  authStore.RegisterFarmer(data.value);
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

      <input 
        type="password" 
        v-model="data.confirm_password" 
        placeholder="Confirm Password"
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
        v-model="data.farm_location" 
        placeholder="Farm Location"
        class="w-full py-3 px-2 border rounded-md shadow-sm focus:outline-none"
      />

      <input 
        type="number" 
        v-model="data.farm_size" 
        placeholder="Farm Size (in acres)"
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
      <router-link to="/" class="ml-2 text-green-800 cursor-pointer">Sign In</router-link>
    </span>
  </div>
</template>


<style scoped></style>
