import type {Ref, ComputedRef, WritableComputedRef} from 'vue'
import type {AdminGetProductParams} from "@medusajs/medusa"

export async function useProductsList(payload:Ref<AdminGetProductParams> = ref({})){
  const cybandy = useCybandyClient()
  return await useAsyncData(async()=> await cybandy.admin.products.list(payload.value), {pick:['products','count'], watch:[payload]})
}


