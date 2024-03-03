<script setup lang='ts'>
import type { ProductShippingAttributes } from "~/types";
import type { PropType } from "vue";
const props = defineProps({
  modelValue: Boolean,
  attributes: {
    type: Object as PropType<ProductShippingAttributes>
  },
  productId: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['update:modelValue', 'update:attributes'])

const modal = computed({
  set: (val) => emits('update:modelValue', val),
  get: () => props.modelValue
})
const attributes = computed({
  set: (val) => emits('update:attributes', val),
  get: () => props.attributes
})

const editAttributes = async () => {
  try {
    const { product } = await useCybandyClient().admin.products.update(props.productId, { ...attributes.value })
    useNuxtApp().$product.product.singleProd.value = product
    useToastSuccess('Attributes updated')
    modal.value = false
  } catch (error) {
    useToastFailure()
  }
}
</script>

<template>
  <ModalTitleButton v-model="modal" title="Edit Attributes" @send="editAttributes" button-confirm-label="Save and Close"
    width="min-w-full  sm:min-w-[600px] md:min-w-[760px] lg:min-w-[992px] xl:min-w-[1024px]">
    <FormsProductsShipping v-model="attributes" />
  </ModalTitleButton>
</template>
