import type {AdminPostOrdersOrderReq, AdminGetOrdersParams,} from "@medusajs/medusa"
import type { Ref, ComputedRef, WritableComputedRef } from "vue"


/**
 * 
 * @param id 
 * @param payload 
 */
export async function useOrderUpdate(id:string, payload:AdminPostOrdersOrderReq){

  const cybandy = useCybandyClient()
  return await useAsyncData(id,async()=>{
    return await cybandy.admin.orders.update(id, {
      ...payload
    })
  }, {pick:['order']})
}

/**
 * 
 * @param payload 
 */
export async function useOrderList(payload:Ref<AdminGetOrdersParams>|WritableComputedRef<AdminGetOrdersParams>|ComputedRef<AdminGetOrdersParams>){
  const cybandy = useCybandyClient()
  return await useAsyncData( async()=>await cybandy.admin.orders.list(payload.value),{pick:['orders','count', 'offset', 'limit'], watch:[payload]})
}
