import type { IFAQ, IFAQSECTION } from "~/types"



export default defineNuxtPlugin((nuxtApp) => {
  const faqs = ref<IFAQ[]>([])
  const _faq_section = ref<IFAQSECTION[]>([])

  async function getFaqSection() {
    try {
      const { faq_section } = await useCybandyClient().customMethods.faqSection.list()

      _faq_section.value = faq_section

    } catch (error) {

    }
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
