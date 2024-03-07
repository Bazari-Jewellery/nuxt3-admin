import type { AdminPostStoreReq } from "@medusajs/medusa"
import type { IStore as Store } from "~/types"
export default defineNuxtPlugin((nuxtApp) => {
  const store = ref<Store>()
  async function getStoreDetails() {
    const { store: _store } = await useCybandyClient().admin.store.retrieve()
    if (_store) {
      store.value = _store as any

    }
  }

  async function updateStoreDetails(payload: AdminPostStoreReq) {
    const { store: _store } = await useCybandyClient().admin.store.update(payload)
    if (_store) {
      store.value = _store as any
    }
  }

  async function addCurrencyCode(code: string) {
    const { store: _store } = await useCybandyClient().admin.store.addCurrency(code)
    if (_store) {
      store.value = _store as any
    }
  }
  async function removeCurrencyCode(code: string) {
    const { store: _store } = await useCybandyClient().admin.store.deleteCurrency(code)
    if (_store) {
      store.value = _store as any
    }
  }

  async function listPaymentProviders() {
    const { payment_providers } = await useCybandyClient().admin.store.listPaymentProviders()
    return payment_providers
  }
  async function listTaxProviders() {
    const { tax_providers } = await useCybandyClient().admin.store.listTaxProviders()
    return tax_providers
  }

  nuxtApp.hook("app:beforeMount", () => {
    useAsyncData(async () => {
      await getStoreDetails()
    })
  })

  return {
    provide: {
      store: {
        store,
        getStoreDetails,
        updateStoreDetails,
        addCurrencyCode,
        removeCurrencyCode,
        listPaymentProviders,
        listTaxProviders
      }
    }
  }
})
