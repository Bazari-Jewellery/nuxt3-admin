import type {AdminGetCustomersParams} from "@medusajs/medusa"
import type { Ref, ComputedRef, WritableComputedRef } from "vue"
/**
 * Get all customers
 * @param payload 
 */
export async function useCustomersList(payload:Ref<AdminGetCustomersParams>|WritableComputedRef<AdminGetCustomersParams>|ComputedRef<AdminGetCustomersParams>){
  const cybandy = useCybandyClient()
  return await useAsyncData( async()=>await cybandy.admin.customers.list(payload.value),{pick:['customers','count', 'offset', 'limit'], watch:[payload]})
}

/**
 * get a single customer
 * @param id 
 */
export async function useCustomerGetSingle(id:string){
  const cybandy = useCybandyClient()
  return await useAsyncData(id, async()=>await cybandy.admin.customers.retrieve(id),{pick:['customer'], })
}
