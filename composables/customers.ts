import type { AdminGetCustomersParams } from "@medusajs/medusa"
import type { Ref, ComputedRef, WritableComputedRef } from "vue"
import type { AccountRequest, AccountRequestGetParams, AccountRequestPostParams, AccountRequestPatchParams } from "~/types"

/**
 * Custom $fetch
 */
export function useCybandyFetch() {
  const userToken = useNuxtApp().$currentUser.token
  const config = useRuntimeConfig()
  const api = $fetch.create({
    baseURL: config.public.medusaBackendUrl,
    onRequest({ request, options, error }) {
      if (userToken.value) {
        const headers = options.headers ||= {}
        if (Array.isArray(headers)) {
          headers.push(['Authorization', `Bearer ${userToken.value}`])
        } else if (headers instanceof Headers) {
          headers.set('Authorization', `Bearer ${userToken.value}`)
        } else {
          headers['Authorization'] = `Bearer ${userToken.value}`
        }
      }
    }
  })

  return { api }
}

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
  const data = await useCybandyFetch().api(`/admin/account_request/retrieve/${id}`, {
    method: 'get'
  })
  if (data) {
    return data as AccountRequest
  }
}


export async function useCustomersAccountRequestList(query: Ref<AccountRequestGetParams> | ComputedRef<AccountRequestGetParams> | WritableComputedRef<AccountRequestGetParams>) {
  const data = await useCybandyFetch().api(`/admin/account_request`, {
    query: query.value,
    method: 'get',
  })
  if (data) {
    return data as { account_requests: AccountRequest[], count: number, limit: number, offset: number }
  }
}



export async function useCustomersAccountRequestCreate(payload: AccountRequestPostParams) {
  const data = await useCybandyFetch().api(`/admin/account_request`, {
    body: payload,
    method: 'post'
  })
  if (data) {
    return {
      data: data as AccountRequest
    }
  }
}


export async function useCustomersAccountRequestUpdate(payload: AccountRequestPatchParams, id: string) {
  const data = await useCybandyFetch().api(`/admin/account_request`, {
    body: payload,
    query: {
      id: id
    },
    method: 'patch'
  })
  if (data) {
    return {
      data: data as AccountRequest
    }
  }
}

export async function useCustomersAccountRequestConfirm(id: string) {
  const data = await useCybandyFetch().api(`/admin/account_request/confirm`, {
    method: 'get',
    query: {
      id: id
    },
  })

  if (data) {
    return { data: data as AccountRequest }
  }
}


export async function useCustomersAccountRequestDelete(id: string) {
  const data = await useCybandyFetch().api(`/admin/account_request`, {
    method: 'delete',
    query: {
      id: id
    },
  })

  if (data) {
    return { data: data as { deleted: boolean, id: string } }
  }
}


export async function useUsersResendInvite(invite_id: string) {
  const data = await useCybandyFetch().api(`/admin/invites/${invite_id}/resend`, {
    method: 'post'
  })
  if (data) {
    return {
      data: data as AccountRequest
    }
  }
}
