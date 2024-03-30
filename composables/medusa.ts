import Medusa from "@medusajs/medusa-js"
import type { Config } from "@medusajs/medusa-js"
import type { Address } from "@medusajs/medusa/dist/models/address"
import type { IFAQ, IFAQSECTION, SocialMedia, deletedData, faqSectionPostParams, listWithCount } from "~/types"
class cybandyCustom extends Medusa {
  config: Config
  constructor(conf: Config) {
    super(conf)
    this.config = conf
  }

  async cybandyFetch(
    path: string,
    method: any,
    body: any = null,
    query: any = null,
  ) {
    return await $fetch(`${this.config.baseUrl}${path}`, {
      headers: this.config.customHeaders,
      method: method,
      body,
      query,
    });
  }


  customMethods = {
    updateStoreSocialMedia: async (data: any, id: string) => {


      const res = await $fetch(`${this.config.baseUrl}/cybandy/admin/social-media`, {
        headers: { ...this.config.customHeaders },
        method: 'PATCH',
        query: { id },
        body: data
      })
      return res as SocialMedia
    },
    updateStoreAddress: async (data: any) => {
      const _config = useRuntimeConfig()
      const res = await $fetch(`${_config.public.medusaBackendUrl}/cybandy/admin/shop`, {
        method: 'POST',
        headers: this.config.customHeaders,
        body: data
      })
      return res as Address
    },
    faqSection: {
      list: async (id = "") => {
        return await this.cybandyFetch('/admin/faq_section', 'get', null, { id }) as listWithCount & { faq_section: IFAQSECTION[] }
      },
      update: async (id: string, payload: faqSectionPostParams) => {
        return await this.cybandyFetch('/admin/faq_section', 'patch', payload, { id }) as IFAQSECTION
      },
      delete: async (id: string, payload: faqSectionPostParams) => {
        return await this.cybandyFetch('/admin/faq_section', 'delete', null, { id }) as deletedData
      },
      create: async (payload: faqSectionPostParams) => {
        return await this.cybandyFetch('/admin/faq_section', 'post', payload) as IFAQSECTION
      },
      retrieve: async (id: string) => {
        return await this.cybandyFetch(`/admin/faq_section/${id}`, 'get') as IFAQSECTION
      },

    },
    faq: {
      list: async (id = "", section_id = '') => {
        return await this.cybandyFetch('/admin/faq', 'get', null, { id, section_id }) as listWithCount & { faq: IFAQ[] }
      },
      update: async (id: string, payload: faqSectionPostParams) => {
        return await this.cybandyFetch('/admin/faq', 'patch', payload, { id }) as IFAQ
      },
      delete: async (id: string, payload: faqSectionPostParams) => {
        return await this.cybandyFetch('/admin/faq', 'delete', null, { id }) as deletedData
      },
      create: async (payload: faqSectionPostParams) => {
        return await this.cybandyFetch('/admin/faq', 'post', payload) as IFAQ
      },
      retrieve: async (id: string) => {
        return await this.cybandyFetch(`/admin/faq/${id}`, 'get') as IFAQ
      },

    },
  }

}


export function useCybandyClient(token = '') {
  const payload = {} as Config
  const bazariToken = computed(() => token ? token : useNuxtApp().$currentUser.token.value)

  // // console.log('useCybandyClient: token', bazariToken.value);


  payload.baseUrl = useRuntimeConfig().public.medusaBackendUrl
  payload.maxRetries = 3

  // if(token.value){
  payload.customHeaders = {
    Authorization: `Bearer ${bazariToken.value}`
  }
  // }

  const cybandy = new cybandyCustom(payload)

  return cybandy
}
