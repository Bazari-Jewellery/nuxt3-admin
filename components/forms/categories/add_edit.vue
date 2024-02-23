<script setup lang="ts">
import type { AdminPostProductCategoriesReq } from "@medusajs/medusa"
import type { PropType } from 'vue'
const props = defineProps({
  modelValue: {
    type: Object as PropType<AdminPostProductCategoriesReq>,
    required: true
  },
  submit: Boolean
})

const emits = defineEmits(['update:modelValue', 'update:submit'])

const model = computed({
  set: (val) => emits('update:modelValue', val),
  get: () => props.modelValue
})
const submit = computed({
  set: (val) => emits('update:submit', val),
  get: () => props.submit
})

watch(submit, () => {
  if (submit.value) {
    model.value = {} as AdminPostProductCategoriesReq
  }
})


</script>

<template>
  <form class="space-y-5">
    <div class="flex items-center gap-5">
      <UFormGroup label="Name" required name="email" class="flex-grow">
        <UInput v-model="model.name" required />
      </UFormGroup>

      <UFormGroup label="Handle" name="handle" class="flex-grow">
        <UInput v-model="model.handle" name="handle" />
      </UFormGroup>
    </div>

    <UFormGroup label="Description" name="description">
      <UTextarea v-model="model.description" name="description" resize :rows="4" />
    </UFormGroup>

    <UFormGroup label="Status" name="is_internal">
      <div class="flex items-center justify-between gap-5">
        <p>If true category will be available to only administrators</p>
        <UToggle v-model="model.is_internal" />
      </div>
    </UFormGroup>

    <UFormGroup label="Visibility" name="is_active">
      <div class="flex items-center justify-between gap-5">
        <p>If true category will be visible to customers</p>
        <UToggle v-model="model.is_active" />
      </div>
    </UFormGroup>
  </form>
</template>

