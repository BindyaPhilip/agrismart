<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Notification, NotificationGroup } from 'notiwind'
import {
  XCircleIcon, CheckCircleIcon, XMarkIcon
} from "@heroicons/vue/24/outline";

</script>

<template>
  <NotificationGroup group="top">
    <div class="fixed inset-0 flex items-start justify-end p-6 px-4 py-6 pointer-events-none z-50" style="z-index: 100;">
      <div class="w-full max-w-sm">
        <Notification
            v-slot="{ notifications, close }"
            enter="ease-out duration-300 transition"
            enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
            enter-to="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-500"
            leave-from="opacity-100"
            leave-to="opacity-0"
            move="transition duration-500"
            move-delay="delay-300"
        >
          <div
              :class="`w-full max-w-sm mt-4 overflow-hidden rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5 ${notification.status === 'success' ? 'bg-green-800': 'bg-red-800'}`"
              v-for="notification in notifications"
              :key="notification.id"
          >
            <div class="p-4">
              <div class="flex items-start">
                <div class="shrink-0">
                  <CheckCircleIcon v-if="notification.status === 'success'" class="w-6 h-6 text-white" />
                  <XCircleIcon v-if="notification.status === 'error'" class="w-6 h-6 text-white" />
                </div>
                <div class="ml-3 w-0 flex-1 pt-0.5">
                  <p class="font-semibold text-white">{{ notification.title }}</p>
                  <p class="text-sm font-semibold text-white">{{ notification.text }}</p>
                </div>
                <div class="flex ml-4 shrink-0">
                  <button @click="close(notification.id)" class="inline-flex rounded-md hover:text-gray-500 focus:outline-none">
                    <span class="sr-only">Close</span>
                    <XMarkIcon class="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Notification>
      </div>
    </div>
  </NotificationGroup>
  <RouterView />
</template>

<style scoped>

</style>
