<script setup lang=ts>
const props = defineProps({
  title:{
    type: String,
    default: 'Cancel'
  },
  description:{
    type: String,
    default: 'Are you sure you want to cancel'
  },
  what:String,
  modelValue:Boolean,
  confirmButtonColor:String
})

const emits = defineEmits(['cancel', 'confirm', 'update:modelValue'])

const modal = computed({
  set: (val) => emits('update:modelValue', val),
  get: () => props.modelValue
})

function cancelFunc(){
  emits('cancel')
  modal.value = false
  
}

function confirmFunc(){
  emits('confirm')
  modal.value = false
}
</script>

<template>
  <UModal v-model="modal">
    <UCard :ui="{footer:{base:'flex justify-end'}, base:'min-w-full lg:min-w-[500px]'}">
      <div>
        <h3 class="text-base lg:text-xl font-semibold text-gray-900 dark:text-white">
          <slot name="title">
          {{ title }} <span v-if="what">{{ what }}</span> ?
        </slot>
        </h3>
        <p>
          <slot name="description">
            {{ description }} <span v-if="what">{{ what }}</span> ?
          </slot>
        </p>
      </div>

      <template #footer>
        <span class="flex items-center gap-5">
          <UButton @click="cancelFunc" type="button" variant="outline" >
            <slot name="cancelButton">
              Cancel
            </slot>
          </UButton>

          <UButton @click="confirmFunc" type="button" variant="solid" :color="confirmButtonColor? confirmButtonColor: 'primary'" >
            <slot name="confirmButton">
              Yes, confirm
            </slot>
          </UButton>
        </span>
      </template>
    </UCard>
  </UModal>
</template>
