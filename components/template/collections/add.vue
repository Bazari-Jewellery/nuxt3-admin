<script setup lang=ts>
import type {AdminPostCollectionsReq} from "@medusajs/medusa"

const props = defineProps({
  collectionReq: {
    type: Object as PropType<AdminPostCollectionsReq>,
    required: true
  },
  openModal: Boolean,
  
})
const emits = defineEmits(['update:openModal','update:collectionReq'])
const openModal = computed({
  set: (val) => emits('update:openModal', val),
  get: () => props.openModal
})

const collection =  computed({
  set:(val) => emits('update:collectionReq', val),
  get:()=>props.collectionReq
})

async function addCol(){
  const {collection:_coll} = await useCybandyClient().admin.collections.create(collection.value)

  if(_coll.id){
    // collection.value = _coll
    toastNotification('Collection Added').default_toast()
    openModal.value = false
  }else{
    toastNotification().error()
  }
}

</script>

<template>
  <ModalTitleButton @send="addCol" v-model="openModal" title="Edit Collection" button-confirm-label="Save collection" width="w-full md:min-w-[550px] lg:min-w-[760px]">
    <FormsCollectionAddEdit :collection-req="collection" />
  </ModalTitleButton>
</template>
