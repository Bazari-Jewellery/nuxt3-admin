<script setup lang="ts">
import type { AdminPostProductsProductVariantsReq, ProductStatus } from "@medusajs/medusa"
import { defaultDocument } from "@vueuse/core";
import VueEasyLightbox from 'vue-easy-lightbox'
import type { ProductShippingAttributes } from "~/types";

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

  return await useAsyncData(async () => {
    isLoading.value = true
    const payload = ref({
      id: id,
      expand: 'options,options.values,variants,categories,collection,type,tags,sales_channels,images,variants.prices,variants.options'
    })

    const { data, error } = await useProductsList(payload)
    if (data.value) {
      singleProd.value = data.value.products[0] as any
    }
    setTimeout(() => isLoading.value = false, 500)
    return data.value?.products[0]
  })

}

onMounted(async () => {
  // console.log('call function');
  await fetchProduct()
})


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

const details = computed(() => [
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

])
// attributes section 
const attributes = computed(() => {
  return {
    dimensions: {
      title: "Dimensions",
      content: [
        {
          label: 'Height',
          value: singleProd.value.height
        },
        {
          label: 'Width',
          value: singleProd.value.width
        },
        {
          label: 'Length',
          value: singleProd.value.length
        },
        {
          label: 'Weight',
          value: singleProd.value.weight
        },

      ]
    },
    customs: {
      title: "Customs",
      content: [
        {
          label: 'MID Code',
          value: singleProd.value.mid_code
        },
        {
          label: 'HS Code',
          value: singleProd.value.hs_code
        },
        {
          label: 'Country of origin',
          value: singleProd.value.origin_country
        },

      ]
    },
  }
})

// variant menu section
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
// attributes section menu
const edit_attributes = ref(false)
const attribute_obj = ref({
  weight: singleProd.value.weight,
  height: singleProd.value.height,
  length: singleProd.value.length,
  hs_code: singleProd.value.hs_code,
  md_code: singleProd.value.mid_code,
  origin_country: singleProd.value.origin_country
} as ProductShippingAttributes)
const attributes_menu = [
  [

    {
      label: 'Edit Attributes',
      icon: 'i-heroicons-pencil-square',
      click: () => {
        edit_attributes.value = true
      }
    },

  ]
]

const deleteProductVar = ref(false)
async function deleteProductFunction() {
  // console.log('delete');
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
    // fetchProduct.value
  }
})

const add_varaint = ref(false)
const options = computed(() => singleProd.value.options?.map((x) => { return { option_id: x.id, value: '', title: x.title } }))
const add_variant_variable = ref({} as AdminPostProductsProductVariantsReq)

watchDeep(add_varaint, async () => {
  if (!add_varaint.value) {
    add_variant_variable.value = {} as AdminPostProductsProductVariantsReq
    await fetchProduct()
    // fetchProduct.value
  }
})

// upload thumbnail
const isThumbnail = ref(false)
const thumbnail_files = ref([] as File[])
const thumbnail_urls = ref([singleProd.value.thumbnail] as string[])
watch(isThumbnail, () => {
  if (isThumbnail.value == false) {
    thumbnail_urls.value = [singleProd.value.thumbnail as string]
  }
})


// upload images
const isEditImages = ref(false)
const images_urls = ref(singleProd.value.images?.map((x) => x.url))
watch(isEditImages, () => {
  if (isEditImages.value == false) {
    images_urls.value = singleProd.value.images?.map((x) => x.url)
  }
})

// set status

async function setStatus(status: 'draft' | 'published' | 'proposed' | 'rejected') {
  const { data } = await useProductUpdate(singleProd.value.id as string, { status: status as any })
  if (data.value) {
    singleProd.value.status = data.value.product.status
  }
}

const status_menu = [[
  {
    label: 'Draft',
    click: async () => {
      await setStatus('draft')
    }
  },
  {
    label: 'Published',
    click: async () => {
      await setStatus('published')
    }
  },
  {
    label: 'Proposed',
    click: async () => {
      await setStatus('proposed')
    }
  },
  {
    label: 'Rejected',
    click: async () => {
      await setStatus('rejected')
    }
  },
]]

// image lightbox

const show_lightbox = ref(false)
const all_images = ref<string[]>([])
const mediaImages = ref([])

const current_img_index = ref(0)
const showImageFunction = (ind = 0) => {
  if (singleProd.value.images) {
    all_images.value = singleProd.value.images?.map((x) => x.url)
  }

  show_lightbox.value = true
}
const mediaMenu = [[
  {
    label: 'View',
    icon: 'i-heroicons-arrow-up-right',
    click: async () => {
      showImageFunction()
    }
  },
  {
    label: 'Edit',
    icon: 'i-heroicons-pencil-square',
    click: async () => {
      isEditImages.value = true
    }
  },

]]

// options part of the variant section needs re-working
const optionsPresentation = computed(() => singleProd.value.options?.map((_opt) => {
  const values = ref<string[]>([])
  _opt.values?.map((_val) => {
    if (!values.value.includes(_val.value)) {
      values.value.push(_val.value)
    }
  })
  return {
    title: _opt.title,
    values: values.value
  }
}))
</script>

