import type {Ref, ComputedRef, WritableComputedRef} from 'vue'
import type {AdminGetProductParams, AdminGetProductCategoriesParams,AdminGetProductTypesParams, AdminGetProductTagsParams, AdminGetCollectionsParams, AdminPostProductsProductReq} from "@medusajs/medusa"

export async function useProductsList(payload:Ref<AdminGetProductParams> = ref({})){
  const cybandy = useCybandyClient()
  return await useAsyncData(async()=> await cybandy.admin.products.list(payload.value), {pick:['products','count'], watch:[payload]})
}

export async function useproductsCategoriesList(
  payload:Ref<AdminGetProductCategoriesParams> = ref({})
){
  const cybandy = useCybandyClient()

  return await useAsyncData(async()=>await cybandy.admin.productCategories.list(payload.value),{pick:['count','limit','offset','product_categories'],watch:[payload]})
}
export async function useproductsTypeList(
  payload:Ref<AdminGetProductTypesParams> = ref({})
){
  const cybandy = useCybandyClient()

  return await useAsyncData(async()=>await cybandy.admin.productTypes.list(payload.value),{pick:['count','limit','offset','product_types'],watch:[payload]})
}

export async function useproductsTagList(
  payload:Ref<AdminGetProductTagsParams> = ref({} as AdminGetProductTagsParams)
){
  const cybandy = useCybandyClient()

  return await useAsyncData(async()=>await cybandy.admin.productTags.list(payload.value),{pick:['count','limit','offset','product_tags'],watch:[payload]})
}
export async function useproductsCollectionList(
  payload:Ref<AdminGetCollectionsParams> = ref({} as AdminGetCollectionsParams)
){
  const cybandy = useCybandyClient()

  return await useAsyncData(async()=>await cybandy.admin.collections.list(payload.value),{pick:['count','limit','offset','collections'],watch:[payload]})
}

export async function useProductUpdate(id:string, payload:AdminPostProductsProductReq){
  return await useAsyncData(async()=> await useCybandyClient().admin.products.update(id, payload), {pick:['product']})
}
