import type { IFAQ, IFAQSECTION } from "~/types"



export default defineNuxtPlugin((nuxtApp) => {
  const faqs = ref<IFAQ[]>([])
  const _faq_section = ref<IFAQSECTION[]>([])

  async function getFaqSection() {
    try {
      const data = await $fetch('/api/settings/faq/section/faqSectionList', {
        key: 'faq_sections',
        method: 'get',
        onResponse({ response }) {
          if (response.ok) {
            // // console.log(response._data);

            // _faq_section.value = response._data.faq
          }
        }
      })
      _faq_section.value = data.faq
    } catch (error) {

    }
    // const {data, error, status, pending} = await useFetch('/api/settings/faq/section/faqSectionList', {
    //   key: 'faq_sections',
    //   method: 'get',
    //   onResponse({ response }) {
    //     if (response.ok) {
    //       // // console.log(response._data);

    //       // _faq_section.value = response._data.faq
    //     }
    //   }
    // })
    // if(!pending.value && !error.value && data.value){
    //   _faq_section.value = data.value.faq

    // }
  }
  return {
    provide: {
      settings: {
        faq: {
          section: {
            list: computed({
              set: (val) => _faq_section.value = val,
              get: () => _faq_section.value
            }),
            getFaqSection
          }
        }
      }
    }
  }
})
