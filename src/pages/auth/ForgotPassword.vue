<script setup lang="ts">
import {computed, ref, watch} from "vue";
import MazSpinner from "maz-ui/components/MazSpinner";
import { useAuthStore } from '@/stores/user-mgt.store';
import type {AuthResponse} from "@/types/services/auth.types";
import {useUtilities} from "@/composables/useUtilities";

const email =  ref<string>("")
const isLoading =  ref<boolean>(false)
const store = useAuthStore()

const response =  computed<String|null>(() => store.response)
const error =  computed<AuthResponse|null>(() => store.errResponse)
const {showNotification} = useUtilities()

watch(response, (val) => {
  isLoading.value =  false;
  if(val){
    showNotification("Success", JSON.stringify(val), "success")
    email.value =  ""
   
  }
})

watch(error, (val) => {
  isLoading.value =  false;
  if(val && val.message){
    showNotification("Error", JSON.stringify(val.message), "error")
  }

})
const handleSubmit = () => {
  isLoading.value = true;
  const payload = {
    email: email.value
  }
  store.ForgotPassword(payload);
}
</script>

<template>
  <div class="flex-col flex gap-2 capitalize text-green-700">
    <h2 class="text-2xl text-center text-green-800 font-bold">Forgot Password</h2>

    <div class="border-t border-green-300 p-6 flex flex-col gap-4 mb-6">
      <input
        type="email"
        v-model="email"
        placeholder="Email"
        class="w-full py-3 mx-auto px-2 border border-green-400 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-300"
      />

      <button
        @click="handleSubmit"
        class="bg-green-700 text-white px-2 w-full py-3 rounded-md shadow-md focus:outline-none capitalize justify-center items-center flex gap-2 hover:bg-green-800"
      >
        <MazSpinner v-if="isLoading" size="1.5em" color="white" />
        <span class="text-white font-bold">Submit</span>
      </button>
    </div>

    <span class="text-center text-green-600">
      Not Registered?
      <router-link to="/signup" class="ml-2 cursor-pointer text-green-700 hover:underline">Sign Up</router-link>
    </span>

    <div class="flex gap-5 justify-center pt-10 uppercase text-green-700 text-sm">
      <router-link to="/" class="border-r pr-4 hover:underline">Login</router-link>
      <router-link to="/terms" class="border-r pr-4 hover:underline">Terms</router-link>
      <router-link to="/contact-us" class="hover:underline">Contact Us</router-link>
    </div>
  </div>
</template>


<style scoped>

</style>