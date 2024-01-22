<script setup lang=ts>
import type { AdminPostProductsProductVariantsReq } from "@medusajs/medusa"

definePageMeta({
  scrollToTop: true
})

const nuxtApp = useNuxtApp()
const singleProd = nuxtApp.$product.product.singleProd
const isLoading = ref(true)

watch(singleProd, () => {
  useHead({
    title: singleProd.value.title
  })
})

const id = useRoute().params.id as string
async function fetchProduct() {
  isLoading.value = true
  const payload = ref({
    id: id,
    expand: 'options,options.values,variants,categories,collection,type,tags,sales_channels,images,variants.prices,variants.options'
  })

  await useAsyncData('single_product', async () => {
    const { data, error } = await useProductsList(payload)
    if (data.value) {
      singleProd.value = data.value.products[0] as any
    }
    isLoading.value = false
    return data.value?.products[0]
  })

}
await fetchProduct()
const card_ui = { divide: '' }
const styles = nuxtApp.$product.styles

const edit_product_info = ref(false)
const general_menu = [
  [
    {
      label: 'Edit General Information',
      icon: 'i-heroicons-pencil-square',
      click: () => {
        edit_product_info.value = true
      }
    },
    // {
    //   label:'Edit Sales Channels',
    //   icon: 'i-carbon-network-2',
    //   click: ()=>{

    //   }
    // },
    {
      label: 'Delete',
      icon: 'i-heroicons-trash',
      click: () => {
        deleteProductVar.value = true
      }
    },
  ]
]

const details = [
  {
    label: 'Subtitle',
    value: singleProd.value.subtitle
  },
  {
    label: 'Handle',
    value: singleProd.value.handle
  },
  {
    label: 'Type',
    value: singleProd.value.type?.value
  },
  {
    label: 'Collection',
    value: singleProd.value.collection?.title
  },
  {
    label: 'Category',
    value: singleProd.value.categories?.map((x) => x.name).join(', ')
  },
  {
    label: 'Discountable',
    value: singleProd.value.discountable
  },
  {
    label: 'Sales Channels',
    value: singleProd.value.sales_channels?.map((x) => x?.name).join(', ')
  },

]

const variants_menu = [
  [
    {
      label: 'Add Variants',
      icon: 'i-heroicons-plus',
      click: () => {
        add_varaint.value = true
      }
    },
    {
      label: 'Edit Prices',
      icon: 'i-heroicons-currency-euro',
      click: () => {
        edit_prices.value = true
      }
    },
    // {
    //   label:'Edit Variants',
    //   icon: 'i-heroicons-pencil-square',
    //   click: ()=>{

    //   }
    // },
    {
      label: 'Edit Options',
      icon: 'i-heroicons-cog-8-tooth-solid',
      click: () => {
        edit_options.value = true
      }
    },
  ]
]

const deleteProductVar = ref(false)
async function deleteProductFunction() {
  console.log('delete');
  const { id: _id, object, deleted } = await useCybandyClient().admin.products.delete(id)
  if (id == _id && deleted) {
    useToastSuccess('Product deleted')
    navigateTo('/products')
  }
}

const edit_options = ref(false)

watch(edit_options, async () => {
  if (!edit_options.value) {
    await fetchProduct()
  }
})
const u_card_ui = { divide: '' }

const edit_prices = ref(false)
watch(edit_prices, async () => {
  if (!edit_prices.value) {
    await fetchProduct()
  }
})

const add_varaint = ref(false)
const options = computed(() => singleProd.value.options?.map((x) => { return { option_id: x.id, value: '', title: x.title } }))
const add_variant_variable = ref({} as AdminPostProductsProductVariantsReq)

watchDeep(add_varaint, async () => {
  if (!add_varaint.value) {
    add_variant_variable.value = {} as AdminPostProductsProductVariantsReq
    await fetchProduct()
  }
})
</script>

