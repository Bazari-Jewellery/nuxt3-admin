<script setup lang=ts>
useHead({
    title: 'Store Details'
})

</script>

<template>
<div>
    <UButton to="/settings" variant="link" icon="i-heroicons-arrow-uturn-left" label="Back to settings" class="mb-8" />
    <UCard :ui="{divide:''}">
        <template #header>
            <div class="space-y-1">
                <h1 class="base lg:text-lg highlight">Store Details</h1>
                <p>Manage Your Store Details</p>
            </div>
        </template>
    </UCard>
</div>
</template>
