<script setup lang="ts">
const config = useRuntimeConfig()
const under_construction = computed(() => config.public.under_construction == "true")
</script>
<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <UtilitiesUnderConstruction v-if="under_construction" />
    <NuxtPage v-else />
    <UNotifications />
  </NuxtLayout>
</template>
