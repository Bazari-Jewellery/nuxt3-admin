<script setup lang=ts>
import { useProductsList } from '~/composables/products';

definePageMeta({
  scrollToTop:true
})

const nuxtApp = useNuxtApp()
const singleProd = nuxtApp.$product.product.singleProd
const isLoading = ref(true)

watch(singleProd,()=>{
  useHead({
    title: singleProd.value.title
  })
})

const id = useRoute().params.id as string
async function fetchProduct(){
  isLoading.value = true
  const payload = ref({
    id: id,
    expand: 'options,options.values,variants,categories,collection,type,tags,sales_channels,images,variants.prices'
  })
  const {data,error} = await useProductsList(payload)
  if(data.value){
    singleProd.value = data.value.products[0] as any
  }
  isLoading.value = false
  
}
await fetchProduct()
const card_ui = {divide:''}
const styles = nuxtApp.$product.styles

const general_menu = [
[
  {
    label:'Edit General Information',
    icon: 'i-heroicons-pencil-square',
    click: ()=>{

    }
  },
  {
    label:'Edit Sales Channels',
    icon: 'i-carbon-network-2',
    click: ()=>{

    }
  },
  {
    label:'Delete',
    icon: 'i-heroicons-trash',
    click: ()=>{

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
    value: singleProd.value.categories?.map((x)=>x.name).join(', ')
  },
  {
    label: 'Discountable',
    value: singleProd.value.discountable
  },
  {
    label: 'Sales Channels',
    value: singleProd.value.sales_channels?.map((x)=>x?.name).join(', ')
  },

]

const variants_menu = [
  [
  {
    label:'Add Variants',
    icon: 'i-heroicons-plus',
    click: ()=>{

    }
  },
  {
    label:'Edit Prices',
    icon: 'i-heroicons-currency-euro',
    click: ()=>{

    }
  },
  {
    label:'Edit Variants',
    icon: 'i-heroicons-pencil-square',
    click: ()=>{

    }
  },
  {
    label:'Edit Options',
    icon: 'i-heroicons-cog-8-tooth-solid',
    click: ()=>{

    }
  },
  ]
]


</script>

<template>
  <div>
    <div v-if="isLoading" class="flex justify-between gap-5">
      <div v-for="j of [1,2,3]" class="space-y-4 basis-full md:basis-1/2 lg:basis-1/3 ">
        <div  v-for="i of [1, 2, 3]" class="flex items-center space-x-4">
          <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
          <div class="space-y-2 w-full">
            <USkeleton class="h-4 w-5/6" />
            <USkeleton class="h-4 w-9/12" />
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="grid grid-cols-10 gap-5">

      
        <div class="col-span-full lg:col-span-6 space-y-8">
          <!-- general information -->
          <UCard :ui="{...card_ui}">

            <template #header>
              <div class="flex items-center gap-4 justify-between">
                <h1 class="text-base lg:text-lg uppercase highlight">
                  {{ singleProd?.title }}
                </h1>
                <div class="flex items-center gap-4">
                  <UBadge v-if="singleProd?.status" :variant="styles.status?.[singleProd.status as string]?.color ? 'subtle' : 'solid'" :label="singleProd.status"
                  :color="styles.status?.[singleProd.status as string]?.color || 'gray'"
                  />

                  <UDropdown :items="general_menu">
                    <UButton size="xs" color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal"/>
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
          <UCard :ui="{...card_ui}">
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
        <div class="col-span-full lg:col-span-6 space-y-8">

        </div>
      </div>
    </div>
  </div>
</template>
