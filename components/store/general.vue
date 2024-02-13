<script setup lang=ts>
const store = useNuxtApp().$store.store

async function submit(){
  await useNuxtApp().$store.updateStoreDetails({name:store.value?.name})
}
</script>

<template>
  <form v-if="store" @submit.prevent="submit" class="space-y-5">
    <UFormGroup label="Store name">
      <UInput v-model="store.name" />
    </UFormGroup>
    <div class="flex justify-end items-center">
      <UButton label="save" type="submit" />
    </div>
  </form>
</template>