<template>
  <div>
    <div v-if="isLoading" class="flex justify-between gap-5">
      <div v-for="j of [1, 2, 3]" class="space-y-4 basis-full md:basis-1/2 lg:basis-1/3 ">
        <div v-for="i of [1, 2, 3]" class="flex items-center space-x-4">
          <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
          <div class="space-y-2 w-full">
            <USkeleton class="h-4 w-5/6" />
            <USkeleton class="h-4 w-9/12" />
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="my-6">
        <UButton variant="link" icon="i-heroicons-arrow-left" to="/products" label="Back to Products" />
      </div>
      <div class="grid grid-cols-10 gap-5">


        <div class="col-span-full lg:col-span-6 space-y-8">
          <!-- general information -->
          <UCard :ui="{ ...card_ui }">

            <template #header>
              <div class="flex items-center gap-4 justify-between">
                <h1 class="text-base lg:text-lg uppercase highlight">
                  {{ singleProd?.title }}
                </h1>
                <div class="flex items-center gap-4">
                  <UBadge v-if="singleProd?.status"
                    :variant="styles.status?.[singleProd.status as string]?.color ? 'subtle' : 'solid'"
                    :label="singleProd.status" :color="styles.status?.[singleProd.status as string]?.color || 'gray'" />

                  <UDropdown :items="general_menu">
                    <UButton size="xs" color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal" />
                  </UDropdown>

                </div>
              </div>
            </template>

            <div class="space-y-5">
              <p class="flex flex-col gap-1">
                <span v-if="singleProd?.metadata?.description" v-for="des in singleProd?.metadata?.description">
                  {{ des }}
                </span>
                <span v-else>
                  {{ singleProd.description }}
                </span>
              </p>

              <div v-if="singleProd?.tags" class="flex flex-wrap gap-5">
                <UBadge variant="solid" color="gray" v-for="tag in singleProd?.tags">{{ tag.value }}</UBadge>
              </div>

              <div class="space-y-4">
                <h3 class="highlight text-base">Details</h3>
                <div class="space-y-2">
                  <div v-for="item of details" class="flex justify-between items-center">
                    <span>{{ item.label }}</span>
                    <span>{{ item.value || '-' }}</span>
                  </div>
                </div>
              </div>

            </div>

          </UCard>

          <!-- variants information -->
          <UCard :ui="{ ...card_ui }">
            <template #header>
              <div class="flex items-center gap-4 justify-between">
                <span class="text-base lg:text-lg highlight">Variants</span>
                <div class="flex items-center gap-4">
                  <UDropdown :items="variants_menu">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                  </UDropdown>
                </div>
              </div>
            </template>

            <div class="space-y-5">
              <div v-for="opt of singleProd.options">
                <span class="highlight">{{ opt.title }}</span>
                <div class="flex flex-wrap items-center gap-2">
                  <UBadge v-for="_opt of opt.values" variant="solid" color="gray" :label="_opt.value" />
                </div>
              </div>
            </div>
            <TemplateProductsVariantsTable v-if="singleProd" :products="(singleProd as any)" />
          </UCard>
        </div>

        <div class="col-span-full lg:col-span-4 space-y-8">
          <UCard :ui="u_card_ui">
            <template #header>
              <div class="flex items-center gap-4 justify-between">
                <span class="text-base lg:text-lg highlight">Thumbnail</span>
                <div class="flex items-center gap-4">
                  <UButton size="xs" label="Edit" variant="outline" color="black" />
                  <UButton size="xs" icon="i-heroicons-trash" variant="outline" color="black" />
                </div>
              </div>
            </template>
            <NuxtImg class="w-[120px] h-[120px]" :src="(singleProd?.thumbnail as any)" preset="prod_small_thumbnail" />
          </UCard>

          <UCard :ui="u_card_ui">
            <template #header>
              <div class="flex items-center gap-4 justify-between">
                <span class="text-base lg:text-lg highlight">Images</span>
                <div class="flex items-center gap-4">
                  <UButton size="xs" label="Edit Media" variant="outline" color="black" />
                  <!-- <UButton size="xs" icon="i-heroicons-trash" variant="outline" color="black"/> -->
                </div>
              </div>
            </template>
            <div class="flex flex-wrap items-center gap-5">
              <NuxtImg v-for="img of singleProd.images" class="w-[120px] h-[120px]" :src="(img.url as any)"
                preset="prod_small_thumbnail" />
            </div>
          </UCard>
        </div>
      </div>




      <FormsProductsGeneral v-model="edit_product_info" :product="(singleProd as any)" />
      <DialogueCancelConfirm v-model="deleteProductVar" title="Delete" description="Are you sure you want to delete this"
        what="product" @confirm="deleteProductFunction" />
      <TemplateProductsOptionsEdit :product="(singleProd as any)" v-model="edit_options" />
      <TemplateProductsVariantsEditPrices v-model="edit_prices" :variants="(singleProd.variants as any)" />
      <TemplateProductsVariantsAdd :product-id="(singleProd.id as string)" :options="(options as any)"
        v-model="add_varaint" v-model:variant-req="add_variant_variable" />
    </div>

  </div>
</template>
