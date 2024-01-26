import type { IFAQSECTION } from "~/types"

export default defineEventHandler(async (event) => {
  const cookie = getCookie(event,'x-bazari-token')

  // const body = await readBody(event)
  const query = getQuery(event)
  const config = useRuntimeConfig(event)

  
  const d = await $fetch(`${config.medusaBackendUrl}/admin/faq/section/list`,{
    query:query,
    method:'GET',
    headers:{
      authorization: `Bearer ${cookie}`
    }
  })

  return d as {faq:IFAQSECTION[], count:number, limit:number, offset:number}

})
