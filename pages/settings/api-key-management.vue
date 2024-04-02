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
  <ContainerPageTitleOneButton @buttonClicked="createKey" title="Publishable API Keys"
    description="These publishable keys will allow you to authenticate API requests" buttonLabel="Create key">
    <TemplateSettingsApiKeyTable @createKey="createKey" v-model:refresh="refresh" />
  </ContainerPageTitleOneButton>
</template>
