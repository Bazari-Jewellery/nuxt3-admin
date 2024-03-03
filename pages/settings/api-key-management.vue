<script setup lang='ts'>
useHead({
  title: 'API Key Management'
})
const refresh = ref(false)
const createKey = async () => {
  const { } = await useCybandyClient().admin
}


</script>

<template>
  <!-- <UCard :ui="{ divide: '', header: { base: 'flex justify-between items-center' } }">
    <template #header>
      <div class="space-y-1">
        <h1 class="text-lg lg:text-xl highlight">Publishable API keys</h1>
        <p class="text-gray-500 dark:text-gray-400">These publishable keys will allow you to authenticate API requests</p>
      </div>
      <div>
        <UButton size="xs" variant="solid" color="gray" label="Create API key" />
      </div>
    </template>

    <TemplateSettingsApiKeyTable />
  </UCard> -->
  <ContainerPageTitleOneButton @buttonClicked="createKey" title="Publishable API Keys"
    description="These publishable keys will allow you to authenticate API requests" buttonLabel="Create key">
    <TemplateSettingsApiKeyTable @createKey="createKey" v-model:refresh="refresh" />
  </ContainerPageTitleOneButton>
</template>
