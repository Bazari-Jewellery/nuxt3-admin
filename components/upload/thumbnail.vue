<script setup lang=ts>
const props = defineProps({
  modelValue: Boolean,
  files: {
    type: Array<File>,
    default: [] as File[]
  },
  imageUrls: {
    type: Array<string>,
    default: []
  },
  upload: Boolean
})
const emits = defineEmits(['update:modelValue', 'update:files', 'update:imageUrls', 'update:upload', 'upload'])
const modal = computed({
  set: (val) => emits('update:modelValue', val),
  get: () => props.modelValue
})

const isUpload = computed({
  set: (val) => emits('update:upload', val),
  get: () => props.upload
})



const image_obj_urls = computed({
  get: () => props.imageUrls,
  set: (val) => emits('update:imageUrls', val)
})

const image_obj_files = computed({
  set: (val) => emits('update:files', val),
  get: () => props.files
})

const id = useNuxtApp().$product.product.singleProd.value.id as string


/**
 * Uploads the files if the prop upload is true otherwise
 * it emits upload event with urls as argument
 */
async function uploadFilesFunc() {
  console.log(image_obj_files.value);

  try {
    if (isUpload.value) {
      if(image_obj_files.value.length > 0){
        await useAsyncData(async () => {
        const d = ref<string[]>([])
        const data = await useUploadImage(image_obj_files.value)
        if (data.uploads) {
          // d.value.push(...data.uploads.map((x) => x.url))
          image_obj_urls.value = data.uploads.map((x) => x.url)


          console.log(data.uploads);
          console.log(image_obj_urls.value);


          // image_obj_urls.value = d.value

          // update single product in context
          if (useNuxtApp().$product.product.singleProd.value) {
            const payload = ref({
              thumbnail: data.uploads.map((x=>x.url))[0]
            })
            const { data: __data } = await useProductUpdate(id, payload.value)

            if (__data.value) {
              useNuxtApp().$product.product.singleProd.value.thumbnail = __data.value.product.thumbnail
            }
          }

          modal.value = false
        }
      })
      }else{

        const _payload = {thumbnail:image_obj_urls.value[0] || null}
        console.log(_payload);
        
        const {data} = await useProductUpdate(id, _payload as any)
        if(data.value?.product){
          useNuxtApp().$product.product.singleProd.value.thumbnail = data.value.product.thumbnail
        }
      }
      modal.value = false
      return
    } else {
      emits('upload', image_obj_urls.value)
    }
  } catch (error: any) {

  }
}

watch(modal, () => {
  if (modal.value == false) {

    image_obj_files.value = []
    // image_obj_urls.value = []
  }
})
</script>

<template>
  <ModalTitleButton @send="uploadFilesFunc" v-model="modal" title="Upload Thumbnail"
    width="w-full sm:min-w-[500px] lg:min-w-[650px]">

    <UtilitiesImageDropZone v-model:files="image_obj_files" v-model:image-urls="image_obj_urls" />

  </ModalTitleButton>
</template>
