<script setup lang="ts">
useHead({
    title: 'Store Details',
})

const items = [
    {
        label: 'General',
        slot: 'general'
    },
    {
        label: 'Contact',
        slot: 'contact'
    },
    {
        label: 'Privacy Policy',
        slot: 'Privacy'
    },
    {
        label: 'Terms and Condition',
        slot: 'tnc'
    },
]

</script>

<template>
    <div>
        <UButton to="/settings" variant="link" icon="i-heroicons-arrow-uturn-left" label="Back to settings"
            class="mb-8" />
        <UCard :ui="{ divide: '' }">
            <template #header>
                <div class="space-y-1">
                    <h1 class="base lg:text-lg highlight">Store Details</h1>
                    <p>Manage Your Store Details</p>
                </div>
            </template>

            <div>
                <UAccordion :items="items" multiple default-open variant="solid" color="gray">

                    <template #general>
                        <UCard :ui="{ divide: '' }">

                            <StoreGeneral />
                        </UCard>
                    </template>

                    <template #contact>
                        <UCard :ui="{ divide: '' }">

                            <StoreContact />
                        </UCard>
                    </template>

                    <template #tnc>
                        <UCard :ui="{ divide: '' }">

                            <StoreTnc />
                        </UCard>
                    </template>
                </UAccordion>
            </div>
        </UCard>
    </div>
</template>
