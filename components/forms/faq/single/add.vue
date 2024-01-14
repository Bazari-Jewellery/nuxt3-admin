<script setup lang="ts">

const props = defineProps({
  toggleModal: Boolean,
  modelValue: Boolean
})

const emits = defineEmits(['update:modelValue', 'update:toggleModal'])


type Ifaq = {
  question: string,
  answer: string
}
const section_id = ref('')
const sections = useNuxtApp().$settings.faq.section.list

const _state = ref([
  { question: '', answer: '' }
] as Ifaq[])

async function onSubmit() {
  // Do something with data
  // console.log(event.data);

  await useLazyFetch('/api/settings/faq/single/create', {
    method: 'post',
    body: {
      faq: _state.value,
      section_id: section_id.value
    },
    watch:false,
    async onResponse({ response }) {
      if (response.ok) {
        // console.log(response._data);
        
        emits('update:modelValue', true)
        emits('update:toggleModal', true)
        useToastSuccess()

      }else{
        // console.log(response);
        useToastFailure()
      }
    }
  })

}

function newFaq(){
  _state.value.push({ question: '', answer: '' })
}

function delFaq(ind:number){
  _state.value.splice(ind,1)
}

const disable_send = computed(()=>{
  const _filter = _state.value.filter((x)=> !x.answer || !x.question)
  return _filter.length > 0
})

watchEffect(()=>{
  console.log(section_id.value);
  
})
</script>

<template>
  <form class="space-y-8" @submit="onSubmit">
    <UFormGroup label="Section" hint="Section of the FAQs below">
      <USelect v-model="section_id" :options="sections" option-attribute="name" value-attribute="id" />
    </UFormGroup>

    <div class="space-y-6">
      <div v-for="(faq, ind) of _state" class="spacey-4">
        <UFormGroup label="Question">
          <UInput v-model="faq.question" placeholder="What is your name?" />

          <template #hint>
            <UIcon name="i-heroicons-trash" class="w-4 h-4 cursor-pointer" @click="()=>delFaq(ind)"/>
          </template>
        </UFormGroup>

        <UFormGroup label="Answer">
          <UTextarea v-model="faq.answer" placeholder="John Doe"/>
        </UFormGroup>
      </div>
    </div>

    <div class="space-y-4">
      <UButton @click="newFaq" block>
        New
      </UButton>
      <UButton type="submit" block :disabled="disable_send">
        Send
      </UButton>
    </div>
  </form>
</template>

