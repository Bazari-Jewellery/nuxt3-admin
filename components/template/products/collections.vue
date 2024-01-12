<script setup lang=ts>
import type { Product, ProductCategory } from '@medusajs/medusa/dist'
import type { Dict } from "@/types"
const nuxtApp = useNuxtApp()
const collections = nuxtApp.$product.collections.list
const loading = ref(false)
const q = ref('')

type tableType = {
  title: string,
  handle: string,
  created_at: string,
  updated_at: string,
  actions: any,
  data:any,
  products:number
}

const columns = [
  {
    key: 'title',
    label: 'title',
    sortable:true
  },
  {
    key: 'handle',
    label: 'handle'
  },
  {
    key: 'created_at',
    label: 'created_at'
  },
  {
    key: 'updated_at',
    label: 'updated_at'
  },
  {
    key: 'products',
    label: 'products'
  },
  {
    key: 'actions',
    label: ''
  }
  
  
]

const selectedColumns = ref(columns)
const columnsTable = computed(()=>columns.filter((col)=> selectedColumns.value.includes(col)))

const tableData = ref([] as tableType[])
const final_data = computed({
  set: (val) => tableData.value = val,
  get: () => tableData.value
})

onMounted( ()=>{
  if(collections.value){
    loading.value = true
    final_data.value = collections.value.map((x) => {
      return {
        title:x.title,
        handle:x.handle,
        created_at:dateFormatter(x.created_at),
        updated_at: dateFormatter(x.updated_at),
        products: x.products.length,
        actions: null,
        data:x
      } as any
    })
    loading.value = false
  }
  
})

function selectRow(row:any){

}
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
          <UInput v-model="q" placeholder="Search collection" />

          <USelectMenu v-model="selectedColumns" :options="columns" multiple >
          <UButton color="gray" size="xs" icon="i-heroicons-view-columns">Columns</UButton>
          </USelectMenu>
        </div>
      </template>


      <UTable :columns="columnsTable" class="w-full" :rows="final_data" :loading="loading || !final_data"
        @select="selectRow" :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
        :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No collections.' }" :ui="{
          tr: {
            base: 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
          },
          th: {
            size: 'text-sm capitalize text-black dark:text-white'
          }
        }">

       

        

      </UTable>
  </UCard>
</template>
