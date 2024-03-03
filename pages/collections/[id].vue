<script setup lang=ts>
import type { ProductCollection, AdminGetProductParams, Product, AdminPostCollectionsCollectionReq } from "@medusajs/medusa"
import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing"

const isLoading = ref(true)
const id = useRoute().params.id as string
const collection = ref({} as ProductCollection)
async function fetchCollection() {
  const { collection: _coll } = await useCybandyClient().admin.collections.retrieve(id)
  if (_coll) {
    collection.value = _coll
  }
}
await fetchCollection()
useHead({
  title: collection.value.title
})



const q = ref('')
const offset = ref(1)
const limit = ref(10)
const count = ref(0)

const payload = computed(() => {
  return {
    offset: (offset.value - 1) * limit.value,
    limit: limit.value,
    q: q.value,
    collection_id: [id]
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
  { key: 'id', label: 'Id' },
  { key: 'products', label: 'Product' },
  { key: 'status', label: 'Status' },
  { key: 'action' },
]


const final_data = computed(() => products.value?.map((x, ind) => {
  return {
    id: ind + 1,
    products: x,
    status: x.status,
  }
})
)

await fetchProducts()


const status_col = useNuxtApp().$product.styles.status

const main_menu = [
  [
    {
      label: 'Edit collection',
      icon: 'i-heroicons-pencil-square',
      click: () => {
        isEditCol.value = true
      }
    },
    {
      label: 'Delete',
      icon: 'i-heroicons-trash',
      click: async () => {
        isDelCol.value = true
      }
    },
  ]
]

const doDelete = ref(false)


/**
 * Remove Products from collection
 */
const remove_list = ref<Array<string>>([])
async function removeProduct() {
  const { removed_products } = await useCybandyClient().admin.collections.removeProducts(collection.value.id, { product_ids: remove_list.value })
  if (removed_products.length == remove_list.value.length) {
    toastNotification('Deleted').default_toast()
    await fetchProducts()
  } else {
    toastNotification().error()
  }
}


function doDeleteFunction(id: string) {
  remove_list.value.push(id)
  doDelete.value = true
}
const edit_coll = ref({ title: collection.value.title, handle: collection.value.handle } as AdminPostCollectionsCollectionReq)

// watch(doDelete,async()=>{
//   if(!doDelete.value){
//     await fetchProducts()
//   }
// })
//-----------------------------------------

watch(collection, () => {
  useHead({
    title: collection.value.title
  })
  edit_coll.value = { title: collection.value.title, handle: collection.value.handle }
})
const isEditCol = ref(false)

watch(isEditCol, async () => {
  if (!isEditCol.value) {
    await fetchCollection()
  }
})


/**
 * Delete Collection
 */
const isDelCol = ref(false)

async function deleteCollection() {
  const { deleted } = await useCybandyClient().admin.collections.delete(collection.value.id)
  if (deleted) {
    toastNotification('Collection deleted').default_toast()
    navigateTo('/products')
    useNuxtApp().$product.view.value = 'collection'
  }
}
function goBack() {
  useNuxtApp().$product.view.value = 'collection'
}


/**
 * Adding Product to collection
 */
const add_products = ref(false)

watch(add_products, async () => {
  if (!add_products.value) {
    await fetchProducts()
  }
})
</script>

<template>
  <div>

    <div class="space-y-8">
      <div class="my-6">
        <UButton @click="goBack" variant="link" icon="i-heroicons-arrow-uturn-left" to="/products"
          label="Back to Collections" />
      </div>

      <UCard :ui="{ divide: '' }">
        <div class="flex items-center justify-between">
          <h2 class="text-lg lg:text-xl">Featured Products</h2>
          <UDropdown :items="main_menu">
            <UButton variant="ghost" color="gray" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </div>
      </UCard>

      <UCard :ui="{ header: { base: 'space-y-5' } }">
        <template #header>
          <div class="flex items-center justify-between gap-5">
            <h3 class="text-base lg:text-lg">Products</h3>
            <UButton @click="() => add_products = true" variant="ghost" color="gray" label="Add Products"
              icon="i-heroicons-pencil-square" />
          </div>
          <div class="flex">
            <UInput v-model="q" placeholder="search products" leading-icon="i-heroicons-magnifying-glass" />
          </div>
        </template>
        <UTable :loading="isLoading" :columns="cols" class="w-full" :rows="final_data"
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
            <NuxtLink :to="`/products/${row.products.id}`" class="flex gap-5 items-center w-fit">
              <NuxtImg format="webp" fit="fill" width="36" height="48" :src="row.products.thumbnail" provider="weserv" />
              <span>{{ row.products.title }}</span>
            </NuxtLink>
          </template>

          <!-- status column -->
          <template #status-data="{ row }">
            <UButton variant="ghost" class=""
              :color="status_col[row.status]?.color ? status_col[row.status]?.color : 'gray'">
              <span class="capitalize truncate">{{ row.status }}</span>
            </UButton>
          </template>

          <!-- action column -->
          <template #action-data="{ row }">
            <UButton @click="() => doDeleteFunction(row.products.id)" variant="ghost" color="gray"
              icon="i-heroicons-trash" />
          </template>
        </UTable>

        <template #footer>
          <div class="flex justify-end px-3 py-3.5 mt-8">
            <UPagination v-model="offset" :total="count" :active-button="{ variant: 'solid' }" />
          </div>
        </template>
      </UCard>
    </div>
    <DialogueCancelConfirm v-model="doDelete" @confirm="removeProduct" title="Remove product"
      description="Are you sure you want to remove it from this collection" confirm-button-color="rose" />

    <DialogueCancelConfirm v-model="isDelCol" @confirm="deleteCollection" title="Are you sure"
      description="Are you sure you want to delete this collection. This is an irreversible action"
      confirm-button-color="rose" />


    <TemplateCollectionsEdit :id="collection.id" :collection-req="edit_coll" v-model="isEditCol" />

    <TemplateCollectionsAddProducts :id="collection.id" v-model="add_products" />
  </div>
</template>
