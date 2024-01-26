<script setup lang=ts>
import type { IFAQSECTION, IFAQ } from '~/types';

definePageMeta({
  layout: 'default'
});
useHead({
  title: "FAQ"
})
const plugin_faq = useNuxtApp().$settings.faq

await plugin_faq.section.getFaqSection()

const section = plugin_faq.section.list
// const isOpen = ref(false)
const _add_section = ref(false)
function addSection() {
  // isOpen.value = true
  _add_section.value = true
}



const section_id = ref<string|undefined>(undefined)

const sidebar = computed(() => section.value.map((x) => {
  return {
    label: x.name,
    id:x.id,
    // to: `/settings/faq/${x.id}`,
    click: () => {
      section_id.value = x.id
    }
  }
}))

// watch(sidebar, () => {

  
  if (sidebar.value.length) {
    console.log(sidebar.value);
    if (section_id.value == undefined) {
      section_id.value = sidebar.value[0].id
    }
  }
// })

const faq = ref([] as IFAQ[])
const _add_faq = ref(false)
function addFaq() {
  // isOpen.value = true
  _add_faq.value = true
}




const { refresh } = await useLazyFetch('/api/settings/faq/single/list', {
  watch: [section_id],
  query: {
    section_id
  },
  onResponse({ response }) {
    faq.value = response._data.faq
  }
})

const accordionFaq = computed(() => faq.value.map((x) => {
  return {
    label: x.question,
    content: x.answer,
    data: x
  }
}))

const items = (item: any) => [
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square',
      click: () => {

      }
    },
    {
      label: 'Delete',
      icon: 'i-heroicons-trash',
      click: async () => {
        const { data } = await useFetch('/api/settings/faq/single/delete', { query: { id: item.id as string } })
        if (data.value) {
          refresh()
        }
      }
    },
  ]
]

watch(_add_faq, () => {
  if (_add_faq.value == false) {
    refresh()
  }
})

</script>

<template>
  <UCard :ui="{ divide: '', header: { base: 'relative space-y-8' } }" class="min-h-full">
    <template #header>
      <UButton to="/settings" label="Back to settings" icon="i-heroicons-arrow-left" variant="link" />
      <div class="flex justify-between">
        <div class="space-y-1">
          <h2 class="h h2">FAQ</h2>
          <p>Manage all faq of your store</p>
        </div>

        <div class="space-x-5">
          <UButton @click="addSection" label="Add section" icon="i-heroicons-plus" variant="link" size="sm" />
          <UButton @click="addFaq" label="Add FAQ" icon="i-heroicons-plus" variant="outline" size="sm" />
        </div>
      </div>

    </template>

    <div>
      <!-- if section -->
      <div v-if="section.length > 0">
        <div class="flex gap-5">
          <div class="w-fit">
            <UVerticalNavigation v-if="sidebar" :links="sidebar"
              class="min-w-[200px] bg-gray-200/80 dark:bg-transparent" />
          </div>
          <div class="flex-grow">
            <!-- if no faq exist for the section -->
            <div v-if="faq.length == 0">
              <div class="flex items-center justify-center min-h-[100px]">
                <UButton @click="addFaq" label="Add FAQ" icon="i-heroicons-plus" variant="outline" size="sm" />
              </div>
            </div>

            <div v-else>
              <UAccordion :items="accordionFaq" multiple
                :ui="{ wrapper: 'flex flex-col w-full gap-1', item: { padding: 'px-4 py-5 sm:p-6', base: 'bg-gray-100 dark:bg-gray-800/40' } }">
                <template #default="{ item, index, open }">
                  <div class="flex items-center gap-5 justify-between">
                    <UButton color="gray" variant="link"
                      class="border-b border-gray-200 dark:border-gray-700 flex justify-between flex-grow"
                      :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">

                      <span class="truncate">{{ index + 1 }} {{ item.label }}</span>

                      <template #trailing>

                        <UIcon name="i-heroicons-chevron-right-20-solid"
                          class="w-5 h-5 ms-auto transform transition-transform duration-200"
                          :class="[open && 'rotate-90']" />
                        <!-- </span> -->
                      </template>
                    </UButton>
                    <UDropdown :items="items(item.data)">
                      <UButton color="white" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                    </UDropdown>
                  </div>
                </template>
              </UAccordion>
            </div>
          </div>
        </div>
      </div>

      <!-- else : add section -->

      <div v-else class="flex items-center justify-center min-h-[200px]">
        <UButton @click="addSection" label="Add section" icon="i-heroicons-plus" variant="link" size="sm" />
      </div>

    </div>
    <TemplateSettingsFaqSectionAdd v-model="_add_section" />
    <TemplateSettingsFaqSingleAdd v-model="_add_faq" />
  </UCard>
</template>
