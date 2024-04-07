<script setup lang='ts'>
import type { AdminPostProductsReq } from "@medusajs/medusa"

const props = defineProps({
  modelValue: Boolean,

})
const emits = defineEmits(['update:modelValue'])

const modal = computed({
  set: (val) => emits('update:modelValue', val),
  get: () => props.modelValue
})

const confirm_close = ref(false)

defineShortcuts({
  escape: {
    usingInput: true,
    handler: () => {
      confirm_close.value = true
    }
  }
})

function closeModal() {
  confirm_close.value = false
  modal.value = false
}

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
  slot: 'stock'
}, {
  label: 'Attributes',
  icon: 'i-carbon-delivery',
  required: false,
  slot: 'attributes'
},

]

// const product = computed(props.product.products)

const product = ref({ discountable: true } as AdminPostProductsReq)

async function createProduct(status: string | null = null) {
  if (status) {
    product.value.status = status as any
  } else {
    product.value.status = "draft" as any
  }
  const { product: _product } = await useCybandyClient().admin.products.create(product.value)

  if (_product) {
    // if (status) {
    closeModal()
    useToastSuccess('Product published')
    navigateTo(`/products/${_product.id}`)
    // }
  }
}
</script>

<template>
  <UModal v-model="modal" :fullscreen="true" :ui="{ fullscreen: 'overflow-y-auto no-scrollbar items-center' }">

    <UCard :ui="{ base: 'w-full max-w-5xl', divide: '', ring: '' }">
      <template #header>
        <div class="relative flex items-center justify-between">
          <UButton @click="() => confirm_close = true" product="solid" color="gray" icon="i-heroicons-x-mark">
            <template #trailing>
              <UKbd>Esc</UKbd>
            </template>
          </UButton>
          <div class="flex items-center gap-5">
            <UButton @click="createProduct(null)" product="solid" color="gray" label="Save as draft" />
            <UButton @click="() => createProduct('published')" product="solid" color="primary"
              label="Publish product" />
          </div>
        </div>
      </template>

      <!-- body -->
      <UAccordion :items="items" multiple :ui="{ wrapper: 'flex flex-col w-full' }">
        <template #default="{ item, index, open }">
          <UButton color="gray" product="ghost" size="sm" class="border-b border-gray-200 dark:border-gray-700"
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
