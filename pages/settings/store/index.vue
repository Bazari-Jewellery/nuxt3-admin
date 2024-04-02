<script setup lang="ts">
useHead({
    title: 'Store Details',
})

onBeforeMount(async () => {
    await useNuxtApp().$store.getStoreDetails()
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
        slot: 'privacy'
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
                <UAccordion :items="items" multiple variant="solid" color="gray" :ui="{
            item: {
                base: 'base_i',
                container: 'cont_i',
                wrapper: 'wrap_i'
            }
        }">

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

                    <template #privacy>
                        <UCard :ui="{ divide: '' }">

                            <StorePrivacyPolicy />
                        </UCard>
                    </template>
                </UAccordion>
            </div>
        </UCard>
    </div>
</template>
