export default defineEventHandler(async (event) => {
    const cookie = getCookie(event,'x-bazari-token')

    const body = await readBody(event)
    const config = useRuntimeConfig(event)

    
    const d = await $fetch(`${config.medusaBackendUrl}/admin/faq/section/create`,{
      body:body,
      method:'POST',
      headers:{
        authorization: `Bearer ${cookie}`
      }
    })

    return d
})
