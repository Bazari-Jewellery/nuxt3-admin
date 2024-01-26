<script setup lang="ts">
definePageMeta({
  layout:'canvas'
})
const props = defineProps({
  error: Object
})
const route = useRouter()
const handleError = () => clearError({ redirect: '/' })
const goBack = async() => {
  await clearError()
  route.back()
}
useHead({
  title: 'Oops!!!'
})
</script>

<template>
  <div>
    <!-- <NuxtLayout name="canvas"> -->
    <div class="flex flex-col items-center justify-center h-screen w-screen gap-2">
      <h2 class="h2 font-bold">Oops!!!</h2>
    <p class="text-lg font-semibold">Something unexpected ocurred</p>
    <span class="text-lg font-semibold">{{ error?.statusCode }}</span>
    <div class="flex items-center gap-5 py-5">
      <UButton @click="goBack" label="Go back" icon="i-heroicons-arrow-left" variant="outline"  size="sm"/>
      <UButton @click="handleError" size="sm"> Go to Homepage</UButton>
    </div>
    </div>
    <!-- </NuxtLayout> -->
  </div>
</template>
