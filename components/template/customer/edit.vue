<script setup lang='ts'>
import type { Customer } from "@medusajs/medusa/dist"
import type { PropType } from "vue";

const props = defineProps({
  customer: {
    type: Object as PropType<Customer>,
    required: true
  },
  modelValue: Boolean
})
const emits = defineEmits(['update:modelValue', 'update:customer'])
const customer = computed({
  set: (val) => emits('update:customer', val),
  get: () => props.customer
})
const modal = computed({
  set: (val) => emits('update:modelValue', val),
  get: () => props.modelValue
})

let _old = props.customer
onMounted(() => {
  _old = props.customer
})
const changed = computed(() => _old != customer.value)

async function updateInfo() {
  if (!changed.value) {
    modal.value = false
  }
}
</script>

<template>
  <ModalTitleButton @send="updateInfo" v-model="modal" title="Customer Details" :disabled="!changed"
    button-confirm-label="Save and Close">

    <div class="space-y-8 lg:min-w-[550px] xl:min-w-[600px]">
      <div class="space-y-2">
        <h4 class="font-medium">General</h4>
        <div class="w-full flex items-center gap-5 justify-between">
          <UInput v-model="customer.first_name" class="flex-grow"></UInput>
          <UInput v-model="customer.last_name" class="flex-grow"></UInput>
        </div>
      </div>
      <div class="space-y-2">
        <h4 class="font-medium">Contact</h4>
        <div class="w-full flex items-center gap-5 justify-between">
          <UInput v-model="customer.email" class="flex-grow"></UInput>
          <UInput v-model="customer.phone" class="flex-grow"></UInput>
        </div>
      </div>
      <div class="space-y-2">
        <h4 class="font-medium">Company</h4>
        <div class="w-full flex items-center gap-5 justify-between">
          <UInput v-model="(customer.metadata.vat_id as string)" class="flex-grow"></UInput>
          <UInput v-model="(customer.metadata.company_name as string)" class="flex-grow"></UInput>
        </div>
      </div>
    </div>
  </ModalTitleButton>
</template>
