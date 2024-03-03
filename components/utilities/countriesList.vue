<script setup>
const props = defineProps({
  modelValue: String,
})

const emits = defineEmits(['update:modelValue'])
// const { data, error } = await useFetch('/api/regions/countryCode')
const data = useNuxtApp().$utilities.countryCode



// const country = ref(data?.value[0])
const nu = data.value.filter((x) => x.country_code.toLowerCase() == props.modelValue?.toLowerCase())[0]

const country = computed({
  set: (val) => emits('update:modelValue', val),
  get: () => props.modelValue
})


const _country = computed(() => {
  const _avatar = data.value.filter((x) => x.country_code == country.value)
  return _avatar[0]
})
</script>

<template>
  <USelectMenu v-model="country" :options="data" searchable value-attribute="country_code" :key="Date.now()">
    <template #label>
      <span v-if="!country">Select Country</span>
      <span v-else class="w-full flex items-center gap-2">
        <UAvatar size="3xs" v-bind="_country.avatar" /> <span class="capitalize">{{ _country.label }}</span>
      </span>
    </template>
  </USelectMenu>
</template>

