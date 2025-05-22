<script setup lang="ts">
import { ref, onMounted } from "vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import { 
  CameraIcon, 
  BookOpenIcon, 
  ChatBubbleLeftRightIcon, 
  CalendarIcon, 
  DocumentMagnifyingGlassIcon, 
  CheckCircleIcon, 
  FlagIcon, 
  ClockIcon 
} from "@heroicons/vue/24/outline";

// Reactive variable to store the user role
const userRole = ref<string>("");

// Fetch user role from localStorage on component mount
onMounted(() => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  userRole.value = user.role || "unknown";
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto p-6 flex flex-col gap-6">
      <!-- Breadcrumbs -->
      <div class="flex justify-end items-center gap-4">
        <Breadcrumbs />
      </div>

      <!-- Main content container -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-green-500 pb-3">
          System User Guide
        </h1>

        <!-- User Guide Content -->
        <div class="space-y-6">
          <div class="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpenIcon class="w-6 h-6 text-green-600" />
              Welcome to the System
            </h2>
            <p class="text-gray-600 text-lg">
              This guide provides detailed instructions for using the system based on your role: 
              <span class="font-semibold text-green-600 capitalize">{{ userRole }}</span>.
            </p>
          </div>

          <!-- Farmer Guide -->
          <div v-if="userRole === 'farmer'" class="bg-white rounded-lg border border-gray-200 shadow-sm p-6 transition-all duration-300 hover:shadow-md">
            <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ChatBubbleLeftRightIcon class="w-6 h-6 text-green-600" />
              Farmer User Guide
            </h3>
            <ul class="space-y-4 text-gray-700">
              <li class="flex gap-3">
                <CameraIcon class="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <strong class="text-gray-900">Upload Images for Analysis</strong>
                  <ol class="list-decimal pl-6 mt-2 text-gray-600">
                    <li>Navigate to the <strong>Image Analysis</strong> section in the main menu.</li>
                    <li>Click the <strong>Upload Image</strong> option.</li>
                    <li>Upload your crop image and submit it for analysis.</li>
                  </ol>
                </div>
              </li>
              <li class="flex gap-3">
                <BookOpenIcon class="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <strong class="text-gray-900">View Educational Resources</strong>
                  <ol class="list-decimal pl-6 mt-2 text-gray-600">
                    <li>After image analysis, wait for the results to be displayed.</li>
                    <li>Click the <strong>View Educational Resources</strong> button below the results.</li>
                  </ol>
                </div>
              </li>
              <li class="flex gap-3">
                <ChatBubbleLeftRightIcon class="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <strong class="text-gray-900">Make a Post</strong>
                  <ol class="list-decimal pl-6 mt-2 text-gray-600">
                    <li>Go to the <strong>Community Posts</strong> section.</li>
                    <li>Click the <strong>Make Post</strong> button.</li>
                    <li>Enter details such as the question, content, and disease type, then submit.</li>
                    <li>Alternatively, make a post from the image analysis results by clicking <strong>Make Post</strong>.</li>
                  </ol>
                </div>
              </li>
              <li class="flex gap-3">
                <ChatBubbleLeftRightIcon class="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <strong class="text-gray-900">Comment on Posts</strong>
                  <ol class="list-decimal pl-6 mt-2 text-gray-600">
                    <li>In the <strong>Community Posts</strong> section, find an approved post.</li>
                    <li>Click the <strong>Comment</strong> button to add your comment.</li>
                  </ol>
                </div>
              </li>
              <li class="flex gap-3">
                <CalendarIcon class="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <strong class="text-gray-900">Book a Consultation</strong>
                  <ol class="list-decimal pl-6 mt-2 text-gray-600">
                    <li>Navigate to the <strong>Expert Slots</strong> section.</li>
                    <li>View available consultation slots.</li>
                    <li>Click the <strong>Book</strong> button next to a slot to schedule.</li>
                  </ol>
                </div>
              </li>
            </ul>
          </div>

          <!-- Expert Guide -->
          <div v-if="userRole === 'expert'" class="bg-white rounded-lg border border-gray-200 shadow-sm p-6 transition-all duration-300 hover:shadow-md">
            <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <DocumentMagnifyingGlassIcon class="w-6 h-6 text-green-600" />
              Expert User Guide
            </h3>
            <ul class="space-y-4 text-gray-700">
              <li class="flex gap-3">
                <CameraIcon class="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <strong class="text-gray-900">Upload Images for Model Retraining</strong>
                  <ol class="list-decimal pl-6 mt-2 text-gray-600">
                    <li>Go to the <strong>Image Analysis</strong> section.</li>
                    <li>Select the <strong>Model Training</strong> option.</li>
                    <li>Upload an image, select its label, and submit.</li>
                  </ol>
                </div>
              </li>
              <li class="flex gap-3">
                <CheckCircleIcon class="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <strong class="text-gray-900">Approve or Flag Posts</strong>
                  <ol class="list-decimal pl-6 mt-2 text-gray-600">
                    <li>Navigate to the <strong>Community Posts</strong> section and select <strong>All Posts</strong>.</li>
                    <li>Review posts and click <strong>Approve</strong> or <strong>Flag</strong> as needed.</li>
                  </ol>
                </div>
              </li>
              <li class="flex gap-3">
                <FlagIcon class="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <strong class="text-gray-900">Approve or Flag Comments</strong>
                  <ol class="list-decimal pl-6 mt-2 text-gray-600">
                    <li>In the <strong>Community Posts</strong> section, click the <strong>View</strong> button on a post.</li>
                    <li>Review comments under the post.</li>
                    <li>Click <strong>Approve</strong> or <strong>Flag</strong> for each comment.</li>
                  </ol>
                </div>
              </li>
              <li class="flex gap-3">
                <ClockIcon class="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <strong class="text-gray-900">Create Availability Slots</strong>
                  <ol class="list-decimal pl-6 mt-2 text-gray-600">
                    <li>Go to the <strong>Expert Slots</strong> section and select <strong>Create Slot</strong>.</li>
                    <li>Enter the start date and end date for your availability.</li>
                    <li>Click <strong>Submit</strong> to create the slot.</li>
                  </ol>
                </div>
              </li>
              <li class="flex gap-3">
                <CalendarIcon class="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <strong class="text-gray-900">Approve or Reject Bookings</strong>
                  <ol class="list-decimal pl-6 mt-2 text-gray-600">
                    <li>Navigate to the <strong>Expert Slots</strong> section and select <strong>Bookings</strong>.</li>
                    <li>Review the list of farmer bookings.</li>
                    <li>Click <strong>Approve</strong> or <strong>Reject</strong> for each booking.</li>
                  </ol>
                </div>
              </li>
            </ul>
          </div>

          <!-- Unknown Role Fallback -->
          <div v-if="userRole !== 'farmer' && userRole !== 'expert'" class="bg-red-50 rounded-lg p-6 border border-red-200">
            <p class="text-red-700 font-medium flex items-center gap-2">
              <FlagIcon class="w-6 h-6 text-red-600" />
              No valid user role found. Please log in as a farmer or expert to view the appropriate guide.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar styling */
/* .container {
  max-height: calc(100vh - 8rem);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #10b981 #e5e7eb;
} */

/* .container::-webkit-scrollbar {
  width: 8px;
}

.container::-webkit-scrollbar-track {
  background: #e5e7eb;
  border-radius: 4px;
}

.container::-webkit-scrollbar-thumb {
  background: #10b981;
  border-radius: 4px;
} */

/* Hover effects for interactive elements */
li:hover {
  transform: translateX(4px);
  transition: transform 0.2s ease-in-out;
}

/* Smooth scrolling behavior */
.container {
  scroll-behavior: smooth;
}

/* Card-like section styling */
.bg-white {
  transition: box-shadow 0.3s ease;
}

/* Ensure consistent typography */
.text-gray-900 {
  font-family: 'Inter', sans-serif;
}

.text-gray-600 {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
}
</style>