<script setup lang=ts>
import { useLogout } from '~/composables/auth';


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
      icon: 'i-carbon-category',
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
      to: '/gift-cards'
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
const name = computed(()=>userData.value.first_name + ' ' + userData.value.last_name)
const userMenu = [
  // [
  // {
  //   label:'View',
  //   icon: 'i-heroicons-arrow-up-right',
  //   click: ()=>{

  //   }
  // },
  // {
  //   label:'Edit',
  //   icon: 'i-heroicons-pencil-square',
  //   click: ()=>{

  //   }
  // },
  // ],
  [
  {
    label:'Logout',
    icon: 'i-ph-sign-out',
    click: async()=>{
      useLogout()
    }
  },
  ]
]
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
      <ClientOnly>
        <div v-if="userData.id" class="flex items-center justify-center gap-5">
        <UtilitiesAvatar src="" :name="name" />
        <div class="w-fit h-fit flex flex-col gap-1">
          <span :class="collapse ? 'hidden' : 'inline-block capitalize'">{{ userData?.first_name }}</span>
          <span :class="collapse ? 'hidden' : 'inline-block capitalize'">{{ userData?.role }}</span>
        </div>
        <UDropdown :items="userMenu">
          <UButton variant="link" color="gray" icon="i-heroicons-chevron-down" />
        </UDropdown>
      </div>

      <div v-else class="w-full flex items-center justify-center">
        <UButton to="/auth" icon="i-ph-user" color="gray" variant="ghost" size="md" />
      </div>
      </ClientOnly>
    </template>
  </UCard>
</template>
