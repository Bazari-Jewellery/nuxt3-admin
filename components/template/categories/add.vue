<script setup lang=ts>
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import type {ProductCategory,AdminPostProductCategoriesReq} from "@medusajs/medusa"
import type { PropType } from "vue";


const props = defineProps({
  modelValue: Boolean,
  parentCategory:{
    type: Object as PropType<ProductCategory>
  }
})
const emits = defineEmits(['update:modelValue'])

const modal = computed({
  set: (val) => emits('update:modelValue', val),
  get: () => props.modelValue
})

const title = computed(()=>props.parentCategory?.id ?`Add Category to ${props.parentCategory.name}`: 'Add Category')

const category = ref({} as AdminPostProductCategoriesReq)

async function createCategory(){
  console.log(category.value);

  if(!category.value.name){
    toastNotification('','Name is required',0).error()
    return
  }

  if(props.parentCategory?.id){
    category.value.parent_category_id = props.parentCategory.id
  }
  
  const {product_category} = await useCybandyClient().admin.productCategories.create(category.value)
  if(product_category){
    toastNotification(`${category.value.name} is created`).default_toast()
    await useNuxtApp().$product.categories.getCategories()
    modal.value = false
  }else{
    toastNotification().error()
  }
}

watch(category,()=>{
  console.log(category.value);
  
})



</script>

<template>
  <ModalTitleButton :title="title" v-model="modal" @send="createCategory" width="min-w-full sm:min-w-[550px] md:min-w-[650px] lg:min-w-[760px]">
    <FormsCategoriesAddEdit v-model="category" />
  </ModalTitleButton>
</template>
