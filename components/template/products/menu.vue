<script setup lang=ts>

const product_other_menu = [
  [
    {
      label: 'Import Products',
      icon: 'i-ph-cloud-arrow-up',
      click: () => {
        isModal.value = true
      }
    },
    {
      label: 'Export Products',
      icon: 'i-heroicons-arrow-up-tray',
      click: () => {

      }
    },
    {
      label: 'Bulk Price Change',
      icon: 'i-ph-money',
      click: () => {

      }
    },
  ]
]
const import_files = ref([] as File[])
const uploadedObj = ref([] as Array<{ url: string, key: string }>)
const isModal = ref(false)

const uploadFileFunction = async () => {
  const { batch_job } = await useCybandyClient().admin.batchJobs.create({
    type: "product-import",
    context: {
      fileKey: uploadedObj.value[0].key
    },
    dry_run: true
  })

}



watch(uploadedObj, async () => {
  if (uploadedObj.value.length) {
    await uploadFileFunction()
  }
})
</script>

<template>
  <div>
    <UDropdown v-bind="$attrs" :items="product_other_menu">
      <UButton color="gray" variant="solid" label="Product Menu" icon="i-heroicons-bars-3-20-solid" />
    </UDropdown>
    <UploadProducts v-model="isModal" :file-type="['.csv']" v-model:uploaded-obj="uploadedObj" />
  </div>
</template>
