<script setup lang=ts>
import type { AdminPostCollectionsReq } from "@medusajs/medusa"
useHead({
  title: 'Products'
})
definePageMeta({
  scrollToTop: true
})
const view = useNuxtApp().$product.view
const col_key = ref(Date.now())
const newCollection = ref({} as AdminPostCollectionsReq)
const add_new_coll = ref(false)

watch(add_new_coll, () => {
  if (!add_new_coll.value) {
    col_key.value = Date.now()
  }
})


</script>

<template>
  <UCard :ui="{ divide: '', header: { base: 'flex justify-between items-center' } }">
    <template #header>
      <div class="flex items-center gap-5">
        <span @click="() => view = 'product'"
          :class="view == 'product' ? 'text-gray-900 dark:text-white' : 'text-gray-500'"
          class="cursor-pointer text-base sm:text-lg">Products</span>
        <span @click="() => view = 'collection'"
          :class="view == 'collection' ? 'text-gray-900 dark:text-white' : 'text-gray-500'"
          class="cursor-pointer text-base sm:text-lg">Collections</span>
      </div>
      <div>
        <div v-if="view == 'product'" class="flex items-center gap-5">
          <TemplateProductsMenu />
          <UButton size="xs" variant="solid" color="gray" label="New Product" icon="i-ph-plus" />
        </div>
        <div v-if="view == 'collection'" class="flex items-center gap-5">
          <UButton @click="() => add_new_coll = true" size="xs" variant="solid" color="gray" label="New Collection"
            icon="i-ph-plus" />
        </div>
      </div>
    </template>
    <div v-if="view == 'product'">
      <TemplateProducts />

    </div>

    <div v-if="view == 'collection'">
      <TemplateProductsCollections :key="col_key" />
    </div>

    <TemplateCollectionsAdd v-model="add_new_coll" :collection-req="newCollection" />
  </UCard>
</template>
