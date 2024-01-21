import type {AdminGetRegionsParams} from "@medusajs/medusa"

export async function useRegionsList(payload:AdminGetRegionsParams|undefined={limit:1000}){
  return await useAsyncData('region_list', async()=>await useCybandyClient().admin.regions.list(payload),{pick:['regions','limit','count','offset']})
}
