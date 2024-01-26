<script setup lang=ts>
definePageMeta({
    layout: 'default'
});
useHead({
    title: "Settings"
})

const items = [
    {
        title: 'API Key Management',
        icon: 'i-heroicons-key',
        description: 'Create and manage API keys',
        to: '#',
        condition: true
    },
    {
        title: 'Currencies',
        icon: 'i-heroicons-currency-euro',
        description: 'Manage the currencies of your store',
        to: '#',
        condition: true
    },
    {
        title: 'Regions',
        icon: 'i-heroicons-map',
        description: 'Manage shipping, payment, and fulfillment across regions',
        to: '#',
        condition: true
    },
    {
        title: 'Store Details',
        icon: 'i-heroicons-building-storefront',
        description: 'Manage your business details',
        to: '#',
        condition: true
    },
    {
        title: 'FAQ',
        icon: 'i-heroicons-question-mark-circle-20-solid',
        description: 'Manage your business details',
        to: '/settings/faq',
        condition: true
    },
    {
        title: 'Taxes',
        icon: 'i-ph-money',
        description: 'Manage taxes across regions and products',
        to: '#',
        condition: true
    },
    {
        title: 'The Team',
        icon: 'i-ph-users-three',
        description: 'Manage users of your store',
        to: '#',
        condition: true
    },
]
const ui = useAppConfig().ui
</script>

<template>
    <UCard :ui="{ divide: '' }">
        <template #header>
            <div class="space-y-1">
                <h2 class="h h2">General</h2>
                <p>Manage the general settings for your store</p>
            </div>
        </template>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div v-for="item of items" class="col-span-1">
                <NuxtLink v-if="item.condition" :to="item.to" class="w-full">
                    <div class="flex items-center gap-5 w-full group hover:shadow-none"
                        :class="[ui.card.base, ui.card.background, ui.card.ring, ui.card.rounded, ui.card.shadow, ui.card.body.padding]">
                        <span class="p-2 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <UIcon :name="item.icon" class="w-5 h-5" />
                        </span>
                        <div class="space-y-2 flex-grow">
                            <h3 class="h h3 group-hover:text-primary">
                                {{ item.title }}
                            </h3>
                            <p class="text-gray-600 dark:text-gray-300">
                                {{ item.description }}
                            </p>
                        </div>
                    </div>
                </NuxtLink>


            </div>
        </div>
    </UCard>
</template>
