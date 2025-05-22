<script setup lang="ts">
import {
  ChatBubbleLeftEllipsisIcon,
  CalendarIcon,
  PhotoIcon,
  ChartPieIcon,
  DocumentMagnifyingGlassIcon,
  FlagIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/vue/24/outline";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import StatCard from "@/components/StatCard.vue";
import { computed, ref, onMounted } from "vue";
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
  type ChartOptions,
} from "chart.js";

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

const { showNotification } = useUtilities();

// Reactive variable to store the user role
const userRole = ref<string>("");

// Fetch user role from localStorage on component mount
onMounted(() => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  userRole.value = user.role || "unknown";
});

// Dummy user data
const parseSessionUser = () => ({
  accountId: "12345",
  username: "Phil",
  email: "philbindya55@gmail.com",
  role: userRole.value,
});

// Role-specific dashboard stats
const dashboardStats = computed(() => {
  if (userRole.value === "farmer") {
    return {
      imagesUploaded: 100,
      imagesRust: 30,
      imagesHealthy: 50,
      imagesOtherDiseases: 20,
      communityPosts: 8,
      commentsMade: 15,
      bookingsConfirmed: 3,
      rustPrevalenceRate: ((30 / 100) * 100).toFixed(1), // 30% rust images
      recentRustDetections: 12, // Last 7 days
      rustPostsEngagement: 10, // Comments on rust-related posts
    };
  } else if (userRole.value === "expert") {
    return {
      imagesTraining: 30,
      imagesTrainingRust: 10,
      imagesTrainingHealthy: 15,
      imagesTrainingOtherDiseases: 5,
      postsApproved: 20,
      postsFlagged: 5,
      commentsApproved: 25,
      commentsFlagged: 3,
      slotsCreated: 10,
      bookingsManaged: 7,
      modelAccuracyRust: 92, // 92% accuracy for rust detection
      rustTrainingContribution: ((10 / 30) * 100).toFixed(1), // 33.3% of training images are rust
      pendingRustPosts: 4, // Rust posts awaiting approval
    };
  }
  return {};
});

// Role-specific pie chart data
const pieChartData = computed(() => {
  if (userRole.value === "farmer") {
    return {
      labels: ["Common Rust", "Healthy", "Other Diseases"],
      datasets: [
        {
          data: [
            dashboardStats.value.imagesRust,
            dashboardStats.value.imagesHealthy,
            dashboardStats.value.imagesOtherDiseases,
          ],
          backgroundColor: ["#dc2626", "#16a34a", "#2563eb"],
          borderColor: ["#fff", "#fff", "#fff"],
          borderWidth: 2,
        },
      ],
    };
  } else if (userRole.value === "expert") {
    return {
      labels: ["Rust Training", "Healthy Training", "Other Diseases Training"],
      datasets: [
        {
          data: [
            dashboardStats.value.imagesTrainingRust,
            dashboardStats.value.imagesTrainingHealthy,
            dashboardStats.value.imagesTrainingOtherDiseases,
          ],
          backgroundColor: ["#dc2626", "#16a34a", "#2563eb"],
          borderColor: ["#fff", "#fff", "#fff"],
          borderWidth: 2,
        },
      ],
    };
  }
  return { labels: [], datasets: [] };
});

// Role-specific bar chart data
const barChartData = computed(() => {
  if (userRole.value === "farmer") {
    return {
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
    };
  } else if (userRole.value === "expert") {
    return {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          label: "Images Trained",
          data: [5, 10, 8, 12, 30],
          backgroundColor: "#2563eb",
        },
        {
          label: "Posts Approved",
          data: [3, 5, 4, 8, 20],
          backgroundColor: "#16a34a",
        },
        {
          label: "Rust Posts Pending",
          data: [1, 2, 0, 1, 4],
          backgroundColor: "#dc2626",
        },
      ],
    };
  }
  return { labels: [], datasets: [] };
});

// Chart options for Pie
const pieChartOptions: ChartOptions<"pie"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top", labels: { font: { size: 12 } } },
    tooltip: { enabled: true },
  },
};

// Chart options for Bar
const barChartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top", labels: { font: { size: 12 } } },
    tooltip: { enabled: true },
  },
};

