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
import type { Advice, Report } from "@/types/services/user-mgt.types";
import type { Item } from "@/types/components/helper-types";
import MailDropDownSelect from "@/components/MailDropDownSelect.vue";
import { useAuthStore } from "@/stores/user-mgt.store";


const router = useRouter();
const route = useRoute();
const { showNotification } = useUtilities();
const store = useAuthStore();

const approveCommentResponse = computed<any | null >(()=>store.approveCommentResponse)
const rejectCommentResponse = computed<any | null>(()=>store.rejectCommentResponse)
const unFlagResponse = computed<any | null>(()=>store.unFlagResponse)
watch(approveCommentResponse , (val)=>{
  if(val.status === 201 || val.status === 200){
    showNotification("Success", "Comment has been approved", "success");
    isApproveLoading.value = false
    store.retrievePostResponses(route.params.id.toString());

  }else {
    showNotification("Error", "Comment was not approved", "error");
  }
})
watch(rejectCommentResponse, (val)=>{
  if(val.status === 201 || val.status === 200){
    showNotification("Success", "Comment has been successfully flagged", "success");
    isFlagLoading.value = false
    store.retrievePostResponses(route.params.id.toString())

  }else {
    showNotification("Error", "Comment Post was not unflagged", "error");
  }
})
//post
const post = computed<Report | null>(()=>store.post);

watch(post, (val)=>{
  console.log(val)
})

// Sample data for scrollable section
const samplePosts = computed<Advice[]>(()=>store.retrievedResponses)

const expertComment = ref<string>("")


const isFlagLoading = ref<boolean>(false)
const isApproveLoading = ref<boolean>(false)
const isUnflagLoading = ref<boolean>(false)

//function for flagging a post
const flag = (id:string)=>{
  isFlagLoading.value = true
  const payload = {
    response_id: id,
    action: "approve",
    expert_comment: expertComment.value
  }
  store.rejectComment(route.params.id.toString(),payload)

}
//function to approve a comment
const approve = (id:string)=> {
  isApproveLoading.value = true
  const payload = {
    response_id: id,
    action: "approve",
    expert_comment: expertComment.value
  }
  store.approveComment(route.params.id.toString(),payload);
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






















onMounted(()=>{
    store.retrievePostResponses(route.params.id.toString())
    store.getPostById(route.params.id.toString())
     console.log(store.post)
})

</script>

<template>
  <div class="p-2 container-md mx-auto flex flex-col gap-5">
  <!-- Breadcrumbs -->
  <div class="flex justify-end items-center gap-2 w-full p-2">
    <Breadcrumbs />
  </div>

  <!-- Main content container -->
  <div class="bg-white rounded-sm shadow p-4">
    <span class="font-medium uppercase block mb-4">{{ route.name }}</span>
    <div class="border-b mb-4"></div> 

    <!-- Two-column layout -->
    <div class="flex flex-col lg:flex-row gap-4 h-[70vh]"> 
      
      <!-- Left panel: Post details (fixed, unscrollable) -->
      <div class="lg:w-1/3 w-full p-6 border border-gray-200 rounded-md bg-white shadow-sm">
  <h2 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Post Details</h2>
  <div class="space-y-3 text-gray-700">
    <p><span class="font-medium text-gray-900">Title:</span> {{ post?.title }}</p>
    <p><span class="font-medium text-gray-900">Content:</span> {{ post?.content }}</p>
    <p><span class="font-medium text-gray-900">Crop:</span> {{ post?.crop_type }}</p>
    <p><span class="font-medium text-gray-900">Disease:</span> {{ post?.disease_type }}</p>
    <p><span class="font-medium text-gray-900">Urgency:</span> {{ post?.urgency_level }}</p>
  </div>
</div>


     <!-- Scrollable Comments Section -->
<div class="lg:w-2/3 scrollable-y pr-2 h-full max-h-[calc(100vh-100px)]">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div
      v-for="post in samplePosts"
      :key="post.id"
      class="group relative p-6 border border-gray-200 rounded-xl shadow-md bg-white hover:shadow-lg transition-all duration-300 flex flex-col h-[260px]"
    >

      <!-- Content -->
      <p class="text-gray-600 text-sm line-clamp-3 leading-relaxed">
        {{ post.content }}
      </p>

      <!-- Flexible spacer to push buttons down -->
      <div class="flex-grow"></div>

      <!-- Action Buttons & Status -->
      <div class="relative mt-4 flex items-center justify-between">
        <div class="flex gap-2">
          <!-- Flag -->
          <button
            @click.stop="flag(post.id)"
            class="px-3 py-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200 text-xs font-semibold flex items-center gap-1 transition"
          >
            <MazSpinner v-if="isFlagLoading" size="1.25em" color="white" />
            <span>Flag</span>
          </button>

          <!-- Approve -->
          <button
            @click.stop="approve(post.id)"
            class="px-3 py-1.5 bg-green-100 text-green-600 rounded-full hover:bg-green-200 text-xs font-semibold flex items-center gap-1 transition"
          >
            <MazSpinner v-if="isApproveLoading" size="1.25em" color="white" />
            <span>Approve</span>
          </button>
        </div>

        <!-- Approved Icon -->
        <EyeIcon
          v-if="post.is_approved"
          class="w-5 h-5 text-green-500 hover:text-green-600 cursor-pointer transition-colors duration-200"
          @click.stop="router.push('account/addresses/image-analysis')"
        />
      </div>
    </div>
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