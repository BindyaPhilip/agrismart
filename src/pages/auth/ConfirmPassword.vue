<script setup lang="ts">
import {computed, ref, watch} from "vue";
import MazSpinner from "maz-ui/components/MazSpinner";
import { useAuthStore } from '@/stores/user-mgt.store';
import type {
  ResetPasswordInput,
  AuthResponse
} from "@/types/services/user-mgt.types";
import {useUtilities} from "@/composables/useUtilities";
import {passwordStrength} from "check-password-strength";
import PasswordMeter from "vue-simple-password-meter";
import {useRoute} from "vue-router";
import { useRouter } from "vue-router";

const form =  ref<ResetPasswordInput>({
  token: "",
  new_password: "",
  confirm_password: ""
})

const route = useRoute();
const router = useRouter();
const isLoading =  ref<boolean>(false)
const store = useAuthStore()

const response =  computed<String|null>(() => store.response)
const error =  computed<AuthResponse|null>(() => store.errResponse)
const {showNotification} = useUtilities()

watch(response, (val) => {
  isLoading.value =  false;
  if(val){
    showNotification("Success", JSON.stringify(val), "success")
    router.push('/auth')
    
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

  if(passwordStrength(form.value.new_password).value === "Weak" || passwordStrength(form.value.new_password).value === "Too weak"){
    isLoading.value =  false;
    form.value.new_password = ""
    form.value.confirm_password = ""
    showNotification("Error","Password is "+passwordStrength(form.value.new_password).value ,"error")
    return;
  }

  if(form.value.new_password !== form.value.confirm_password){
    isLoading.value =  false;
    form.value.new_password = ""
    form.value.confirm_password = ""
    showNotification("Error","Password mismatch " ,"error")
    return;
  }

  if(route.query.token){
    let payload:ResetPasswordInput = {
      token: route.query.token.toString(),
      new_password: form.value.new_password,
      confirm_password: form.value.confirm_password
    }

    store.ResetPassword(payload)

  }else {
    isLoading.value =  false;
    form.value.new_password = ""
    form.value.confirm_password = ""
    showNotification("Error","Invalid Token, check your email " ,"error")
    return;
  }


}
</script>

<template>
  <div class="flex-col flex gap-2 capitalize text-green-700">
    <h2 class="text-2xl text-center text-green-800 font-bold">Confirm New Password</h2>
    <span class="text-green-600 mb-2 text-center"></span>

    <div class="border-t border-green-300 p-6 flex flex-col gap-4 mb-6">
      <input
        type="password"
        v-model="form.new_password"
        placeholder="Password"
        class="w-full py-3 mx-auto px-2 border border-green-400 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-300"
      />

      <password-meter :password="form.confirm_password" />

      <input
        type="password"
        v-model="form.confirm_password"
        placeholder="Confirm Password"
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