<script setup lang=ts>
import type { PropType } from 'vue';

type pType = {
  limit: number,
  offset: number,
  count: number,
}
const props = defineProps({
  modelValue: {
    type: Object as PropType<pType>,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

const model = computed({
  set: (val) => emits('update:modelValue', val),
  get: () => props.modelValue
})
</script>

<template>
  <UPagination v-model="model.offset" :total="model.count" :page-count="model.limit"
    :active-button="{ variant: 'solid' }" />
</template>
