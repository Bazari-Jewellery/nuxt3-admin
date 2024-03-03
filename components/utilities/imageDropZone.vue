<script setup lang=ts>
const props = defineProps({
  title: {
    type: String,
    default: 'Thumbnail'
  },
  description: {
    type: String,
    default: 'Used to represent your product during checkout, social sharing and more.'
  },
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
  multiple: Boolean,
  fileType: {
    type: Array<string>,
    default: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
  }

})
const emits = defineEmits(['update:files', 'update:imageUrls', 'update:currentImageUrls', 'makeThumbnail'])

const old_img_urls = computed({
  set: (val) => emits('update:currentImageUrls', val),
  get: () => props.currentImageUrls
})


const image_obj_urls = computed({
  get: () => props.imageUrls,
  set: (val) => emits('update:imageUrls', val)
})

const image_obj_files = computed({
  set: (val) => emits('update:files', val),
  get: () => props.files
})

const alertMsg = ref('')
const showAlert = ref(false)

//dropzone
const dropZoneRef = ref<HTMLDivElement>()

function onDrop(files: File[] | null) {
  // console.log(files);
  showAlert.value = false

  if (!files) return

  if (!props.multiple) {
    if (files.length > 1) {
      alertMsg.value = 'Multiple images not allowed'
      showAlert.value = true
      return
    } else {
      files = [files[0]]
    }
  }

  if (props.multiple) {
    files.forEach((_file) => {
      const _url = useObjectUrl(_file)
      if (_url.value) {
        image_obj_urls.value.push(_url.value)
      }
      image_obj_files.value.push(_file)
    })
  } else {
    image_obj_files.value = files
    image_obj_urls.value = files.map((x) => useObjectUrl(x).value as string)
  }
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,

  // specify the types of data to be received
  dataTypes: props.fileType
})

// clickzone
const { files: _files, open, reset, onChange } = useFileDialog({
  // accept: 'image/*',
  accept: props.fileType.join(', '),
  directory: false,
  multiple: props.multiple
})

onChange((files = _files.value) => {
  if (files) {
    onDrop(Array.from(files))

  }
})

function del(ind: number) {
  if (image_obj_files.value.length >= 1) {
    image_obj_files.value.splice(ind, 1)
  }
  if (image_obj_urls.value.length > 0) {
    image_obj_urls.value.splice(ind, 1)
  }
}
function OldDel(ind: number) {

  if (old_img_urls.value.length > 0) {
    old_img_urls.value.splice(ind, 1)
  }
}


const items = (ind: number) => [
  [
    {
      label: 'Delete',
      icon: 'i-heroicons-trash',
      click: () => {
        del(ind)
      }
    }
  ]
]


const old_items = (ind: number) => [
  [
    {
      label: 'Make thumbnail',
      icon: 'i-heroicons-check',
      click: () => {
        emits('makeThumbnail', ind)
      }
    },
    {
      label: 'Delete',
      icon: 'i-heroicons-trash',
      click: () => {
        OldDel(ind)
      }
    },
  ]
]

</script>

<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <h4 class="highlight text-base lg:text-lg">{{ title }}</h4>
      <p class="text-gray-400 dark:text-gray-500">{{ description }}</p>
    </div>

    <div @click="() => open()" ref="dropZoneRef"
      :class="[isOverDropZone ? 'border-primary' : 'border-gray-200 dark:border-gray-700']"
      class="w-full cursor-pointer flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-6">
      <slot name="uploadZoneText">
        <p>Drop your images here, or <span class="text-primary">click to browse</span></p>
        <p>1200 x 1600 (3:4) recommended, up to 10MB each</p>
      </slot>
      <p v-if="alertMsg && showAlert" class="my-5 text-rose-500 dark:text-rose-400">{{ alertMsg }}</p>
    </div>

    <div class="space-y-2">
      <h5 class="highlight text-base lg:text-lg">Upload</h5>
      <slot name="fileDisplay">
        <div class="space-y-5">
          <div v-if="image_obj_urls" v-for="(src, ind) of image_obj_urls" class="flex items-center justify-between">
            <NuxtImg v-if="src" :src="src" format="webp" width="64" height="64" provider="weserv" />
            <UDropdown v-if="src" :items="items(ind)">
              <UButton variant="solid" color="gray" icon="i-heroicons-ellipsis-horizontal-20-solid" />
            </UDropdown>
          </div>
          <div v-if="old_img_urls && multiple || !multiple && old_img_urls" v-for="(src, ind) of old_img_urls"
            class="flex items-center justify-between">
            <NuxtImg v-if="src" :src="src" format="webp" width="64" height="64" provider="weserv" />
            <UDropdown v-if="src" :items="old_items(ind)">
              <UButton variant="solid" color="gray" icon="i-heroicons-ellipsis-horizontal-20-solid" />
            </UDropdown>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

