<script setup lang=ts>

const nuxtApp = useNuxtApp()
const sidebarCollapse = nuxtApp.$theme.sidebar.collapse
</script>

<template>
  <div class="flex w-full">
    <div class="hidden sm:block cy-bg h-screen top-0" :class="sidebarCollapse ? 'w-20' : 'w-60'">
      <TemplateSidebar />
    </div>

    <!-- <div class="flex-grow space-y-10 md:space-y-14"> -->
      <!-- <div class="cy-bg"></div> -->

      <UCard :ui="{
        
        rounded: 'rounded-none',
        ring: '',
        body: {
          base: 'cy-bg h-[100vh-80px] overflow-auto',
        },
        header:{
          base:'sticky top-0 cy-bg z-10'
        },
        base: 'w-full h-screen overflow-y-auto'
      }">
        <template #header>
          <TemplateHeader />
        </template>

        <main>
          <slot />
        </main>

      </UCard>
  </div>
</template>

<style setup>
</style>
