<script setup lang="ts">
import {useUtilities} from "@/composables/useUtilities";
import {passwordStrength} from "check-password-strength";
import PasswordMeter from "vue-simple-password-meter";
import MazSpinner from "maz-ui/components/MazSpinner";
import {computed, ref, watch} from "vue";
import {useAuthStore} from "@/stores/auth";
import type {AuthResponse, ChangePasswordInput} from "@/types/services/auth.types";

const {showNotification} = useUtilities()
const isLoading =  ref<boolean>(false)
const store = useAuthStore()



const form = ref<ChangePasswordInput>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const response =  computed<String|null>(() => store.response)
const error =  computed<AuthResponse|null>(() => store.errResponse)

watch(response, (val) => {
  isLoading.value =  false;
  if(val){
    showNotification("Success", JSON.stringify(val), "success")
    store.reset()
  }
})

watch(error, (val) => {
  isLoading.value =  false;
  if(val && val.message){
    showNotification("Error", JSON.stringify(val.message), "error")
  }
  store.reset()
})

const handleSubmit = () => {
  isLoading.value = true;

  if(passwordStrength(form.value.newPassword).value === "Weak" || passwordStrength(form.value.newPassword).value === "Too weak"){
    isLoading.value =  false;
    form.value.newPassword = ""
    form.value.confirmPassword = ""
    showNotification("Error","Password is "+passwordStrength(form.value.newPassword).value ,"error")
    return;
  }

  if(form.value.newPassword !== form.value.confirmPassword){
    isLoading.value =  false;
    form.value.newPassword = ""
    form.value.confirmPassword = ""
    showNotification("Error","Password mismatch " ,"error")
    return;
  }

  store.changePassword(form.value)

}

</script>

<template>
  <div class="w-full p-4 flex flex-col gap-2 text-sm">
    <span>Old Password</span>
    <input type="password" v-model="form.oldPassword"  class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">
    <span>New Password</span>
    <input type="password" v-model="form.newPassword" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">
    <password-meter :password="form.newPassword"/>
    <span>Confirm Password</span>
    <input type="password" v-model="form.confirmPassword" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">

    <button @click="handleSubmit" class="bg-primary text-white px-2 w-full  py-3 rounded-md shadow-md focus:outline-none capitalize justify-center items-center flex gap-2 ">
      <MazSpinner v-if="isLoading" size="1.5em"  color="white" />
      <span class="text-white font-bold">Change Password</span>
    </button>
  </div>
</template>

<style scoped>

</style>