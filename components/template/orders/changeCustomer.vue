<script setup lang=ts>
import { computed, type PropType } from 'vue';
import type { Order, Customer } from "@medusajs/medusa"
import { useCustomersList } from '~/composables/customers';


const props = defineProps({
  order: {
    type: Object as PropType<Order>,
    required: true
  },
  modelValue: Boolean
})

const emits = defineEmits(['update:modelValue', 'confirm'])
const modal = computed({
  set: (val) => emits('update:modelValue', val),
  get: () => props.modelValue
})

const payment_col = useNuxtApp().$order.styles.payment_col
const fulfillment_col = useNuxtApp().$order.styles.fulfillment_col

const loading = ref(false)
const q_customer = ref<string | undefined>()

const customer = asyncComputed(async () => {
  loading.value = true
  const _payload = ref({
    q: q_customer.value,
    limit: 5,
    offset: 0
  })
  const { data } = await useCustomersList(_payload)
  loading.value = false
  return data.value?.customers
})


type ImyCustomer = {
  data: Customer,
  id: string,
  label: string
}


async function searchCustomer(q = '') {
  loading.value = true
  const _payload = ref({
    q: q_customer.value,
    limit: 5,
    offset: 0
  })
  const { data } = await useCustomersList(_payload)
  loading.value = false
  return data.value?.customers?.map((_first_cus) => {
    return {
      data: _first_cus,
      id: _first_cus?.id,
      label: `${_first_cus?.first_name} ${_first_cus?.last_name} - ${_first_cus?.email}`
    }
  }) as ImyCustomer[]
}

const selected_customer = ref({} as ImyCustomer)

function cancelFunc() {
  modal.value = false
}


async function confirmFunc() {
  // console.log(selected_customer.value);

  const { data, error } = await useOrderUpdate(props.order.id, {
    email: selected_customer.value.data.email,
    customer_id: selected_customer.value.id
  })
  if (data.value) {
    useNuxtApp().$order.singleOrder.value = data.value.order
    toastNotification(`Order #${props.order.display_id}`, 'Assigned customer changed').default_toast()
  }

  modal.value = false
}

const target = ref(null)
const isVisible = useElementVisibility(target)

watch(isVisible, async () => {
  const cus = await searchCustomer()
  if (cus) {
    selected_customer.value = cus[0]
  }
}, { deep: true })

// onMounted(async()=>{


// })
const placeholder = computed(() => 'Select Customer')
</script>

<template>
  <UModal v-model="modal">

    <UCard :ui="{ footer: { base: 'flex justify-end' }, header: { base: 'flex justify-between items-center' } }">
      <template #header>

        <div class="flex flex-col gap-1">
          <h3 class="text-base lg:text-xl text-gray-900 dark:text-white">
            Transfer Order
          </h3>
          <p>Change customer associated with the order</p>
        </div>
        <UButton @click="cancelFunc" type="button" icon="i-heroicons-x-mark" variant="ghost" color="gray" />

      </template>

      <div class="min-w-full lg:min-w-[550px] xl:min-w-[650px] space-y-8 lg:space-y-10">

        <div class="space-y-2">
          <p class="text-gray-700 dark:text-gray-100">Order</p>
          <div class="flex items-center justify-between p-3 ring-1 ring-gray-700 rounded-lg">
            <span>#{{ order.display_id }}</span>
            <span>{{ dateFormatter(order.created_at) }}</span>
            <UBadge variant="subtle"
              :color="payment_col[order.payment_status]?.color ? payment_col[order.payment_status]?.color : 'gray'">
              <span class="truncate capitalize">{{ order.payment_status == 'captured' ? 'Paid' : order.payment_status
                }}</span>
            </UBadge>
            <UBadge variant="subtle"
              :color="fulfillment_col[order.fulfillment_status]?.color ? fulfillment_col[order.fulfillment_status]?.color : 'gray'">

              <span v-if="order.fulfillment_status !== 'not_fulfilled'" class="truncate capitalize">
                {{ order.fulfillment_status?.split('_').join(' ') }}
              </span>
              <span v-else>
                Awaiting fulfillment
              </span>
            </UBadge>
            <span class="flex items-center gap-5">
              <span>
                {{ priceFormatter(order.paid_total) }}
              </span>
              <span class="uppercase text-gray-500 dark:text-gray-400">{{ order.currency_code }}</span>
            </span>
          </div>
        </div>

        <div class="space-y-5">
          <div class="grid w-full grid-cols-2 items-center">
            <div class="flex flex-col gap-1">
              <span>Current Owner</span>
              <span class="text-xs">The customer currently related to this order</span>
            </div>
            <UInput class="flex-grow" disabled
              :placeholder="`${order.customer.first_name} ${order.customer.last_name} - ${order.email}`" />
          </div>

          <div class="grid w-full grid-cols-2 items-center">
            <div class="flex flex-col gap-1">
              <span>New Owner</span>
              <span class="text-xs">The customer to transfer this order to</span>
            </div>
            <UInputMenu v-model="selected_customer" :search="searchCustomer" :loading="loading"
              :placeholder="placeholder" trailing-icon="i-heroicons-chevron-up-down-20-solid" trailing by="label">
              <!-- 
            <template #option="{option:current_customer}">
              <span class="truncate">
                {{ current_customer.first_name }} {{ current_customer.last_name }} - {{ current_customer.email }}
              </span>
            </template> -->

              <template #option-empty="{ query }">
                <UButton :label="`${query} not found`" size="xs" variant="ghost" color="gray" icon="i-ph-user" />
              </template>

            </UInputMenu>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex items-center gap-5">
          <UButton @click="cancelFunc" label="Cancel" variant="ghost" color="gray" />
          <UButton @click="confirmFunc" label="Confirm" variant="solid" />
        </div>
      </template>
    </UCard>

  </UModal>
</template>
