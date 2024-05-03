<script setup lang=ts>
import type { PropType } from 'vue';
import type { IFAQSECTION } from '~/types';

const props = defineProps({
  modelValue: Boolean,
  faq: {
    type: Object as PropType<IFAQSECTION>,
    required: true
  }
})
const emits = defineEmits(['update:modelValue', 'update:faq'])
const modal = computed({
  set: (val) => emits('update:modelValue', val),
  get: () => props.modelValue
})
const faq = computed({
  set: (val) => emits('update:faq', val),
  get: () => props.faq
})




type FaqAddSecParams = Omit<IFAQSECTION, 'created_at' | 'updated_at' | 'metadata' | 'id'>

const section = computed({
  set: (val) => emits('update:faq', val),
  get: () => props.faq
})


async function createSection() {
  // Do something with data

  const data_ = await useCybandyClient().customMethods.faqSection.update(props.faq.id, { name: section.value.name, description: section.value.description })

  if (data_) {
    modal.value = false
    await useNuxtApp().$settings.faq.section.getFaqSection()

    toastNotification('Faq section created').default_toast()
  } else {
    useToastFailure()
  }



}
const disable = computed(() => !section.value.description)
</script>

<template>
  <ModalTitleButton v-model="modal" @send="createSection" :disabled="disable" title="Edit Section"
    button-confirm-label="Save and close" width="min-w-full sm:min-w-[500px] md:min-w-[650px]">
    <FormsFaqSectionsAdd v-model="section" />
  </ModalTitleButton>
</template>
