<script setup lang=ts>
import type { AdminGetCustomersParams } from '@medusajs/medusa/dist'
import type { Dict } from "@/types"

const nuxtApp = useNuxtApp()
const customer = nuxtApp.$customer.single
definePageMeta({
  // title:  ,
  scrollToTop: true
});
watch(customer, () => {
  useHead({
    title: `Customer: ${customer.value.first_name} ${customer.value.last_name}` as string
  })
}, { deep: true })
// const orders = ref<Array<Order>>()
const orders = ref([] as any[])
const count = ref(0)
const limit = ref(15)
const offset = ref(1)
const loading = ref(true)
const cus_loading = ref(true)

const id = useRoute().params.id as string
const final_id = id ? id : customer.value.id

const { data, error } = await useCustomerGetSingle(final_id)

if (data.value) {
  customer.value = data.value.customer

}

watch(customer, () => {
  if (customer.value.id) {
    cus_loading.value = false
  }
}, { deep: true })

const reqQuery = computed(() => {
  return {
    customer_id: final_id,
    limit: limit.value * offset.value,
    offset: (offset.value - 1) * limit.value,
    expand: 'customer,shipping_address,sales_channel',
    fields: 'id,status,display_id,created_at,email,fulfillment_status,payment_status,total,currency_code',
  } as AdminGetCustomersParams
})


asyncComputed(async () => {
  loading.value = true
  const { data: _data_order, error: _order_error } = await useOrderList(reqQuery)

  if (_data_order.value) {
    orders.value = _data_order.value.orders
    count.value = _data_order.value.count
  }
  loading.value = false
})

const is_edit = ref(false)
const cus_menu = [
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square',
      click: () => {
        is_edit.value = true
      }
    }
  ]
]

</script>

<template>
  <div>

    <div>
      <UCard :ui="{ divide: '' }">
        <template #header>
          <div class="relative space-y-8">
            <div class="flex items-center justify-between">
              <UButton to="/customers" label="Back to customers" icon="i-heroicons-arrow-uturn-left" variant="link"
                class="right-0" />
              <UDropdown :items="cus_menu">
                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
              </UDropdown>
            </div>

            <div class="flex gap-7 items-center">
              <UtilitiesAvatar :name="`${customer.first_name} ${customer.last_name}`" size="3xl" />
              <div class="flex flex-col gap-2">
                <span class="text-base">{{ customer.first_name }} {{ customer.last_name }}</span>
                <div class="flex items-center gap-1 text-gray-500">
                  <UIcon name="i-ph-at-bold" class="w-4 h-4" />
                  <span>{{ customer.email }}</span>
                </div>
              </div>
            </div>

            <div class="flex gap-5 my-4">
              <div class="flex flex-col gap-2">
                <span>Created</span>
                <span class="text-gray-500 dark:text-gray-400">{{ dateFormatter(customer.created_at) }}</span>
              </div>
              <div>
                <div class="flex flex-col h-full my-1 border-s border-solid border-gray-200 dark:border-gray-700 ">
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <span>Phone</span>
                <span class="text-gray-500 dark:text-gray-400">
                  {{ customer.phone ? customer.phone : customer.shipping_addresses[0]?.phone }}
                </span>
              </div>
              <div>
                <div class="flex flex-col h-full my-1 border-s border-solid border-gray-200 dark:border-gray-700 ">
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <span>Customer</span>
                <span
                  :class="customer.has_account ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'">
                  {{ customer.has_account ? 'Registered' : 'Not registered' }}
                </span>
              </div>

            </div>

          </div>
        </template>
      </UCard>

      <UCard :ui="{ divide: '' }">
        <template #header>
          <div class="flex flex-col gap-2">
            <span class="text-lg md:text-xl">Orders #{{ customer.orders.length }}</span>
            <span>An overview of Customer Orders</span>
          </div>
        </template>
        <TemplateOrdersTable :orders="orders" v-model:loading="loading" v-model:offset="offset" v-model:count="count"
          v-model:limit="limit" />
      </UCard>
    </div>

    <!-- <div v-else>
      loading...
    </div> -->

    <TemplateCustomerEdit v-if="customer" v-model="is_edit" :customer="(customer as any)" />
  </div>
</template>
