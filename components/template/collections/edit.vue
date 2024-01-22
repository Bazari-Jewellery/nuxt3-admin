<script setup lang=ts>
import type {AdminPostCollectionsCollectionReq} from "@medusajs/medusa"

const props = defineProps({
  collectionReq: {
    type: Object as PropType<AdminPostCollectionsCollectionReq>,
    required: true
  },
  openModal: Boolean,
  id:{
    type:String,
    required:true
  }
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

async function editCol(){
  const {collection:_coll} = await useCybandyClient().admin.collections.update(props.id, collection.value)

  if(_coll.id){
    // collection.value = _coll
    toastNotification('Collection edited').default_toast()
    openModal.value = false
  }else{
    toastNotification().error()
  }
}

</script>

<template>
  <ModalTitleButton @send="editCol" v-model="openModal" title="Edit Collection" button-confirm-label="Save collection" width="w-full md:min-w-[550px] lg:min-w-[760px]">
    <FormsCollectionAddEdit :id="id" :collection-req="collection" />
  </ModalTitleButton>
</template>
