import type { CountryCode } from "~/types"

export default defineNuxtPlugin( (nuxtApp) => {
  
  const countryCode = ref<CountryCode[]>([])

  const getCountries = async() =>{
    const cc = await $fetch('/api/regions/countryCode')
    if(cc){
      countryCode.value = cc
    }
  }

  nuxtApp.hook("app:beforeMount",()=>{
    useAsyncData('getUtils', async()=>[
      await getCountries()
    ])
  })

  return {
    provide:{
      utilities:{
        countryCode
      }
    }
  }
})
