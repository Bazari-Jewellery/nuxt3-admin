<script setup lang=ts>

const nuxtApp = useNuxtApp()
const collapse = nuxtApp.$theme.sidebar.collapse
const userData = nuxtApp.$currentUser.data
// navigation
const links = computed(() => {
  return [
    {
      label: 'Orders',
      icon: 'i-heroicons-shopping-cart',
      to: '/orders'
    },
    {
      label: 'Products',
      icon: 'i-heroicons-tag',
      to: '/products'
    },
    {
      label: 'Categories',
      icon: 'i-heroicons-swatch',
      to: '/categories'
    },
    {
      label: 'Customers',
      icon: 'i-heroicons-users',
      to: '/customers'
    },
    {
      label: 'Discounts',
      icon: 'i-heroicons-chart-bar',
      to: '/discounts'
    },
    {
      label: 'Gift Cards',
      icon: 'i-heroicons-gift',
      to: '/gift_cards'
    },
    {
      label: 'Pricing',
      icon: 'i-heroicons-currency-euro',
      to: '/pricing'
    },
    {
      label: 'Settings',
      icon: 'i-heroicons-cog-6-tooth',
      to: '/settings'
    },
    {
      label: '',
      icon: collapse.value ? 'i-heroicons-arrow-right' : 'i-heroicons-arrow-left',
      click: ()=> collapse.value = ! collapse.value
    }
  ]
})

const isLoggedIn = computed(()=>isCustomerLoggedIn().value)
</script>

<template>
  <UCard 
  :ui="{
    base: 'overflow-hidden h-full flex flex-col w-full',
    background: '',
    divide: '',
    body: {
      base: 'flex-grow w-full h-full flex justify-center my-5 md:my-9'
    },
    header: {
      padding: 'px-4 py-5 sm:p-6',
      base: 'w-full'
    },
    footer: {
      padding: 'px-4 py-5 sm:p-6',
      base: 'w-full'
    },
  }">
    <template #header>
      <div class="w-full h-10 grid items-center justify-center">
        <LogoIcon class="" :class="collapse ? 'inline-block': 'sm:hidden'"/>
      <LogoSvg class="" :class="collapse ? 'hidden': 'hidden sm:inline-block sm:h-3 md:h-4 lg:h-5 w-auto'"/>
      </div>
    </template>

    <div>
      <UVerticalNavigation :links="links" :ui="{
        wrapper: 'relative flex flex-col gap-2',
        label: collapse ? 'hidden truncate relative': 'truncate relative'
      }"/>
    </div>


    <template #footer>
      <div v-if="isLoggedIn" class="flex items-center justify-center gap-5">
        <!-- <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" /> -->
        <UtilitiesAvatar src="" :name="userData?.first_name" />
        <div class="w-fit h-fit flex flex-col gap-1">
          <span :class="collapse ? 'hidden' : 'inline-block capitalize'">{{ userData?.first_name }}</span>
          <span :class="collapse ? 'hidden' : 'inline-block capitalize'">{{ userData?.role }}</span>
        </div>
        <UIcon name="i-heroicons-chevron-down" class="w-4 h-4" />
      </div>

      <div v-else class="w-full flex items-center justify-center">
        <span class="w-fit flex items-center justify-center p-2 rounded-full ring-1 ring-gray-900 dark:ring-white">
          
        <UIcon name="i-heroicons-user" class="w-5 h-5 cursor-pointer" @click="navigateTo('/auth')" />
        </span>
      </div>
    </template>
  </UCard>
</template>
