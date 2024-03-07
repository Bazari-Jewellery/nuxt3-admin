<script setup>
const store = useNuxtApp().$store.store

async function submit() {
  try {
    await useNuxtApp().$store.updateStoreDetails({ privacy_policy: store.value?.privacy_policy })
    useToastSuccess('Privacy Policy Updated')
  } catch (error) {
    useToastFailure()
  }
}

</script>

<template>
  <form v-if="store" @submit.prevent="submit" class="space-y-5">
    <div class="space-y-1">
      <span class="highlight text-base">Privacy Policy</span>
      <p>Privacy Policy of your Store. This will be on the store front</p>
    </div>
    <UFormGroup label="">
      <UTextarea v-model="store.privacy_policy" autoresize :rows="10" />


    </UFormGroup>
    <div class="flex justify-start items-center">
      <UButton label="save" type="submit" />
    </div>
  </form>
</template>
