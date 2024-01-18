<script setup lang=ts>
definePageMeta({
    title: '' ,
    layout: 'default',
    scrollToTop:true
});
useHead({
    title: useRoute().meta?.title as string
})

</script>

<template>
  <div>
    <div>
      <UButton variant="link" label="Back to Account requests" icon="i-heroicons-arrow-left"
        to="/customers/account_requests" />
    </div>

    <div class="space-y-14">
      <div class="flex flex-col items-center justify-center gap-3">
        <h1 class="text-center text-xl sm:text-2xl font-semibold">Account Request Registration</h1>
        <p class="text-center max-w-lg text-xs dark:text-gray-300 text-gray-700">The provided information will be used by company management to confirm the account registration request. Please provide official information. Further information request will be sent to the provided contact information if necessary</p>
      </div>
      <div class="flex justify-center">
      <FormsCreateAccountRequest />
    </div>
    </div>
  </div>
</template>
