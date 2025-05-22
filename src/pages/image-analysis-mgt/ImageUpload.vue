<script setup lang="ts">
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import { useRoute } from "vue-router";
import { computed, onUnmounted, ref, watch } from "vue";
import type { MazDropzoneInstance } from "maz-ui/components/MazDropzone";
import { useUtilities } from "@/composables/useUtilities";
import MazSpinner from "maz-ui/components/MazSpinner";
import MazBtn from "maz-ui/components/MazBtn";
import MazDropzone from "maz-ui/components/MazDropzone";
import { imageStore } from "@/stores/image-analysis.store";
import type { DropzoneOptions, DropzoneFile } from "dropzone";
import type { EducationalResource, RustDetectionResult } from '@/types/services/image-analysis';

// Handle notifications
const { showNotification } = useUtilities();

// Access the current route
const route = useRoute();

// Access the image store
const imgStore = imageStore();
const imageAnalysisResults = computed<RustDetectionResult | null>(() => imgStore.imageAnalysisResults);
const educationResources = ref<EducationalResource[]>([]);
const dropzoneLoading = ref<boolean>(false);
const errorMessage = ref<string>();
const mazDropzoneInstance = ref<MazDropzoneInstance>();
const leafMessage = ref<string>("");

// Computed properties for leaf detection
const is_leaf = computed<boolean | null>(() => imgStore.is_leaf);


// Watch for image analysis results
watch(imageAnalysisResults, (val) => {
  if (val) {
    educationResources.value = val.educational_resources;
    dropzoneLoading.value = false;
    showNotification("Success", "Image analysis successfully done", "success");
    imgStore.resetDetection();

  }
});

// Computed property to convert confidence to percentage
const confidencePercentage = computed(() => {
  return imageAnalysisResults.value?.confidence != null
    ? `${(imageAnalysisResults.value.confidence * 100).toFixed(2)}%`
    : "N/A";
});

// Function to remove underscore
const removeUnderScore = (item: string | undefined | null) => {
  if (typeof item === 'string') {
    return item.split("_").join(" ").toLowerCase();
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
};

// Handle "Process Image" button click
const sendFiles = async () => {
  // if (!canProcessImage.value) {
  //   showNotification("Error", "Cannot process image: Image is not a leaf or leaf detection is pending.", "error");
  //   return;
  // }

  const files = mazDropzoneInstance.value?.getAcceptedFiles() as DropzoneFile[] | undefined;
  if (!files || files.length === 0) {
    showNotification("Error", "Please upload an image to process.", "error");
    return;
  }

  const dropzoneFile = files[0];
  const file = dropzoneFile as unknown as File;
  dropzoneLoading.value = true;

  try {
    await imgStore.LeafDetection(file);
  watch(is_leaf, (newLeaf)=>{
  if(newLeaf === true){
      showNotification("Success", "Image is under processing", "success");
      imgStore.ImageUpload(file);
  } else if(newLeaf === false){
    dropzoneLoading.value = false
    showNotification("Error", "This is not a leaf", "error");
    imgStore.resetDetection();
  }
})
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
  maxThumbnailFilesize: 5,
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
  dictMaxFilesExceeded: `You can only upload one image at a time`,
};

const dropzoneOptions: DropzoneOptions = {
  ...dropzoneOptionsBase,
  ...translations,
};

const dialogOpenBioData = ref<boolean>(false);

const openCommentsDialog = () => {
  dialogOpenBioData.value = true;
};

onUnmounted(() => {
  imgStore.resetAnalysisResults();
});
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

            
            <p v-if="dropzoneLoading" class="text-gray-500 text-center">
              Processing leaf detection...
            </p>

            <!-- Display analysis results -->
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
                  <button
                    @click="openCommentsDialog()"
                    class="w-full sm:w-auto text-center bg-green-100 text-green-700 font-semibold py-2 px-4 rounded-md hover:bg-green-200 transition ease-in-out duration-300"
                  >
                    View Educational Resources
                  </button>
                  <RouterLink
                    to="/account/addresses/slots"
                    class="w-full sm:w-auto text-center bg-green-100 text-green-700 font-semibold py-2 px-4 rounded-md hover:bg-green-200 transition ease-in-out duration-300"
                  >
                    Book a Slot
                  </RouterLink>
                </div>
              </div>
            </div>

            <!-- Error message -->
            <p v-if="errorMessage" class="text-red-500 text-center">
              {{ errorMessage }}
            </p>

            <!-- Process Image button -->
            <MazBtn
              left-icon="arrow-up-tray"
              :loading="dropzoneLoading"
              @click="sendFiles"
              class="ml-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all ease-in-out duration-300"
            >
              Process Image
            </MazBtn>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Educational Resources Dialog -->
  <Dialog :open="dialogOpenBioData" @close="dialogOpenBioData = false" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm flex w-screen items-center justify-center p-4">
      <DialogPanel
        class="w-full max-w-4xl max-h-[90vh] rounded-lg bg-white p-6 shadow-2xl border border-gray-100 overflow-hidden"
      >
        <DialogTitle class="pb-4 mb-4 border-b border-gray-200 flex justify-between items-center">
          <div class="w-full">
            <h2 class="text-lg font-semibold text-gray-800">Educational Resources</h2>
          </div>
          <XMarkIcon
            class="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors duration-200"
            @click="dialogOpenBioData = false"
          />
        </DialogTitle>

        <div class="overflow-y-auto max-h-[60vh] scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-100">
          <!-- Educational Resources -->
          <div v-if="educationResources.length" class="p-4 bg-gray-50 rounded-lg">
            <div class="w-full">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div
                  v-for="resource in educationResources"
                  :key="resource.id"
                  class="group relative p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                >
                  <div class="flex justify-between items-center mb-3">
                    <div class="flex items-center gap-2">
                      <div
                        class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold text-sm"
                      >
                        {{ resource.title[0] }}
                      </div>
                      <span class="font-semibold text-gray-800 text-sm">{{ resource.title }}</span>
                    </div>
                    <span class="text-xs text-gray-500">{{
                      new Date(resource.created_at).toLocaleDateString()
                    }}</span>
                  </div>
                  <p class="text-gray-600 text-sm leading-relaxed mb-3">
                    {{ resource.description || 'No description provided.' }}
                  </p>
                  <a
                    :href="resource.url"
                    target="_blank"
                    class="text-blue-600 text-sm hover:underline"
                  >
                    Read more
                  </a>
                  <span class="text-xs text-gray-500 mt-2">
                    Resource Type: {{ resource.resource_type }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="p-4 text-center text-gray-500">
            No educational resources available.
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-4 mt-6">
          <button
            @click="dialogOpenBioData = false"
            class="bg-gray-200 text-gray-800 py-2 px-6 rounded-lg shadow-md font-semibold hover:bg-gray-300 transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<style scoped>
/* Custom Scrollbar */
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: #10b981 #f3f4f6; /* green-500 and gray-100 */
}

.scrollbar-thin::-webkit-scrollbar {
  width: 8px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #f3f4f6; /* gray-100 */
  border-radius: 4px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #10b981; /* green-500 */
  border-radius: 4px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #059669; /* green-600 */
}
</style>