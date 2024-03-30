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

// let _old = props.customer
// onMounted(() => {
//   _old = props.customer
// })
// const changed = computed(() => _old != customer.value)
const changed = ref(false)
const _old = customer.value
watch(customer, () => {
  changed.value = customer.value !== _old
}, { deep: true })

async function updateInfo() {
  try {
    const { customer: _cus } = await useCybandyClient().admin.customers.update(customer.value.id, {
      first_name: customer.value.first_name,
      last_name: customer.value.last_name,
      phone: customer.value.phone,
      metadata: customer.value.metadata
    })
    customer.value = _cus
    modal.value = false
  } catch (error) {

  }
}
</script>

<template>
  <ModalTitleButton @send="updateInfo" v-model="modal" title="Customer Details" button-confirm-label="Save and Close">

    <div class="space-y-8 lg:min-w-[550px] xl:min-w-[600px]">
      <div class="space-y-2">
        <h4 class="font-medium text-base pb-2">General</h4>
        <div class="w-full grid grid-cols-2 items-center gap-5 justify-between">
          <UFormGroup label="First Name">
            <UInput v-model="customer.first_name" class="flex-grow"></UInput>
          </UFormGroup>

          <UFormGroup label="Last Name">
            <UInput v-model="customer.last_name" class="flex-grow"></UInput>
          </UFormGroup>
        </div>
      </div>
      <div class="space-y-2">
        <h4 class="font-medium text-base pb-2">Contact</h4>
        <div class="w-full grid grid-cols-2 items-center gap-5 justify-between">
          <UFormGroup label="Email">
            <UInput v-model="customer.email" class="flex-grow" disabled></UInput>
          </UFormGroup>

          <UFormGroup label="Phone">
            <UInput v-model="customer.phone" class="flex-grow"></UInput>
          </UFormGroup>
        </div>
      </div>
      <div class="space-y-2">
        <h4 class="font-medium text-base pb-2">Company</h4>
        <div class="w-full grid grid-cols-2 items-center gap-5 justify-between">
          <UFormGroup label="VAT ID">
            <UInput v-model="(customer.metadata.vat_id as string)" class="flex-grow"></UInput>
          </UFormGroup>
          <UFormGroup label="Company Name">
            <UInput v-model="(customer.metadata.company_name as string)" class="flex-grow"></UInput>
          </UFormGroup>
        </div>
      </div>
    </div>
  </ModalTitleButton>
</template>
