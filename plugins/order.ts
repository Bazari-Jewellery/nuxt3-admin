import type { Order } from "@medusajs/medusa"
export default defineNuxtPlugin((nuxtApp) => {
  const singleOrder = ref({} as Order)

  return {
    provide: {
      order: {
        singleOrder: computed({
          set: (val) => singleOrder.value = val,
          get: () => singleOrder.value
        }),
        styles: {
          payment_col: {
            paid: {
              color: 'emerald',
            },
            refunded: {
              color: 'amber',
            },
            awaiting: {
              color: 'gray',
            },
            canceled: {
              color: 'red'
            }
          } as any,
          fulfillment_col: {
            shipped: {
              color: 'emerald',
              icon: 'i-carbon-delivery'
            },
            fulfilled: {
              color: 'cyan',
              icon: 'i-ph-package'
            },
            not_fulfilled: {
              color: 'gray',
              icon: ''
            },
            canceled: {
              color: 'red',
              icon: 'i-heroicons-x-mark'
            },
            partially_fulfilled: {
              color: 'orange',
              icon: ''
            },
            partially_shipped: {
              color: 'amber',
              icon: ''
            },
          } as any
        }
      }
    }
  }
})


