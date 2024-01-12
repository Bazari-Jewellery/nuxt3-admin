<script setup lang=ts>
// composables from @vueuse
const nuxtApp = useNuxtApp()
const toggleDark = nuxtApp.$theme.toggleDark
const isDark = nuxtApp.$theme.isDark
</script>

<template>
  <!-- toggle from nuxt ui -->
  <ClientOnly>
    <UToggle aria-label="toggle between light and darkmode" v-model="isDark" @click="toggleDark" on-icon="i-ph-moon"
    off-icon="i-ph-sun" :ui="{
      inactive: 'bg-gray-200',
    }" />
  </ClientOnly>
</template>

<style scoped>
</style>