// Role-specific notifications
const notifications = computed(() => {
  const baseNotifications = [
    {
      id: "1",
      type: "booking_approved",
      message: userRole.value === "farmer"
        ? "Your booking with Expert on May 23, 2025, has been approved!"
        : "You approved a booking for Farmer on May 23, 2025.",
      date: "2025-05-17T10:00:00Z",
      read: false,
    },
    {
      id: "2",
      type: "booking_rejected",
      message: userRole.value === "farmer"
        ? "Your booking with Expert on Mar 7, 2026, was rejected."
        : "You rejected a booking for Farmer on Mar 7, 2026.",
      date: "2025-05-16T15:30:00Z",
      read: true,
    },
  ];

  if (userRole.value === "farmer") {
    return [
      ...baseNotifications,
      {
        id: "3",
        type: "crop_alert",
        message: `Alert: High incidence of common rust detected in your recent uploads (${dashboardStats.value.rustPrevalenceRate}% of images).`,
        date: "2025-05-17T09:07:00Z",
        read: false,
      },
      {
        id: "4",
        type: "post_approved",
        message: "Your post 'Corn Rust Issue' was approved by an expert.",
        date: "2025-05-15T09:00:00Z",
        read: false,
      },
      {
        id: "5",
        type: "rust_trend",
        message: `Recent trend: ${dashboardStats.value.recentRustDetections} rust detections in the last 7 days. Check educational resources.`,
        date: "2025-05-17T08:00:00Z",
        read: false,
      },
    ];
  } else if (userRole.value === "expert") {
    return [
      ...baseNotifications,
      {
        id: "3",
        type: "training_reminder",
        message: `Reminder: Upload at least 50 images per week for model training. Current count: ${dashboardStats.value.imagesTraining}.`,
        date: "2025-05-17T09:07:00Z",
        read: false,
      },
      {
        id: "4",
        type: "post_pending",
        message: `${dashboardStats.value.pendingRustPosts} rust-related posts are pending your approval in the Community Posts section.`,
        date: "2025-05-15T09:00:00Z",
        read: false,
      },
      {
        id: "5",
        type: "model_accuracy",
        message: `Model accuracy for common rust detection is ${dashboardStats.value.modelAccuracyRust}%. Continue uploading quality images.`,
        date: "2025-05-17T08:00:00Z",
        read: false,
      },
    ];
  }
  return [];
});

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
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto p-6 flex flex-col gap-8">
      <!-- Header -->
      <div class="flex justify-between items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
        <span class="text-gray-900 uppercase font-bold text-2xl">
          {{ userRole === 'farmer' ? 'Farmer Dashboard' : userRole === 'expert' ? 'Expert Dashboard' : 'Dashboard' }}
        </span>
        <Breadcrumbs />
      </div>

      <!-- Stats Cards -->
      <div v-if="userRole === 'farmer'" class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Images Uploaded"
          :stat="dashboardStats.imagesUploaded"
          :icon="PhotoIcon"
          class="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg shadow-sm p-4 transition-all hover:shadow-md"
        />
        <StatCard
          title="Rust Prevalence"
          :stat="`${dashboardStats.rustPrevalenceRate}%`"
          :icon="PhotoIcon"
          class="bg-gradient-to-br from-red-100 to-red-200 rounded-lg shadow-sm p-4 transition-all hover:shadow-md"
        />
        <StatCard
          title="Recent Rust Detections"
          :stat="dashboardStats.recentRustDetections"
          :icon="PhotoIcon"
          class="bg-gradient-to-br from-red-200 to-red-300 rounded-lg shadow-sm p-4 transition-all hover:shadow-md"
        />
        <StatCard
          title="Rust Post Comments"
          :stat="dashboardStats.rustPostsEngagement"
          :icon="ChatBubbleLeftEllipsisIcon"
          class="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg shadow-sm p-4 transition-all hover:shadow-md"
        />
        <StatCard
          title="Images: Healthy"
          :stat="dashboardStats.imagesHealthy"
          :icon="PhotoIcon"
          class="bg-gradient-to-br from-green-100 to-green-200 rounded-lg shadow-sm p-4 transition-all hover:shadow-md"
        />
        <StatCard
          title="Images: Other Diseases"
          :stat="dashboardStats.imagesOtherDiseases"
          :icon="PhotoIcon"
          class="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg shadow-sm p-4 transition-all hover:shadow-md"
        />
        <StatCard
          title="Community Posts"
          :stat="dashboardStats.communityPosts"
          :icon="ChatBubbleLeftEllipsisIcon"
          class="bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-lg shadow-sm p-4 transition-all hover:shadow-md"
        />
        <StatCard
          title="Bookings Confirmed"
          :stat="dashboardStats.bookingsConfirmed"
          :icon="CalendarIcon"
          class="bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg shadow-sm p-4 transition-all hover:shadow-md"
        />
      </div>
      <div v-if="userRole === 'expert'" class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Images Trained"
          :stat="dashboardStats.imagesTraining"
          :icon="PhotoIcon"
          class="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg shadow-sm p-4 transition-all hover:shadow-md"
        />
        <StatCard
          title="Rust Training Contribution"
          :stat="`${dashboardStats.rustTrainingContribution}%`"
          :icon="PhotoIcon"
          class="bg-gradient-to-br from-red-100 to-red-200 rounded-lg shadow-sm p-4 transition-all hover:shadow-md"
        />
        <StatCard
          title="Model Accuracy: Rust"
          :stat="`${dashboardStats.modelAccuracyRust}%`"
          :icon="CheckCircleIcon"
          class="bg-gradient-to-br from-green-100 to-green-200 rounded-lg shadow-sm p-4 transition-all hover:shadow-md"
        />
        <StatCard
          title="Pending Rust Posts"
          :stat="dashboardStats.pendingRustPosts"
          :icon="DocumentMagnifyingGlassIcon"
          class="bg-gradient-to-br from-red-200 to-red-300 rounded-lg shadow-sm p-4 transition-all hover:shadow-md"
        />
        <StatCard
          title="Posts Approved"
          :stat="dashboardStats.postsApproved"
          :icon="CheckCircleIcon"
          class="bg-gradient-to-br from-green-200 to-green-300 rounded-lg shadow-sm p-4 transition-all hover:shadow-md"
        />
        <StatCard
          title="Comments Moderated"
          :stat="dashboardStats.commentsApproved + dashboardStats.commentsFlagged"
          :icon="FlagIcon"
          class="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg shadow-sm p-4 transition-all hover:shadow-md"
        />
        <StatCard
          title="Slots Created"
          :stat="dashboardStats.slotsCreated"
          :icon="ClockIcon"
          class="bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg shadow-sm p-4 transition-all hover:shadow-md"
        />
        <StatCard
          title="Bookings Managed"
          :stat="dashboardStats.bookingsManaged"
          :icon="CalendarIcon"
          class="bg-gradient-to-br from-amber-200 to-amber-300 rounded-lg shadow-sm p-4 transition-all hover:shadow-md"
        />
      </div>

      <!-- Quick Actions -->
      <div class="w-full bg-white rounded-lg shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div v-if="userRole === 'farmer'" class="cursor-pointer hover:bg-gray-50 justify-center text-gray-700 items-center border-r border-gray-200 flex flex-col gap-3 p-6 transition-colors duration-300">
          <router-link to="/account/images/upload" class="flex flex-col items-center gap-3">
            <PhotoIcon class="w-12 h-12 text-blue-600" />
            <span class="font-semibold uppercase text-sm text-gray-800">Upload Image</span>
          </router-link>
        </div>
        <div v-if="userRole === 'farmer'" class="cursor-pointer hover:bg-gray-50 justify-center text-gray-700 items-center border-r border-gray-200 flex flex-col gap-3 p-6 transition-colors duration-300">
          <router-link to="/account/bookings" class="flex flex-col items-center gap-3">
            <CalendarIcon class="w-12 h-12 text-green-600" />
            <span class="font-semibold uppercase text-sm text-gray-800">Book Expert Slot</span>
          </router-link>
        </div>
        <div v-if="userRole === 'farmer'" class="cursor-pointer hover:bg-gray-50 justify-center text-gray-700 items-center border-r border-gray-200 flex flex-col gap-3 p-6 transition-colors duration-300">
          <router-link to="/account/posts/create" class="flex flex-col items-center gap-3">
            <ChatBubbleLeftEllipsisIcon class="w-12 h-12 text-yellow-600" />
            <span class="font-semibold uppercase text-sm text-gray-800">Make a Post</span>
          </router-link>
        </div>
        <div v-if="userRole === 'farmer'" class="cursor-pointer hover:bg-gray-50 justify-center text-gray-700 items-center flex flex-col gap-3 p-6 transition-colors duration-300">
          <router-link to="/account/posts" class="flex flex-col items-center gap-3">
            <ChatBubbleLeftEllipsisIcon class="w-12 h-12 text-red-600" />
            <span class="font-semibold uppercase text-sm text-gray-800">View Posts</span>
          </router-link>
        </div>
        <div v-if="userRole === 'expert'" class="cursor-pointer hover:bg-gray-50 justify-center text-gray-700 items-center border-r border-gray-200 flex flex-col gap-3 p-6 transition-colors duration-300">
          <router-link to="/account/images/training" class="flex flex-col items-center gap-3">
            <PhotoIcon class="w-12 h-12 text-blue-600" />
            <span class="font-semibold uppercase text-sm text-gray-800">Upload Training Image</span>
          </router-link>
        </div>
        <div v-if="userRole === 'expert'" class="cursor-pointer hover:bg-gray-50 justify-center text-gray-700 items-center border-r border-gray-200 flex flex-col gap-3 p-6 transition-colors duration-300">
          <router-link to="/account/posts" class="flex flex-col items-center gap-3">
            <DocumentMagnifyingGlassIcon class="w-12 h-12 text-green-600" />
            <span class="font-semibold uppercase text-sm text-gray-800">Review Posts</span>
          </router-link>
        </div>
        <div v-if="userRole === 'expert'" class="cursor-pointer hover:bg-gray-50 justify-center text-gray-700 items-center border-r border-gray-200 flex flex-col gap-3 p-6 transition-colors duration-300">
          <router-link to="/account/slots/create" class="flex flex-col items-center gap-3">
            <ClockIcon class="w-12 h-12 text-yellow-600" />
            <span class="font-semibold uppercase text-sm text-gray-800">Create Slots</span>
          </router-link>
        </div>
        <div v-if="userRole === 'expert'" class="cursor-pointer hover:bg-gray-50 justify-center text-gray-700 items-center flex flex-col gap-3 p-6 transition-colors duration-300">
          <router-link to="/account/bookings" class="flex flex-col items-center gap-3">
            <CalendarIcon class="w-12 h-12 text-red-600" />
            <span class="font-semibold uppercase text-sm text-gray-800">Manage Bookings</span>
          </router-link>
        </div>
      </div>

      <!-- Charts Section -->
      <div v-if="userRole === 'farmer' || userRole === 'expert'" class="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow-sm p-6 flex flex-col gap-4">
          <h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <ChartPieIcon class="w-6 h-6 text-blue-600" />
            {{ userRole === 'farmer' ? 'Image Analysis Outcomes' : 'Training Image Outcomes' }}
          </h3>
          <div class="border-b border-gray-200 mb-4"></div>
          <div class="h-64">
            <Pie :data="pieChartData" :options="pieChartOptions" />
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-6 flex flex-col gap-4">
          <h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <ChartPieIcon class="w-6 h-6 text-green-600" />
            {{ userRole === 'farmer' ? 'Monthly Image Analysis' : 'Monthly Activity' }}
          </h3>
          <div class="border-b border-gray-200 mb-4"></div>
          <div class="h-64">
            <Bar :data="barChartData" :options="barChartOptions" />
          </div>
        </div>
      </div>

      <!-- Notifications Section -->
      <div v-if="userRole === 'farmer' || userRole === 'expert'" class="w-full flex flex-col bg-white rounded-lg shadow-sm p-6">
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
                'bg-green-100 text-green-600': notification.type === 'booking_approved' || notification.type === 'post_approved',
                'bg-red-100 text-red-600': notification.type === 'booking_rejected' || notification.type === 'crop_alert' || notification.type === 'rust_trend',
                'bg-blue-100 text-blue-600': notification.type === 'training_reminder' || notification.type === 'post_pending' || notification.type === 'model_accuracy',
              }"
            >
              <svg
                v-if="notification.type === 'booking_approved' || notification.type === 'post_approved'"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <svg
                v-if="notification.type === 'booking_rejected' || notification.type === 'crop_alert' || notification.type === 'rust_trend'"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <svg
                v-if="notification.type === 'training_reminder' || notification.type === 'post_pending' || notification.type === 'model_accuracy'"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p class="text-sm font-medium">No notifications</p>
          </div>
        </div>
      </div>

      <!-- Fallback for Unknown Role -->
      <div v-if="userRole !== 'farmer' && userRole !== 'expert'" class="bg-red-50 rounded-lg p-6 border border-red-200">
        <p class="text-red-700 font-medium flex items-center gap-2">
          <FlagIcon class="w-6 h-6 text-red-600" />
          No valid user role found. Please log in as a farmer or expert to view the dashboard.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollable-y {
  scrollbar-width: thin;
  scrollbar-color: #10b981 #e5e7eb;
}

.scrollable-y::-webkit-scrollbar {
  width: 8px;
}

.scrollable-y::-webkit-scrollbar-track {
  background: #e5e7eb;
  border-radius: 4px;
}

.scrollable-y::-webkit-scrollbar-thumb {
  background: #10b981;
  border-radius: 4px;
}

/* Hover effects for cards */
.bg-gradient-to-br {
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

.bg-gradient-to-br:hover {
  transform: translateY(-2px);
}

/* Typography */
.text-gray-900, .text-gray-800 {
  font-family: 'Inter', sans-serif;
}

.text-gray-600, .text-gray-500 {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
}
</style>