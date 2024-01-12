<script setup lang=ts>
import type { Product } from '@medusajs/medusa/dist'
import type { Dict } from "@/types"
const nuxtApp = useNuxtApp()
const app_prod = nuxtApp.$product.product
const products = app_prod.allProd
const prod_in_view = ref({} as Product)
const loading = app_prod.loading

//filters
const limit = app_prod.limit
const offset = app_prod.offset
const count = app_prod.count
const q = app_prod.q

onBeforeMount(async ()=> {
  await app_prod.getData()
})
type tableType = {
  name: string,
  collection: string,
  category: string,
  status: string,
  availability: string,
  inventory: string | number,
  data:Product
  // sales_channel: string,
  // total: string,
  // click: Function,
  // class: string
}

const columns = [
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'collection',
    label: 'collection'
  },
  {
    key: 'category',
    label: 'category'
  },
  {
    key: 'status',
    label: 'status'
  },
  {
    key: 'availability',
    label: 'availability'
  },
  {
    key: 'inventory',
    label: 'inventory'
  },
  
]
const selectedColumns = ref(columns)
const columnsTable = computed(()=>columns.filter((col)=> selectedColumns.value.includes(col)))

const status_col = {
  published: {
    color: 'emerald',
  },
  draft: {
    color: 'amber',
  },
  private: {
    color: 'purple',
  },
  rejected: {
    color: 'rose'
  },
  proposed: {
    color: 'indigo'
  },
} as any

const tableData = ref([] as tableType[])
const final_data = computed({
  set: (val) => tableData.value = val,
  get: () => tableData.value
})
watch(products, ()=>{
  if(products.value){
    loading.value = true
    final_data.value = products.value.map((x) => {
      return {
        data: x,
        name: x.title,
        collection: x.collection_id,
        status: x.status,
        availability: x?.sales_channels?.[0]?.name,
        inventory: x.variants.reduce( function (accumulator:number, cur_val){
          cur_val?.inventory_quantity
          return accumulator + Number(cur_val?.inventory_quantity);
        }, 0),
        category: x?.categories?.map((x)=>x.name).join(',')

      } as any
    })
    loading.value = false
    
  }
})
// action for selecting a row
function selectRow(row:any){
  prod_in_view.value = row.data
  app_prod.singleProd.value = row.data
  navigateTo(`/products/${row.data.id}`)
}

const number_of_rows = ref([10, 20, 30])
</script>

<template>
  <UCard :ui="{
    divide: '',
    body:{
      padding: 'p-0 sm:p-0'
    },
    header:{
      padding: 'p-0 sm:p-0'
    },
    footer:{
      padding: 'p-0 sm:p-0'
    },
  }">
  <template #header>
    <div class="flex gap-5 items-end px-3 py-3.5">
          <UInput v-model="q" name="q" placeholder="Search..." icon="i-heroicons-magnifying-glass-20-solid"
            autocomplete="off" :ui="{ icon: { trailing: { pointer: '' } } }">
            <template #trailing>
              <UButton v-show="q !== undefined" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid" :padded="false"
                @click="q = undefined" />
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
        :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No products.' }" :ui="{
          tr: {
            base: 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
          },
          th: {
            size: 'text-sm capitalize text-black dark:text-white'
          }
        }">

        <!--Order number column-->
        <template #name-data="{ row }">
          <div class="flex items-center gap-4">
            <NuxtImg :src="row.data.thumbnail" preset="prod_small_thumbnail" placeholder class="w-10 h-10"/>
            <span class="">{{ row.name }}</span>
          </div>
        </template>

        <template #collection-data="{row}">
          <span>{{ nuxtApp.$product.collections.list.value?.find((y)=>y.id==row.collection)?.title }}</span>
        </template>

       

        <!-- status col -->
        <template #status-data="{ row }">
          <UButton variant="ghost" class=""
            :color="status_col[row.status]?.color ? status_col[row.status]?.color : 'gray'">
            <span class="capitalize truncate">{{ row.status }}</span>
          </UButton>
        </template>

        <template #inventory-data="{row}">
        <span>{{ row.inventory }} in stock of {{ row.data.variants.length }} variant(s)</span>
        </template>
      </UTable>
      <template #footer>
        <div class="flex justify-end px-3 py-3.5 mt-8">
          <UPagination v-model="offset" :total="count" :active-button="{ variant: 'solid' }" />
        </div>
      </template>
  </UCard>
</template>
