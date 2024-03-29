<script setup lang=ts>
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import type { ProductCategory, AdminPostProductCategoriesReq } from "@medusajs/medusa"
import type { PropType } from "vue";


const props = defineProps({
  modelValue: Boolean,
  category: {
    type: Object as PropType<ProductCategory>,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

const modal = computed({
  set: (val) => emits('update:modelValue', val),
  get: () => props.modelValue
})



const category = ref({
  name: props.category.name,
  handle: props.category.handle,
  description: props.category.description,
  is_active: props.category.is_active,
  is_internal: props.category.is_internal,
  metadata: props.category.metadata,
} as AdminPostProductCategoriesReq)

// const target = ref(null)
// const targetIsVisible = useElementVisibility(target)
watch(modal, () => {
  if (modal.value) {
    // console.log('visible');

    category.value = {
      name: props.category.name,
      handle: props.category.handle,
      description: props.category.description,
      is_active: props.category.is_active as boolean,
      is_internal: props.category.is_internal as boolean,
      metadata: props.category.metadata,
    }
  } else {
    // console.log('hidden');

    category.value = {} as AdminPostProductCategoriesReq
  }
})

async function createCategory() {

  if (!category.value.name) {
    toastNotification('', 'Name is required', 0).error()
    return
  }


  const { product_category } = await useCybandyClient().admin.productCategories.update(props.category.id, category.value)
  if (product_category) {
    toastNotification(`${category.value.name} is created`).default_toast()
    await useNuxtApp().$product.categories.getCategories()
    modal.value = false
  } else {
    toastNotification().error()
  }
}



const title = computed(() => `Edit ${props.category.name}`)

</script>

<template>
  <ModalTitleButton :title="title" v-model="modal" @send="createCategory"
    width="min-w-full sm:min-w-[550px] md:min-w-[650px] lg:min-w-[760px]">
    <!-- <div ref="target"> -->
    <FormsCategoriesAddEdit v-model="category" />
    <!-- </div> -->
  </ModalTitleButton>
</template>
