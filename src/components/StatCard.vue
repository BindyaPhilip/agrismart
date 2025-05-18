<script setup lang="ts">
import type {FunctionalComponent, HTMLAttributes, VNodeProps} from "vue";

interface StatProp {
  icon: FunctionalComponent<HTMLAttributes & VNodeProps>
  stat: Number
  title:String

}

const props = defineProps<StatProp>()

</script>

<template>
  <div class="bg-white p-5 flex gap-2 items-center text-gray-500  rounded-md shadow-gray shadow-sm border border-primary"
  >
    <component :is="icon" class="w-20 h-20  text-primary-500 "></component>
    <div class="flex flex-col text-end w-full capitalize">
      <h2 class="text-6xl font-medium text-black text-primary">{{props.stat}}</h2>
      <span class="text-sm font-medium text-primary">{{ props.title }}</span>
    </div>
  </div>

</template>

<style scoped>

</style>