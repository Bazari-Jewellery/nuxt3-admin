<script setup lang='ts'>
/**
 * Component for pages with title,description and a button the left
 */
const props = defineProps({
  title: String,
  description: String,
  buttonLabel: {
    type: String,
    default: 'Label'
  },
  backLink: String
})

const route = useRoute()
// console.log(route.fullPath.split('/')[-1]);


const backLink = computed(() => {
  const _ll = route.fullPath.split('/')
  const nu_ll = _ll.splice(0, _ll.length - 1)
  return props.backLink ?? nu_ll.join('/')
})

</script>

<template>
  <div>
    <div class="my-6">
      <UButton variant="link" icon="i-heroicons-arrow-uturn-left" :to="backLink" label="Back to Products" />


      <UCard :ui="{ base: 'h-full w-full', divide: '', header: { base: 'flex justify-between items-center' } }">
        <template #header>
          <slot name="title-description">
            <div class="space-y-1">

              <h1 class="text-lg lg:text-xl highlight">{{ title }}</h1>
              <p class="text-gray-500 dark:text-gray-400">
                {{ description }}
              </p>

            </div>
          </slot>
          <div>
            <slot name="button">
              <UButton @click="() => $emit('buttonClicked')" size="xs" variant="solid" color="gray"
                :label="buttonLabel" />
            </slot>
          </div>

        </template>

        <slot />

        <template #footer>
          <slot name="page-footer" />
        </template>
      </UCard>
    </div>
  </div>

</template>
