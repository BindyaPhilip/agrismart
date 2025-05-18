<script setup lang="ts">
import { computed, ref, watch, onMounted } from "vue";
import MazSpinner from "maz-ui/components/MazSpinner";
import { useUtilities } from "@/composables/useUtilities";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import type { AuthResponse, VerifyEmailInputs } from "@/types/services/auth.types";

const isLoading = ref<boolean>(false);
  const isTokenLoading = ref<boolean>(false);
const authStore = useAuthStore();
const resendTokenResponse = computed<String>(()=>authStore.resendTokenResponse)
const newTokenData = computed<any | null>(()=>authStore.newTokenData)
const route = useRoute();
const router = useRouter();

const { showNotification } = useUtilities();

const form = ref<VerifyEmailInputs>({
  token: "",
  verificationCode: "",
});

onMounted(() => {
  const signUpToken = (route.query.token as string) || localStorage.getItem("signUpToken") || "";
  const verificationCode = (route.query.verificationToken as string) || "";

  if (signUpToken) {
    form.value.token = signUpToken;
  }
  if (verificationCode) {
    form.value.verificationCode = verificationCode;
  }
  if(form.value.token && form.value.verificationCode){
    submit()
  }
});

const response = computed<String>(() => {
  return authStore.response;
})
const error = computed<AuthResponse | null>(() => {
  return authStore.errResponse ? authStore.errResponse : null;
})

watch(response, (val) => {
  
  isLoading.value = false;
  showNotification("Success", val.toString(), "success");
  router.push("/auth/activation");
});

watch(error, () => {
  isLoading.value = false;
  if (error.value?.message) {
    showNotification("Error", error.value.message, "error");
  }
});
watch(resendTokenResponse, (val) => {
  isTokenLoading.value = false
  isLoading.value = false;
  showNotification("Success", val.toString(), "success");
 
});
watch(newTokenData, (val) => {
  if(val){
    isTokenLoading.value = false
    form.value.token = val;
  }
 
});

const submit = (): void => {

  if (!form.value.verificationCode) {
    showNotification("Error", "Please enter the verification code.", "error");
    return;
  }

  if (!form.value.token) {
    showNotification("Error", "Verification token is missing!", "error");
    return;
  }

// router.push('/auth/activation')
  isLoading.value = true;
  authStore.verifyEmail(form.value);
};
const resendOTP=()=>{
  isTokenLoading.value = true
  const signUpToken = (route.query.signUpToken as string) || localStorage.getItem("signUpToken") || "NDE3MSxlMGM5NjFjMi04YWI3LTRkNDctYjViMy0wZjFhOTQ4YTAyNjc=";
 if(!signUpToken){
  showNotification("Error", "Verification token is missing!", "error");
return;
 }
authStore.resendOtp({
  "actionType": "EMAIL_VERIFICATION",
  "token": signUpToken
})


}

</script>

<template>
  <div class="flex flex-col gap-4 capitalize w-full max-w-md mx-auto">
    <h2 class="text-2xl text-center font-bold">Verify Email</h2>
    <!-- <span class="text-gray-500 mb-2 text-center">User Portal</span> -->

    <div class="border-t p-6 flex flex-col gap-4 mb-6">
      <!-- <span class="text-gray-500 mb-2 text-center capitalize">
        Type in the code from your email to activate your account.
      </span>

    
      <input
        type="hidden"
        v-model="form.token"
      /> -->

      <!-- Verification Code Input -->
      <!-- <label class="text-sm font-medium text-gray-700">Verification Code</label>
      <input
        type="text"
        v-model="form.verificationCode"
        placeholder="Enter your code"
        class="w-full py-3 px-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
      /> -->

      <!-- Submit Button -->
      <button
        @click="submit"
        class="bg-primary text-white w-full py-3 rounded-md shadow-md flex justify-center items-center font-bold gap-2"
      >
        <MazSpinner v-if="isLoading" size="1.5em" color="white" />
        <span class="uppercase">Verify Email</span>
      </button>
    </div>
    
    <span
  @click="resendOTP"
  class="flex items-center justify-center text-primary-500 cursor-pointer gap-2"
>
  Resend OTP
  <MazSpinner v-if="isTokenLoading" size="1.5em" color="primary" />
</span>

    <span class="text-center text-gray-500">
      Already an activated member?
      <router-link to="/" class="ml-2 cursor-pointer text-primary">Sign In</router-link>
    </span>

    <div class="flex gap-5 justify-center pt-10 uppercase text-primary">
      <router-link to="/terms" class="text-sm border-r pr-4">Terms</router-link>
      <router-link to="/contact-us" class="text-sm">Privacy Policy</router-link>
    </div>
  </div>
</template>

<style scoped></style>
