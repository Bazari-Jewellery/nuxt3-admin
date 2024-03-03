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
  currentImageUrls: {
    type: Array<string>,
    default: []
  },
  upload: Boolean
})
const emits = defineEmits(['update:modelValue', 'update:files', 'update:imageUrls', 'update:upload', 'upload', 'update:currentImageUrls'])
const modal = computed({
  set: (val) => emits('update:modelValue', val),
  get: () => props.modelValue
})

const old_img_urls = computed({
  set: (val) => emits('update:currentImageUrls', val),
  get: () => props.currentImageUrls
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

  try {
    if (isUpload.value) {
      if (image_obj_files.value.length > 0) {
        await useAsyncData(async () => {
          const d = ref<string[]>([])
          const data = await useUploadImage(image_obj_files.value)
          if (data.uploads) {
            // d.value.push(...data.uploads?.map((x) => x.url))
            image_obj_urls.value = data.uploads?.map((x) => x.url)

            // update single product in context
            if (useNuxtApp().$product.product.singleProd.value) {
              const payload = ref({
                images: data.uploads?.map((x => x.url))
              })
              if (old_img_urls.value.length > 0) {
                payload.value.images.push(...old_img_urls.value)
              }
              const { data: __data } = await useProductUpdate(id, payload.value)

              if (__data.value) {
                useNuxtApp().$product.product.singleProd.value.images = __data.value.product.images
              }
            }

            modal.value = false
          }
        })
      } else {
        const { data } = await useProductUpdate(id, { images: old_img_urls.value })
        if (data.value) {
          useNuxtApp().$product.product.singleProd.value.images = data.value.product.images
        }
      }



    } else {
      emits('upload', image_obj_urls.value)
    }
  } catch (error: any) {

  }
}

watch(modal, () => {
  if (modal.value == false) {

    image_obj_files.value = []
    image_obj_urls.value = []
  }
})

const makeThumbnail = async (ind: number) => {
  const img = old_img_urls.value[ind]
  if (img) {
    try {
      await useCybandyClient().admin.products.update(id, {
        thumbnail: img
      })
      useNuxtApp().$product.product.singleProd.value.thumbnail = img
      useToastSuccess('Thumbnail updated')
    } catch (error) {
      useToastFailure()
    }
  }

}
</script>

<template>
  <ModalTitleButton @send="uploadFilesFunc" v-model="modal" title="Upload Media"
    width="w-full sm:min-w-[500px] lg:min-w-[650px]">

    <UtilitiesImageDropZone v-model:files="image_obj_files" v-model:image-urls="image_obj_urls"
      v-model:current-image-urls="old_img_urls" multiple title="Product Images"
      description="All images shown on product page" @make-thumbnail="makeThumbnail" />

  </ModalTitleButton>
</template>
