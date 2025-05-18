<script setup lang="ts">
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import { useRoute } from "vue-router";
import { computed, ref, watch } from "vue";
import type { MazDropzoneInstance } from "maz-ui/components/MazDropzone";
import { useUtilities } from "@/composables/useUtilities";
import MazSpinner from "maz-ui/components/MazSpinner";
import MazBtn from "maz-ui/components/MazBtn";
import MazDropzone from "maz-ui/components/MazDropzone";
import MailDropDownSelect from "@/components/MailDropDownSelect.vue";
import { imageStore } from "@/stores/image-analysis.store";
import type { DropzoneOptions, DropzoneFile } from "dropzone";
import type { RustDetectionResult, ModelTrainInput } from "@/types/services/image-analysis";
import type { Item } from "@/types/components/helper-types";

// Handle notifications
const { showNotification } = useUtilities();

// Access the current route
const route = useRoute();

// Access the image store
const imgStore = imageStore();

// State for dropzone
const dropzoneLoading = ref<boolean>(false);
const trainingLoading = ref<boolean>(false);
const errorMessage = ref<string>();
const mazDropzoneInstance = ref<MazDropzoneInstance>();

// Training payload
const trainingPayload = ref<ModelTrainInput>({
  image: null as unknown as File,
  label: "",
});

// Labels
const labels = ref<Array<Item>>([
  { value: "", label: "Select Label" },
  { value: "common_rust", label: "Common Rust" },
  { value: "healthy", label: "Healthy" },
  { value: "other_disease", label: "Other Disease" },
]);

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

const handleFileAdded = (event: any) => {
  console.log("handleFileAdded event:", event);
  const file = event.file || event;
  if (file) {
    console.log("File added:", file);
    const fileObject = new File([file], file.name, { type: file.type });
    trainingPayload.value.image = fileObject;
    console.log("Updated trainingPayload.image:", trainingPayload.value.image);
  } else {
    console.warn("No file provided in added-file event");
  }
};

const handleFileRemoved = () => {
  console.log("File removed from dropzone");
  trainingPayload.value.image = null as unknown as File;
};

const debugDropzoneEvent = (event: any) => {
  console.log("Dropzone event:", event);
};

const sendTrainingData = async () => {
  const files = mazDropzoneInstance.value?.getAcceptedFiles() as DropzoneFile[] | undefined;
  console.log("Dropzone accepted files:", files);

  if (files && files.length > 0 && (!trainingPayload.value.image || !(trainingPayload.value.image instanceof File))) {
    const file = files[0];
    trainingPayload.value.image = new File([file], file.name, { type: file.type });
  }

  console.log("trainingPayload.image:", trainingPayload.value.image);

  if (!trainingPayload.value.image || !(trainingPayload.value.image instanceof File)) {
    showNotification("Error", "Please upload a valid image for training.", "error");
    return;
  }
  if (!trainingPayload.value.label || trainingPayload.value.label === "") {
    showNotification("Error", "Please select a label for training.", "error");
    return;
  }

  trainingLoading.value = true;
  try {
    await imgStore.ModelTraining(trainingPayload.value);
    showNotification("Success", "Training data submitted successfully", "success");
    mazDropzoneInstance.value?.removeAllFiles();
    trainingPayload.value = { image: null as unknown as File, label: "" };
  } catch (err: any) {
    showNotification("Error", err.message || "Failed to submit training data", "error");
  } finally {
    trainingLoading.value = false;
  }
};

// Dropzone configuration
const dropzoneOptionsBase: any = {
  url: "javascript:void(0)",
  acceptedFiles: "image/jpeg,image/jpg,image/png",
  maxFilesize: 5,
  maxFiles: 1,
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
  dictMaxFilesExceeded: `You can only upload one image at a time`,
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
                  @added-file="handleFileAdded"
                  @addedfile="handleFileAdded"
                  @removed-file="handleFileRemoved"
                  @event="debugDropzoneEvent"
                  @sending="dropzoneLoading = true"
                  @complete="dropzoneLoading = false"
                  class="w-full"
                />
              </ClientOnly>
  
              <div class="w-full p-6 bg-white rounded-lg shadow-md border border-gray-200">
                <h3 class="text-xl font-bold text-gray-700 mb-4 border-b border-gray-300 pb-2">Image label</h3>
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <MailDropDownSelect
                      default-type="label"
                      :default-value="trainingPayload.label"
                      :items="labels"
                      @chosenItem="(value) => { trainingPayload.label = value }"
                    />
                  </div>
                  <div class="flex items-center justify-between"></div>
                  <div class="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4"></div>
                </div>
              </div>
  
              <p v-if="errorMessage" class="text-red-500 text-center">
                {{ errorMessage }}
              </p>
  
              <MazBtn
                left-icon="cloud-upload"
                :loading="trainingLoading"
                @click="sendTrainingData"
                class="ml-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all ease-in-out duration-300"
              >
                Submit for Training
              </MazBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>