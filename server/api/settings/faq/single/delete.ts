import { IFAQ } from "~/types"

export default defineEventHandler(async (event) => {
  const cookie = getCookie(event,'x-bazari-token')

  const query = getQuery(event)
  const config = useRuntimeConfig(event)

  
  const d = await $fetch(`${config.medusaBackendUrl}/admin/faq/single/delete`,{
    query:{
      id: query.id as string
    },
    method:'GET',
    headers:{
      authorization: `Bearer ${cookie}`
    }
  })

  return d as {faq:IFAQ}
})
