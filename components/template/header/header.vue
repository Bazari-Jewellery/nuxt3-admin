<script setup lang=ts>

//general
// const nuxtApp = useNuxtApp()

//theme
// const sidebarCollapse = nuxtApp.$theme.sidebar.collapse
const menuSlideOver = ref(false)

const q = ref('')
console.log(q.value);

</script>

<template>
  <div class="flex items-center justify-between">
    <UIcon @click="menuSlideOver = true" name="i-heroicons-squares-2x2" class="w-5 h-5 sm:hidden cursor-pointer" />
    <USlideover v-model="menuSlideOver">
      <TemplateSidebar />
    </USlideover>

    <UInput icon="i-heroicons-magnifying-glass" placeholder="search..." v-model="q" />
    <div class="flex items-center gap-5">
      <ClientOnly><UtilitiesDarkMode /></ClientOnly>
      <UIcon name="i-ph-question" class="w-5 h-5" />
      <UIcon name="i-ph-bell" class="w-5 h-5" />
    </div>
  </div> 
</template>
