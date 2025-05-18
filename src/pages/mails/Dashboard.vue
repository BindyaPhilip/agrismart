<!-- src/pages/mails/Dashboard.vue -->
<script setup lang="ts">
import {
  ChatBubbleLeftEllipsisIcon,
  TruckIcon,
  FolderPlusIcon,
  LinkIcon,
  PhotoIcon,
  ChartPieIcon,
  CalendarIcon,
} from "@heroicons/vue/24/outline";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import StatCard from "@/components/StatCard.vue";
import { computed, ref } from "vue";
import { useAuthStore } from "@/stores/user-mgt.store";
import { useUtilities } from "@/composables/useUtilities";
import { Pie, Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  type ChartOptions, // Type-only import
} from "chart.js";

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

const { showNotification } = useUtilities();
const store = useAuthStore();

// Dummy user data
const parseSessionUser = () => ({
  accountId: "12345",
  username: "Phil",
  email: "philbindya55@gmail.com",
  role: "farmer",
});

// Dummy dashboard stats
const dashboardStats = ref({
  imagesAnalyzedRust: 30,
  imagesAnalyzedHealthy: 50,
  imagesAnalyzedOtherDiseases: 20,
  totalImagesAnalyzed: 100,
  imagesTrainingRust: 10,
  imagesTrainingHealthy: 15,
  imagesTrainingOtherDiseases: 5,
  trainingSessions: 4,
  communityPostsRust: 8,
  bookingsConfirmed: 3,
});

// Dummy data for pie chart
const pieChartData = ref({
  labels: ["Common Rust", "Healthy", "Other Diseases"],
  datasets: [
    {
      data: [
        dashboardStats.value.imagesAnalyzedRust,
        dashboardStats.value.imagesAnalyzedHealthy,
        dashboardStats.value.imagesAnalyzedOtherDiseases,
      ],
      backgroundColor: ["#dc2626", "#16a34a", "#2563eb"],
      borderColor: ["#fff", "#fff", "#fff"],
      borderWidth: 2,
    },
  ],
});

// Dummy data for bar chart
const barChartData = ref({
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Common Rust",
      data: [5, 8, 4, 6, 30],
      backgroundColor: "#dc2626",
    },
    {
      label: "Healthy",
      data: [10, 12, 8, 15, 50],
      backgroundColor: "#16a34a",
    },
    {
      label: "Other Diseases",
      data: [3, 4, 2, 5, 20],
      backgroundColor: "#2563eb",
    },
  ],
});

// Chart options for Pie
const pieChartOptions: ChartOptions<"pie"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          size: 12,
        },
      },
    },
    tooltip: {
      enabled: true,
    },
  },
};

// Chart options for Bar
const barChartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          size: 12,
        },
      },
    },
    tooltip: {
      enabled: true,
    },
  },
};

// Dummy notifications
const notifications = ref([
  {
    id: "1",
    type: "booking_approved",
    message: "Your booking with Expert on May 23, 2025, has been approved!",
    date: "2025-05-17T10:00:00Z",
    read: false,
  },
  {
    id: "2",
    type: "booking_rejected",
    message: "Your booking with Expert on Mar 7, 2026, was rejected.",
    date: "2025-05-16T15:30:00Z",
    read: true,
  },
  {
    id: "3",
    type: "training_completed",
    message: "Model training session #4 completed successfully!",
    date: "2025-05-15T09:00:00Z",
    read: false,
  },
  {
    id: "4",
    type: "image_analysis",
    message: "Image analysis completed: 30 rust, 50 healthy, 20 other diseases.",
    date: "2025-05-17T09:07:00Z",
    read: false,
  },
]);

const user = computed(parseSessionUser);

// Mark notification as read
const markAsRead = (id: string) => {
  const notification = notifications.value.find((n) => n.id === id);
  if (notification) {
    notification.read = true;
    showNotification("Success", "Notification marked as read", "success");
  }
};
</script>

