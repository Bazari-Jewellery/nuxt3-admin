<script setup lang='ts'>
import type { AdminPostProductsReq, ProductType } from "@medusajs/medusa"

const props = defineProps({
  modelValue: Boolean,

})
const emits = defineEmits(['update:modelValue'])

const modal = computed({
  set: (val) => emits('update:modelValue', val),
  get: () => props.modelValue
})

const confirm_close = ref(false)

// keyboard shortcut to close modal
defineShortcuts({
  escape: {
    usingInput: true,
    handler: () => {
      confirm_close.value = true
    }
  }
})

// closing modal
function closeModal() {
  categories.value = []
  imageFiles.value = []
  imageUrls.value = []
  thumbnailIndex.value = null
  confirm_close.value = false
  modal.value = false
}

// accordion list items
const items = [{
  label: 'General',
  icon: 'i-heroicons-information-circle',
  defaultOpen: true,
  required: true,
  slot: 'general'
}, {
  label: 'Organize',
  icon: 'i-carbon-inventory-management',
  required: false,
  slot: 'organize'
}, {
  label: 'Attributes',
  icon: 'i-carbon-delivery',
  required: false,
  slot: 'attributes'
},
// {
//   label: "Thumbnail",
//   slot: 'thumbnail',
//   required: false,
//   icon: 'i-carbon-image'
// },
{
  label: "Images",
  slot: 'images',
  required: false,
  icon: 'i-carbon-image-copy'
},

]
// collection,types,tags and categories are in this store
const generalStore = useGeneralStore()
const organizeOptions = storeToRefs(generalStore)

// payload for creating product
const product = ref({ discountable: true } as AdminPostProductsReq)
// selected categories
const categories = ref([] as string[])


/**
 * Function to create product
 * @param status product status
 */
async function createProduct(status: string | null = null) {
  if (status) {
    product.value.status = status as any
  } else {
    product.value.status = "draft" as any
  }
  product.value.categories = categories.value.map((x) => {
    return {
      id: x
    }
  })
  product.value.type = { value: type.value.value }
  // const { product: _product } = await useCybandyClient().admin.products.create(product.value)

  // if (_product) {
  //   // if (status) {
  //   closeModal()
  //   useToastSuccess('Product published')
  //   navigateTo(`/products/${_product.id}`)
  //   // }
  // }

  product.value.images = imageUrls.value
  product.value.thumbnail = imageUrls.value[thumbnailIndex.value as number]
  console.log(product.value);

}

// for controlling the category dropdown list
const showCategories = ref(false)

const imageFiles = ref<File[]>([])
const imageUrls = ref<string[]>([])
const thumbnailIndex = ref<number | null>(null)

function changeThumbnail(ind: number) {
  if (ind < 0) return
  thumbnailIndex.value = ind
}

/**
 * Deleting image
 * @param ind 
 */
const deleteImage = (ind: number) => {
  if (ind < 0) return
  imageFiles.value.splice(ind, 1)
  imageUrls.value.splice(ind, 1)
}

/**
 * uploading images
 */
const uploadImages = async () => {
  if (thumbnailIndex.value == null) {
    toastNotification('Select thumbnail', 'Tick the checkbox of the thumbnail image', 4000).error()
    return false

  }
  if (imageFiles.value.length) {
    const data = await useUploadImage(imageFiles.value)

    if (data.uploads) {
      product.value.images = data.uploads.map((x) => x.url)
      return true
    }
  }
  return false
}

// for creating and selecting type
const type = ref({} as ProductType)
const finalCreatableType = computed({
  get: () => type.value,
  set: async (val) => {
    if (val.id) {
      type.value = val
      return val
    }

    console.log(val);

    const new_val = { ...val, id: Date.now() }
    organizeOptions.types.value.push(new_val as any)

    type.value = new_val as any
    return new_val

  }
})

const progressValue = ref(5)
</script>

