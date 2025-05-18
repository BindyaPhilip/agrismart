<script setup lang="ts">
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import { useRoute } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";
import MazTable from "maz-ui/components/MazTable";
import { PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import MazSpinner from "maz-ui/components/MazSpinner";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";

import { useUtilities } from "@/composables/useUtilities";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";
import type { CommunityPostInput,Post,Report } from "@/types/services/user-mgt.types";
import type { Item } from "@/types/components/helper-types";
import MailDropDownSelect from "@/components/MailDropDownSelect.vue";
import { useAuthStore } from "@/stores/user-mgt.store";
const route = useRoute();
const { showNotification } = useUtilities();
const store = useAuthStore();
// Sample dropdown options
const diseaseTypes = ref<Item[]>([
  { value: "", label: "Select Disease" },
  { value: "common_rust", label: "Common Rust" },
  { value: "leaf_blust", label: "Leaf Blust" },
  { value: "gray_leaf_spot", label: "Gray Leaf Spot" },
  { value: "none", label: "Other" },
]);
const cropTypes = ref<Item[]>([
  { value: "", label: "Select Crop Type" },
  { value: "MAIZE", label: "Maize" },
  { value: "WHEAT", label: "Wheat" },
  { value: "RICE", label: "Rice" },
  { value: "BEANS", label: "Beans" },
]);
const urgencyLevel = ref<Item[]>([
  { value: "", label: "Select Urgency Level" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
]);

// Community post payload
const communityPostPayload = ref<CommunityPostInput>({
  title: "",
  content: "",
  image: "",
  disease_type: "",
  crop_type: "",
  urgency_level: "",
  rust_detection: "",
});



const communityPostResponse = computed<any | null>(()=>store.communityPostResponse);
const commentResponse = computed<any | null>(()=>store.commentResponse);
watch(communityPostResponse, (val)=>{
  if(val.status === 201 || val.status === 200){
    showNotification("Success", "Community Post submitted for approval", "success");
    isLoading.value = false

  }else {
    showNotification("Error", "Fill in all the fields", "error");
  }
})
watch(commentResponse, (val)=>{
  if(val.status === 201 || val.status === 200){
    showNotification("Success", "Your comment has been submitted", "success");
    confirmLoading.value = false
    isOpen.value = false
    store.getAllApprovedPosts()
    reset();

  }
})


const isLoading = ref<boolean>(false);

const submit = () => {
  isLoading.value = true
  store.MakeCommunityPost(communityPostPayload.value)

};


const approvedPosts = computed<Post[]>(()=>store.approvedPosts)

const confirmLoading = ref<boolean>(false);
const commentText = ref<string>("")
const isOpen = ref<boolean>(false)
const closeDialog = ref<boolean>(false)


const selectedPost = ref<Post | undefined>(undefined)
  const  getSelectedPost = (id:string): any | undefined => {
    return approvedPosts.value.find(
    (post)=> post.id === id
  )
}


const openCommentDialog = (id:string):void =>{
  isOpen.value = true
  selectedPost.value = getSelectedPost(id);
  
}


const submitAction = ()=>{
  if(!selectedPost.value?.id){
    showNotification("Error","No post selected","error")
    return;
  }
confirmLoading.value = true
const payload = {
  content:commentText.value
}
store.commentOnPost(selectedPost.value?.id,payload)
}

const reset = ()=>{
  commentText.value = ""
}

//handle comments
const dialogOpenBioData = ref<boolean>(false);

const openCommentsDialog = (id:string) =>{
  dialogOpenBioData.value = true
  selectedPost.value = getSelectedPost(id);
}

const selectedComponent=ref<string>("personal Details")
const selectComponent =(component:string)=>{


selectedComponent.value = component
}
















onMounted(()=>{
  store.getAllApprovedPosts()
})

</script>

<template>
  <div class="p-2 container-md mx-auto flex flex-col gap-5">
    <div class="flex justify-end items-center gap-2 w-full p-2">
      <Breadcrumbs />
    </div>
    <div class="flex lg:flex-row flex-col gap-3">
      <div
        class="w-2/6 h-fit flex flex-col bg-white rounded-sm shadow"
      >
        <span class="font-medium p-4 uppercase">Add a Post</span>
        <div class="border"></div>
        <div class="w-full p-4 flex flex-col">
          <div class="flex flex-col">
            <div class="mb-4 flex flex-col gap-1">
              <span class="font-medium capitalize">Question</span>
              <input
                type="text"
                v-model="communityPostPayload.title"
                class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none"
              />
            </div>
            <div class="mb-4 flex flex-col gap-1">
              <span class="font-medium capitalize">Content</span>
              <textarea
                v-model="communityPostPayload.content"
                class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none"
              ></textarea>
            </div>
          </div>
          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Crop Type</span>
            <MailDropDownSelect
              default-value="communityPostPayload.crop_type"
              :items="cropTypes"
              default-type="communityPostPayload.crop_type"
              @chosenItem="(value) => {
                communityPostPayload.crop_type = value;
              }"
            />
          </div>
          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Disease</span>
            <MailDropDownSelect
              default-value="communityPostPayload.disease_type"
              :items="diseaseTypes"
              default-type="communityPostPayload.disease_type"
              @chosenItem="(value) => {
                communityPostPayload.disease_type = value;
              }"
            />
          </div>
          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Urgency level</span>
            <MailDropDownSelect
              default-value="communityPostPayload.urgency_level"
              :items="urgencyLevel"
              default-type="communityPostPayload.urgency_level"
              @chosenItem="(value) => {
                communityPostPayload.urgency_level = value;
              }"
            />
          </div>
          <button
            @click="submit"
            class="bg-green-500 text-white mt-4 w-full py-3 rounded-md shadow-md capitalize justify-center font-bold items-center flex gap-2"
          >
            <MazSpinner
              v-if="isLoading"
              size="1.5em"
              color="white"
            />
            <span class="text-white uppercase">Submit</span>
          </button>
        </div>
      </div>
      <div
        class="w-4/6 flex flex-col bg-white rounded-sm shadow"
      >
        <span class="font-medium p-4 uppercase">{{ route.name }}</span>
        <div class="border"></div>
        <div
          class="w-full p-4 scrollable-y"
        >
          <!-- Sample data: List of posts -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="post in approvedPosts"
                :key="post.id"
                class="relative bg-white p-5 border border-gray-200 rounded-lg shadow hover:shadow-md transition-all duration-300"
              >
                <!-- Status Tag -->
                <span
                  v-if="post.is_flagged || post.is_approved"
                  class="absolute top-3 right-3 text-xs px-2 py-1 rounded-full font-semibold shadow-sm"
                  :class="{
                    'bg-red-100 text-red-600': post.is_flagged,
                    'bg-green-100 text-green-600': post.is_approved
                  }"
                >
                  {{ post.is_flagged ? 'Flagged' : 'Approved' }}
                </span>

                <h3 class="text-lg font-bold text-gray-800 mb-1">{{ post.title }}</h3>
                <p class="text-gray-700 text-sm mb-3 line-clamp-4">{{ post.content }}</p>

                <div class="text-sm text-gray-500 mb-3">
                  <span class="mr-2"><strong>Crop:</strong> {{ post.crop_type }}</span><br>
                  <span class="mr-2"><strong>Disease:</strong> {{ post.disease_type }}</span><br>
                  <span><strong>Urgency:</strong> {{ post.urgency_level }}</span>
                </div>

                <div class="flex justify-between">
                  <button
                    @click="openCommentsDialog(post.id)"
                    class="px-4 py-2 bg-green-600 text-white text-xs font-semibold rounded hover:bg-green-700 transition"
                  >
                    View Comments
                  </button>
                  <button
                    @click="openCommentDialog(post.id)"
                    class="px-4 py-2 bg-green-600 text-white text-xs font-semibold rounded hover:bg-green-700 transition"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>

        </div>
      </div>
    </div>
  </div>

  <Dialog :open="isOpen"  class="relative z-50">
  <div class="fixed  inset-0 backdrop-blur-sm bg-green-500/10 flex w-screen items-center justify-center p-4">
    <DialogPanel class="w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl border border-gray-200">
      <DialogTitle class="pb-4 border-b mb-4 flex justify-between items-center">
        <span class="font-bold text-xl text-gray-800">Write a comment on this post</span>
        <XMarkIcon class="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors duration-200" @click="isOpen = false" />
      </DialogTitle>

      <div class="w-full space-y-6">
        <!-- 🧾 Stylish Post Info Section -->
        <div class="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-800 mb-1 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4h4m-4 4h4m1-10V4a1 1 0 00-1-1H9a1 1 0 00-1 1v2h8z" />
            </svg>
            {{ selectedPost?.title }}
          </h3>
          <p class="text-gray-600 text-sm">{{ selectedPost?.content }}</p>

          <div class="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
              🌿 Crop: {{ selectedPost?.crop_type }}
            </span>
            <span class="bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
              🦠 Disease: {{ selectedPost?.disease_type }}
            </span>
            <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
              ⚠️ Urgency: {{ selectedPost?.urgency_level }}
            </span>
          </div>
        </div>

        <!-- 💬 Comment Textarea -->
        <div class="flex flex-col gap-2">
          <label for="comment" class="text-sm font-medium text-gray-700">Your Comment</label>
          <textarea
            id="comment"
            v-model="commentText"
            rows="4"
            class="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow"
            placeholder="Write your comment about this post..."
          ></textarea>
        </div>

        <!-- ✅ Confirm Button -->
        <button 
          @click="submitAction" 
          class="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center gap-2 text-sm font-semibold tracking-wide transition-all duration-200"
        >
          <MazSpinner v-if="confirmLoading" size="1.5em" color="white" />
          <span>Comment</span>
        </button>
      </div>
    </DialogPanel>
  </div>
