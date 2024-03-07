<script setup>
const store = useNuxtApp().$store.store

async function submit() {
  try {
    await useNuxtApp().$store.updateStoreDetails({ name: store.value?.name })
    useToastSuccess('Tnc Updated')
  } catch (error) {
    useToastFailure()
  }
}

</script>

<template>
  <form v-if="store" @submit.prevent="submit" class="space-y-5">
    <div class="space-y-1">
      <span class="highlight text-base">Terms & Condition</span>
      <p>Terms & Conditions of your Store. This will be on the store front</p>
    </div>
    <UFormGroup label="">
      <UTextarea v-model="store.tnc" />

    </UFormGroup>
    <div class="flex justify-start items-center">
      <UButton label="save" type="submit" />
    </div>
  </form>
</template>
