import type {Customer} from "@medusajs/medusa/dist"

export default defineNuxtPlugin((nuxtApp)=>{
  const allCustomers = ref<Array<Customer>>()
  const singleCustomers = ref({} as Customer)

  return {
    provide: {
      customer:{
        all: computed({
          set: (val) => allCustomers.value = val,
          get: ()=>allCustomers.value
        }),
        single: computed({
          set: (val) => singleCustomers.value = val,
          get: () => singleCustomers.value
        })
      }
    }
  }
})
