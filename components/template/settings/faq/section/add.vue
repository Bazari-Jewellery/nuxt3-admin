<script setup lang=ts>
import type { IFAQSECTION } from '~/types';

const props = defineProps({
  modelValue:Boolean
})
const emits = defineEmits(['update:modelValue'])
const modal = computed({
  set: (val) => emits('update:modelValue', val),
  get: () => props.modelValue
})
type FaqAddSecParams = Omit<IFAQSECTION,'created_at'| 'updated_at'|'metadata'| 'id'>

const section = ref({} as FaqAddSecParams)


async function createSection () {
  // Do something with data
 
  
  await useLazyFetch('/api/settings/faq/section/faqSectionCreate',{
    method:'post',
    body:{
      name:section.value.name,
      description: section.value.description
    },
    async onResponse({response}){
      if(response.ok){
        modal.value = false
        await useNuxtApp().$settings.faq.section.getFaqSection()
        
        toastNotification('Faq section created').default_toast()
      }else{
        useToastFailure()
      }
    }
  })
  
}

</script>

<template>
  <ModalTitleButton v-model="modal" @send="createSection" title="Add Section" button-confirm-label="Add Section" width="min-w-full sm:min-w-[500px] md:min-w-[650px]">
    <FormsFaqSectionsAdd v-model="section" />
  </ModalTitleButton>
</template>