<template>
  <UModal v-model="modal" :fullscreen="true" :ui="{ fullscreen: 'overflow-y-auto no-scrollbar items-center' }">

    <UCard :ui="{ base: 'w-full max-w-5xl', divide: '', ring: '' }">
      <template #header>
        <div class="relative flex items-center justify-between">
          <UButton @click="() => confirm_close = true" variant="solid" color="gray" icon="i-heroicons-x-mark">
            <template #trailing>
              <UKbd>Esc</UKbd>
            </template>
          </UButton>
          <div class="flex items-center gap-5">
            <UButton @click="createProduct(null)" variant="solid" color="gray" label="Save as draft" />
            <UButton @click="() => createProduct('published')" variant="solid" color="primary"
              label="Publish product" />
          </div>
        </div>
      </template>

      <!-- body -->
      <UProgress :value="progressValue">

      </UProgress>


      <UAccordion :items="items" multiple :ui="{ wrapper: 'flex flex-col w-full' }">
        <template #default="{ item, index, open }">
          <UButton color="gray" variant="ghost" size="sm" class="border-b border-gray-200 dark:border-gray-700"
            :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
            <template #leading>
              <div class="w-6 h-6 rounded-full bg-transparent flex items-center justify-center -my-1">
                <UIcon :name="item.icon" class="w-5 h-5 text-primary" />
              </div>
            </template>

            <span class="truncate">
              {{ index + 1 }}. {{ item.label }}
              <span v-if="item.required" class="text-rose-500 dark:text-rose-400">*</span>
            </span>

            <template #trailing>
              <UIcon name="i-heroicons-chevron-right-20-solid"
                class="w-5 h-5 ms-auto transform transition-transform duration-200" :class="[open && 'rotate-90']" />
            </template>
          </UButton>
        </template>

        <template #general>
          <UCard :ui="{ body: { base: 'space-y-5', } }">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <UFormGroup label="Title" aria-required="true" required>
                <UInput v-model="product.title" placeholder="Summer shirt" />
              </UFormGroup>
              <UFormGroup label="Subtitle">
                <UInput v-model="product.subtitle" />
              </UFormGroup>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <UFormGroup label="Handle">
                <UInput v-model="product.handle" placeholder="summer-shirt">

                  <template #leading>
                    <span>/</span>
                  </template>

                </UInput>
              </UFormGroup>
              <UFormGroup label="Material">
                <UInput v-model="product.material" placeholder="20% silver, 80% copper..." />
              </UFormGroup>
            </div>

            <div class="grid grid-cols-1 gap-5">

              <UFormGroup label="Description">
                <UTextarea :rows="4" v-model="product.description" />

                <template #help>
                  <p>Give your product a short and clear description</p>
                  <p>120-160 characters is the recommended length for search engines</p>
                </template>
              </UFormGroup>
            </div>

            <div class="grid gap-5">
              <UFormGroup label="Discountable" :ui="{ container: 'flex items-center justify-between gap-5' }">
                <span>When unchecked discounts will not be applied to this product.</span>
                <UToggle v-model="product.discountable" />
              </UFormGroup>
            </div>

          </UCard>
        </template>

        <template #attributes>
          <UCard :ui="{ body: { base: 'space-y-5' } }">
            <p>Used for shipping and customs purposes</p>

            <div class="space-y-5">
              <p class="flex flex-col gap-1">
                <span class="text-base highlight">Dimensions</span>
                <span>Configure to calculate the most accurate shipping rates.</span>
              </p>
              <div class="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <UFormGroup label="Width">
                  <UInput v-model="product.width" placeholder="100..." type="number" />
                </UFormGroup>
                <UFormGroup label="Length">
                  <UInput v-model="product.length" placeholder="100..." type="number" />
                </UFormGroup>
                <UFormGroup label="Height">
                  <UInput v-model="product.height" placeholder="100..." type="number" />
                </UFormGroup>
                <UFormGroup label="Weight">
                  <UInput v-model="product.weight" placeholder="100..." type="number" />
                </UFormGroup>
              </div>


            </div>

            <div>
              <p>
                <span>Customs</span>
                <span>Configure if you are shipping internationally</span>
              </p>

              <div class="grid grid-cols-1 sm-grid-cols-2 gap-5">
                <UFormGroup label="MID Code">
                  <UInput v-model="product.mid_code" placeholder="XDSKLAD9993..." />
                </UFormGroup>
                <UFormGroup label="HS Code">
                  <UInput v-model="product.mid_code" placeholder="BDJSK39277W..." />
                </UFormGroup>
                <UFormGroup label="Country of origin">
                  <UtilitiesCountriesList v-model="product.origin_country" />
                </UFormGroup>
              </div>
            </div>
          </UCard>
        </template>

        <template #organize>
          <UCard :ui="{ body: { base: 'space-y-5', } }">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <UFormGroup label="Type">
                <USelectMenu v-model="finalCreatableType" :options="organizeOptions.types.value"
                  option-attribute="value" searchable creatable>

                </USelectMenu>
              </UFormGroup>

              <UFormGroup label="Collection">
                <USelectMenu v-model="product.collection_id" :options="organizeOptions.collections.value"
                  option-attribute="title" value-attribute="id" searchable>

                </USelectMenu>
              </UFormGroup>

            </div>

            <div class="grid">
              <UFormGroup label="Categories" class="">

                <div id="categorySelector" class="relative">
                  <button @click="() => showCategories = !showCategories"
                    class="inline-flex w-full items-center justify-between py-2 px-3 ring-1 ring-gray-500 rounded-lg">
                    <span>{{ categories.length ? `${categories.length} selected` : 'Select categories' }}</span>
                    <UIcon name="i-heroicons-chevron-down-20-solid" class="w-4 h-4 cursor-pointer" />
                  </button>

                  <div class="relative panel">

                    <div v-if="showCategories" class="max-h-60 overflow-auto w-full z-50  p-4">
                      <CategoriesSelect :categories="(organizeOptions.categories.value as any)"
                        v-model:selected-categories="categories" />
                    </div>
                  </div>
                </div>


              </UFormGroup>
            </div>

          </UCard>
        </template>

        <template #images>
          <UCard>
            <UtilitiesImageDropZone v-model:files="imageFiles" v-model:image-urls="imageUrls" multiple title="Media"
              description="All images of the product">

              <template #fileDisplay>
                <div class="flex items-center gap-5 flex-wrap">
                  <div v-if="imageUrls" v-for="(src, ind) of imageUrls" class="flex items-start gap-1 5">
                    <UCheckbox :modelValue="ind === thumbnailIndex" @update:modelValue="() => changeThumbnail(ind)" />
                    <div class="w-fit h-fit relative">
                      <img ref="imageTarget" :src="src" alt="" class="w-[150px] h-[150px]" crossorigin="anonymous" />
                      <UButton @click="() => deleteImage(ind)" color="gray" size="xs" variant="solid"
                        icon="i-heroicons-trash" class="absolute right-2 top-2" />
                    </div>
                  </div>
                </div>
              </template>
            </UtilitiesImageDropZone>
          </UCard>
        </template>

      </UAccordion>
    </UCard>

    <!-- closing -->
    <DialogueCancelConfirm @confirm="() => modal = false" v-model="confirm_close" title="Close"
      description="Are you sure you want to close this editor without saving?" what="" confirm-button-color="rose">

      <template #cancelButton>
        <UButton @click="closeModal" label="Yes, close" type="button" product="solid" color="rose" />
      </template>

      <template #confirmButton>
        <UButton @click="createProduct(null)" label="Save as draft" product="solid" color="green" />
      </template>
    </DialogueCancelConfirm>
  </UModal>
</template>
