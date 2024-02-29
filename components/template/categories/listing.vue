<script setup lang="ts">
import draggable from 'vuedraggable'
import type { ProductCategory } from "@medusajs/medusa"


const props = defineProps({
  categories: {
    type: Array<ProductCategory>,
    required: true
  }
})

const emits = defineEmits(['update:categories'])

const list_container = ref(null)
const { width, height } = useElementSize(list_container)

const categories = computed({
  set: (val) => emits('update:categories', val),
  get: () => props.categories.map((x) => {
    return {
      ...x,
      show_child: false
    }
  })
})

const items = (category: any) => [
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square',
      click: () => {
        editFunc(category)
      }
    },
    {
      label: 'Delete',
      icon: 'i-heroicons-trash',
      click: async () => {
        await delFunc(category)
      }
    }
  ]
]

// drag & drop for list
const drag = ref(false)

async function changed(data: any) {
  const element = data.moved.element
  await useCybandyClient().admin.productCategories.update(element.id, {
    rank: data.moved.newIndex
  })
  await useNuxtApp().$product.categories.getCategories()
}


// adding category
const current_category = ref({} as ProductCategory)
const open_add_category_modal = ref(false)
function addFunc(data: any) {
  if (data) {
    current_category.value = data
  }
  open_add_category_modal.value = true
}

// edit category
const open_edit_category_modal = ref(false)
function editFunc(data: any) {
  if (data) {
    // console.log(data);
    current_category.value = data
    console.log('current', current_category.value);
    open_edit_category_modal.value = true
  }
}

// delete category
async function delFunc(data: any) {
  const { id, object, deleted } = await useCybandyClient().admin.productCategories.delete(data.id)
  if (deleted) {
    await useNuxtApp().$product.categories.getCategories()
  } else {
    toastNotification().error()
  }
}

// await useNuxtApp().$product.categories.getCategories()

const opened_children = ref([] as string[])

function add_remove_child(id: string) {

  if (opened_children.value.includes(id)) {
    const ind = opened_children.value.findIndex((x) => id)
    opened_children.value.splice(ind, 1)
    return
  }
  opened_children.value.push(id)
}


</script>

<template>
  <div>

    <ClientOnly>
      <!-- <div class="relative"> -->
      <draggable v-model="categories" handle=".handle" @change="(v) => changed(v)" @start="() => drag = true"
        @end="() => drag = false" item-key="rank" class="grid gap-2.5">
        <template #item="{ element }">

          <div :key="Date.now()">
            <div class="group">
              <div class="flex items-center justify-between group-hover:bg-gray-200 group-hover:dark:bg-gray-800">
                <div class="flex items-center gap-7">
                  <UIcon name="i-ph-dots-six-vertical" class="w-5 h-5 cursor-grab handle" />
                  <span class="flex items-center gap-3">
                    <UIcon @click="() => add_remove_child(element.id)" name="i-heroicons-chevron-right-20-solid"
                      :class="opened_children.includes(element.id) && 'rotate-90'"
                      class="w-4 h-4 cursor-pointer hover:text-primary" />
                    <UButton color="gray" variant="ghost" icon="i-heroicons-tag">{{ element.name }} </UButton>
                  </span>

                  <div class="flex gap-5 items-center">
                    <UTooltip v-if="element.is_active == false" text="Not visible to customers">
                      <UIcon name="i-ph-eye-slash" class="w-5 h-5 cursor-pointer text-rose-500 dark:text-rose-400" />
                    </UTooltip>
                    <UTooltip v-if="element.is_internal" text="only visible to admins">
                      <UIcon name="i-ph-user" class="w-5 h-5 cursor-pointer text-amber-500 dark:text-amber-400" />
                    </UTooltip>

                  </div>
                </div>

                <div class="flex items-center gap-5">
                  <UIcon @click="() => addFunc(element)" name="i-heroicons-plus" class="w-5 h-4 cursor-pointer" />
                  <UDropdown :items="items(element)">
                    <UIcon name="i-heroicons-ellipsis-horizontal-20-solid" class="w-4 h-4" />
                  </UDropdown>

                </div>
              </div>
            </div>

            <div v-if="opened_children.includes(element.id) && element.category_children.length" class="pl-5 my-2.5">
              <ClientOnly>
                <TemplateCategoriesListing :categories="element.category_children" />
              </ClientOnly>
            </div>
          </div>

        </template>
      </draggable>
      <!-- </div> -->
    </ClientOnly>


    <TemplateCategoriesAdd v-model="open_add_category_modal" :parent-category="(current_category as any)" />
    <TemplateCategoriesEdit :category="(current_category as any)" v-model="open_edit_category_modal" />
  </div>
</template>