</Dialog>
 <Dialog :open="dialogOpenBioData" @close="dialogOpenBioData = false" class="relative z-50">
  <div class="fixed inset-0 bg-black/30 backdrop-blur-sm flex w-screen items-center justify-center p-4">
    <DialogPanel
      class="w-full max-w-4xl max-h-[90vh] rounded-lg bg-white p-6 shadow-2xl border border-gray-100 overflow-hidden"
    >
      <DialogTitle class="pb-4 mb-4 border-b border-gray-200 flex justify-between items-center">
        <div class="w-full">
          <div class="flex flex-row gap-3 justify-center">
            <button
              :class="[
                selectedComponent === 'personal Details'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                'px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200'
              ]"
              @click="selectComponent('personal Details')"
            >
              Farmers' Comments
            </button>
            <button
              :class="[
                selectedComponent === 'subscription'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                'px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200'
              ]"
              @click="selectComponent('subscription')"
            >
              Expert Comments
            </button>
          </div>
        </div>
        <XMarkIcon
          class="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors duration-200"
          @click="dialogOpenBioData = false"
        />
      </DialogTitle>

      <div class="overflow-y-auto max-h-[60vh] scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-100">
        <!-- Farmers' Comments -->
        <div
          v-if="selectedComponent === 'personal Details'"
          class="p-4 bg-gray-50 rounded-lg"
        >
          <div class="w-full">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div
                v-for="comment in selectedPost?.farmer_comments"
                :key="comment.id"
                class="group relative p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div class="flex justify-between items-center mb-3">
                  <div class="flex items-center gap-2">
                    <div
                      class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold text-sm"
                    >
                      {{ comment.farmer.username[0] }}
                    </div>
                    <span class="font-semibold text-gray-800 text-sm">{{
                      comment.farmer.username
                    }}</span>
                  </div>
                  <span class="text-xs text-gray-500">{{
                    new Date(comment.created_at).toLocaleDateString()
                  }}</span>
                </div>
                <p class="text-gray-600 text-sm leading-relaxed">
                  {{ comment.content || 'No comment provided.' }}
                </p>
              </div>
              <div
                v-if="!selectedPost?.farmer_comments?.length"
                class="col-span-2 text-center text-gray-500 py-8"
              >
                No farmers' comments available.
              </div>
            </div>
          </div>
        </div>

        <!-- Expert Comments -->
        <div
          v-if="selectedComponent === 'subscription'"
          class="p-4 bg-gray-50 rounded-lg"
        >
          <div class="w-full">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div
                v-for="comment in selectedPost?.expert_comments"
                :key="comment.id"
                class="group relative p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div class="flex justify-between items-center mb-3">
                  <div class="flex items-center gap-2">
                    <div
                      class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm"
                    >
                      {{ comment.expert.username[0] }}
                    </div>
                    <span class="font-semibold text-gray-800 text-sm">{{
                      comment.expert.username
                    }}</span>
                  </div>
                  <span class="text-xs text-gray-500">{{
                    new Date(comment.created_at).toLocaleDateString()
                  }}</span>
                </div>
                <p class="text-gray-600 text-sm leading-relaxed">
                  {{ comment.content || 'No comment provided.' }}
                </p>
              </div>
              <div
                v-if="!selectedPost?.expert_comments?.length"
                class="col-span-2 text-center text-gray-500 py-8"
                >
                No expert comments available.
              </div>
            </div>
          </div>
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
/* Hide scrollbar while keeping y-axis scrollable */
.scrollable-y {
  max-height: 60vh; /* Adjust as needed */
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

/* Chrome, Safari, Edge */
.scrollable-y::-webkit-scrollbar {
  display: none;
}

.button {
  @apply flex text-center justify-center items-center cursor-pointer text-gray-600 px-4 py-1 text-sm bg-gray-200 border border-gray-200 rounded;
}

.active-button {
  @apply flex text-center justify-center items-center cursor-pointer text-white px-4 py-1 text-sm rounded bg-green-500 hover:bg-green-800;
}

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