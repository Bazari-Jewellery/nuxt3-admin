<script setup>
import draggable from 'vuedraggable'
useHead({
  title: 'Categories'
})
const list_container = ref(null)
const { width, height } = useElementSize(list_container)

const categories = useNuxtApp().$product.categories.all

const items = (category) => [
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
      click: () => {

      }
    }
  ]
]

// drag & drop for list
const drag = ref(false)

async function changed(data){
  const element = data.moved.element
  await useCybandyClient().admin.productCategories.update(element.id,{
    rank:data.moved.newIndex
  })
  await useNuxtApp().$product.categories.getCategories()
}


// adding category
const current_category = ref({})
const open_add_category_modal = ref(false)
function addFunc(data){
  if(data){
    current_category.value = data
  }
  open_add_category_modal.value = true
}

// edit category
const open_edit_category_modal = ref(false)
function editFunc(data){
  if(data){
    // console.log(data);
    current_category.value = data
    open_edit_category_modal.value = true
  }
}

await useNuxtApp().$product.categories.getCategories()
</script>

<template>
  <div>
    <UCard>
      <template #header>
        <div class="flex justify-between">
          <div>
            <h1 class="text-lg lg:text-xl">Product Categories</h1>
            <p class="text-gray-500 dark:text-gray-400">Helps you keep your products organized</p>
          </div>
          <div>
            <UButton @click="addFunc" color="gray" variant="solid" label="Add category" size="xs" />
          </div>
        </div>
      </template>


      <ClientOnly>
        <!-- <div class="relative"> -->
          <draggable v-model="categories" @change="(v)=>changed(v)" @start="()=>drag = true" @end="()=>drag = false" item-key="rank" class="grid gap-5">
            <template #item="{ element }">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-7">
                  <UIcon name="i-ph-dots-six-vertical" class="w-5 h-5 cursor-grab" />
                  <UButton color="gray" variant="ghost" icon="i-heroicons-tag">{{ element.name }} </UButton>

                  <div class="flex gap-5 items-center">
                  <UTooltip v-if="element.is_active==false" text="Not visible to customers">
                    <UIcon name="i-ph-eye-slash" class="w-5 h-5 cursor-pointer text-rose-500 dark:text-rose-400" />
                  </UTooltip>
                  <UTooltip v-if="element.is_internal" text="only visible to admins">
                    <UIcon name="i-ph-user" class="w-5 h-5 cursor-pointer text-amber-500 dark:text-amber-400" />
                  </UTooltip>

                </div>
                </div>
                
                <div class="flex items-center gap-5">
                  <UIcon @click="()=>addFunc(element)" name="i-heroicons-plus" class="w-5 h-4 cursor-pointer" />
                  <UDropdown :items="items(element)">
                    <UIcon name="i-heroicons-ellipsis-horizontal" class="w-4 h-4" />
                  </UDropdown>

                </div>
              </div>
            </template>
          </draggable>
        <!-- </div> -->
      </ClientOnly>

    </UCard>
    <TemplateCategoriesAdd v-model="open_add_category_modal" :parent-category="current_category"/>
    <TemplateCategoriesEdit :category="current_category" v-model="open_edit_category_modal" />
  </div>
</template>
