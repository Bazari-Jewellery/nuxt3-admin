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
      click: async() => {
        await delFunc(category)
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
    console.log('current',current_category.value);
    open_edit_category_modal.value = true
  }
}

// delete category
async function delFunc(data){
  const {id,object,deleted} = await useCybandyClient().admin.productCategories.delete(data.id)
  if(deleted){
    await useNuxtApp().$product.categories.getCategories()
  }else{
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
        <!-- <div class="relative"> -->
          <draggable v-model="categories" @change="(v)=>changed(v)" @start="()=>drag = true" @end="()=>drag = false" item-key="rank" class="grid gap-5">
            <template #item="{ element }">
              <div>
                <TemplateCategoriesListing :element="element" />
                <div v-if="element.category_children.length>0" class="pl-5 md:pl-8 lg:pl-10 my-5">
                  <draggable v-if="element.category_children.length>0" class="grid gap-4" v-model="element.category_children" @change="(v)=>changed(v)"  @start="()=>drag=true" @end="()=>drag=false">
                    <template #item="{element:_element}">
                      <div>
                        <TemplateCategoriesListing :element="_element" />
                      </div>
                    </template>
                  </draggable>
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
