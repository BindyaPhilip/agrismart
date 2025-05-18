<script setup lang="ts">
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import { useRoute } from "vue-router";
import { computed, ref, watch } from "vue";
import type { MazDropzoneInstance } from "maz-ui/components/MazDropzone";
import { useUtilities } from "@/composables/useUtilities";
import MazSpinner from "maz-ui/components/MazSpinner";
import MazBtn from "maz-ui/components/MazBtn";
import MazDropzone from "maz-ui/components/MazDropzone";
import { imageStore } from "@/stores/image-analysis.store";
import type { DropzoneOptions, DropzoneFile } from "dropzone"; // Import Dropzone types
import type {RustDetectionResult} from '@/types/services/image-analysis'
// Handle notifications
const { showNotification } = useUtilities();

// Access the current route
const route = useRoute();

// Access the image store
const imgStore = imageStore();
const imageAnalysisResults = computed<RustDetectionResult | null >(()=>imgStore.imageAnalysisResults)
// State for dropzone
const dropzoneLoading = ref<boolean>(false);
const errorMessage = ref<string>();
const mazDropzoneInstance = ref<MazDropzoneInstance>();

// Watchers for store responses
const response = computed<string>(() => imgStore.response.toString());

watch(imageAnalysisResults, (val) => {
  if (val) {
    dropzoneLoading.value = false;
    showNotification("Success","Image analysis successfully done", "success")
    // mazDropzoneInstance.value?.removeAllFiles(); // Clear the dropzone after success
  }
});

// Computed property to convert confidence to percentage
const confidencePercentage = computed(() => {
  return imageAnalysisResults.value?.confidence != null
    ? `${(imageAnalysisResults.value.confidence * 100).toFixed(2)}%`
    : "N/A";
});
//functon to remove underscore
const removeUnderScore = (item: string | undefined | null) => {
  if (typeof item === 'string') {
    return item.split("_").join(" ").toLowerCase();;
  }
  return ""; 
};
// Dropzone handlers
const handleError = ({ file, message }: { file: DropzoneFile; message: string }) => {
  console.log("dropzone-error", { file, message });
  errorMessage.value = message;
  showNotification("Error", message, "error");
  dropzoneLoading.value = false;
};

const handleSuccess = ({ file, response }: { file: DropzoneFile; response: any }) => {
  console.log("dropzone-success", { file, response });
  imgStore.response = response?.message || "Image processed successfully";
  // We'll handle displaying the results (educational resources) later
};

const sendFiles = async () => {
  const files = mazDropzoneInstance.value?.getAcceptedFiles() as DropzoneFile[] | undefined;
  if (!files || files.length === 0) {
    showNotification("Error", "Please upload an image to process.", "error");
    return;
  }

  const dropzoneFile = files[0]; // Only one file is allowed (maxFiles: 1)
  const file = dropzoneFile as unknown as File; // Cast DropzoneFile to File
  dropzoneLoading.value = true;

  try {
    await imgStore.ImageUpload(file);
  } catch (err: any) {
    showNotification("Error", err.message || "Failed to upload image", "error");
    dropzoneLoading.value = false;
  }
};

// Dropzone configuration
const dropzoneOptionsBase: any = {
  url: "javascript:void(0)", // Not used since we're handling upload manually
  acceptedFiles: "image/jpeg,image/jpg,image/png",
  maxFilesize: 5, // 5MB
  maxFiles: 1, // Only allow one file at a time
  maxThumbnailFilesize: 3,
  autoProcessQueue: false,
  autoRemoveOnError: true,
};

const translations: Partial<any> = {
  dictDefaultMessage: "Upload or drop an image to detect rust",
  dictFilesDescriptions: `(PNG or JPG under ${dropzoneOptionsBase.maxFilesize} MB)`,
  dictFallbackMessage: "Your browser is not supported",
  dictFileTooBig: `File too big (max: ${dropzoneOptionsBase.maxFilesize} MB)`,
  dictInvalidFileType: `File type not supported`,
  dictRemoveFile: "Remove",
  dictCancelUpload: "Cancel upload",
  dictMaxFilesExceeded: `You can only upload one image at a time`
};

const dropzoneOptions: DropzoneOptions = {
  ...dropzoneOptionsBase,
  ...translations,
};
</script>

<template>
  <div class="p-2 container mx-auto flex flex-col gap-4">
    <div class="justify-end items-center gap-2 w-full flex p-2">
      <Breadcrumbs />
    </div>
    <div class="w-full flex flex-col bg-white rounded-sm shadow">
      <span class="uppercase font-medium p-4 sticky top-0 z-10 bg-white">{{ route.name }}</span>
      <div class="border"></div>
      <div class="w-full p-10">
        <div class="container mx-auto mt-10 p-6 bg-gradient-to-b from-gray-50 to-white rounded-lg shadow-lg">
          <!-- Dropzone component for image upload -->
          <div class="flex flex-col justify-center mb-10 gap-4">
            <ClientOnly>
              <MazDropzone
                ref="mazDropzoneInstance"
                :options="dropzoneOptions"
                @error="handleError"
                @success="handleSuccess"
                @sending="dropzoneLoading = true"
                @complete="dropzoneLoading = false"
                class="w-full"
              />
            </ClientOnly>

            <div v-if="imageAnalysisResults" class="w-full p-6 bg-white rounded-lg shadow-md border border-gray-200">
              <h3 class="text-xl font-bold text-gray-700 mb-4 border-b border-gray-300 pb-2">Results</h3>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <p class="text-gray-600 font-medium">Disease Detected:</p>
                  <p class="text-gray-800 font-semibold">{{ removeUnderScore(imageAnalysisResults.rust_class) || "N/A" }}</p>
                </div>
                <div class="flex items-center justify-between">
                  <p class="text-gray-600 font-medium">Confidence Score:</p>
                  <p class="text-gray-800 font-semibold">{{ confidencePercentage }}</p>
                </div>
                <div class="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
                  <RouterLink
                    to="/account/addresses/education-resources"
                    class="w-full sm:w-auto text-center bg-green-100 text-green-700 font-semibold py-2 px-4 rounded-md hover:bg-green-200 transition ease-in-out duration-300"
                  >
                    View Educational Resources
                  </RouterLink>
                  <RouterLink
                    to="/experts"
                    class="w-full sm:w-auto text-center bg-green-100 text-green-700 font-semibold py-2 px-4 rounded-md hover:bg-green-200 transition ease-in-out duration-300"
                  >
                    Book a Slot
                  </RouterLink>
                </div>
              </div>
            </div>

            <p v-if="errorMessage" class="text-red-500 text-center">
              {{ errorMessage }}
            </p>

            <MazBtn
              left-icon="arrow-up-tray"
              :loading="dropzoneLoading"
              @click="sendFiles"
              class="ml-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all ease-in-out duration-300"
            >
              Process Image
            </MazBtn>
          </div>

          <!-- Placeholder for educational resources -->
          <!-- <div v-if="imageAnalysisResults" class="w-full p-6 shadow-lg rounded-lg h-[100vh] flex flex-col bg-white justify-center">
            <div class="p-2 w-full">
              <h2 class="text-2xl font-bold items-center text-gray-600 pb-4 mb-6 border-gray-400 border-b-2">
                Educational Resources
              </h2>
            </div>
            <div class="overflow-hidden h-[85vh]">
              <div class="overflow-y-auto h-[85vh]">
                <p class="text-gray-500 text-center">Educational resources will be displayed here after processing.</p>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any custom styles here */
</style>