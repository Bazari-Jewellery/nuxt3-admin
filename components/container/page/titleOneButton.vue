<script setup lang='ts'>
defineProps({
  title: String,
  description: String,
  buttonLabel: {
    type: String,
    default: 'Label'
  }
})
</script>

<template>
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
          <UButton @click="() => $emit('buttonClicked')" size="xs" variant="solid" color="gray" :label="buttonLabel" />
        </slot>
      </div>

    </template>

    <slot />

    <template #footer>
      <slot name="page-footer" />
    </template>
  </UCard>
</template>
