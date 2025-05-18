<script setup lang="ts">
import MazSpinner from 'maz-ui/components/MazSpinner';
import { computed, ref, watch } from 'vue';
import { useAuthStore } from '@/stores/user-mgt.store';
import { useUtilities } from '@/composables/useUtilities';
import type {
    LoginInput,
    AuthResponse
} from "@/types/services/user-mgt.types";
import { useRouter } from 'vue-router';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';

const isLoading = ref<boolean>(false);
const authStore = useAuthStore();
const { showNotification, validateEmail } = useUtilities();
const router = useRouter();
const showPassword = ref(false);

const loginPayload = ref<LoginInput>({
  email: '',
  password: '',
});

const response = computed<String>(() => authStore.response);

const error = computed<AuthResponse | null>(() => authStore.errResponse || null);

watch(response, (val: String) => {
  isLoading.value = false;
  // showNotification('Success', val.toString(), 'success');
  location.reload();
});

watch(error, () => {
  isLoading.value = false;
  if (error.value) {
    showNotification('Error', error.value.message, 'error');
  }
});

const submit = (): void => {
  isLoading.value = true;
  if (!validateEmail(loginPayload.value.email)) {
    loginPayload.value.email = '';
    showNotification('Invalid Email', 'This is a wrong email', 'error');
    isLoading.value = false;
    return;
  }

  authStore.login(loginPayload.value);
};
</script>

<template>
  <div class="flex flex-col gap-2 capitalize text-green-700">
    <img src="../../images/agrismart.png" class="w-35 h-20 mx-auto" alt="logo" />
    <div class="p-2 flex flex-col gap-4 mb-6">
      <!-- Email Input -->
      <input
        type="text"
        v-model="loginPayload.email"
        placeholder="Email"
        class="w-full py-2 px-2 border border-green-300 rounded-md shadow-sm focus:outline-none"
      />

      <!-- Password Input -->
      <div class="relative">
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="loginPayload.password"
          placeholder="Password"
          class="w-full py-2 px-2 border border-green-300 rounded-md shadow-sm focus:outline-none"
        />
        <button
          v-if="loginPayload.password"
          type="button"
          class="absolute right-2 top-2 text-green-500"
          @click="showPassword = !showPassword"
        >
          <component :is="showPassword ? EyeSlashIcon : EyeIcon" class="w-5 h-5" />
        </button>
      </div>

      <!-- Forgot Password Link -->
      <router-link
        to="/auth/forgot-password"
        class="text-green-600 text-right text-sm mb-2"
      >
        Forgot Password?
      </router-link>

      <!-- Login Button -->
      <button
        @click="submit"
        class="bg-green-600 text-white w-full py-3 rounded-md shadow-md capitalize flex justify-center items-center gap-2 hover:bg-green-700"
      >
        <MazSpinner v-if="isLoading" size="1.5em" color="white" />
        <span class="uppercase">Login</span>
      </button>
    </div>

    <!-- Sign-Up Section -->
      <div class="text-center text-green-600 mt-3 flex flex-col items-center gap-2">
        <p class="font-medium text-green-500">Not Registered?</p>
        <div class="flex flex-row gap-2">
          <router-link to="/auth/signup" class="cursor-pointer border-r border-green-400 pr-4 hover:underline">Sign Up As a Farmer</router-link>
          <router-link to="/auth/expert-signup" class="cursor-pointer border-r border-green-400 pr-4  hover:underline">Sign Up As an Expert</router-link>
        </div>
      </div>


    <!-- Footer Links -->
    <!-- <div class="flex gap-5 justify-center pt-10 text-green-600">
      <router-link to="/terms" class="text-sm border-r border-green-400 pr-4">Terms</router-link>
      <router-link to="/privacy" class="text-sm border-r border-green-400 pr-4">Privacy Policy</router-link>
    </div> -->
  </div>
</template>


<style scoped>
/* Adjust button positioning if needed */
button.absolute {
  top: 50%;
  transform: translateY(-50%);
}
</style>
