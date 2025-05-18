<script setup lang="ts">
import type {User} from "@/types/services/user-mgt.types";
import {computed} from "vue";

const parseSessionUser = (): User | null => {
  const user = localStorage.getItem('user');

  // Make sure it's not null, undefined, or the string "undefined"
  if (!user || user === 'undefined' || user === 'null') {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (error) {
    console.error('Failed to parse user from localStorage:', error);
    return null;
  }
};

const user = computed<null | User>(parseSessionUser);

</script>

<template>
  <div class="bg-white p-3 h-14 w-full shadow-md flex lg:justify-end items-center sticky top-0">
    <div class="flex gap-2 items-center bg-primary-50 border shadow-sm  px-3 p-1 rounded-lg cursor-pointer">
      <span class="text-sm uppercase">{{ user ? user.username : 'user' }}</span>
      <img src="https://picsum.photos/200/200" alt="smstoroc" class="w-8 h-8 rounded-full border-2 border-primary-900 shadow-sm">
    </div>
  </div>
</template>

<style scoped>

</style>