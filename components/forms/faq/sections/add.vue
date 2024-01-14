<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const props = defineProps({
  toggleModal:Boolean,
  modelValue:Boolean
})

const emits = defineEmits(['update:modelValue', 'update:toggleModal'])

const state = reactive({
  name: undefined,
  description: ''
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Required' })
  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data);
  
  await useLazyFetch('/api/settings/faq/section/faqSectionCreate',{
    method:'post',
    body:{
      name:state.name,
      description: state.description
    },
    async onResponse({response}){
      if(response.ok){
        emits('update:modelValue', true)
        emits('update:toggleModal', true)
        await useNuxtApp().$settings.faq.section.getFaqSection()
        useToastSuccess()
      }else{
        useToastFailure()
      }
    }
  })
  
}
</script>

<template>
  <UForm :validate="validate" :state="state" class="space-y-6" @submit="onSubmit">
    <UFormGroup label="Name" name="name" description="Example: Billing, Account">
      <UInput v-model="state.name" />
    </UFormGroup>

    <UFormGroup label="Description" name="description">
      <UTextarea v-model="state.description" />
    </UFormGroup>

    <UButton type="submit" block>
      Create Section
    </UButton>
  </UForm>
</template>

