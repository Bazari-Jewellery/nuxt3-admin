<script setup lang='ts'>
import type { ProductCategory } from "@medusajs/medusa"
// const generalStore = useGeneralStore()
// const { categories } = storeToRefs(generalStore)

const props = defineProps({
  categories: {
    type: Array<ProductCategory>,
    required: true
  },
  selectedCategories: {
    type: Array<string>,
    default: []
  }
})

const emits = defineEmits(['update:categories', 'update:selectedCategories'])

const categories = computed({
  set: (val) => emits('update:categories', val),
  get: () => props.categories
})
const selected_categories = computed({
  set: (val) => emits('update:selectedCategories', val),
  get: () => props.selectedCategories
})

const opened_children = ref([] as string[])

/**
 * Tracking selected ids
 * @param id 
 */
function add_remove_child(id: string) {

  if (opened_children.value.includes(id)) {
    const ind = opened_children.value.findIndex((x) => x == id)
    opened_children.value.splice(ind, 1)
    return
  }
  opened_children.value.push(id)
}

function add_remove_selected(id: string) {
  if (selected_categories.value.includes(id)) {
    const ind = selected_categories.value.findIndex((x) => x == id)
    selected_categories.value.splice(ind, 1)
    return
  }
  selected_categories.value.push(id)
}
</script>

<template>
  <div>
    <div v-for="element of categories" :key="element.id">
      <div class="group">
        <div class="flex items-center justify-between group-hover:bg-gray-200 group-hover:dark:bg-gray-800">
          <div class="flex items-center gap-7">
            <UCheckbox :model-value="selected_categories.includes(element.id)"
              @change="() => add_remove_selected(element.id)" />
            <span class="flex items-center gap-3">
              <UIcon @click="() => add_remove_child(element.id)" name="i-heroicons-chevron-right-20-solid"
                :class="opened_children.includes(element.id) && 'rotate-90'"
                class="w-4 h-4 cursor-pointer hover:text-primary" />
              <UButton color="gray" variant="ghost">{{ element.name }} </UButton>
            </span>


          </div>


        </div>
      </div>

      <div v-if="opened_children.includes(element.id) && element.category_children.length" class="pl-5 my-2.5">
        <ClientOnly>
          <CategoriesSelect :categories="element.category_children" v-model:selected-categories="selected_categories" />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
