<script setup lang=ts>

const props = defineProps({
  modelValue:Boolean,
})
const emits = defineEmits(['update:modelValue'])
const modal = computed({
  set: (val) => emits('update:modelValue', val),
  get: () => props.modelValue
})

const section_id = ref('')

type Ifaq = {
  question: string,
  answer: string
}

const _state = ref([] as Ifaq[])

async function createFaq() {
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
        modal.value = false
        toastNotification('FAQs added').default_toast()

      }else{
        // console.log(response);
        useToastFailure()
      }
    }
  })

}

watch(modal,()=>{
  if(modal.value == false){
    section_id.value = ''
    _state.value = []
  }
})

const disable_send = computed(()=>{
  const _filter = _state.value.filter((x)=> !x.answer || !x.question)
  return _filter.length > 0 || _state.value.length == 0
})
</script>

<template>
  <ModalTitleButton v-model="modal" @send="createFaq" :disabled="disable_send" title="Add FAQs" button-confirm-label="Save & Close" width="min-w-full sm:min-w-[500px] md:min-w-[650px]">
    <FormsFaqSingleAdd v-model="_state" v-model:section_id="section_id"/>
  </ModalTitleButton>
</template>
