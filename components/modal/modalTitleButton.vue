<script setup lang=ts>

const props = defineProps({
  modelValue: Boolean,
  title: {
    type:String,
    required:true
  },
  buttonConfirmLabel: {
    type:String,
    default: 'Save'
  },
  width:String
})
const emits = defineEmits(['update:modelValue', 'send'])

const modal = computed({
  set: (val) => emits('update:modelValue', val),
  get: () => props.modelValue
})




</script>

<template>
  <UModal v-model="modal">
    <UCard :ui="{base:width}">
      <template #header>
        <slot name="titleSection">
          <div class="flex items-center">
          <h3 class="flex-grow text-lg lg:text-xl font-semibold text-gray-900 dark:text-gray-50">{{ title }}</h3>
          <UButton @click="modal=false" size="sm" color="gray" variant="ghost" icon="i-heroicons-x-mark"/>
        </div>
        </slot>
      </template>
      <slot />
      
      <template #footer>
        <slot name="footerButtons">
          <div class="flex justify-end items-center">
         
         <div class="flex items-center gap-5">
           <UButton @click="modal=false" variant="outline" label="Cancel"/>
           <UButton @click="()=>$emit('send',true)" variant="solid" :label="$props.buttonConfirmLabel" />
         </div>
       </div>
        </slot>
      </template>
    </UCard>
  </UModal>
</template>
