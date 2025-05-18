<script setup lang="ts">
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import { useRoute } from "vue-router";
import { useRouter} from "vue-router";
import { computed, onMounted, ref, watch } from "vue";
import MazTable from "maz-ui/components/MazTable";
import { PencilIcon, TrashIcon, XMarkIcon,EyeIcon } from "@heroicons/vue/24/outline";
import MazSpinner from "maz-ui/components/MazSpinner";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import { useUtilities } from "@/composables/useUtilities";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";
import type { Report } from "@/types/services/user-mgt.types";
import type { Item } from "@/types/components/helper-types";
import MailDropDownSelect from "@/components/MailDropDownSelect.vue";
import { useAuthStore } from "@/stores/user-mgt.store";


const router = useRouter();
const route = useRoute();
const { showNotification } = useUtilities();
const store = useAuthStore();

const flagResponse = computed<any | null >(()=>store.flagResponse)
const approveResponse = computed<any | null>(()=>store.approveResponse)
const unFlagResponse = computed<any | null>(()=>store.unFlagResponse)
watch(flagResponse, (val)=>{
  if(val.status === 201 || val.status === 200){
    showNotification("Success", "Community Post has been flagged", "success");
    isFlagLoading.value = false
    store.GetAllCommunityPosts();

  }else {
    showNotification("Error", "Community Post was not flagged", "error");
  }
})
watch(unFlagResponse, (val)=>{
  if(val.status === 201 || val.status === 200){
    showNotification("Success", "Community Post has been successfully unflagged", "success");
    isFlagLoading.value = false
    store.GetAllCommunityPosts();

  }else {
    showNotification("Error", "Community Post was not unflagged", "error");
  }
})
watch(approveResponse, (val)=>{
  if(val.status === 201 || val.status === 200){
    showNotification("Success", "Community Post has been approved", "success");
    isApproveLoading.value = false
    store.GetAllCommunityPosts();

  }else {
    showNotification("Error", "Community Post was not approved", "error");
  }
})
// Sample data for scrollable section
const samplePosts = computed<Report[]>(()=>store.allPosts)




const isFlagLoading = ref<boolean>(false)
const isApproveLoading = ref<boolean>(false)
const isUnflagLoading = ref<boolean>(false)
//function for approving a post
const flag = (id:string)=>{
  isFlagLoading.value = true
  store.flagPost(id,{"action":"flag"})

}
//function to approve a post
const approve = (id:string)=> {
  isApproveLoading.value = true
  store.approvePost(id,{"action":"approve"})
}
//function to unflag a post
const unFlag = (id:string)=> {
  isUnflagLoading.value = true
  store.unFlagPost(id,{"action":"unflag"})
}

const confirmLoading = ref<boolean>(false);
const commentText = ref<string>("")
const isOpen = ref<boolean>(false)
const closeDialog = ref<boolean>(false)
const selectedPost = ref<Report | undefined>(undefined)
  const  getSelectedPost = (id:string): any | undefined => {
    return samplePosts.value.find(
    (post)=> post.id === id
  )
}


const openCommentDialog = (id:string):void =>{
  isOpen.value = true
  selectedPost.value = getSelectedPost(id);
}


const routeTo = (postId: string) => {
  router.push(`/account/addresses/${postId}`)
}




















onMounted(()=>{
    store.GetAllCommunityPosts();
})

</script>

<template>
  <div class="p-2 container-md mx-auto flex flex-col gap-5">
    <div class="flex justify-end items-center gap-2 w-full p-2">
      <Breadcrumbs />
    </div>

    <div class="bg-white rounded-sm shadow p-4">
      <span class="font-medium uppercase block mb-4">{{ route.name }}</span>
      <div class="border-b mb-4"></div> <!-- Restored horizontal border -->

      <!-- Updated posts grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 scrollable-y">
        <!-- Directly loop over posts -->
        <div
          v-for="post in samplePosts"
          :key="post.id"
          class="relative p-5 border border-gray-200 rounded-xl shadow-sm bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[320px]"
        >
          <!-- Status Tag -->
          <span
            v-if="post.is_flagged || post.is_approved"
            class="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm"
            :class="{
              'bg-red-100 text-red-600': post.is_flagged,
              'bg-green-100 text-green-600': post.is_approved
            }"
          >
            {{ post.is_flagged ? 'Flagged' : 'Approved' }}
          </span>

          <!-- Post Content -->
          <div class="flex flex-col gap-3">
            <h3 class="text-lg font-semibold text-gray-800 line-clamp-2">{{ post.title }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed line-clamp-3">{{ post.content }}</p>
          </div>

          <!-- Post Meta -->
          <div class="mt-4 text-xs text-gray-500 flex flex-wrap gap-2">
            <span class="bg-gray-100 px-2 py-1 rounded-md">🌿 {{ post.crop_type }}</span>
            <span class="bg-gray-100 px-2 py-1 rounded-md">🦠 {{ post.disease_type }}</span>
            <span class="bg-gray-100 px-2 py-1 rounded-md">⚠️ {{ post.urgency_level }}</span>
          </div>

          <!-- Actions -->
          <div class="mt-4 flex items-center justify-between">
            <!-- Button Group -->
            <div class="flex gap-2">
              <button
                v-if="!post.is_flagged && !post.is_approved"
                @click="flag(post.id)"
                class="px-3 py-1.5 bg-red-100 text-red-600 text-xs font-semibold rounded-md hover:bg-red-200 flex items-center gap-2 transition-colors duration-200"
              >
                <MazSpinner v-if="isFlagLoading" size="1.2em" color="white" />
                <span>Flag</span>
              </button>
              <button
                v-if="post.is_flagged"
                @click="unFlag(post.id)"
                class="px-3 py-1.5 bg-red-100 text-red-600 text-xs font-semibold rounded-md hover:bg-red-200 flex items-center gap-2 transition-colors duration-200"
              >
                <MazSpinner v-if="isFlagLoading" size="1.2em" color="white" />
                <span>Unflag</span>
              </button>
              <button
                v-if="!post.is_flagged && !post.is_approved"
                @click="approve(post.id)"
                class="px-3 py-1.5 bg-green-100 text-green-600 text-xs font-semibold rounded-md hover:bg-green-200 flex items-center gap-2 transition-colors duration-200"
              >
                <MazSpinner v-if="isApproveLoading" size="1.2em" color="white" />
                <span>Approve</span>
              </button>
            </div>

            <!-- View Icon -->
            <EyeIcon
              v-if="post.is_approved"
              class="w-6 h-6 text-green-500 hover:text-green-700 cursor-pointer transition-colors duration-200"
              @click="routeTo(post.id)"
            />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
 
  
  
<style scoped>
/* Hide scrollbar while keeping y-axis scrollable */
.scrollable-y {
  max-height: 70vh; /* Adjust as needed */
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

/* Chrome, Safari, Edge */
.scrollable-y::-webkit-scrollbar {
  display: none;
}
</style>