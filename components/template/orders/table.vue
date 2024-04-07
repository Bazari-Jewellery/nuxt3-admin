<script setup lang=ts>
import type { Order } from '@medusajs/medusa/dist'
import type { Dict } from "@/types"
import type { PropType } from 'vue';

const props = defineProps({
  orders: {
    type: Array as PropType<Array<Order>>,
    required: true
  },
  loading: {
    type: Boolean,
    default: true
  },
  limit: {
    type: Number,
    default: 15
  },
  offset: {
    type: Number,
    default: 1
  },
  count: {
    type: Number,
    default: 0
  },
})
const emits = defineEmits(['update:offset', 'update:count', 'update:limit', 'update:loading'])
const orders = computed(() => props.orders)
const loading = computed({
  set: (val) => emits('update:loading', val),
  get: () => props.loading,
})

const nuxtApp = useNuxtApp()

//filters
const limit = computed({
  set: (val) => emits('update:limit', val),
  get: () => props.limit,
})
const pre_offset = ref(props.offset)
const offset = computed({
  set: (val) => emits('update:offset', val),
  get: () => props.offset,
})
const count = computed({
  set: (val) => emits('update:count', val),
  get: () => props.count,
})

const orderInView = ref({} as Order)
function selectRow(row: any) {
  // isSingleOrder.value = true
  orderInView.value = row.order_data
  nuxtApp.$order.singleOrder.value = row.order_data
  navigateTo(`/orders/${row.order_data.id}`)


}

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
  //   key: 'actions'
  // }
]
const selectedColumns = ref(columns)
const columnsTable = computed(() => columns.filter((col) => selectedColumns.value.includes(col)))

const actions = (row: any) => [
  [{
    label: 'View',
    icon: 'i-heroicons-arrow-up-right-20-solid',
    click: () => {
      selectRow(row)
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
const fulfillment_col = useNuxtApp().$order.styles.fulfillment_col

const payment_col = useNuxtApp().$order.styles.payment_col

const tableData = ref([] as tableType[])
const final_data = computed({
  set: (val) => tableData.value = val,
  get: () => tableData.value
})

function populateTable() {
  if (orders.value) {

    final_data.value = orders.value?.map((x) => {
      return {
        date_added: dateFormatter(x.created_at.toString()),
        order: x.display_id,
        fulfillment: x.fulfillment_status,
        payment_status: x.payment_status == 'captured' ? 'paid' : x.payment_status,
        total: priceFormatter(x.total, x.currency_code),
        // sales_channel: x.sales_channel.name,
        customer: `${x.customer?.first_name || x.shipping_address?.first_name} ${x.customer?.last_name || x.shipping_address?.last_name}`,
        currency_code: x?.currency_code,
        flag: `https://flagcdn.com/${x.shipping_address?.country_code}.svg`,
        order_data: x
      } as any
    })
    loading.value = false

  }
}

onMounted(populateTable)

watch(orders, () => {
  populateTable()
}, { deep: true })
</script>

<template>
  <UCard :ui="{
    divide: '',
    body: {
      padding: 'p-0 sm:p-0'
    },
    header: {
      padding: 'p-0 sm:p-0'
    },
    footer: {
      padding: 'p-0 sm:p-0'
    },
  }">

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
          :trailing-icon="fulfillment_col?.[row.fulfillment as string].icon ? fulfillment_col?.[row.fulfillment as string].icon : ''">
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

      <!-- <template #total-data="{row}">
          <span class="w-full flex items-center gap-1">
            <span>{{ row.total }}</span>
            <span class="uppercase text-gray-500 dark:text-gray-400">{{ row.order_data.currency_code }}</span>
            <UAvatar size="3xs" :src="`https://flagcdn.com/${row.order_data.shipping_address.country_code}.svg`" :ui="{rounded: 'rounded-none', size:{'3xs':'h-3 w-3'}}"/>
          </span>
        </template> -->
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
        <UPagination v-model="offset" :total="count" :page-count="limit" :active-button="{ variant: 'solid' }" />
      </div>
    </template>
  </UCard>
</template>
