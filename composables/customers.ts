import type { AdminGetCustomersParams } from "@medusajs/medusa"
import type { Ref, ComputedRef, WritableComputedRef } from "vue"
import type { AccountRequest, AccountRequestGetParams, AccountRequestPostParams, AccountRequestPatchParams } from "~/types"
/**
 * Get all customers
 * @param payload 
 */
export async function useCustomersList(payload: Ref<AdminGetCustomersParams> | WritableComputedRef<AdminGetCustomersParams> | ComputedRef<AdminGetCustomersParams>) {
  const cybandy = useCybandyClient()
  return await useAsyncData(async () => await cybandy.admin.customers.list(payload.value), { pick: ['customers', 'count', 'offset', 'limit'], watch: [payload] })
}

/**
 * get a single customer
 * @param id 
 */
export async function useCustomerGetSingle(id: string) {
  const cybandy = useCybandyClient()
  return await useAsyncData(id, async () => await cybandy.admin.customers.retrieve(id), { pick: ['customer'], })
}


/**
 * Customers request to create account
 * @param id 
 */
export async function useCustomersAccountRequestGetSingle(id: string) {
  const userToken = useNuxtApp().$currentUser.token
  const config = useRuntimeConfig()
  const { data, error } = await useFetch(`${config.public.medusaBackendUrl}/admin/account_request/retrieve`, {
    query: { id: id },
    headers: {
      Authorization: `Bearer ${userToken.value}`,
      "Content-Type": "application/json",
    },
    method: 'get'
  })
  if (data.value) {
    return data.value as AccountRequest
  }
}


export async function useCustomersAccountRequestList(query: Ref<AccountRequestGetParams> | ComputedRef<AccountRequestGetParams> | WritableComputedRef<AccountRequestGetParams>) {
  const userToken = useNuxtApp().$currentUser.token
  const config = useRuntimeConfig()
  const { data, error } = await useFetch(`${config.public.medusaBackendUrl}/admin/account_request/list`, {
    query: query,
    headers: {
      Authorization: `Bearer ${userToken.value}`,
      "Content-Type": "application/json",
    },
    method: 'get',
    watch: [query]
  })
  if (data.value) {
    return data.value as { account_requests: AccountRequest[], count: number, limit: number, offset: number }
  }
}



export async function useCustomersAccountRequestCreate(payload: AccountRequestPostParams) {
  const userToken = useNuxtApp().$currentUser.token
  const config = useRuntimeConfig()
  const { data, error } = await useFetch(`${config.public.medusaBackendUrl}/admin/account_request/create`, {
    body: payload,
    headers: {
      Authorization: `Bearer ${userToken.value}`,
      "Content-Type": "application/json",
    },
    method: 'post'
  })
  if (data.value) {
    return {
      data: data.value as AccountRequest
    }
  }
}


export async function useCustomersAccountRequestUpdate(payload: AccountRequestPatchParams, id: string) {
  const userToken = useNuxtApp().$currentUser.token
  const config = useRuntimeConfig()
  const { data, error } = await useFetch(`${config.public.medusaBackendUrl}/admin/account_request/update`, {
    body: payload,
    query: {
      id: id
    },
    headers: {
      Authorization: `Bearer ${userToken.value}`,
      "Content-Type": "application/json",
    },
    method: 'patch'
  })
  if (data.value) {
    return {
      data: data.value as AccountRequest
    }
  }
}

export async function useCustomersAccountRequestConfirm(id: string) {
  const config = useRuntimeConfig()
  const userToken = useNuxtApp().$currentUser.token
  const { data } = await useLazyFetch(`${config.public.medusaBackendUrl}/admin/account_request/confirm`, {
    method: 'get',
    query: {
      id: id
    },
    headers: {
      Authorization: `Bearer ${userToken.value}`,
      "Content-Type": "application/json",
    },
  })

  if (data.value) {
    return { data: data.value as AccountRequest }
  }
}


export async function useCustomersAccountRequestDelete(id: string) {
  const config = useRuntimeConfig()
  const userToken = useNuxtApp().$currentUser.token
  const { data } = await useLazyFetch(`${config.public.medusaBackendUrl}/admin/account_request/delete`, {
    method: 'get',
    query: {
      id: id
    },
    headers: {
      Authorization: `Bearer ${userToken.value}`,
      "Content-Type": "application/json",
    },
  })

  if (data.value) {
    return { data: data.value as { deleted: boolean, id: string } }
  }
}


export async function useUsersResendInvite(invite_id: string) {
  const userToken = useNuxtApp().$currentUser.token
  const config = useRuntimeConfig()
  const { data, error } = await useFetch(`${config.public.medusaBackendUrl}/admin/invites/${invite_id}/resend`, {

    headers: {
      Authorization: `Bearer ${userToken.value}`,
      "Content-Type": "application/json",
    },
    method: 'post'
  })
  if (data.value) {
    return {
      data: data.value as AccountRequest
    }
  }
}
