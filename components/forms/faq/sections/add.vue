<script setup lang="ts">
import type { PropType } from 'vue';
import type { IFAQSECTION } from '~/types';

type FaqAddSecParams = Omit<IFAQSECTION,'created_at'| 'updated_at'|'metadata'| 'id'>

const props = defineProps({
  modelValue:{
    type:Object as PropType<FaqAddSecParams>,
    required:true
  },

})

const emits = defineEmits(['update:modelValue'])

const modal = computed({
  set: (val) => emits('update:modelValue', val),
  get: () => props.modelValue
})

</script>

<template>
  <form class="space-y-6">
    <UFormGroup label="Name" name="name" description="Example: Billing, Account">
      <UInput v-model="modal.name" />
    </UFormGroup>

    <UFormGroup label="Description" name="description">
      <UTextarea v-model="modal.description" />
    </UFormGroup>

    <!-- <UButton type="submit" block>
      Create Section
    </UButton> -->
  </form>
</template>

