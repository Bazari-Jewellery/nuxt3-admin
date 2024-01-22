<script setup lang=ts>
import type {AdminPostCollectionsCollectionReq} from "@medusajs/medusa"
import type { PropType } from "vue";
const props = defineProps({
  collectionReq:{
    type: Object as PropType<AdminPostCollectionsCollectionReq>,
    required:true
  },
})
const emits = defineEmits(['update:collectionReq'])

const collection =  computed({
  set:(val) => emits('update:collectionReq', val),
  get:()=>props.collectionReq
})

</script>

<template>
  <div class="space-y-5">
    <span class="text-base text-gray-500 dark:text-gray-400">Details</span>
    <form class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <UFormGroup required label="Title">
        <UInput :required="true" v-model="collection.title" />
      </UFormGroup>
      <UFormGroup label="Handle">
        <UInput v-model="collection.handle" />
      </UFormGroup>
    </form>
  </div>
</template>
