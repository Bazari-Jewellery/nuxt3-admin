<script setup lang=ts>
import type { AccountRequest, Dict } from '~/types';

definePageMeta({
    title: 'Account Requests' ,
    layout: 'default'
});
useHead({
    title: useRoute().meta?.title as string
})
const data = ref([] as AccountRequest[])
// const temp_data = ref([] as AccountRequest[])
const account_requests = computed({
  set: (val) => data.value = val,
  get: () => data.value
})
//filters
const limit = ref(10)
const offset = ref(1)
const count = ref(0)
const q = ref()

const reqQuery = computed(()=>{
  return {
    limit: limit.value * offset.value,
    offset: (offset.value -1) * limit.value
  }
})


const getAcc = asyncComputed(async()=>{
  const d = await useCustomersAccountRequestList(reqQuery)
  if(d){
    data.value = d.account_requests
    count.value = d.count
  }
})
getAcc.value
// onMounted(async()=>{
//   await getData()
// })

/**
 * Table Data
 */
const columns = [
  {
    key:'vat_id',
    label: 'VAT Number'
  },
  {
    key:'company_name',
    label: 'Company Name'
  },
  {
    key:'first_name',
    label: 'First Name'
  },
  {
    key:'last_name',
    label: 'Last Name'
  },
  {
    key:'position',
    label: 'Position'
  },
  {
    key:'email',
    label: 'Email'
  },
  {
    key: 'status',
    label: 'Status'
  },
  // {
  //   key: 'action'
  // }
]

const selectedColumns = ref(columns)
const columnsTable = computed(()=>columns.filter((col)=>selectedColumns.value.includes(col)))

const number_of_rows = ref([10,20,30,40])

// select row function
function selectRow(row:any){
  navigateTo(`/customers/account_requests/${row.id}`)
}

const filteredRows = computed(() => {
  if (!q.value) {
    return account_requests.value
  }

  return account_requests.value.filter((account) => {
    return Object.values(account).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

async function update(status:string, id:string, row:any){
  const d = await useCustomersAccountRequestUpdate({
    status: status
  }, id)

  if(d?.data){
    getAcc.value
    const msg = status =='review'? 'Account under review': `Account ${status}`
    const title = row.vat_id ? row.vat_id : ''
    useToastSuccess(title,msg)
  }
}

const items = (row:any) =>[
  [
    {
      label: 'View',
      icon: 'i-heroicons-arrow-up-right',
      click: ()=>selectRow(row)
    }
  ],
  [
    {
      label:'Requested',
      icon: 'i-carbon-intent-request-create',
      click: async()=>await update('requested', row.id, row)
    },
    {
      label:'Review',
      icon: 'i-carbon-intent-request-create',
      click: async() => async()=>await update('review', row.id, row)
    },
    {
      label:'Confirmed',
      icon: 'i-heroicons-check-circle',
      click:async()=> async()=>await update('confirmed', row.id, row)
    },
  ]
]
</script>

<template>
  <UCard
    :ui="{
      divide:'',
      header:{
        base:'flex flex-col gap-3.5'
      }
    }">
    <template #header>
      <div class="flex items-center justify-between">
        <UButton variant="link" icon="i-heroicons-arrow-left" label="Back to customers" to="/customers"/>
        <UButton variant="link" label="Add" icon="i-heroicons-plus" to="/customers/account_requests/create"/>
      </div>
      <div class="flex items-end gap-5">
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

          <USelectMenu class="min-w-[150px]" v-model="selectedColumns" :options="columns" multiple>
            <UButton class="flex-grow" color="gray" variant="ghost" size="xs" icon="i-heroicons-view-columns">Columns</UButton>
          </USelectMenu>

      </div>
    </template>
    <UTable 
      :columns="columnsTable" :rows="filteredRows" @select="selectRow">
    
      <!-- <template #view-data="{row}">
        <UButton variant="link" color="gray" label="View" icon="i-heroicons-arrow-up-right" @click="()=>selectRow(row)"/>
      </template> -->

      <!-- <template #action-data="{row}">
        <UDropdown :items="items(row)">
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
</template>
