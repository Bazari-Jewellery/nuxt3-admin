<script setup lang="ts">
import type { AdminPostProductsProductVariantsReq } from "@medusajs/medusa/dist"
import type { PropType } from "vue";
type IOption = { option_id: string, value: string, title: string }

const props = defineProps({
  variantReq: {
    type: Object as PropType<AdminPostProductsProductVariantsReq>,
    required: true
  },
  options: {
    type: Array<IOption>,
    required: true
  }
})
const emits = defineEmits(['update:variantReq'])
const variant = computed({
  set: (val) => emits('update:variantReq', val),
  get: () => props.variantReq
})

if (variant.value) {
  variant.value.options = props.options?.map((x) => {
    return {
      option_id: x.option_id,
      value: x.value
    }
  })
}

const items = [{
  label: 'General',
  icon: 'i-heroicons-information-circle',
  defaultOpen: true,
  required: true,
  slot: 'general'
}, {
  label: 'Stock & inventory',
  icon: 'i-carbon-inventory-management',
  required: false,
  slot: 'stock'
}, {
  label: 'Shipping',
  icon: 'i-carbon-delivery',
  required: false,
  slot: 'shipping'
},

]


</script>

<template>
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
      <UCard :ui="{ body: { base: 'space-y-5' } }">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <UFormGroup label="Custom title">
            <UInput v-model="variant.title" placeholder="Blue / XL..." />
          </UFormGroup>
          <UFormGroup label="Material">
            <UInput v-model="variant.material" placeholder="20% silver, 80% copper..." />
          </UFormGroup>
        </div>
        <div class="space-y-5">
          <span class="text-gray-500 dark:text-gray-400">Options</span>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">


            <UFormGroup v-for="(opt, ind) of variant.options" :label="options[ind].title" required>
              <UInput v-if="variant?.options" v-model="variant.options[ind].value" placeholder="Blue..." required />
            </UFormGroup>

          </div>
        </div>
      </UCard>
    </template>

    <template #stock>
      <UCard>
        <p class="text-gray-500 dark:text-gray-400">Configure the inventory and stock for this variant</p>
        <div class="space-y-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <UFormGroup label="Stock Keeping Unit (SKU)">
              <UInput v-model="variant.sku" placeholder="S/N/239" />
            </UFormGroup>
            <UFormGroup label="Quantity in stock" type="number">
              <UInput v-model="variant.inventory_quantity" placeholder="100.." />
            </UFormGroup>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <UFormGroup label="EAN(Barcode)">
              <UInput v-model="variant.ean" placeholder="123575732533..." />
            </UFormGroup>
            <UFormGroup label="UPC (Barcode)">
              <UInput v-model="variant.upc" placeholder="02358622353..." />
            </UFormGroup>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <UFormGroup label="Barcode">
              <UInput v-model="variant.barcode" placeholder="123575732533..." />
            </UFormGroup>
          </div>
          <div class="grid gap-5">
            <UFormGroup label="Manage inventory" :ui="{ container: 'flex items-center justify-between gap-5' }">
              <span>When checked the system will regulate the inventory when orders and returns are made</span>
              <UToggle v-model="variant.manage_inventory" />
            </UFormGroup>
            <UFormGroup label="Allow backorders" :ui="{ container: 'flex items-center justify-between gap-5' }">
              <span>When checked the product will be available for purchase despite the product being sold out</span>
              <UToggle v-model="variant.allow_backorder" />
            </UFormGroup>
          </div>
        </div>
      </UCard>
    </template>

    <template #shipping>
      <UCard :ui="{ body: { base: 'space-y-5' } }">
        <p>Shipping information can be required depending on your shipping provider, and whether or not you are shipping
          internationally.</p>

        <div class="space-y-5">
          <p class="flex flex-col gap-1">
            <span class="text-base highlight">Dimensions</span>
            <span>Configure to calculate the most accurate shipping rates.</span>
          </p>
          <div class="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <UFormGroup label="Width">
              <UInput v-model="variant.width" placeholder="100..." type="number" />
            </UFormGroup>
            <UFormGroup label="Length">
              <UInput v-model="variant.length" placeholder="100..." type="number" />
            </UFormGroup>
            <UFormGroup label="Height">
              <UInput v-model="variant.height" placeholder="100..." type="number" />
            </UFormGroup>
            <UFormGroup label="Weight">
              <UInput v-model="variant.weight" placeholder="100..." type="number" />
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
              <UInput v-model="variant.mid_code" placeholder="XDSKLAD9993..." />
            </UFormGroup>
            <UFormGroup label="HS Code">
              <UInput v-model="variant.mid_code" placeholder="BDJSK39277W..." />
            </UFormGroup>
            <UFormGroup label="Country of origin">
              <UtilitiesCountriesList v-model="variant.origin_country" />
            </UFormGroup>
          </div>
        </div>
      </UCard>
    </template>
  </UAccordion>
</template>
