<script setup lang=ts>
import type { AdminPostProductsProductVariantsReq } from "@medusajs/medusa/dist"
type IOption = { option_id: string, value: string, title:string }
const props = defineProps({
  modelValue: Boolean,
  variantReq: {
    type:Object as PropType<AdminPostProductsProductVariantsReq>,
    required: true
  },
  options: {
    type: Array<IOption>,
    required: true
  },
  productId:{
    type:String,
    required:true
  },
  variantId:{
    type:String,
    required:true
  },
})
const emits = defineEmits(['update:modelValue','update:variantReq'])

const modal = computed({
  set: (val) => emits('update:modelValue', val),
  get: () => props.modelValue
})
const variant = computed({
  set: (val) => emits('update:variantReq', val),
  get: () => props.variantReq
})

async function editVariant(){
  try {
    variant.value.options = variant.value.options?.map((x)=>{
    if(x.value == '' || !x.value){
      throw new Error("option required");
      
    }
    return{option_id:x.option_id,value:x.value}
  })

    if(!variant.value.title){
    variant.value.title = variant.value.options?.map((x)=>x.value).join('/ ') as string
  }
  
  // console.log(variant.value);
  
  const {product, response} = await useCybandyClient().admin.products.updateVariant(props.productId, props.variantId, variant.value)
  if(product.id){
    // useNuxtApp().$product.product.singleProd.value = product
    useToastSuccess('',`variant added to product of id ${props.productId}`)
    // const d = await useNuxtApp().$product.product.getSingleProduct(product.id)

    // if(d){
    //   useNuxtApp().$product.product.singleProd.value = d
    // }
    await refreshNuxtData('single_product')
    
  }else{
    throw new Error(response.statusText)
  }
  } catch (error:any) {
    toastNotification('', error.message).error()
    return
  }
  modal.value = false
}

</script>

<template>
  <ModalTitleButton title="Edit Variant" v-model="modal" @send="editVariant" width="min-w-full  sm:min-w-[600px] md:min-w-[760px] lg:min-w-[992px] xl:min-w-[1024px]">
    <FormsProductsVariant :options="options" :variant-req="variant" />
  </ModalTitleButton>
</template>
