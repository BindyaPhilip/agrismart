<script setup lang="ts">
import MazInputCode from 'maz-ui/components/MazInputCode'
import { passwordStrength } from 'check-password-strength'
import PasswordMeter from 'vue-simple-password-meter';
import {computed, reactive, ref, watch} from "vue";
import MazSpinner from 'maz-ui/components/MazSpinner'
import {useUtilities} from "@/composables/useUtilities";
import {useAuthStore} from "@/stores/auth";
import type {AuthResponse} from "@/types/services/auth.types";
import { useRouter} from "vue-router";
import type {ActivateAccountRequestInput} from "@/types/services/auth.types";


const router =  useRouter();
interface ActivationData {
  form: {
    code: string
    password: string
    confirmPassword: string
  },
  isLoading: boolean
}

const data =  reactive<ActivationData>({
  form: {
    code: "",
    password: "",
    confirmPassword: ""
  },
  isLoading: false
})

const authStore =  useAuthStore();

const { showNotification } =  useUtilities()

const response = computed<String>(() => {
  return authStore.response;
})

const error = computed<AuthResponse | null>(() => {
  return authStore.errResponse ? authStore.errResponse : null;
})

watch(response, (val: String) => {
  data.isLoading =  false;
  showNotification("Success", val, "success")
  router.push("/")

})

watch(error, () => {
  data.isLoading =  false;
  if(error.value){
    showNotification("Error", error.value.message, "error")
  }

})

const submit =  ():void => {
  data.isLoading =  true;

  if(data.form.code === ""){
    data.isLoading =  false;
    showNotification("Error","Type in the OTP" ,"error")
    return;
  }

  if(passwordStrength(data.form.password).value === "Weak" || passwordStrength(data.form.password).value === "Too weak"){
    data.isLoading =  false;
    showNotification("Error","Password is "+passwordStrength(data.form.password).value ,"error")
    return;
  }

  if(data.form.password !== data.form.confirmPassword){
    data.isLoading =  false;
    showNotification("Error","Password mismatch " ,"error")
    return;
  }

  const token =  authStore.signUpTokenData.token ? authStore.signUpTokenData.token.toString() : localStorage.getItem('token');

  if(!token){
    data.isLoading =  false;
    showNotification("Error","Base64 token was not saved, check your email to retrieve it or contact support " ,"error")
    return;
  }

  //prepare
  let payload: ActivateAccountRequestInput = {
    otp: parseInt(data.form.code),
    token: token ? token: "",
    password: data.form.password,
    confirmPassword: data.form.confirmPassword
  }

  authStore.activate(payload);
}
</script>

<template>
<div class="flex-col flex capitalize">
  <h2 class=" text-2xl text-center">Activation</h2>
  <div class="border-t p-3 flex flex-col gap-2 mb-1">
    <span class="text-gray-500 mb-2 text-center capitalize">Type in OTP Code received on your registered phone number</span>
    <div class="mx-auto mb-4">
      <MazInputCode v-model="data.form.code" size="sm" :code-length="4" />
    </div>
    <!-- <span class="capitalize py-2 border-b border-gray-200 mb-2 text-gray-500 text-sm font-medium">Set Password</span> -->

    <input type="password" v-model="data.form.password"  placeholder="Password" class="w-full py-3 mx-auto px-2 border rounded-md shadow-sm focus:outline-none">
    <password-meter :password="data.form.password"/>
    <input type="password" v-model="data.form.confirmPassword"  placeholder="Confirm Password" class="w-full py-3 mx-auto px-2 border rounded-md shadow-sm focus:outline-none">


    <button @click="submit" class="bg-primary text-white  w-full py-3 rounded-md shadow-md capitalize justify-center font-bold items-center flex gap-2 "> <MazSpinner v-if="data.isLoading" size="1.5em"  color="white" /> <span class="text-white uppercase">Activate</span></button>
  </div>
  <span class="text-center text-gray-500 ">Already an activated member ? <router-link to="/" class="ml-2 cursor-pointer text-primary">Sign In</router-link></span>


</div>
</template>

<style scoped>

</style>