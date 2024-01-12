<script setup lang=ts>
import { backgroundColor } from '~/utils/misc';
import type { PropType } from 'vue';

const props = defineProps({
  size: {
    type: String as PropType<"sm" | "3xs" | "md" | "xs" | "2xs" | "lg" | "xl" | "2xl" | "3xl">,
    default: 'sm'
  },
  name: {
    type: String,
    default: ''
  },
  src: {
    type: String,
    default: ''
  }
})
const background = computed(() => backgroundColor(props.name))
const name = computed(() => props.name)
const src = computed(() => props.src)
</script>

<template>
  <ClientOnly>
    <span class="flex w-fit h-fit rounded-full" :style="background">
    <UAvatar class="ring-1 ring-gray-200 dark:ring-gray-800 shadow" :src="src" :alt="name" :size="size" :ui="{
      background: '',
      placeholder: 'font-medium leading-none text-white dark:text-gray-900 truncate'
    }" />
  </span>
  </ClientOnly>
</template>
