<script setup lang="ts">
import type {SessionUser} from "@/types/services/auth.types";
import {computed} from "vue";

// const parseSessionUser = (): null|SessionUser => {
//   const user = localStorage.getItem('allUserData');
//   return user !== null ? JSON.parse(user) : null;
// }
const userStore = localStorage.getItem('allUserData') || "";
const user = computed<any>(()=> JSON.parse(userStore));
</script>

<template>
  <div class="w-full p-4 flex flex-col gap-3">
    <div class=" grid lg:grid-cols-3 gap-2 border-dashed border-primary border bg-primary-50 w-full">
      <div class="border-primary border-r p-1  border-dashed flex flex-col gap-2" v-if="user">

        <span class="font-bold pb-2  border-b-2 border-primary pl-2 text-xs uppercase"> User Profile</span>

        <div class="flex flex-row gap-4 text-xs border-b p-1 border-primary border-dashed">
          <span class="font-bold capitalize text-primary-950"> Full name: </span>
          <span> {{ user.user?.lastName + ' ' + user.user?.surname }}</span>
        </div>

        <div class="flex flex-row gap-4 text-xs  border-b p-1 border-primary border-dashed">
          <span class="font-bold capitalize text-primary-950"> Username: </span>
          <span>{{ user.user?.username }} </span>
        </div>

        <div class="flex flex-row gap-4 text-xs  border-b p-1 border-primary border-dashed">
          <span class="font-bold capitalize text-primary-950"> Mobile No. : </span>
          <span> {{ user.user?.phone }}</span>
        </div>

        <div class="flex flex-row gap-4 text-xs  border-b p-1 border-primary border-dashed">
          <span class="font-bold capitalize text-primary-950"> Sex: </span>
          <span> {{ user.user?.gender }}</span>
        </div>

        <div class="flex flex-row gap-4 text-xs  border-b p-1 border-primary border-dashed ">
          <span class="font-bold capitalize text-primary-950"> Physical Address: </span>
          <span> {{ user.user?.physicalAddress }}</span>
        </div>
        <div class="flex flex-row gap-4 text-xs p-1  ">
          <span class="font-bold capitalize text-primary-950"> Email: </span>
          <span> {{ user.user?.email }} </span>
        </div>

      </div>
      <div class="border-primary border-r p-1  border-dashed flex flex-col gap-2" v-if="user && user.user?.branch">

        <span class="font-bold pb-2  border-b-2 border-primary pl-2 text-xs uppercase">  Branch Information</span>

        <div class="flex flex-row gap-4 text-xs border-b p-1 border-primary border-dashed">
          <span class="font-bold capitalize text-primary-950"> Branch: </span>
          <span>{{  user.user?.branch.name }}</span>
        </div>

        <div class="flex flex-row gap-4 text-xs  border-b p-1 border-primary border-dashed">
          <span class="font-bold capitalize text-primary-950"> Primary Email: </span>
          <span>{{  user.user?.branch.primaryEmail }}</span>
        </div>

        <div class="flex flex-row gap-4 text-xs  border-b p-1 border-primary border-dashed">
          <span class="font-bold capitalize text-primary-950"> Primary Phone: </span>
          <span>{{  user.user?.branch.primaryPhone }}</span>
        </div>

        <div class="flex flex-row gap-4 text-xs  border-b p-1 border-primary border-dashed">
          <span class="font-bold capitalize text-primary-950"> Physical Address: </span>
          <span>{{  user.user?.branch.physicalAddress }}</span>
        </div>

        <div class="flex flex-row gap-4 text-xs  border-b p-1 border-primary border-dashed">
          <span class="font-bold capitalize text-primary-950"> Contact Person Phone: </span>
          <span>{{  user.user?.branch.contactPerson.mobileNo }}</span>
        </div>

        <div class="flex flex-row gap-4 text-xs p-1  ">
          <span class="font-bold capitalize text-primary-950"> Contact Person Email: </span>
          <span>{{  user.user?.branch.contactPerson.email }}</span>
        </div>

      </div>
      <div class="  p-1 flex flex-col gap-2" v-if="user && user.user?.branch && user.user?.branch.account">
        <span class="font-bold pb-2  border-b-2 border-primary pl-2 text-xs uppercase"> Account Information</span>

        <div class="flex flex-row gap-4 text-xs border-b p-1 border-primary border-dashed">
          <span class="font-bold capitalize text-primary-950"> Account Number: </span>
          <span>{{  user.user?.branch.account.accountNumber }}</span>
        </div>

        <div class="flex flex-row gap-4 text-xs  border-b p-1 border-primary border-dashed">
          <span class="font-bold capitalize text-primary-950"> Account Type: </span>
          <span>{{  user.user?.branch.account.customerType.name }}</span>
        </div>

        <div class="flex flex-row gap-4 text-xs  border-b p-1 border-primary border-dashed">
          <span class="font-bold capitalize text-primary-950"> Status: </span>
          <span :class="user.user?.branch.account.isActivated ? 'text-green-700': 'text-yellow-700'">{{  user.user?.branch.account.isActivated ? 'Active': 'InActive' }}</span>
        </div>

        <div class="flex flex-row gap-4 text-xs  border-b p-1 border-primary border-dashed">
          <span class="font-bold capitalize text-primary-950"> Phone Verification: </span>
          <span :class="user.user?.branch.account.isPhoneVerified ? 'text-green-700': 'text-yellow-700'">{{  user.user?.branch.account.isPhoneVerified ? 'Verified': 'UnVerified' }}</span>
        </div>

        <div class="flex flex-row gap-4 text-xs  border-b p-1 border-primary border-dashed">
          <span class="font-bold capitalize text-primary-950"> Email Verification: </span>
          <span :class="user.user?.branch.account.isEmailVerified ? 'text-green-700': 'text-yellow-700'">{{  user.user?.branch.account.isEmailVerified ? 'Verified': 'UnVerified' }}</span>
        </div>

        <div class="flex flex-row gap-4 text-xs p-1  ">
          <span class="font-bold capitalize text-primary-950"> Website: </span>
          <span>{{   user.user?.branch.account.website ?? 'N/A' }}</span>
        </div>

      </div>
    </div>
  </div>

</template>

<style scoped>

</style>