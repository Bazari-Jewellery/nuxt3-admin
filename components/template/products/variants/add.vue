<script setup lang=ts>
import type { AdminPostProductsProductVariantsReq } from "@medusajs/medusa/dist"
type IOption = { option_id: string, value: string, title: string }
const props = defineProps({
  modelValue: Boolean,
  variantReq: {
    type: Object as PropType<AdminPostProductsProductVariantsReq>,
    required: true
  },
  options: {
    type: Array<IOption>,
    required: true
  },
  productId: {
    type: String,
    required: true
  },
  newProduct: Boolean
})
const emits = defineEmits(['update:modelValue', 'update:variantReq', 'update:options', 'append'])

const modal = computed({
  set: (val) => emits('update:modelValue', val),
  get: () => props.modelValue
})
const variant = computed({
  set: (val) => emits('update:variantReq', val),
  get: () => props.variantReq
})
const options = computed({
  set: (val) => emits('update:options', val),
  get: () => props.options
})

async function addVariant() {
  emits('append')
  if (props.newProduct) {
    return
  }
  try {
    variant.value.options = variant.value.options?.map((x) => {
      if (x.value == '' || !x.value) {
        throw new Error("option required");

      }
      return { option_id: x.option_id, value: x.value }
    })

    if (!variant.value.title) {
      variant.value.title = variant.value.options?.map((x) => x.value).join('/ ') as string
    }
    variant.value.prices = []
    // // console.log(variant.value);

    const { product, response } = await useCybandyClient().admin.products.createVariant(props.productId, variant.value)
    if (product.id) {
      // useNuxtApp().$product.product.singleProd.value = product
      useToastSuccess('', `variant added to product of id ${props.productId}`)

    } else {
      throw new Error(response.statusText)
    }
  } catch (error: any) {
    toastNotification('', error.message).error()
    return
  }
  modal.value = false
}

</script>

<template>
  <ModalTitleButton title="Add Variant" v-model="modal" @send="addVariant"
    width="min-w-full  sm:min-w-[600px] md:min-w-[760px] lg:min-w-[992px] xl:min-w-[1024px]">
    <FormsProductsVariant :options="options" :variant-req="variant" />
  </ModalTitleButton>
</template>
