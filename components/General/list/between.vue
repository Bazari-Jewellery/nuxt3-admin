<script setup lang='ts'>
import type { IcontentListBetweenOption } from "~/types"
import type { PropType } from "vue";
const props = defineProps({
  options: {
    type: Object as PropType<IcontentListBetweenOption>,
    required: true
  }
})
</script>

<template>
  <div class="space-y-4">
    <h3 class="highlight text-base">{{ options.title }}</h3>
    <div class="space-y-2">
      <div v-for="item of options.content" class="flex justify-between items-center">
        <span>{{ item.label }}</span>
        <span>{{ item.value || '-' }}</span>
      </div>
    </div>
  </div>
</template>
