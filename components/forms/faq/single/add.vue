<script setup lang="ts">
import type { PropType } from 'vue';


type Ifaq = {
  question: string,
  answer: string,
  id?:string
}
const props = defineProps({
  modelValue: {
    type: Array<Ifaq>,
    required:true
  },
  section_id:{
    type:String
  }
})

const emits = defineEmits(['update:modelValue','update:section_id', 'add_new', 'delete'])




const section_id = computed({
  set:(val)=>emits('update:section_id',val),
  get:()=>props.section_id
})
const sections = useNuxtApp().$settings.faq.section.list

const _state = computed({
  set:(val)=>emits('update:modelValue',val),
  get:()=>props.modelValue
})





</script>

<template>
  <form class="space-y-8">
    <UFormGroup label="Section" hint="Section of the FAQs below">
      <USelect v-model="section_id" :options="sections" option-attribute="name" value-attribute="id" />
    </UFormGroup>

    <div class="space-y-6">
      <div v-for="(faq, ind) of _state" class="spacey-4">
        <UFormGroup label="Question">
          <UInput v-model="faq.question" placeholder="What is your name?" />

          <template #hint>
            <UIcon name="i-heroicons-trash" class="w-4 h-4 cursor-pointer" @click="()=>$emit('delete',ind)"/>
          </template>
        </UFormGroup>

        <UFormGroup label="Answer">
          <UTextarea v-model="faq.answer" placeholder="John Doe"/>
        </UFormGroup>
      </div>
    </div>

    <div class="space-y-4">
      <UButton @click="()=>$emit('add_new')" block>
        New
      </UButton>
      
    </div>
  </form>
</template>

