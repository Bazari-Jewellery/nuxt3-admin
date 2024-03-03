<script setup lang=ts>
import type { IFAQ } from '~/types';
type Ifaq = {
  question: string,
  answer: string,
  id?: string
}
const props = defineProps({
  modelValue: Boolean,
  section_id: {
    type: String,

  },
  faqs: {
    type: Array<Ifaq>,
    required: true
  }
})
const emits = defineEmits(['update:modelValue', 'update:section_id', 'update:faqs'])
const modal = computed({
  set: (val) => emits('update:modelValue', val),
  get: () => props.modelValue
})

const section_id = computed({
  set: (val) => emits('update:section_id', val),
  get: () => props.section_id
})


const _state = computed({
  set: (val) => emits('update:faqs', val),
  get: () => props.faqs
})

const deleted_faqs = ref([] as Ifaq[])

async function updateFaq() {
  // Do something with data
  // console.log(event.data);

  const medusa_backend = useRuntimeConfig().public.medusaBackendUrl
  const bazariToken = useNuxtApp().$currentUser.token.value


  if (deleted_faqs.value.length > 0) {
    const del_ids = deleted_faqs.value?.map((x) => x.id).join(',')
    await useLazyFetch('/api/settings/faq/single/delete', {
      query: {
        id: del_ids
      }
    })
  }

  await useLazyFetch(`${medusa_backend}/admin/faq/section/update`, {
    headers: {
      Authorization: `Bearer ${bazariToken}`
    },
    method: 'post',
    body: {
      faq: _state.value,
      section_id: section_id.value
    },
    watch: false,
    async onResponse({ response }) {
      if (response.ok) {
        // console.log(response._data);
        modal.value = false
        toastNotification('FAQs added').default_toast()

      } else {
        // console.log(response);
        useToastFailure()
      }
    }
  })

}

watch(modal, () => {
  if (modal.value == false) {
    section_id.value = ''
    _state.value = []
  }
})

const disable_send = computed(() => {
  const _filter = _state.value.filter((x) => !x.answer || !x.question)
  return _filter.length > 0 || _state.value.length == 0
})

function newFaq() {
  _state.value.push({ question: '', answer: '' })
}

function delFaq(ind: number) {
  deleted_faqs.value.push(_state.value[ind])
  _state.value.splice(ind, 1)
}
</script>

<template>
  <ModalTitleButton v-model="modal" @send="updateFaq" :disabled="disable_send" title="Add FAQs"
    button-confirm-label="Save & Close" width="min-w-full sm:min-w-[500px] md:min-w-[650px]">
    <FormsFaqSingleAdd @add_new="newFaq" @delete="(val) => delFaq(val)" v-model="_state" v-model:section_id="section_id" />
  </ModalTitleButton>
</template>
