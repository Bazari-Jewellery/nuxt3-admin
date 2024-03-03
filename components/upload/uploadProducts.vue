<script setup lang=ts>
import type { PropType } from 'vue';

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
  upload: Boolean,
  fileType: {
    type: Array<string>,
    default: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
  },
  uploadedObj: Array<{ url: string, key: string }>
})
const emits = defineEmits(['update:modelValue', 'update:files', 'update:imageUrls', 'update:upload', 'upload', 'update:uploadedObj'])
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
const uploadedObj = computed({
  get: () => props.uploadedObj,
  set: (val) => emits('update:uploadedObj', val)
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
  // console.log(image_obj_files.value);

  try {
    if (isUpload.value) {
      if (image_obj_files.value.length > 0) {
        const { uploads } = await useCybandyClient().admin.uploads.create(image_obj_files.value)
        image_obj_urls.value = uploads?.map((x) => x.url)
        uploadedObj.value = uploads
      } else {

        const _payload = { thumbnail: image_obj_urls.value[0] || null }


        const { data } = await useProductUpdate(id, _payload as any)
        if (data.value?.product) {
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
  <ModalTitleButton @send="uploadFilesFunc" v-model="modal" title="Import Products List"
    width="w-full sm:min-w-[500px] sm:max-w-full lg:min-w-[650px] lg:max-w-[650px]">

    <UtilitiesImageDropZone v-model:files="image_obj_files" v-model:image-urls="image_obj_urls" :file-type="fileType"
      title="Import products list"
      description="Through imports you can add or update products. To update existing products/variants you must set an existing id in the Product/Variant id columns. If the value is unset a new record will be created. You will be asked for confirmation before we import products.">

      <template #uploadZoneText>
        <p>Drop your files here, or <span class="text-primary">click to browse</span></p>
        <p>Only .csv files are supported.</p>
      </template>


      <template #fileDisplay>
        <div class="space-y-5">
          <p>Unsure about how to arrange your list? Download the template below to ensure you follow the correct format.
          </p>

          <div class="flex items-center gap-6 rounded-lg p-6 ring-1 ring-gray-200 dark:ring-gray-700">
            <UIcon name="i-mdi-file-table" class="w-5 h-5" :dynamic="true" />
            <div class="flex-grow flex flex-col">
              <span>
                product-import-template.csv
              </span>
            </div>
            <UButton variant="solid" color="gray"
              to="https://medusa-doc-files.s3.amazonaws.com/product-import-sales-channels.csv"
              icon="i-heroicons-arrow-down-tray" />
          </div>
        </div>
      </template>

    </UtilitiesImageDropZone>

  </ModalTitleButton>
</template>
