<script setup lang="ts">
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import { useRoute } from "vue-router";
import { computed, ref, watch } from "vue";
import type { MazDropzoneInstance } from "maz-ui/components/MazDropzone";
import { useUtilities } from "@/composables/useUtilities";
import MazSpinner from "maz-ui/components/MazSpinner";
import MazBtn from "maz-ui/components/MazBtn";
import MazDropzone from "maz-ui/components/MazDropzone";
import MazAccordion from "maz-ui/components/MazAccordion"; // Import MazAccordion


import { imageStore } from "@/stores/image-analysis.store";
import type { DropzoneOptions, DropzoneFile } from "dropzone";
import type { RustDetectionResult } from "@/types/services/image-analysis";

// Handle notifications
const { showNotification } = useUtilities();

// Access the current route
const route = useRoute();

// Access the image store
const imgStore = imageStore();
const imageAnalysisResults = computed<RustDetectionResult | null>(() => imgStore.imageAnalysisResults);
const resources = ref<any[]>([]);

// Watch for changes in imageAnalysisResults to update resources
watch(imageAnalysisResults, (val) => {
  if (val && val.educational_resources) {
    resources.value = val.educational_resources;
    console.log("Educational Resources:", resources.value);
  } else {
    resources.value = [];
  }
});

// Ensure resources are loaded when the component mounts (in case navigation happens directly)
if (imageAnalysisResults.value && imageAnalysisResults.value.educational_resources) {
  resources.value = imageAnalysisResults.value.educational_resources;
}

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
          <!-- Educational Resources Section with MazAccordion -->
          <div class="w-full p-6 shadow-lg rounded-lg h-[100vh] flex flex-col bg-white">
            <div class="p-2 w-full">
              
            </div>
            <div class="overflow-hidden h-[85vh]">
              <div class="overflow-y-auto h-[85vh] p-4">
                <MazAccordion class="space-y-4">
                  <MazAccordionItem
                    v-for="(resource, index) in resources"
                    :key="index"
                    :id="index"
                  >
                    <template #title>
                      <span class="text-lg font-semibold text-gray-700">{{ resource.title }}</span>
                    </template>
                    <template #content>
                      <p class="text-gray-600">{{ resource.url }}</p>
                      <p class="text-gray-600">{{ resource.description }}</p>
                    </template>
                  </MazAccordionItem>
                </MazAccordion>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Style the MazAccordion to match the design */
:deep(.maz-accordion) {
  @apply w-full;
}

:deep(.maz-accordion__title) {
  @apply bg-gray-100 text-gray-700 font-semibold text-lg py-3 px-4 rounded-md hover:bg-gray-200 transition ease-in-out duration-300;
}

:deep(.maz-accordion__content) {
  @apply bg-white p-4 rounded-b-md border border-gray-200 text-gray-600;
}
</style>