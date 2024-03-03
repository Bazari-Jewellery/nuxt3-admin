<script setup lang="ts">
import VueEasyLightbox from "vue-easy-lightbox"

const props = defineProps({
  show: Boolean,
  images: {
    type: Array<string>,
    required: true
  },
  imageIndex: Number,
  optimize: Boolean,
  provider: {
    type: String,
    default: 'weserv'
  },
  format: {
    type: String,
    default: 'webp'
  }
})

const emits = defineEmits(['update:show', 'update:imageIndex', 'update:images', 'hideBox'])

const images = computed({
  set: (val) => emits('update:images', val),
  get: () => props.images
})
const show = computed({
  set: (val) => emits("update:show", val),
  get: () => props.show
})
const imageIndex = computed({
  set: (val) => emits("update:imageIndex", val),
  get: () => props.imageIndex
})
onMounted(() => {
  if (props.optimize) {
    const img_optimizer = useImage()
    images.value?.map((x) => img_optimizer(x, { fit: 'fill', format: props.format, provider: props.provider }))
  }
})
</script>

<template>
  <ClientOnly>
    <vue-easy-lightbox :visible="show" :imgs="images" :index="imageIndex" @hide="() => $emit('hideBox')" />
  </ClientOnly>
</template>
