import type {Order} from "@medusajs/medusa"
export default defineNuxtPlugin( (nuxtApp) => {
    const singleOrder = ref({} as Order)

    return {
      provide:{
        order:{
          singleOrder: computed({
            set: (val) => singleOrder.value = val,
            get: ()=> singleOrder.value
          })
        }
      }
    }
})
