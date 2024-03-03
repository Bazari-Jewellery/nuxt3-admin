<script setup lang='ts'>
import type { ProductShippingAttributes } from "@@/types"
import type { PropType } from "vue";
const props = defineProps({
  modelValue: Object as PropType<ProductShippingAttributes>,
  default: {}
})
const emits = defineEmits(['update:modelValue'])

const model = computed({
  set: (val) => emits('update:modelValue', val),
  get: () => props.modelValue
})

// const weight = computed(()=>{
//   set:(val)=>model.value?.weight = val
// })
</script>

<template>
  <form v-if="model" class="space-y-5">
    <p>Shipping information can be required depending on your shipping provider, and whether or not you are shipping
      internationally.</p>

    <div class="space-y-5">
      <p class="flex flex-col gap-1">
        <span class="text-base highlight">Dimensions</span>
        <span>Configure to calculate the most accurate shipping rates.</span>
      </p>
      <div class="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <UFormGroup label="Width">
          <UInput v-model="(model.width as any)" placeholder="100..." type="number" />
        </UFormGroup>
        <UFormGroup label="Length">
          <UInput v-model="(model.length as any)" placeholder="100..." type="number" />
        </UFormGroup>
        <UFormGroup label="Height">
          <UInput v-model="(model.height as any)" placeholder="100..." type="number" />
        </UFormGroup>
        <UFormGroup label="Weight">
          <UInput v-model="(model.weight as any)" placeholder="100..." type="number" />
        </UFormGroup>
      </div>
    </div>

    <div>
      <p>
        <span>Customs</span>
        <span>Configure if you are shipping internationally</span>
      </p>

      <div class="grid grid-cols-1 sm-grid-cols-2 gap-5">
        <UFormGroup label="MID Code">
          <UInput v-model="(model.md_code as any)" placeholder="XDSKLAD9993..." />
        </UFormGroup>
        <UFormGroup label="HS Code">
          <UInput v-model="(model.hs_code as any)" placeholder="BDJSK39277W..." />
        </UFormGroup>
        <UFormGroup label="Country of origin">
          <UtilitiesCountriesList v-model="(model.origin_country as any)" />
        </UFormGroup>
      </div>
    </div>
  </form>
</template>
