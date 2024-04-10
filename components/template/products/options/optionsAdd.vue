<script setup lang='ts'>
import type { AdminPostProductsProductOptionsReq } from "@medusajs/medusa"
const props = defineProps({
  options: {
    type: Array<AdminPostProductsProductOptionsReq>,
    required: true
  }
})

const emits = defineEmits(['update:options'])
const options = computed({
  set: (val) => emits('update:options', val),
  get: () => props.options
})

const add_option = () => {
  options.value.push({
    title: ''
  })
}

const delete_option = (ind: number) => {
  options.value.splice(ind, 1)
}
</script>

<template>
  <div>
    <UCard>
      <div class="space-y-5">
        <h3 class="text-base lg:text-lg">Product options</h3>

        <UFormGroup v-for="(opt, ind) of options" label="Option title">
          <div class="flex items-center gap-5">
            <UInput v-model="options[ind].title" class="flex-grow" color="gray" />
            <UButton @click="() => delete_option(ind)" variant="solid" color="gray" icon="i-heroicons-trash" />
          </div>
        </UFormGroup>
      </div>

      <UButton @click="add_option" block icon="i-heroicons-plus" label="Add an option" class="mt-10" color="gray"
        variant="solid" />
    </UCard>
  </div>
</template>
