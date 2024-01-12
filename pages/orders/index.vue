<script setup lang=ts>
import type { Order } from '@medusajs/medusa/dist'
useHead({
  title: 'Orders'
})

const orders = ref<Order[]>([])
const singleOrder = useNuxtApp().$order?.singleOrder
const loading = ref(false)

const limit = ref(10)
const offset = ref(1)
const count = ref(30)
const q = ref<string | undefined>()
const number_of_rows = ref([10, 20, 30])

// data presentation
const columns = [
  {
    key: 'order',
    label: 'Order',
    sortable: true
  },
  {
    key: 'date_added',
    label: 'Date Added'
  },
  {
    key: 'customer',
    label: 'Customer'
  },
  {
    key: 'fulfillment',
    label: 'Fulfillment',
    sortable: true
  },
  {
    key: 'payment_status',
    label: 'Payment Status',
    sortable: true
  },
  {
    key: 'total',
    label: 'Total',
    sortable: true
  },
  {
    key: 'currency_code'
  },
  {
    key: 'flag'
  },
  // {
  //   key: 'sales_channel',
  //   label: 'sales channel'
  // }, 

  // {
  //   key: 'actions'’
  // }
]
const selectedColumns = ref(columns)

const columnsTable = computed(() => columns.filter((col) => selectedColumns.value.includes(col)))

const actions = (row: any) => [
  [{
    label: 'View',
    icon: 'i-heroicons-arrow-up-right-20-solid',
    click: () => {
      // isSingleOrder.value = true
    }
  }, {
    label: 'Support',
    icon: 'i-heroicons-chat-bubble-left-ellipsis-20-solid'
  }], [{
    label: 'Reorder',
    icon: 'i-material-symbols-quick-reorder-rounded'
  }, {
    label: 'Move',
    icon: 'i-heroicons-arrow-right-circle-20-solid'
  }], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid'
  }]
]


type tableType = {
  date_added: string,
  order: string,
  customer: string,
  fulfillment: string,
  payment_status: string,
  // sales_channel: string,
  total: string,
  click: Function,
  class: string
}

/**
 * column styles
 */
const fulfillment_col = {
  shipped: {
    color: 'emerald',
    icon: 'i-carbon-delivery'
  },
  fulfilled: {
    color: 'cyan',
    icon: 'i-ph-package'
  },
  not_fulfilled: {
    color: 'gray',
    icon: ''
  },
  canceled: {
    color: 'red',
    icon: 'i-heroicons-x-mark'
  },
  partially_fulfilled:{
    color: 'orange',
    icon: ''
  }
} as any

const payment_col = {
  paid: {
    color: 'emerald',
  },
  refunded: {
    color: 'amber',
  },
  awaiting: {
    color: 'gray',
  },
  canceled: {
    color: 'red'
  }
} as any


const tableData = ref([] as tableType[])
const final_data = computed({
  set: (val) => tableData.value = val,
  get: () => tableData.value
})
watch(orders, () => {
  if (orders.value) {

    final_data.value = orders.value.map((x) => {
      return {
        date_added: dateFormatter(x.created_at.toString()),
        order: x.display_id,
        fulfillment: x.fulfillment_status,
        payment_status: x.payment_status == 'captured' ? 'paid' : x.payment_status,
        total: priceFormatter(x.total, x.currency_code),
        // sales_channel: x.sales_channel.name,
        customer: `${x.customer.first_name || x.shipping_address.first_name} ${x.customer.last_name || x.shipping_address.last_name}`,
        currency_code: x.currency_code,
        flag: `https://flagcdn.com/${x.shipping_address.country_code}.svg`,
        order_data: x
      } as any
    })
    loading.value = false

  }
})

// action for selecting a table
function selectRow(row: any) {
  singleOrder.value = row.order_data
  navigateTo(`/orders/${row.order_data.id}`)


}

