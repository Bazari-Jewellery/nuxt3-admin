<script setup lang=ts>

useHead({
    title: 'Products'
})
const view = ref('product')
</script>

<template>
  <UCard :ui="{divide:''}">
    <template #header>
      <div class="flex items-center gap-5">
        <span @click="()=>view='product'" :class="view=='product'? 'text-gray-900 dark:text-white': 'text-gray-500'" class="cursor-pointer text-base sm:text-lg">Products</span>
        <span @click="()=>view='collection'" :class="view=='collection'? 'text-gray-900 dark:text-white': 'text-gray-500'" class="cursor-pointer text-base sm:text-lg">Collections</span>
      </div>
    </template>
    <div v-if="view=='product'">
      <TemplateProducts />
      
    </div>

    <div v-if="view=='collection'">
      <TemplateProductsCollections />
    </div>
  </UCard>
</template>
