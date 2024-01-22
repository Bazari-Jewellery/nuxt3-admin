<script setup lang=ts>
import type { Product, AdminGetProductParams } from "@medusajs/medusa"
import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
const props = defineProps({
  modelValue: Boolean,
  id: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])
const modal = computed({
  set: (val) => emits('update:modelValue', val),
  get: () => props.modelValue
})

const product_ids = ref([] as string[])
const selected_products = ref([] as any)

async function addProducts() {
  product_ids.value = selected_products.value.map((x: { id: string; }) => x.id as string)
  const { collection: col } = await useCybandyClient().admin.collections.addProducts(props.id, { product_ids: product_ids.value })
  if (col) {
    toastNotification('', 'Products are added to collection').default_toast()
    modal.value = false
    return
  }
  toastNotification().error()
  return
}

const isLoading = ref(false)
const q = ref('')
const offset = ref(1)
const limit = ref(10)
const count = ref(0)

const payload = computed(() => {
  return {
    offset: (offset.value - 1) * limit.value,
    limit: limit.value,
    q: q.value,
  } as AdminGetProductParams
})
const products = ref<Array<Product | PricedProduct>>([])

async function fetchProducts() {

  await useAsyncData(async () => {
    const { products: _products, count: _count } = await useCybandyClient().admin.products.list({
      q: q.value,
      ...payload.value
    })

    if (_products) {
      products.value = _products
      count.value = _count
      setTimeout(() => isLoading.value = false, 500)
    }
  }, {
    watch: [payload],

  })
}

const cols = [
  // {key:'select'},
  { key: 'products', label: 'Product' },
  { key: 'status', label: 'Status' },

]


const final_data = computed(() => products.value.map((x, ind) => {
  return {
    products: x,
    status: x.status,
    id: x.id
  }
})
)

await fetchProducts()


const status_col = useNuxtApp().$product.styles.status




</script>

<template>
  <ModalTitleButton @send="addProducts" button-confirm-label="Save" v-model="modal" title="Add Products"
    width="min-w-full sm:min-w-[550px] md:min-w-[670px] lg:min-w-[769px]">


    <div class="space-y-5">
      <div class="flex items-center justify-between">
        <UInput v-model="q" placeholder="search..." />
      </div>

      <UTable v-model="selected_products" :loading="isLoading" :columns="cols" class="w-full" :rows="final_data"
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
      :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No products.' }" :ui="{
        tr: {
          base: 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
        },
        th: {
          size: 'text-sm capitalize text-black dark:text-white'
        }
      }">

      <!-- product column -->
      <template #products-data="{ row }">
        <div class="flex gap-5 items-center w-fit">
          <NuxtImg format="webp" fit="fill" width="36" height="48" :src="row.products.thumbnail" />
          <span>{{ row.products.title }}</span>
        </div>
      </template>

      <!-- status column -->
      <template #status-data="{ row }">
        <UButton variant="ghost" class="" :color="status_col[row.status]?.color ? status_col[row.status]?.color : 'gray'">
          <span class="capitalize truncate">{{ row.status }}</span>
        </UButton>
      </template>

      <!-- action column -->
      <!-- <template #select-data="{row}">
          <UCheckbox />
        </template> -->

    </UTable>

    <div class="flex justify-end px-3 py-3.5 mt-8">
          <UPagination v-model="offset" :total="count" :active-button="{ variant: 'solid' }" />
        </div>
    </div>


  </ModalTitleButton>
</template>
