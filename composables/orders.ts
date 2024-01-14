import type {AdminPostOrdersOrderReq, AdminGetOrdersParams} from "@medusajs/medusa"

export async function useOrderUpdate(id:string, payload:AdminPostOrdersOrderReq){

  const cybandy = useCybandyClient()
  return await useAsyncData(id,async()=>{
    return await cybandy.admin.orders.update(id, {
      ...payload
    })
  }, {pick:['order']})
}

export async function useOrderList(payload:AdminGetOrdersParams){
  const cybandy = useCybandyClient()
  return await useAsyncData('list_orders', async()=>await cybandy.admin.orders.list(payload),{pick:['orders','count', 'offset', 'limit']})
}