<template>
  <div>
    <div class="my-6">
      <UButton variant="link" icon="i-heroicons-arrow-uturn-left" to="/products" label="Back to Products" />
    </div>
    <div v-if="singleProd">

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
                  <UDropdown :items="status_menu">

                    <UButton v-if="singleProd?.status" size="xs"
                      :variant="styles.status?.[singleProd.status as string]?.color ? 'outline' : 'solid'"
                      :label="singleProd.status"
                      :color="styles.status?.[singleProd.status as string]?.color || 'gray'" />
                  </UDropdown>

                  <UDropdown :items="general_menu">
                    <UButton size="xs" color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                  </UDropdown>

                </div>
              </div>
            </template>

            <div class="space-y-5">
              <p class="flex flex-col gap-1">
                <span v-if="singleProd?.metadata?.description" v-for="des in singleProd?.metadata?.description">
                  {{ des }}
                </span>
                <span v-else class="flex flex-col">
                  <span v-if="singleProd.description" v-for="d in singleProd.description.split('\n')">
                    {{ d }}
                  </span>
                </span>
              </p>

              <div v-if="singleProd?.tags" class="flex flex-wrap gap-5">
                <UBadge variant="solid" color="gray" v-for="tag in singleProd?.tags">{{ tag.value }}</UBadge>
              </div>

              <GeneralListBetween :options="{
      title: 'Details',
      content: details?.map((x) => { return { label: x.label as string, value: x.value as string } })
    }" />

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
              <div v-for="opt of optionsPresentation" class="space-y-0.5">
                <span class="highlight">{{ opt.title }}</span>
                <div class="flex flex-wrap items-center gap-2">
                  <UBadge v-for="_val of opt.values" variant="solid" color="gray" :label="_val" />
                </div>
              </div>
              <!-- <div v-for="opt of singleProd.options" class="space-y-0.5">
                <span class="highlight">{{ opt.title }}</span>
                <div class="flex flex-wrap items-center gap-2">
                  <UBadge v-for="_opt of opt.values" variant="solid" color="gray" :label="_opt.value" />
                </div>
              </div> -->
            </div>
            <TemplateProductsVariantsTable v-if="singleProd" :products="(singleProd as any)" />
          </UCard>

          <!-- attributes information -->
          <UCard :ui="{ ...card_ui }">
            <template #header>
              <div class="flex items-center gap-4 justify-between">
                <span class="text-base lg:text-lg highlight">Attributes</span>
                <div class="flex items-center gap-4">
                  <UDropdown :items="attributes_menu">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                  </UDropdown>
                </div>
              </div>
            </template>

            <div class="space-y-5">
              <GeneralListBetween :options="attributes.dimensions" />
              <GeneralListBetween :options="attributes.customs" />
            </div>
            <!-- <TemplateProductsVariantsTable v-if="singleProd" :products="(singleProd as any)" /> -->
          </UCard>
        </div>

        <div class="col-span-full lg:col-span-4 space-y-8">
          <UCard :ui="u_card_ui">
            <template #header>
              <div class="flex items-center gap-4 justify-between">
                <span class="text-base lg:text-lg highlight">Thumbnail</span>
                <div class="flex items-center gap-4">
                  <UButton @click="() => isThumbnail = true" size="xs" variant="outline" color="black">{{
      singleProd.thumbnail ? 'Edit' : 'Upload' }}</UButton>
                  <UButton v-if="singleProd.thumbnail" size="xs" icon="i-heroicons-trash" variant="outline"
                    color="black" />
                </div>
              </div>
            </template>
            <NuxtImg v-if="singleProd.thumbnail" provider="weserv" class="w-[120px] h-[120px]"
              :src="(singleProd?.thumbnail as any || '')" preset="prod_small_thumbnail" />
          </UCard>

          <UCard :ui="u_card_ui">
            <template #header>
              <div class="flex items-center gap-4 justify-between">
                <span class="text-base lg:text-lg highlight">Images</span>
                <div class="flex items-center gap-4">
                  <UDropdown :items="mediaMenu">
                    <UButton size="xs" icon="i-heroicons-bars-3" label="Media Menu" variant="outline" color="black" />
                  </UDropdown>
                  <!-- <UButton @click="() => isEditImages = true" size="xs" label="Edit Media" variant="outline"
                    color="black" /> -->
                  <!-- <UButton size="xs" icon="i-heroicons-trash" variant="outline" color="black"/> -->
                </div>
              </div>
            </template>
            <div class="flex flex-wrap items-center gap-5">
              <template v-for="(img, ind) of singleProd.images">
                <NuxtImg @click="() => showImageFunction(ind)" ref="mediaImages" v-if="singleProd.images"
                  class="prod-images w-[120px] h-[120px] cursor-pointer" :src="(img.url as any)" provider="weserv"
                  preset="prod_small_thumbnail" />
              </template>

            </div>
          </UCard>
        </div>
      </div>




      <FormsProductsGeneral v-model="edit_product_info" :product="(singleProd as any)" />
      <DialogueCancelConfirm v-model="deleteProductVar" title="Delete"
        description="Are you sure you want to delete this" what="product" @confirm="deleteProductFunction" />
      <TemplateProductsOptionsEdit :product="(singleProd as any)" v-model="edit_options" />
      <TemplateProductsVariantsEditPrices v-model="edit_prices" :variants="(singleProd.variants as any)" />
      <TemplateProductsVariantsAdd :product-id="(singleProd.id as string)" :options="(options as any)"
        v-model="add_varaint" v-model:variant-req="add_variant_variable" />
      <TemplateProductsAttributesEdit v-if="singleProd.id" v-model="edit_attributes" :product-id="singleProd.id"
        v-model:attributes="attribute_obj" />
    </div>

    <div v-else class="flex justify-between gap-5">
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


    <UploadThumbnail v-model="isThumbnail" v-model:image-urls="thumbnail_urls" :upload="true" />
    <UploadImagesMedia v-model="isEditImages" upload v-model:current-image-urls="images_urls" />
    <!-- <ClientOnly> -->
    <UtilitiesLightbox v-if="all_images.length" v-model:images="all_images" v-model:show="show_lightbox"
      @hideBox="() => show_lightbox = false" v-model:image-index="current_img_index" optimize />
    <!-- </ClientOnly> -->
  </div>
</template>