//fetch data
async function fetchOrders() {
  const {error} = await useLazyAsyncData('all_orders', async () => {
    const { orders: _orders, count: _count, response:orders_response } = await useCybandyClient().admin.orders.list({
      q: q.value,
      limit: limit.value * offset.value,
      offset: (offset.value - 1) * limit.value,
      expand: 'customer,shipping_address,sales_channel',
      fields: 'id,status,display_id,created_at,email,fulfillment_status,payment_status,total,currency_code',
    })
    
    
    if (_orders) {
      orders.value = _orders
      count.value = _count

    }
    return { orders: _orders, count: _count }
  }, {
    watch: [q, limit, offset,],
    pick: ['orders', 'count']
  })
}

onBeforeMount(async () => {
  await fetchOrders()
})

</script>

<template>
  <div>

    <UCard :ui="{
      shadow: 'shadow-inner',
      divide: 'divide-y-0'
    }">
      <template #header>
        <div class="flex gap-5 items-end px-3 py-3.5">
          <UInput v-model="q" name="q" placeholder="Search..." icon="i-heroicons-magnifying-glass-20-solid"
            autocomplete="off" :ui="{ icon: { trailing: { pointer: '' } } }">
            <template #trailing>
              <UButton v-show="q !== undefined" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid"
                :padded="false" @click="q = undefined" />
            </template>
          </UInput>
          <UFormGroup label="# of rows">
            <USelect v-model="limit" :options="number_of_rows" />
          </UFormGroup>

          <USelectMenu v-model="selectedColumns" :options="columns" multiple>
            <UButton color="gray" size="xs" icon="i-heroicons-view-columns">Columns</UButton>
          </USelectMenu>
        </div>
        <div class="flex justify-end">
          <UPagination v-model="offset" :total="count" :active-button="{ variant: 'solid' }" />
        </div>
      </template>
      <UTable :columns="columnsTable" class="w-full" :rows="final_data" :loading="loading || !final_data"
        @select="selectRow" :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
        :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No orders.' }" :ui="{
          tr: {
            base: 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
          },
          th: {
            size: 'text-sm capitalize text-black dark:text-white'
          }
        }">

        <!--Order number column-->
        <template #order-data="{ row }">
          <span>#{{ row.order }}</span>
        </template>

        <!-- fulfillment col -->
        <template #fulfillment-data="{ row }">
          <UButton class="" variant="ghost"
            :color="fulfillment_col?.[row.fulfillment]?.color ? fulfillment_col?.[row.fulfillment]?.color : 'gray'"
            :trailing-icon="fulfillment_col?.[row.fulfillment as string]?.icon ? fulfillment_col?.[row.fulfillment as string]?.icon : ''">
            <span class="capitalize truncate">{{ row.fulfillment.split('_').join(' ') }}</span>
          </UButton>
        </template>

        <!-- payment status col -->
        <template #payment_status-data="{ row }">
          <UButton variant="ghost" class=""
            :color="payment_col[row.payment_status]?.color ? payment_col[row.payment_status]?.color : 'gray'">
            <span class="capitalize truncate">{{ row.payment_status }}</span>
          </UButton>
        </template>

        <template #flag-data="{ row }">
          <UAvatar size="3xs" :src="row.flag" :ui="{ rounded: 'rounded-none', size: { '3xs': 'h-3 w-3' } }" />

        </template>
        <template #currency_code-data="{ row }">
          <span class="uppercase text-gray-500 dark:text-gray-400">{{ row.order_data.currency_code }}</span>

        </template>

        <!-- actions col -->
        <!-- <template #actions-data="{ row }">
          <UDropdown :items="actions(row)">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </template> -->
      </UTable>
      <template #footer>
        <div class="flex justify-end px-3 py-3.5 mt-8">
          <UPagination v-model="offset" :total="count" :active-button="{ variant: 'solid' }" />
        </div>
      </template>
    </UCard>
  </div>
</template>
