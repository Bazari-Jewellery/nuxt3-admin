<script setup lang=ts>
import type { PropType } from 'vue'
import type { Product } from '@medusajs/medusa'
import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import type { FormError, FormSubmitEvent } from '#ui/types'

import type { Dict } from '~/types';
const props = defineProps({
  product: {
    type: Object as PropType<Product | PricedProduct>,
    required: true
  },
  openModal: Boolean,
})
const emits = defineEmits(['update:openModal'])
const product = ref(props.product)
const state = reactive({
  title: product.value.title,
  subtitle: product.value.subtitle as string | undefined,
  handle: product.value.handle as string | undefined,
  material: product.value.material as string | undefined,
  description: product.value.description as string | undefined,

})
const openModal = computed({
  set: (val) => emits('update:openModal', val),
  get: () => props.openModal
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (state.title) errors.push({ path: 'title', message: 'Required' })

  return errors
}

const categories = ref(product.value.categories?.map((x) => x.id))
const collection_id = ref(product.value.collection_id || undefined)
const types = ref(product.value.type?.value || undefined)
const discountable = ref(product.value)
const tags = ref(product.value.tags?.map((x) => x.value) || [])



// watchArray([tags, types, categories, collection_id], () => {
//   console.log('tags', tags.value);
//   console.log('types', types.value);
//   console.log('tags', tags.value);
//   console.log('collection_id', collection_id.value);
//   console.log('categories', categories.value);

// }, { deep: true })


// fetch various list

const catList = asyncComputed(async () => {
  const { data } = await useproductsCategoriesList()
  if (data.value) {
    return data.value.product_categories
  }
})
const typeList = asyncComputed(async () => {
  const { data } = await useproductsTypeList()
  if (data.value) {
    return data.value.product_types?.map((x) => x.value)
  }
})
const tagList = asyncComputed(async () => {
  const { data } = await useproductsTagList()
  if (data.value) {
    return data.value.product_tags?.map((x) => x.value)
  }
})
const collectionList = asyncComputed(async () => {
  const { data } = await useproductsCollectionList()
  if (data.value) {
    return data.value.collections
  }
})

const _tag = computed({
  get: () => tags.value,
  set: (val) => {
    const promises = val?.map((_label) => {
      if (typeof _label == 'object') {
        const _val = _label?.['label'] as string
        if (_val) {
          tagList.value?.push(_val)
        }
        return _val
      } else {
        return _label
      }

    })

    tags.value = promises

  }
})
const _type = computed({
  get: () => types.value,
  set: (val) => {

    const filter = typeList.value?.filter((x) => val === x)
    if (filter) {
      if (filter.length > 0) {
        types.value = val
        return
      }
    }

    typeList.value?.push(val as string)
    types.value = val
  }
})


async function onSubmit(event: FormSubmitEvent<any>) {
  const payload = ref({ ...state } as Dict)
  payload.value.type = { value: types.value }
  payload.value.tags = tags.value.map((x) => { return { value: x } })
  payload.value.categories = categories.value?.map((x) => { return { id: x } })

  const { data } = await useProductUpdate(product.value.id as string, payload.value)
  if (data.value) {
    useNuxtApp().$product.product.singleProd.value = data.value.product
  }
}

function clearType() {
  types.value = undefined
}

function clearCollection() {
  collection_id.value = undefined
}
</script>

<template>
  <ModalTitleButton @send="onSubmit" v-model="openModal" title="Edit General Information">
    <form class="space-y-10">
      <div class="grid grid-cols-2 gap-5">
        <UFormGroup label="Title" required help="Short and clear title. 50-60 characters is recommended">
          <UInput v-model="state.title" required />
        </UFormGroup>
        <UFormGroup label="Subtitle">
          <UInput v-model="state.subtitle" />
        </UFormGroup>
      </div>
      <div class="grid grid-cols-2 gap-5">
        <UFormGroup label="Handle" required>
          <UInput v-model="state.handle" required />
        </UFormGroup>
        <UFormGroup label="Material">
          <UInput v-model="state.material" />
        </UFormGroup>
      </div>

      <UFormGroup label="Description">
        <UTextarea v-model="state.description" autoresize />
      </UFormGroup>

      <div class="space-y-4">
        <span class="text-gray-500 dark:text-gray-400 my-5">Organize Product</span>
        <div class="grid grid-cols-2 gap-5">
          <UFormGroup label="Type">
            <USelectMenu v-model="_type" creatable searchable clear-search-on-close :options="typeList">
              <template #label>
                <UButton v-if="types" variant="solid" color="gray" size="xs" :label="types ? types : 'Select type'">
                  <template #trailing>

                    <UButton @click="clearType" size="2xs" v-if="types" color="gray" variant="solid"
                      icon="i-heroicons-x-mark" />
                  </template>
                </UButton>

                <span v-else>Select type</span>

              </template>

              <template #option-create="{ option }">
                <span class="truncate">create <q>{{ option }}</q></span>
              </template>
            </USelectMenu>
          </UFormGroup>
          <UFormGroup label="Collection">
            <USelectMenu v-model="collection_id" option-attribute="title" value-attribute="id" :options="collectionList">
              <template #label>
                <UButton variant="solid" color="gray" size="xs">
                  <template #default>
                    <span v-if="collection_id" class="flex gap-2 items-center">
                      <span>{{ collectionList?.find((x) => x.id == collection_id)?.title }}</span>
                      <UButton @click="clearCollection" v-if="collection_id" color="gray" size="2xs" variant="solid"
                        icon="i-heroicons-x-mark" />
                    </span>
                    <span v-else>Select collection</span>
                  </template>
                </UButton>

              </template>
            </USelectMenu>
          </UFormGroup>
        </div>
        <div>
          <UFormGroup label="Categories">
            <USelectMenu v-model="categories" option-attribute="name" value-attribute="id" multiple :options="catList">
              <template #label>
                <template v-if="categories?.length">
                  <span>
                    {{ categories.length }} {{ categories.length > 1 ? 'categories' : 'category' }}
                  </span>
                </template>

                <template v-else>
                  <span class="text-gray-500 dark:text-gray-400 truncate">Select categories</span>
                </template>
              </template>
            </USelectMenu>
          </UFormGroup>
        </div>
        <div>
          <UFormGroup label="Tags">
            <USelectMenu v-model="_tag" multiple searchable clear-search-on-close creatable :options="tagList">
              <template #label>
                <template v-if="tags?.length">
                  <span class="flex items-center gap-2 py-1.5">
                    <UButton v-for="(tg, ind) of _tag" color="gray" size="xs" variant="solid" :label="tg">
                      <template #trailing>
                        <UButton size="2xs" @click="() => tags.splice(ind, 1)" icon="i-heroicons-x-mark" color='gray'
                          variant="solid" class="cursor-pointer" />

                      </template>
                    </UButton>
                  </span>
                </template>

                <template v-else>
                  <span class="text-gray-500 dark:text-gray-400 truncate">Select tag</span>
                </template>
              </template>
            </USelectMenu>
          </UFormGroup>
        </div>
      </div>
    </form>
  </ModalTitleButton>
</template>
