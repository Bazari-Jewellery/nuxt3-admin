<script setup lang=ts>
import type{ Product} from '@medusajs/medusa/dist'
import type {PropType} from 'vue'
const props = defineProps({
  products:{
    type: Object as PropType<Product>,
      required:true
  }
})
const variants = computed(()=>props.products.variants)

const columns = [
  {
    key:'title',
    label: 'title'
  },
  {
    key:'sku',
    label: 'sku'
  },
  {
    key:'inventory',
    label: 'inventory'
  },
  {
    key:'ean',
    label: 'ean'
  },
  {
    key:'action',
    label: ''
  },
]

type tt = {
  title:string,
  sku:string,
  inventory:string,
  ean:string,
  action:any,
  data:any
}
const tableData = ref([] as tt[])
const final_data = computed({
  set: (val) => tableData.value = val,
  get: () => tableData.value
})

final_data.value = variants.value.map((x)=>{
  return {
    title: x.title,
    ean: x?.ean || '-',
    action:null,
    data:x,
    inventory:x.inventory_quantity,
    sku: x.sku || '-'
  } as any;
})

async function deleteVariant(data:any) {
  
}
async function duplicateVariant(data:any) {
  
}
async function editVariant(data:any) {
  
}
// Actions
const actions = (row:any) => [
  [{
    key: 'edit_variant',
    label: 'Edit Variant',
    icon: 'i-heroicons-pencil-square',
    click:()=>{
      editVariant(row)
      console.log('edit');
      
    }
  }], [{
    key: 'duplicate_variant',
    label: 'Duplicate Variant',
    icon: 'i-ph-copy'
  }],
  [{
    key: 'delete_variant',
    label: 'Delete Variant',
    icon: 'i-ph-trash'
  }]
]
</script>

<template>
  <div>
    <span>Product variant(s): {{ variants.length }}</span>

    <UTable :columns="columns" :rows="final_data" >
      <template #action-data="{ row }">
      <UDropdown :items="actions(row)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
    </UTable>
  </div>
</template>
