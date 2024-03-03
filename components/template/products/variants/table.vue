<script setup lang=ts>
import type { Product, AdminPostProductsProductVariantsReq, ProductVariant } from '@medusajs/medusa/dist'
import type { PropType } from 'vue'
const props = defineProps({
  products: {
    type: Object as PropType<Product>,
    required: true
  }
})
const variants = computed(() => props.products.variants)

const columns = [
  {
    key: 'title',
    label: 'title'
  },
  {
    key: 'sku',
    label: 'sku'
  },
  {
    key: 'inventory',
    label: 'inventory'
  },
  {
    key: 'ean',
    label: 'ean'
  },
  {
    key: 'action',
    label: ''
  },
]

type tt = {
  title: string,
  sku: string,
  inventory: string,
  ean: string,
  action: any,
  data: any
}
const tableData = ref([] as tt[])
const final_data = computed({
  set: (val) => tableData.value = val,
  get: () => tableData.value
})

final_data.value = variants.value.map((x) => {
  return {
    title: x.title,
    ean: x?.ean || '-',
    action: null,
    data: x,
    inventory: x.inventory_quantity,
    sku: x.sku || '-'
  } as any;
})



async function deleteVariant(variant_id: string) {
  try {
    const ind = variants.value.findIndex((x) => x.id = variant_id)
    if (ind >= 0) {

    } else {
      throw new Error('Unknown error occured')
    }

    const { deleted } = await useCybandyClient().admin.products.deleteVariant(props.products.id as string, variant_id)
    if (!deleted) {
      throw new Error('not deleted. Try again')
    }
    await refreshNuxtData('single_product')
  } catch (error: any) {
    toastNotification('', error.message).error()
  }
}

const edit_variant_variable = ref(false)
const duplicate_variant_variable = ref(false)
type IOption = { title: string, value: string, option_id: string }
const options = ref([] as IOption[])
const current_variant_id = ref('')
const variant_req = ref({} as AdminPostProductsProductVariantsReq)


function edit_duplicate_preprocessor(data: ProductVariant) {


  variant_req.value = Object.fromEntries(Object.entries(data).filter(([x, y]) => {
    if ('title,sku,ean,upc,barcode,hs_code,inventory_quantity,allow_backorder,manage_inventory,weight,length,height,width,origin_country,mid,material,metadata,prices'.split(',').includes(x)) {
      return true
    }
    return false
  })) as any

  current_variant_id.value = data.id
}

function editVariant(data: ProductVariant) {

  options.value = data.options.map((x: { option_id: any; value: any; }) => {
    const _title = props.products.options.filter((y) => y.id == x.option_id)[0].title
    return {
      option_id: x.option_id,
      value: x.value,
      title: _title as string
    }
  })
  edit_duplicate_preprocessor(data)
  edit_variant_variable.value = true
}

function duplicateVariant(data: ProductVariant) {
  options.value = data.options.map((x: { option_id: any; value: any; }) => {
    const _title = props.products.options.filter((y) => y.id == x.option_id)[0].title
    return {
      option_id: x.option_id,
      value: undefined,
      title: _title as string
    } as any
  })

  edit_duplicate_preprocessor(data)

  variant_req.value.title = `${variant_req.value.title} copy`
  duplicate_variant_variable.value = true
}

const table_key = ref(Date.now())
// Actions
const actions = (row: any) => [
  [{
    key: 'edit_variant',
    label: 'Edit Variant',
    icon: 'i-heroicons-pencil-square',
    click: () => {

      editVariant(row.data)
    }
  }], [{
    key: 'duplicate_variant',
    label: 'Duplicate Variant',
    icon: 'i-ph-copy',
    click: () => {
      duplicateVariant(row.data)
    }
  }],
  [{
    key: 'delete_variant',
    label: 'Delete Variant',
    icon: 'i-ph-trash',
    click: async () => {
      await deleteVariant(row.data.id)
    }
  }]
]
</script>

<template>
  <div>
    <span>Product variant(s): {{ variants.length }}</span>

    <UTable :columns="columns" :rows="final_data" :ui="{
      td: {
        font: 'capitalize'
      }
    }">
      <template #action-data="{ row }">
        <UDropdown :items="actions(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
    <TemplateProductsVariantsEdit :variant-id="current_variant_id" :variant-req="variant_req" :options="options"
      v-model="edit_variant_variable" :product-id="products.id" :key="table_key" />

    <TemplateProductsVariantsDuplicate :variant-req="variant_req" :options="options" v-model="duplicate_variant_variable"
      :product-id="products.id" :key="table_key + 1" />
  </div>
</template>
