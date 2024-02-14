<script setup>
import draggable from 'vuedraggable'
useHead({
  title: 'Categories'
})
const list_container = ref(null)
const { width, height } = useElementSize(list_container)

const categories = useNuxtApp().$product.categories.all
const open_add_category_modal = ref(false)
const current_category = {}
function addFunc(data = null) {
  if (data) {
    current_category.value = data
  }
  open_add_category_modal.value = true
}

// delete category
async function delFunc(data) {
  const { id, object, deleted } = await useCybandyClient().admin.productCategories.delete(data.id)
  if (deleted) {
    await useNuxtApp().$product.categories.getCategories()
  } else {
    toastNotification().error()
  }
}

await useNuxtApp().$product.categories.getCategories()
</script>

<template>
  <div>
    <UCard>
      <template #header>
        <div class="flex justify-between">
          <div class="space-y-1">
            <h1 class="text-lg lg:text-xl highlight">Product Categories</h1>
            <p class="text-gray-500 dark:text-gray-400">Helps you keep your products organized</p>
          </div>
          <div>
            <UButton @click="addFunc" color="gray" variant="solid" label="Add category" size="xs" />
          </div>
        </div>
      </template>


      <ClientOnly>
        <TemplateCategoriesListing v-if="categories" v-model:categories="categories" />
      </ClientOnly>

    </UCard>
    <TemplateCategoriesAdd v-model="open_add_category_modal" :parent-category="current_category" />
    <!-- <TemplateCategoriesEdit :category="current_category" v-model="open_edit_category_modal" /> -->
  </div>
</template>
