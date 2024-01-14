<script setup>
const props = defineProps({
  modelValue:String,
})

const { data, error } = await useFetch('/api/regions/countryCode')



// const country = ref(data?.value[0])
const nu = data.value.filter((x)=>x.country_code.toLowerCase()==props.modelValue?.toLowerCase())[0]

const country = ref(nu ? nu : data.value[0])


// 


const emits = defineEmits(['update:modelValue'])
watchEffect(()=>{
  emits('update:modelValue', country.value.country_code)
})


</script>

<template>

<USelectMenu v-model="country" :options="data" searchable>
  <template #label>
    <span class="w-full flex items-center gap-2">
      <UAvatar size="3xs" v-bind="country.avatar" /> <span class="capitalize">{{ country.label }}</span>
    </span>
  </template>
</USelectMenu>

</template>

