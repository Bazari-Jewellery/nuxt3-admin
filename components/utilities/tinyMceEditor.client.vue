<script setup>
import { defaultWindow } from "@vueuse/core"
const props = defineProps({
  modelValue: String
})

const emits = defineEmits(['update:modelValue'])
const model = computed({
  set: (val) => emits('update:modelValue', val),
  get: () => props.modelValue
})

onMounted(() => {
  defaultWindow.tinymce.init({
    selector: '#tinymce',
    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
  })
})
</script>

<template>
  <main id="sample">
    <UTextarea id="tinymce" v-model="model">

    </UTextarea>
  </main>
</template>

<style scoped>
@media (min-width: 1024px) {
  #sample {
    display: flex;
    flex-direction: column;
    place-items: center;
    width: 100%;
  }
}
</style>