<template>
  <div class="p-2 container-md mx-auto flex flex-col gap-8">
    <!-- Header -->
    <div class="flex justify-between items-center gap-2 w-full p-4 bg-white rounded-lg shadow-sm">
      <span class="text-gray-900 uppercase font-bold text-2xl">Farmer Dashboard</span>
      <Breadcrumbs />
    </div>

    <!-- Stats Cards -->
    <div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      <StatCard
        title="Images: Rust"
        :stat="dashboardStats.imagesAnalyzedRust"
        :icon="PhotoIcon"
        class="bg-gradient-to-br from-red-100 to-red-200 rounded-lg shadow-sm p-4"
      />
      <StatCard
        title="Images: Healthy"
        :stat="dashboardStats.imagesAnalyzedHealthy"
        :icon="PhotoIcon"
        class="bg-gradient-to-br from-green-100 to-green-200 rounded-lg shadow-sm p-4"
      />
      <StatCard
        title="Images: Other Diseases"
        :stat="dashboardStats.imagesAnalyzedOtherDiseases"
        :icon="PhotoIcon"
        class="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg shadow-sm p-4"
      />
      <StatCard
        title="Total Images Analyzed"
        :stat="dashboardStats.totalImagesAnalyzed"
        :icon="PhotoIcon"
        class="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg shadow-sm p-4"
      />
      <StatCard
        title="Training: Rust Images"
        :stat="dashboardStats.imagesTrainingRust"
        :icon="FolderPlusIcon"
        class="bg-gradient-to-br from-red-200 to-red-300 rounded-lg shadow-sm p-4"
      />
      <StatCard
        title="Training: Healthy Images"
        :stat="dashboardStats.imagesTrainingHealthy"
        :icon="FolderPlusIcon"
        class="bg-gradient-to-br from-green-200 to-green-300 rounded-lg shadow-sm p-4"
      />
      <StatCard
        title="Training: Other Diseases"
        :stat="dashboardStats.imagesTrainingOtherDiseases"
        :icon="FolderPlusIcon"
        class="bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg shadow-sm p-4"
      />
      <StatCard
        title="Training Sessions"
        :stat="dashboardStats.trainingSessions"
        :icon="ChartPieIcon"
        class="bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg shadow-sm p-4"
      />
      <StatCard
        title="Rust/Disease Posts"
        :stat="dashboardStats.communityPostsRust"
        :icon="ChatBubbleLeftEllipsisIcon"
        class="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg shadow-sm p-4"
      />
      <StatCard
        title="Bookings Confirmed"
        :stat="dashboardStats.bookingsConfirmed"
        :icon="CalendarIcon"
        class="bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg shadow-sm p-4"
      />
    </div>

    <!-- Quick Actions -->
    <div class="w-full bg-white rounded-lg shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <div
        class="cursor-pointer hover:bg-gray-50 justify-center text-gray-700 items-center border-r border-gray-200 flex flex-col gap-3 p-6 transition-colors duration-300"
      >
        <router-link to="/account/images/upload" class="flex flex-col items-center gap-3">
          <FolderPlusIcon class="w-12 h-12 text-blue-600" />
          <span class="font-semibold uppercase text-sm text-gray-800">Upload Image</span>
        </router-link>
      </div>
      <div
        class="cursor-pointer hover:bg-gray-50 justify-center text-gray-700 items-center border-r border-gray-200 flex flex-col gap-3 p-6 transition-colors duration-300"
      >
        <router-link to="/account/bookings" class="flex flex-col items-center gap-3">
          <LinkIcon class="w-12 h-12 text-green-600" />
          <span class="font-semibold uppercase text-sm text-gray-800">Book Expert Slot</span>
        </router-link>
      </div>
      <div
        class="cursor-pointer hover:bg-gray-50 justify-center text-gray-700 items-center border-r border-gray-200 flex flex-col gap-3 p-6 transition-colors duration-300"
      >
        <router-link to="/account/posts/create" class="flex flex-col items-center gap-3">
          <ChatBubbleLeftEllipsisIcon class="w-12 h-12 text-yellow-600" />
          <span class="font-semibold uppercase text-sm text-gray-800">Make a Post</span>
        </router-link>
      </div>
      <div
        class="cursor-pointer hover:bg-gray-50 justify-center text-gray-700 items-center flex flex-col gap-3 p-6 transition-colors duration-300"
      >
        <router-link to="/account/posts" class="flex flex-col items-center gap-3">
          <TruckIcon class="w-12 h-12 text-red-600" />
          <span class="font-semibold uppercase text-sm text-gray-800">View Posts</span>
        </router-link>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Pie Chart: Image Analysis Outcomes -->
      <div class="bg-white rounded-lg shadow-sm p-6 flex flex-col gap-4">
        <h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <ChartPieIcon class="w-6 h-6 text-blue-600" />
          Image Analysis Outcomes
        </h3>
        <div class="border-b border-gray-200 mb-4"></div>
        <div class="h-64">
          <Pie :data="pieChartData" :options="pieChartOptions" />
        </div>
      </div>
      <!-- Bar Chart: Monthly Image Analysis -->
      <div class="bg-white rounded-lg shadow-sm p-6 flex flex-col gap-4">
        <h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <ChartPieIcon class="w-6 h-6 text-green-600" />
          Monthly Image Analysis
        </h3>
        <div class="border-b border-gray-200 mb-4"></div>
        <div class="h-64">
          <Bar :data="barChartData" :options="barChartOptions" />
        </div>
      </div>
    </div>

    <!-- Notifications Section -->
    <div class="w-full flex flex-col bg-white rounded-lg shadow-sm p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="font-semibold uppercase text-gray-800 text-lg">Notifications</h3>
        <span class="text-sm text-gray-500" v-if="notifications.length">
          {{ notifications.filter((n) => !n.read).length }} unread
        </span>
      </div>
      <div class="border-b border-gray-200 mb-4"></div>
      <div class="flex flex-col gap-4 max-h-[300px] overflow-y-auto scrollable-y">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="flex items-center gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
          :class="{ 'opacity-60': notification.read }"
        >
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center"
            :class="{
              'bg-green-100 text-green-600': notification.type === 'booking_approved',
              'bg-red-100 text-red-600': notification.type === 'booking_rejected',
              'bg-blue-100 text-blue-600': notification.type === 'training_completed' || notification.type === 'image_analysis',
            }"
          >
            <svg
              v-if="notification.type === 'booking_approved'"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <svg
              v-if="notification.type === 'booking_rejected'"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <svg
              v-if="notification.type === 'training_completed' || notification.type === 'image_analysis'"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-sm text-gray-800">{{ notification.message }}</p>
            <p class="text-xs text-gray-500">{{ new Date(notification.date).toLocaleString() }}</p>
          </div>
          <button
            v-if="!notification.read"
            @click="markAsRead(notification.id)"
            class="text-sm text-blue-600 hover:underline"
          >
            Mark as Read
          </button>
        </div>
        <div
          v-if="!notifications.length"
          class="flex flex-col items-center gap-2 py-8 text-gray-500"
        >
          <svg
            class="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <p class="text-sm font-medium">No notifications</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar while keeping y-axis scrollable */
.scrollable-y {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.scrollable-y::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}
</style>