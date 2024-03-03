<script setup lang=ts>
import type { Customer } from "@medusajs/medusa/dist"
import type { Dict } from "@/types"

definePageMeta({
  layout: 'default',
  scrollToTop: true
});
useHead({
  title: 'Customers'
})
const nuxtApp = useNuxtApp()
const customers = ref<Customer[]>()
const number_of_rows = ref([10, 15, 20, 30, 50])
const search_customer = ref('')
const limit = ref(15)
const pre_offset = ref(1)
const offset = computed({
  set: (val) => pre_offset.value = val,
  get: () => pre_offset.value
})
const count = ref(0)

// request query
const reqQuery = computed(() => {
  return {
    q: search_customer.value == '' ? undefined : search_customer.value,
    limit: limit.value,
    offset: (offset.value - 1) * limit.value,
    expand: 'orders',

  }
})
const isLoading = ref(true)


asyncComputed(async () => {
  const { data, error } = await useCustomersList(reqQuery)

  if (data.value) {
    customers.value = data.value.customers
    count.value = data.value.count
    setTimeout(() => isLoading.value = false, 500)
  }
})



// onBeforeMount(async () => {
//   await getData()
// })



const columns = ref([
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'email',
    label: 'Email'
  },
  {
    key: 'orders',
    label: 'Orders'
  },
  {
    key: 'date_added',
    label: 'Date Added'
  },
])
const selectedColumns = ref(columns.value)
const columnsTable = computed(() => columns.value.filter((col) => selectedColumns.value.includes(col)))

type tableType = {
  date_added: string,
  email: string,
  orders: number,
  name: string,
  data: Dict
}

const tableData = ref([] as tableType[])
const final_data = computed({
  set: (val) => tableData.value = val,
  get: () => tableData.value
})

watch(customers, () => {
  // console.log('watch is working');

  if (customers.value) {
    // console.log(customers.value);

    final_data.value = customers.value?.map((x) => {
      return {
        date_added: dateFormatter(x.created_at),
        orders: x.orders.length,
        name: `${x.first_name} ${x.last_name}`,
        email: x.email,
        data: x
      }
    })
  }
}, { deep: true })

// action for selecting a row
function selectRow(row: any) {
  nuxtApp.$customer.single.value = row.data

  navigateTo(`/customers/${row.data.id}`)
}


</script>

<template>
  <UCard :ui="{
    divide: ''
  }">
    <template #header>
      <div>
        <div class="flex flex-wrap items-end justify-between gap-5">
          <UInput v-model="search_customer" icon="i-ph-magnifying-glass" placeholder="search customer..." />
          <UFormGroup label="# of rows">
            <USelect v-model="limit" :options="number_of_rows" />
          </UFormGroup>

          <USelectMenu v-model="selectedColumns" :options="columns" multiple>
            <UButton color="gray" size="xs" icon="i-heroicons-view-columns">Columns</UButton>
          </USelectMenu>

          <UButton variant="ghost" label="View Account Requests" to="/customers/account_requests" />
        </div>


      </div>
    </template>

    <div class="flex items-center justify-end">
      <UPagination v-model="offset" :total="count" :page-count="limit" :active-button="{ variant: 'solid' }" />
    </div>

    <UTable :columns="columnsTable" :rows="final_data" :loading="isLoading" @select="selectRow">

      <template #name-data="{ row }">
        <span class="flex items-center gap-2">
          <!-- <UAvatar :alt="row.name" size="xs" /> -->
          <UtilitiesAvatar :name="row.name" size="2xs" />
          <span>{{ row.name }}</span>
        </span>
      </template>

    </UTable>

    <template #footer>
      <div class="flex items-center justify-end">
        <UPagination v-model="offset" :total="count" :page-count="limit" :active-button="{ variant: 'solid' }" />
      </div>
    </template>
  </UCard>
</template>
