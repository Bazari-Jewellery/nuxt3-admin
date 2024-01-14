import type {AdminGetCustomersParams} from "@medusajs/medusa"

export async function useCustomersList(payload:AdminGetCustomersParams){
  const cybandy = useCybandyClient()
  return await useAsyncData('get_customers', async()=>await cybandy.admin.customers.list(payload),{pick:['customers','count', 'offset', 'limit']})
}
